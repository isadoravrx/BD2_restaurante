import http from 'http';
import {createCliente, getClientes } from '../controllers/clienteController';

export const clienteRoutes = (req, res, connection) => {
    if (req.method === 'GET') {
        getClientes(req, res, connection);
    }else if(req.method === 'POST'){
        createCliente(req, res, connection);
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};
