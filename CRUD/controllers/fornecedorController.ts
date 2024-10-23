import { connectToDatabase } from '../config/Database';

export const createFornecedor = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    const connection = await connectToDatabase();
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
    } finally {
      await connection.end();
    }
};

export const getFornecedor = async (req, res) => {
  const connection = await connectToDatabase();
  
  try {
    const [fornecedores] = await connection.execute('SELECT * FROM fornecedor');
    res.writeHead(200);
    res.end(JSON.stringify(fornecedores));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Erro ao buscar Fornecedores' }));
  } finally {
    await connection.end();
  }
};
