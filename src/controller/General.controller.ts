import { Request, Response, NextFunction } from "express";
import * as dateFormat from "dateformat";
import { User } from "../interfaces/User.interface";
require('dotenv').config()

const fs = require('fs');
const path = require('path');
// Obtener la ruta del directorio actual del proyecto
// Construir la ruta al directorio 'db' fuera del directorio actual
const dbDir = path.join(__dirname, '..', 'database');
// Ruta completa al archivo 'usuarios.json' dentro de la carpeta 'db'
const filePath = path.join(dbDir, 'usuarios.json');

export class GeneralController {

    async getComments(request: Request, response: Response, next: NextFunction) {

        let statusCode: number = 401;
        var dataResponse: User[] = [];
        try {
            let now: Date = new Date();
            let completeDateFormat: any = dateFormat(now, "yyyy-mm-dd HH:MM:ss.l");

            var msgLog: string = "::" + process.pid + "::" + completeDateFormat + "::" + process.env.APP_GENERALSERVICE_NAME + ":: ";

            console.log(msgLog + "[GeneralController.getComments]:: OBTENIENDO COMENTARIOS::");

            try {
                // Verificar si el archivo existe
                if (!fs.existsSync(filePath)) {
                    // Si no existe, crear un archivo vacío
                    fs.writeFileSync(filePath, '[]');
                    console.log(msgLog + "[GeneralController.addComments]:: Archivo de usuarios creado correctamente.");
                }
                dataResponse = getUsersFromFile(filePath);
                statusCode = 200;
            } catch (error) {
                console.error(msgLog + "[GeneralController.addComments]:: Error al leer el archivo de usuarios " + JSON.stringify(error));
                statusCode = 204;
            }

            console.log(msgLog + "[GeneralController.getComments]:: RESPONSE: " + JSON.stringify(dataResponse));
        }
        catch (error) {
            statusCode = 500;
            console.error(msgLog + "[GeneralController.getComments]:: error: " + JSON.stringify(error));
        }
        finally {
            if (statusCode !== 200) {
                response.status(statusCode).send();
            }
            else {
                response.status(statusCode).json(dataResponse);
            }
        }

    }

    async addComment(request: Request, response: Response, next: NextFunction) {
        let statusCode: number = 0;
        var dataResponse: boolean = false;
        try {
            let now: Date = new Date();
            let completeDateFormat: string = dateFormat(now, "yyyy-mm-dd HH:MM:ss.l");


            var userRequest: User = { ...request.body, createdAt: now };

            var msgLog: string = "::" + process.pid + "::" + completeDateFormat + "::" + process.env.APP_GENERALSERVICE_NAME + ":: ";

            console.log(msgLog + "[GeneralController.addComment]:: REQUEST: " + JSON.stringify(userRequest));

            if (
                (userRequest.name && userRequest.name.length > 0 ? true : false) &&
                (userRequest.comment && userRequest.comment.length > 0 ? true : false)
            ) {

                try {
                    const users: User[] = getUsersFromFile(filePath);
                    // Encontrar el último ID y generar el nuevo ID
                    const lastId = users.length > 0 ? users[users.length - 1].id : 0;
                    const newId = lastId + 1;
                    // Asignar el nuevo ID al usuario y agregarlo a la lista
                    userRequest.id = newId;

                    users.push(userRequest);

                    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
                    console.log('Usuarios guardados correctamente.');
                    dataResponse = true;
                    statusCode = 200;
                } catch (error) {
                    console.error(msgLog + "[GeneralController.addComment]:: Error al guardar usuarios en el archivo:" + JSON.stringify(error));
                    statusCode = 500;
                }
            }
            else {
                statusCode = 400;
            }

            console.log(msgLog + "[GeneralController.addComment]:: RESPONSE: " + JSON.stringify(dataResponse));
        }
        catch (error) {
            statusCode = 500;
            console.error(msgLog + "[GeneralController.addComment]:: error: " + JSON.stringify(error));
        }
        finally {
            if (statusCode !== 200) {
                response.status(statusCode).send();
            }
            else {
                response.status(statusCode).json(dataResponse);
            }
        }
    }

}

// Función para leer el archivo JSON y devolver los usuarios
function getUsersFromFile(filePath: string): User[] {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
}