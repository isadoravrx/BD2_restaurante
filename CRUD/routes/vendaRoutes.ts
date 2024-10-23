import http from 'http';
import {createVenda, getVenda } from '../controllers/vendaController';

export const vendaRoutes = (req, res) => {
    if (req.method === 'GET') {
        getVenda(req, res);
    }else if(req.method === 'POST'){
        createVenda(req, res);
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};
