import http from 'http';
import {createFornecedor, getFornecedor } from '../controllers/fornecedorController';

export const fornecedorRoutes = (req, res) => {
    if (req.method === 'GET') {
        getFornecedor(req, res);
    }else if(req.method === 'POST'){
        createFornecedor(req, res);
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};
