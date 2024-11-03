import { connectToDatabase } from '../config/Database';

export const getStoredProcedures = async (req, res, connection) => {
    res.setHeader('Content-Type', 'application/json');
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const { nomeProcedure, param} = JSON.parse(body);
        try {
            const queryParam = param.map(() => '?').join(', '); 

            const query = `CALL ${nomeProcedure}(${queryParam})`;

            const [result] = await connection.query(query,param);
            res.writeHead(200);
            res.end(JSON.stringify(result));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Erro ao buscar Procedures'}));
        } 
    });
};
