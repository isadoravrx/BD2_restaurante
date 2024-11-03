import http from 'http';
import {getStoredProcedures} from '../controllers/storedProceduresController';

export const storedProceduresRoutes = (req, res, connection) => {
    if (req.method === 'GET') {
        getStoredProcedures(req, res, connection);
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};
