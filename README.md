# oauthtokendao

Proyecto para versionar el componente de BD del accesstoken de la reingenieria de la pagina aforecoppel

# Variables de entorno

#App <br>
APP_IP                  = 0.0.0.0 <br>
APP_PORT                = 20009 <br>
APP_NAME                = OAUTHTOKENDAO <br>

**#Routes** <br>
**APP_ROUTE_GET           = /oauthTokenDao/getToken** <br>
TIPO POST. EJEMPLO:
```
{
	"username": "marmenta2@aforecoppel.com",
	"userpassword": "$2b$10$lcnckY0Gg./t45.GD1LEH.QJEOexkSaj0aseDwwZJzwya5aCWahx2",
	"usertype": 1
}
```
**APP_ROUTE_VALIDATE      = /oauthTokenDao/validateToken** <br>
TIPO POST. EJEMPLO:
```
{
	"id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl91c2VyIjoiYXV0aDB8bWFybWVudGEyQGFmb3JlY29wcGVsLmNvbSQyYiQxMCRsY25ja1kwR2cuL3Q0NS5HRDFMRUguUUpFT2V4a1NhajBhc2VEd3daSnp3eWE1YUNXYWh4MiIsImlhdCI6MTU5NjI1MDM0NCwiZXhwIjoxNTk2MjUwNDA0fQ.7f51rOcBMBa6m06vxHMeXo5legsJ0YlsNaaKw0RzulM"
}
```

#BD <br>
NAME= aforecoppelConection <br>
TYPE= postgres <br>
HOST= 10.26.190.159 <br>
PORT= 5432 <br>
USERNAME= syssistemas <br>
PASSWORD= f0bcb5dfc5823ee82d22dc359116bc4d <br>
DATABASE= aforecoppel.com <br>

# Docker run
Asegurarse que la direccion de host sea la correcta <br>

docker run --env APP_IP='0.0.0.0' --env APP_PORT=20009 --env APP_NAME='OAUTHTOKENDAO' --env APP_ROUTE_GET='/oauthTokenDao/getToken' --env APP_ROUTE_VALIDATE='/oauthTokenDao/validateToken' --env TYPE='postgres' --env HOST='10.27.142.196' --env PORT=5432 --env USERNAME='syssistemas' --env PASSWORD='f0bcb5dfc5823ee82d22dc359116bc4d' --env DATABASE='aforecoppel.com' -p 20009:20009 --name oauthtokendao oauthtokendao:latest
