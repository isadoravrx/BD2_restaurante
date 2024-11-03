import http from 'http';
import {getViews} from '../controllers/viewController';

export const viewRoutes = (req, res, connection) => {
    if (req.method === 'GET') {
        getViews(req, res, connection);
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};
