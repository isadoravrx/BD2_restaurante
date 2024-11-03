import http from 'http';
import { clienteRoutes } from './routes/clienteRoutes';
import {databaseRoutes} from './routes/databaseRoutes';
import { pratoRoutes } from './routes/pratoRoutes';
import { fornecedorRoutes } from './routes/fornecedorRoutes';
import { ingredientesRoutes } from './routes/ingredientesRoutes';
import { usosRoutes } from './routes/usosRoutes';
import { vendaRoutes } from './routes/vendaRoutes';
import {usuarioRoutes} from './routes/usuarioRoutes'
import {connectToDatabase} from './config/Database';
import {viewRoutes} from './routes/viewRoutes';

let connection ;


const initDatabase = async () => {
    connection = await connectToDatabase({ user: 'root', password: '' });
};

const setGlobalConnection = (newConnection) => {
    if (connection) {
        connection.end();
    }
    connection = newConnection; 
};

const startServer = async () => {
    await initDatabase(); 
    const server = http.createServer((req, res) => {
        if(req.url === '/database'){
            databaseRoutes(req,res, connection);
        }else if(req.url === '/cliente' ){
            clienteRoutes(req, res, connection);
        }else if(req.url === '/prato'){
            pratoRoutes(req,res, connection);
        }else if(req.url === '/fornecedor'){
            fornecedorRoutes(req,res, connection);
        }else if(req.url === '/ingredientes'){
            ingredientesRoutes(req,res, connection);
        }else if(req.url === '/usos'){
            usosRoutes(req,res, connection);
        }else if(req.url === '/venda'){
            vendaRoutes(req,res, connection);
        }else if(req.url === '/usuario'){
            usuarioRoutes(req,res, setGlobalConnection);
        }else if(req.url === '/view'){
            viewRoutes(req,res,connection);
        }else if(req.url === '/functions'){
            
        }else if(req.url === '/storedProcedures'){

        }
    });
    const PORT = 3000;
    server.listen(PORT, () => {
        console.log(`API rodando em http://localhost:${PORT}`);
    });
};


startServer().catch(err => {
    console.error('Erro ao iniciar o servidor:', err);
});
