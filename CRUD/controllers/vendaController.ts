import { connectToDatabase } from '../config/Database';

export const createVenda = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    const connection = await connectToDatabase();
    const { id_cliente, id_prato, quantidade, dia, hora, valor} = JSON.parse(body);

    try { 
      await connection.execute(
        'INSERT INTO venda (id_cliente, id_prato, quantidade, dia, hora, valor) VALUES (?, ?, ?, ?, ?, ?)',
        [ id_cliente, id_prato, quantidade, dia, hora, valor]
      );
      res.writeHead(201);
      res.end(JSON.stringify({ message: 'Venda adicionado com sucesso!' }));
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Erro ao adicionar Venda' }));
    } finally {
      await connection.end();
    }
};

export const getVenda = async (req, res) => {
  const connection = await connectToDatabase();
  
  try {
    const [vendas] = await connection.execute('SELECT * FROM venda');
    res.writeHead(200);
    res.end(JSON.stringify(vendas));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Erro ao buscar Vendas' }));
  } finally {
    await connection.end();
  }
};
