"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
const cors = require("cors");
const http = require('node:http');
;
require('dotenv').config();
let index = Promise.resolve();
index.then(() => [])
    .then(data => {
    let ip = process.env.APP_GENERALSERVICE_IP;
    let port = process.env.APP_GENERALSERVICE_PORT;
    let msgLog = `::${process.env.APP_GENERALSERVICE_NAME}::`;
    // create express app
    const app = express();
    app.use(cors());
    app.use(bodyParser.json({ limit: '150mb' }));
    // register express routes from defined application routes
    routes_1.Routes.forEach(route => {
        app[route.method](route.route, (req, res, next) => {
            console.log(msgLog + "[index]:: ROUTE = " + route.route + ", METHOD = " + route.method);
            const result = (new route.controller)[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
            }
            else if (result !== null && result !== undefined) {
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
//# sourceMappingURL=index.js.map