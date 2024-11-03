import { connectToDatabase } from '../config/Database';

export const createCliente = async (req, res, connection) => {
    res.setHeader('Content-Type', 'application/json');
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    
    req.on('end', async () => {
      const { nome, sexo, idade, nascimento, pontos } = JSON.parse(body);

      try { 
        await connection.execute(
          'INSERT INTO cliente (nome, sexo, idade, nascimento, pontos) VALUES (?, ?, ?, ?, ?)',
          [nome, sexo, idade, nascimento, pontos]
        );
        res.writeHead(201);
        res.end(JSON.stringify({ message: 'Cliente adicionado com sucesso!' }));
      } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Erro ao adicionar cliente' }));
      } 

    });
};

export const getClientes = async (req, res, connection) => {
  
  try {
    const [clientes] = await connection.execute('SELECT * FROM cliente');
    res.writeHead(200);
    res.end(JSON.stringify(clientes));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Erro ao buscar clientes' }));
  } 
};
