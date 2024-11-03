import http from 'http';
import {createVenda, getVenda } from '../controllers/vendaController';

export const vendaRoutes = (req, res, connection) => {
    if (req.method === 'GET') {
        getVenda(req, res, connection);
    }else if(req.method === 'POST'){
        createVenda(req, res, connection);
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};
