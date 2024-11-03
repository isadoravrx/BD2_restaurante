import { connectToDatabase } from '../config/Database';

export const getViews = async (req, res, connection) => {
    res.setHeader('Content-Type', 'application/json');
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const { nomeView} = JSON.parse(body);
        try {
            const [result] = await connection.query('SELECT * FROM ??',[nomeView]);
            res.writeHead(200);
            res.end(JSON.stringify(result));
        } catch (error) {
            res.writeHead(500);
            console.log(nomeView);
            res.end(JSON.stringify({ error: 'Erro ao buscar view'}));
        } 
    });
};
