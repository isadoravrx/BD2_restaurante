import http from 'http';
import { clienteRoutes } from './routes/clienteRoutes';
import {databaseRoutes} from './routes/databaseRoutes';
const server = http.createServer((req, res) => {
    
    if(req.url === '/database'){
        databaseRoutes(req,res);
    }else if(req.url === '/cliente' ){
        clienteRoutes(req, res);
    }

    //adicionar demais routes
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
