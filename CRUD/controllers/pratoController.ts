import { connectToDatabase } from '../config/Database';

export const createPrato = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    const connection = await connectToDatabase();
    const { nome, descricao, valor, disponibilidade} = JSON.parse(body);

    try { 
      await connection.execute(
        'INSERT INTO prato (nome, descricao, valor, disponibilidade) VALUES (?, ?, ?, ?)',
        [nome, descricao, valor, disponibilidade]
      );
      res.writeHead(201);
      res.end(JSON.stringify({ message: 'Prato adicionado com sucesso!' }));
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Erro ao adicionar Prato' }));
    } finally {
      await connection.end();
    }
};

export const getPrato = async (req, res) => {
  const connection = await connectToDatabase();
  
  try {
    const [pratos] = await connection.execute('SELECT * FROM prato');
    res.writeHead(200);
    res.end(JSON.stringify(pratos));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Erro ao buscar Pratos' }));
  } finally {
    await connection.end();
  }
};
