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
    const token = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
    const auth = await request({
      uri: `${ISSUER}/v1/token`,
      json: true,
      method: 'POST',
      headers: {
        authorization: `Basic ${token}`
      },
      form: {
        grant_type: 'client_credentials',
        scope: SCOPE
      }
    })

    /*const response = await request({
      uri,
      method,
      body,
      headers: {
        'content-type': 'application/json',
        authorization: `${auth.token_type} ${auth.access_token}`
      }
    })

    console.log(response)*/
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
    const oAuth = new models.OAuth();
    const auth = await getAccessToken();
    oAuth.accessToken = auth.access_token;
    //if(auth.token_type === 'OAuth'){
        api.setDefaultAuthentication(oAuth);
    //}
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



