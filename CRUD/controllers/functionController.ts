import { connectToDatabase } from '../config/Database';

export const getFunctions = async (req, res, connection) => {
    res.setHeader('Content-Type', 'application/json');
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const { nomeFuncao, param} = JSON.parse(body);
        try {
            const queryParam = param.map(() => '?').join(', '); 

            const query = `SELECT ${nomeFuncao}(${queryParam})`;

            const [result] = await connection.query(query, param);
            res.writeHead(200);
            res.end(JSON.stringify(result));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Erro ao buscar Function'}));
        } 
    });
};
