const express = require('express');
const mysql = require('mysql');

const dbConfig = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(dbConfig);

const CREATE_TABLE_QUERY = `CREATE TABLE IF NOT EXISTS people (name varchar (100))`;
const INSERT_QUERY = (number) => `INSERT INTO people(name) values('Fernando ${number}')`;
const SELECT_ALL = `SELECT * FROM people`;

// create people table
connection.query(CREATE_TABLE_QUERY);

// count records and add one more
connection.query(SELECT_ALL, (_, results) => {
    connection.query(INSERT_QUERY(results.length + 1));
});

const app = express();

const port = 3000;

app.get('/', (_, res) => {
    connection.query(SELECT_ALL, (_, results) => {
        res.send(`
            <h1>Full cycle rocks</h1> 
            <ul>
                ${results.map(row => `<li>${row.name}</li>`).join('')}
            </ul>
        `);

    })
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
