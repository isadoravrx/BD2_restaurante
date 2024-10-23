import http from 'http';
import {createUsos, getUsos} from '../controllers/usosController';

export const usosRoutes = (req, res) => {
    if (req.method === 'GET') {
        getUsos(req, res);
    }else if(req.method === 'POST'){
        createUsos(req, res);
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};
