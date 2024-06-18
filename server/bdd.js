import pg from 'pg';
const { Client } = pg;
const bdd = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'bddsimplepeinture',
  password: 'postgres',
  port: '5432',
});
bdd.connect();
export {bdd};