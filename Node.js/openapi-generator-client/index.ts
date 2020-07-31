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



