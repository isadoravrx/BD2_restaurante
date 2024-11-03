import http from 'http';
import {getFunctions} from '../controllers/functionController';

export const functionRoutes = (req, res, connection) => {
    if (req.method === 'GET') {
        getFunctions(req, res, connection);
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};
