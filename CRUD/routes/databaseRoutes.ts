import http from 'http';
import {createDatabase,deleteDatabase } from '../controllers/databaseController';

export const databaseRoutes = (req, res) => {
    if (req.method === 'POST') {
        createDatabase(req, res);
    }else if(req.method === 'DELETE'){
        deleteDatabase(req, res);
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};
