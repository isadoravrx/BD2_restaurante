import mysql from 'mysql2/promise';

export const connectToDatabase = async ({ user, password }) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: user,
        password: password,
        database: 'restaurante',
        multipleStatements: true,
    });
    return connection;
};
