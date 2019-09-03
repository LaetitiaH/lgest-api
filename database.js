const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'lgest',
    password: 'admin',
    port: 5432
});
client.connect();

module.exports = client;
