import http from 'http';
import {createCliente, getClientes } from '../controllers/clienteController';

export const clienteRoutes = (req, res) => {
    if (req.method === 'GET') {
        getClientes(req, res);
    }else if(req.method === 'POST'){
        createCliente(req, res);
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};
