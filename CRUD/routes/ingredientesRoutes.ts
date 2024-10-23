import http from 'http';
import {createIngredientes, getIngredientes } from '../controllers/ingredientesController';

export const ingredientesRoutes = (req, res) => {
    if (req.method === 'GET') {
        getIngredientes(req, res);
    }else if(req.method === 'POST'){
        createIngredientes(req, res);
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};
