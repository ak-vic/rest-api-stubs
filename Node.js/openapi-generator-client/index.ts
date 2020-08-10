import express from 'express';
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";
import * as bodyParser from "body-parser";
import * as swaggerUi from "swagger-ui-express";
import jsYaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
//import swaggerJSDoc from "swagger-jsdoc";
import { Endpoints } from "./endpoints";
import { UsersApi } from './api/apis';
import btoa from 'btoa';
import * as models from './model/models';
require('dotenv').config();
import request from 'request-promise';

const { ISSUER, CLIENT_ID, CLIENT_SECRET, SCOPE } = process.env

const getAccessToken = async () => {
  try {
    const authHeader = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
    const auth = await request({
      uri: `${ISSUER}/v1/token`,
      json: true,
      method: 'POST',
      headers: {
        authorization: `Basic ${authHeader}`
      },
      form: {
        grant_type: 'client_credentials',
        scope: SCOPE
      }
    })

    return auth;
  } catch (error) {
    console.error(`Error: ${error.message}`)
  }
}

const app = express();
const openApiYamlPath = path.join(__dirname, 'open-api-spec', 'openapi.yaml');
bootstrap(app, openApiYamlPath);

async function bootstrap(app: any, openApiYamlPath: string) {
    app.use(bodyParser.json());
    //app.use(express.json());
    //app.use(express.static(__dirname + "/public"));
    const apiRouter = express.Router();
    app.use("/api/v1", apiRouter);
    const api: UsersApi = new UsersApi();
    if(process.env.DEFAULT_AUTHENTICATION === "API_KEY")
    {
        const apiKeyAuth = new models.ApiKeyAuth("query", "api_key");
        apiKeyAuth.apiKey = process.env.API_KEY as string; 
        api.setDefaultAuthentication(apiKeyAuth);
    }
    else
    {
        const auth = await getAccessToken();
        const oAuth = new models.OAuth();
        oAuth.accessToken = auth.access_token;
        if(auth.token_type === 'Bearer'){
            api.setDefaultAuthentication(oAuth);
        }
        else{
            //throw new Error('Token type should be "Bearer"');
            console.error('Token type should be "Bearer"');
            return;
        }
    }
    const usersService: UsersService = new UsersService(api);
    const usersController: UsersController = new UsersController(usersService);
    new Endpoints(apiRouter, usersController);
    let oas: swaggerUi.JsonObject = {};
    try {
        oas = jsYaml.safeLoad(fs.readFileSync(openApiYamlPath).toString()) as swaggerUi.JsonObject;
    } catch (e) {
        //logger.error('failed to start Express Server', e.message);
        console.error('Failed to start Express Server.', e.message);
        return;
    }
    app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(oas));
    await app.listen(app.get("port") || 3007);
    console.log("Server is waiting for incoming connections...");
}



