import { GeneralController } from "./controller/General.controller";
require('dotenv').config()

export const Routes = [{
    method: "get",
    route: process.env.APP_GENERALSERVICE_ROUTE_GETCOMMENT,
    controller: GeneralController,
    action: "getComments"
}, {
    method: "post",
    route: process.env.APP_GENERALSERVICE_ROUTE_ADDCOMMENT,
    controller: GeneralController,
    action: "addComment"
}
];