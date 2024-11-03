import http from 'http';
import {useUsuario} from '../controllers/usuarioController';

export const usuarioRoutes = (req, res, globalConnectionSetter) => {
    if(req.method === 'POST'){
        useUsuario(req, res, globalConnectionSetter);
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};
