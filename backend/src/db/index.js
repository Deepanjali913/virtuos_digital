import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config({
  path: './env'
});

const { Client } = pkg;

const client = new Client({
  connectionString: `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?sslmode=${process.env.DB_SSL_MODE}`,
});

client.connect((err) => {
  if (err) {
    console.log('connection error', err.stack);
  } else {
    console.log('connected');
  }
});

export default client;