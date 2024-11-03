import { connectToDatabase } from '../config/Database';

export const useUsuario = async (req, res, globalConnectionSetter) => {
    res.setHeader('Content-Type', 'application/json');
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
      const {usuario,senha} = JSON.parse(body);

      try { 
        let newConnection;
        newConnection = await connectToDatabase({ user: usuario, password: senha});
        

        globalConnectionSetter(newConnection);
        res.writeHead(201);
        res.end(JSON.stringify({ message: 'usuário trocado com sucesso!' , usuario: usuario }));
      } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Erro ao trocar Usuário' }));
      }
    });
};

