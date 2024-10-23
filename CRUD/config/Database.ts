import mysql from 'mysql2/promise';

export const connectToDatabase = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : '',
    database : 'restaurante',
    multipleStatements: true, 
  });
  return connection;
};
