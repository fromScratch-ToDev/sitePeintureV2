import pg from 'pg';
const { Client } = pg;
const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'bddsimplepeinture',
  password: 'postgres',
  port: '5432',
}
const bdd = new Client(config);
bdd.connect();
export {bdd, config};