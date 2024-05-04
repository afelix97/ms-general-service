"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const General_controller_1 = require("./controller/General.controller");
require('dotenv').config();
exports.Routes = [{
        method: "get",
        route: process.env.APP_GENERALSERVICE_ROUTE_GETCOMMENT,
        controller: General_controller_1.GeneralController,
        action: "getComments"
    }, {
        method: "post",
        route: process.env.APP_GENERALSERVICE_ROUTE_ADDCOMMENT,
        controller: General_controller_1.GeneralController,
        action: "addComment"
    }
];
//# sourceMappingURL=routes.js.map