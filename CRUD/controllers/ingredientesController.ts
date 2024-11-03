import { connectToDatabase } from '../config/Database';

export const createIngredientes = async (req, res, connection) => {
    res.setHeader('Content-Type', 'application/json');
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
      const { nome, data_fabricacao, data_validade, quantidade, observacao} = JSON.parse(body);

      try { 
        await connection.execute(
          'INSERT INTO ingredientes (nome, data_fabricacao, data_validade, quantidade, observacao) VALUES (?, ?, ?, ?, ?)',
          [nome, data_fabricacao, data_validade, quantidade, observacao]
        );
        res.writeHead(201);
        res.end(JSON.stringify({ message: 'Ingrediente adicionado com sucesso!' }));
      } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Erro ao adicionar Ingrediente' }));
      }
    });
};

export const getIngredientes = async (req, res, connection) => {
  
  
  try {
    const [ingredientes] = await connection.execute('SELECT * FROM ingredientes');
    res.writeHead(200);
    res.end(JSON.stringify(ingredientes));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Erro ao buscar Ingredientes' }));
  }
};
