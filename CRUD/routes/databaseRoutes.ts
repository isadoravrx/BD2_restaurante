import http from 'http';
import {createDatabase,deleteDatabase } from '../controllers/databaseController';

export const databaseRoutes = (req, res, connection) => {
    if (req.method === 'POST') {
        createDatabase(req, res, connection);
    }else if(req.method === 'DELETE'){
        deleteDatabase(req, res, connection);
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};
