# 09 Conexion SdDD BdDD | Mineria de Datos
> El sistema solo es capas de ingresar 100,000 registros. No es necesario dejar solo 100,000 registros en el archivo, el sistema automaticamente toma los primeros 100,000 registros
## Instrucciones para ingresar al proyecto en la web
### Ingresar al sitio web
https://mineria.edsen.dev
### Ingresar el data set en formato .csv
1. Dar click en el boton "Selecciona un archivo" y seleccionar el archivo .csv (El archivo se llama "survey_results_public.csv" y se encuentra en la raiz del proyecto)
2. Dar click en el boton "Importar"
3. Esperar a que se suba el dataset (esto puede variar dependiendo su conexcion a internet)
4. Sera redirigido a la pagina donde podra ver los campos del data set
---
## Instrucciones para iniciar el proyecto localmente
1. Descargar el respositorio en github del siguiente link: https://github.com/EdsenxX/mineria
2. Nos situamos en la carpeta del proyecto e instalamos las librerias de npm que necesita el proyecto
```
npm install
```
3. Crear un archivo llamado ".env" en la raiz del proyecto e ingresar las variables que vienen en el archivo ".env.example"
4. Iniciamos nuestro servidor de desarrollo
```
npm run dev
```
5. Ingresamos al servidor mediante un navegador web mediante el siguiente link http://localhost:3000
6. Dar click en el boton "Selecciona un archivo" e ingresar seleccionar el archivo .csv (El archivo se llama "survey_results_public.csv" y se encuentra en la raiz del proyecto)
7. Dar click en el boton "Importar"
8. Esperar a que se suba el dataset (esto puede variar dependiendo su conexcion a internet)
9. Sera redirigido a la pagina donde podra ver los campos del data set