import { connectToDatabase } from '../config/Database';

export const createFornecedor = async (req, res, connection) => {
    res.setHeader('Content-Type', 'application/json');
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
      const { nome, estado_origem} = JSON.parse(body);

      try { 
        await connection.execute(
          'INSERT INTO fornecedor (nome, estado_origem) VALUES (?, ?)',
          [nome, estado_origem]
        );
        res.writeHead(201);
        res.end(JSON.stringify({ message: 'Fornecedor adicionado com sucesso!' }));
      } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Erro ao adicionar Fornecedor' }));
      } 
    });
};

export const getFornecedor = async (req, res, connection) => {
  
  try {
    const [fornecedores] = await connection.execute('SELECT * FROM fornecedor');
    res.writeHead(200);
    res.end(JSON.stringify(fornecedores));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Erro ao buscar Fornecedores' }));
  } 
};
