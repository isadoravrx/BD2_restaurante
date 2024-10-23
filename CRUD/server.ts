import http from 'http';
import { clienteRoutes } from './routes/clienteRoutes';
import {databaseRoutes} from './routes/databaseRoutes';
import { pratoRoutes } from './routes/pratoRoutes';
import { fornecedorRoutes } from './routes/fornecedorRoutes';
import { ingredientesRoutes } from './routes/ingredientesRoutes';
import { usosRoutes } from './routes/usosRoutes';
import { vendaRoutes } from './routes/vendaRoutes';
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
    }else if(req.url === '/usos'){
        usosRoutes(req,res);
    }else if(req.url === '/venda'){
        vendaRoutes(req,res);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
