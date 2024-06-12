import pg from 'pg';
const { Client } = pg;
const bdd = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'bddpeinture',
  password: 'postgres',
  port: '5432',
});
bdd.connect();
export {bdd};