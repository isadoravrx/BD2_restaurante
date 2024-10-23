import http from 'http';
import { clienteRoutes } from './routes/clienteRoutes';
import {databaseRoutes} from './routes/databaseRoutes';
import { pratoRoutes } from './routes/pratoRoutes';
import { fornecedorRoutes } from './routes/fornecedorRoutes';
import { ingredientesRoutes } from './routes/ingredientesRoutes';
const server = http.createServer((req, res) => {
    
    if(req.url === '/database'){
        databaseRoutes(req,res);
    }else if(req.url === '/cliente' ){
        clienteRoutes(req, res);
    }else if(req.url === '/prato'){
        pratoRoutes(req,res);
    }else if(req.url === '/fornecedor'){
        fornecedorRoutes(req,res);
    }else if(req.url === '/ingredientes'){
        ingredientesRoutes(req,res);
    }

    //adicionar demais routes
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
