import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes"
import * as cors from 'cors';
const http = require('node:http');;

require('dotenv').config()

let index = Promise.resolve();

index.then(() => [])
    .then(data => {

        let ip = process.env.APP_GENERALSERVICE_IP as any;
        let port = process.env.APP_GENERALSERVICE_PORT;

        let msgLog: string = `::${process.env.APP_GENERALSERVICE_NAME}::`;

        // create express app
        const app = express();
        app.use(cors());
        app.use(bodyParser.json({ limit: '150mb' }));

        // register express routes from defined application routes
        Routes.forEach(route => {
            (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {

                console.log(msgLog + "[index]:: ROUTE = " + route.route + ", METHOD = " + route.method);
                const result = (new (route.controller as any))[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
        });

        // setup express app here
        let httpServer = http.createServer(app);

        // start express server
        httpServer.listen(port, ip, () => {
            console.log(msgLog + `[index.createConnections]:: Microservice ${process.env.APP_GENERALSERVICE_NAME} started. Open http://${ip}:${port}/`);
        });


    }).catch(error => console.log(error));
