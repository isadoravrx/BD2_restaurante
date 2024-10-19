import http from 'http';
import mysql from 'mysql2/promise';

const mysqlConfig = {
  host: 'localhost',
  user: 'Administrador',
  password: 'adm7263',
  database: 'restaurante',
};

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString(); 
  });

  const connection = await mysql.createConnection(mysqlConfig);


  if (req.method === 'POST' && req.url === '/cliente') {
    

    req.on('end', async () => {
      const { nome, sexo, idade, nascimento, pontos } = JSON.parse(body);
      try {
        
        await connection.execute(
          'INSERT INTO cliente (nome, sexo, idade, nascimento, pontos) VALUES (?, ?, ?, ?, ?)',
          [nome, sexo, idade, nascimento, pontos]
        );
        await connection.end();
        res.writeHead(201);
        
      } catch (error) {
        console.error("Erro ao adicionar cliente:", error);
      }
    });
  }

  else if (req.method === 'POST' && req.url === '/prato') {

    req.on('end', async () => {
      const { nome, descricao, valor, disponibilidade } = JSON.parse(body);
      try {
          
        await connection.execute(
          'INSERT INTO prato (nome, descricao, valor, disponibilidade) VALUES (?, ?, ?, ?)',
          [nome, descricao, valor, disponibilidade]
        );
        res.writeHead(201);
      } catch (error) {
        console.error("Erro ao adicionar prato:", error);
      }
    });
  }

  else if (req.method === 'POST' && req.url === '/fornecedor') {

    req.on('end', async () => {
      const { nome, estado_origem } = JSON.parse(body);
      try {
        
        await connection.execute(
          'INSERT INTO fornecedor (nome, estado_origem) VALUES (?, ?)',
          [nome, estado_origem]
        );
        res.writeHead(201);
      } catch (error) {
        console.error("Erro ao adicionar fornecedor:", error);
      }
    });
  }

  else if (req.method === 'POST' && req.url === '/ingredientes') {

    req.on('end', async () => {
      const { nome, data_fabricacao, data_validade, quantidade, observacao } = JSON.parse(body);
      try {
        
        await connection.execute(
          'INSERT INTO ingredientes (nome, data_fabricacao, data_validade, quantidade, observacao) VALUES (?, ?, ?, ?, ?)',
          [nome, data_fabricacao, data_validade, quantidade, observacao]
        );
        res.writeHead(201);
      } catch (error) {
        console.error("Erro ao adicionar ingrediente:", error);
      }
    });
  }else if (req.method === 'GET' && req.url === '/cliente') {
    const [clientes] = await connection.execute('SELECT * FROM cliente');
    res.writeHead(200);
    res.end(JSON.stringify(clientes));
  }
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Rota não encontrada' }));
  }
});

// Iniciando o servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
