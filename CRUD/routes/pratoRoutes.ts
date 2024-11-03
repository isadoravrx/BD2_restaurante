import http from 'http';
import {createPrato, getPrato} from '../controllers/pratoController';

export const pratoRoutes = (req, res, connection) => {
    if (req.method === 'GET') {
        getPrato(req, res, connection);
    }else if(req.method === 'POST'){
        createPrato(req, res, connection);
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};
