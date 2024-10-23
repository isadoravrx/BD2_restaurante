import { connectToDatabase } from '../config/Database';

export const createUsos = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    const connection = await connectToDatabase();
    const { id_prato, id_ingrediente } = JSON.parse(body);

    try { 
      await connection.execute(
        'INSERT INTO usos (id_prato, id_ingrediente ) VALUES (?, ?)',
        [id_prato, id_ingrediente ]
      );
      res.writeHead(201);
      res.end(JSON.stringify({ message: 'Usos adicionado com sucesso!' }));
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Erro ao adicionar Usos' }));
    } finally {
      await connection.end();
    }
};

export const getUsos = async (req, res) => {
  const connection = await connectToDatabase();
  
  try {
    const [usos] = await connection.execute('SELECT * FROM usos');
    res.writeHead(200);
    res.end(JSON.stringify(usos));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Erro ao buscar Usos' }));
  } finally {
    await connection.end();
  }
};
