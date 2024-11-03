import http from 'http';
import {createFornecedor, getFornecedor } from '../controllers/fornecedorController';

export const fornecedorRoutes = (req, res, connection) => {
    if (req.method === 'GET') {
        getFornecedor(req, res, connection);
    }else if(req.method === 'POST'){
        createFornecedor(req, res, connection);
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};
