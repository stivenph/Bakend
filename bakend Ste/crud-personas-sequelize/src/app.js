require('dotenv').config();

const express = require('express');
const sequelize = require('./config/database');

const app = express();

app.use(express.json());

sequelize.authenticate()
    .then(() => {
        console.log('Conexión a SQL Server exitosa');

        app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error de conexión a SQL Server:', error);
    });