const app = require('./app');
const database = require('./database');

app(database).listen(3000);
