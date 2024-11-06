import { connectToDatabase } from '../config/Database';

export const createDatabase = async (req, res, connection) => {
    res.setHeader('Content-Type', 'application/json');
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {   
            
            await createTables(connection);
            await grantPermissions(connection);
            await insertValues(connection);
            await createViews(connection);
            await createTriggers(connection);
            await createEvents(connection);
            await craeteFunctions(connection);
            await createStoredProcedures(connection);
            res.writeHead(201);
            res.end(JSON.stringify({ message: 'Banco de dados e tabelas criados com sucesso!' }));
        } catch (error) {
            console.error("Erro ao configurar o banco de dados:", error);
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Erro ao configurar o banco de dados' }));
        } 
    });
};

export const createTables = async (connection) =>{
    try{
    const sql = `
        CREATE TABLE IF NOT EXISTS cliente(
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(50),
            sexo CHAR,
            idade INT,
            nascimento DATE,
            pontos INT,
            CONSTRAINT CHECK (sexo = 'f' OR sexo = 'm' OR sexo = 'o')
            );
            
            CREATE TABLE IF NOT EXISTS prato(
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(20),
            descricao VARCHAR(50),
            valor INT,
            disponibilidade BOOLEAN
            );
            
            CREATE TABLE IF NOT EXISTS fornecedor(
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(50),
            estado_origem VARCHAR(20),
            CONSTRAINT CHECK (estado_origem = 'Alagoas' OR estado_origem = 'Bahia' OR estado_origem = 'Ceará' OR estado_origem = 'Maranhão' OR estado_origem = 'Paraíba' OR estado_origem = 'Pernambuco' OR estado_origem = 'Piauí' OR estado_origem = 'Rio Grande do Norte' OR estado_origem = 'Sergipe'
            OR estado_origem = 'Acre' OR estado_origem = 'Amapá' OR estado_origem = 'Amazonas' OR estado_origem = 'Pará' OR estado_origem = 'Rondônia' OR estado_origem = 'Roraima' OR estado_origem = 'Tocantins'
            OR estado_origem = 'Espírito Santo' OR estado_origem = 'Minas Gerais' OR estado_origem = 'Rio de Janeiro' OR estado_origem = 'São Paulo'
             OR estado_origem = 'Distrito Federal' OR estado_origem = 'Goiás' OR estado_origem = 'Mato Grosso' OR estado_origem = 'Mato Grosso do Sul')
            );
            
            CREATE TABLE IF NOT EXISTS ingredientes(
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(30),
            data_fabricacao DATE,
            data_validade DATE,
            quantidade INT,
            observacao VARCHAR(50)
            );
            
            CREATE TABLE IF NOT EXISTS usos(
            id_prato INT,
            id_ingrediente INT,
            FOREIGN KEY (id_prato) REFERENCES prato(id),
            FOREIGN KEY (id_ingrediente) REFERENCES ingredientes(id)
            );
            
            CREATE TABLE IF NOT EXISTS venda(
            id INT AUTO_INCREMENT PRIMARY KEY,
            id_cliente INT,
            id_prato INT,
            FOREIGN KEY (id_cliente) REFERENCES cliente(id),
            FOREIGN KEY (id_prato) REFERENCES prato(id),
            quantidade INT,
            dia DATE,
            hora TIME,
            valor REAL
            );
    `;

    await connection.query(sql);
    
    }catch(error){
        console.error("Erro ao criar as tabelas", error);

    }
}

export const grantPermissions = async(connection) => {
    try{
    const sql = 
    `
        GRANT ALL ON *.* TO 'Administrador'@'localhost';
        FLUSH PRIVILEGES;
        
        GRANT SELECT, DELETE, UPDATE ON *.* TO 'Gerente'@'localhost';
        FLUSH PRIVILEGES;
        
        GRANT INSERT ON *.* TO 'Funcionario'@'localhost'; 
        GRANT SELECT ON venda TO 'Funcionario'@'localhost';
        FLUSH PRIVILEGES;
    `;

    await connection.query(sql);

    }catch(error){
        console.error("Erro no grant", error);

    }
}

export const insertValues = async(connection) =>{
    try{
    const sql = 
    `
        INSERT INTO cliente (nome, sexo, idade, nascimento, pontos) VALUES 
            ('Ana Souza', 'f', 28, '1996-02-12', 120),
            ('Bruno Lima', 'm', 35, '1989-08-09', 80),
            ('Carlos Pereira', 'm', 42, '1981-04-15', 200),
            ('Daniela Alves', 'f', 22, '2002-11-01', 50),
            ('Eduardo Costa', 'm', 30, '1993-06-07', 90),
            ('Fernanda Torres', 'f', 29, '1995-05-22', 110),
            ('Gabriel Martins', 'm', 25, '1999-12-19', 70),
            ('Helena Mendes', 'f', 33, '1991-09-14', 130),
            ('Igor Ribeiro', 'm', 40, '1983-07-21', 95),
            ('Juliana Castro', 'f', 26, '1997-03-30', 60);
            
            INSERT INTO prato (nome, descricao, valor, disponibilidade) VALUES
            ('Feijoada', 'Prato típico brasileiro', 45, TRUE),
            ('Lasanha', 'Lasanha à bolonhesa', 40, TRUE),
            ('Sushi', 'Combinado de sushi', 55, FALSE),
            ('Pizza', 'Pizza de calabresa', 35, TRUE),
            ('Salada', 'Salada mista com frango', 25, TRUE),
            ('Tacos', 'Tacos mexicanos', 30, TRUE),
            ('Picanha', 'Picanha grelhada', 60, TRUE),
            ('Risoto', 'Risoto de camarão', 50, FALSE),
            ('Hambúrguer', 'Hambúrguer artesanal', 28, TRUE),
            ('Ceviche', 'Ceviche de peixe branco', 48, TRUE);
            
            INSERT INTO fornecedor (nome, estado_origem) VALUES
            ('Alimentos do Norte', 'Amazonas'),
            ('Frutos do Mar', 'Pará'),
            ('Delícias da Terra', 'Minas Gerais'),
            ('Grãos do Sertão', 'Piauí'),
            ('Sabores do Nordeste', 'Ceará'),
            ('Verduras Frescas', 'São Paulo'),
            ('Cereais e Legumes', 'Goiás'),
            ('Frutas Tropicais', 'Bahia'),
            ('Carnes Premium', 'Mato Grosso'),
            ('Produtos Orgânicos', 'Pernambuco');
            
            INSERT INTO ingredientes (nome, data_fabricacao, data_validade, quantidade, observacao) VALUES
            ('Feijão Preto', '2024-01-10', '2025-01-10', 100, 'Próprio para feijoada'),
            ('Massa de Lasanha', '2024-02-20', '2024-12-20', 50, 'Para lasanha bolonhesa'),
            ('Arroz Japonês', '2024-05-15', '2025-05-15', 70, 'Usado no sushi'),
            ('Queijo Mussarela', '2024-10-01', '2024-11-01', 200, 'Para pizzas e lasanhas'),
            ('Frango Desfiado', '2024-03-10', '2024-09-10', 120, 'Salada e tacos'),
            ('Picanha Bovina', '2024-06-01', '2024-12-01', 90, 'Grelhada para churrasco'),
            ('Camarão', '2024-05-22', '2024-11-22', 60, 'Usado no risoto de camarão'),
            ('Carne Moída', '2024-07-01', '2024-12-01', 150, 'Para hambúrguer artesanal'),
            ('Peixe Branco', '2024-08-10', '2024-11-10', 80, 'Para ceviche'),
            ('Tomate', '2024-09-05', '2024-10-05', 300, 'Saladas e molhos');
            
            INSERT INTO usos (id_prato, id_ingrediente) VALUES
            (1, 1), -- Feijoada usa feijão preto
            (2, 2), -- Lasanha usa massa de lasanha
            (3, 3), -- Sushi usa arroz japonês
            (4, 4), -- Pizza usa queijo mussarela
            (5, 5), -- Salada usa frango desfiado
            (7, 6), -- Picanha usa picanha bovina
            (8, 7), -- Risoto usa camarão
            (9, 8), -- Hambúrguer usa carne moída
            (10, 9), -- Ceviche usa peixe branco
            (4, 10); -- Pizza usa tomate
            
            INSERT INTO venda (id_cliente, id_prato, quantidade, dia, hora, valor) VALUES
            (1, 1, 2, '2024-10-10', '12:30:00', 90),
            (2, 4, 1, '2024-10-11', '13:00:00', 35),
            (3, 5, 1, '2024-10-12', '14:00:00', 25),
            (4, 7, 3, '2024-10-13', '15:30:00', 180),
            (5, 9, 2, '2024-10-14', '16:00:00', 56),
            (6, 2, 1, '2024-10-15', '17:15:00', 40),
            (7, 10, 2, '2024-10-16', '12:45:00', 96),
            (8, 3, 1, '2024-10-17', '18:00:00', 55),
            (9, 6, 2, '2024-10-18', '19:00:00', 60),
            (10, 8, 1, '2024-10-19', '20:30:00', 50);
    `;

    await connection.query(sql);
    
    }catch(error){
        console.error("Erro ao Inserir valores", error);

    }

}

export const createViews = async (connection) =>{
    try{
    const sql = 
    `
            CREATE VIEW arrecadacao_prato_por_mes AS -- mostra a quantidade vendida e a arrecadação de um prato em determinado mês
            SELECT p.nome AS prato, 
                   MONTH(v.dia) AS mes,
                   SUM(v.quantidade) AS quantidade_vendida,
                   SUM(v.valor) AS total_arrecadado
            FROM prato p
            JOIN venda v ON p.id = v.id_prato
            GROUP BY p.nome, MONTH(v.dia);
            
            
            CREATE VIEW ingredientes_vencimento_proximo AS -- informa os ingredientes com validade dentro dos próximos 30 dias ou já expiradas, e em qual prato ocorre seu uso
            SELECT i.nome AS ingrediente,
                   i.data_validade AS validade,
                   SUM(i.quantidade) AS quantidade_disponivel,
                   DATEDIFF(i.data_validade, CURDATE()) AS dias_para_vencimento,
                   p.nome AS prato
            FROM ingredientes i
            JOIN usos u ON i.id = u.id_ingrediente
            JOIN prato p ON u.id_prato = p.id
            WHERE DATEDIFF(i.data_validade, CURDATE()) <= 30
            GROUP BY i.nome, i.data_validade, p.nome
            ORDER BY dias_para_vencimento;
            
            
            CREATE VIEW total_consumo_por_cliente AS -- informa o total de consumo por cliente
            SELECT c.nome AS cliente,
                   COUNT(v.id) AS total_consumo,
                   SUM(v.valor) AS total_gasto
            FROM cliente c
            JOIN venda v ON c.id = v.id_cliente
            GROUP BY c.id, c.nome
            ORDER BY total_gasto DESC;
    `;

    await connection.query(sql);
    
    }catch(error){
        console.error("Erro ao criar as views", error);

    }   
}

export const createTriggers = async (connection) => {

    try{
    const sql = 
    `
        -- Triggers
                
                
        CREATE TRIGGER atualizar_pontos -- atualiza a quantidade de pontos
        AFTER INSERT ON venda
        FOR EACH ROW
        BEGIN
            UPDATE cliente
            SET pontos = pontos + FLOOR(NEW.valor / 10)
            WHERE id = NEW.id_cliente;
        END;




        CREATE TRIGGER trigger_verificar_disponibilidade -- verifica a disponibilidade do prato
        BEFORE INSERT ON venda
        FOR EACH ROW
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM prato WHERE id = NEW.id_prato AND disponibilidade = TRUE) THEN
                SIGNAL SQLSTATE '45000' 
                SET MESSAGE_TEXT = 'Prato indisponível para compra'; 
            END IF;
        END;




        CREATE TRIGGER trigger_reduzir_ingredientes -- reduz a quantidade dos ingredientes
        AFTER INSERT ON venda
        FOR EACH ROW
        BEGIN
            UPDATE ingredientes
            SET quantidade = quantidade - NEW.quantidade
            WHERE id IN (
                SELECT id_ingrediente 
                FROM usos
                WHERE id_prato = NEW.id_prato
            );
        END;


        CREATE TRIGGER trigger_verificar_validade_ingredientes -- validade
        AFTER UPDATE ON ingredientes
        FOR EACH ROW
        BEGIN
            IF NEW.data_validade < CURRENT_DATE THEN
                UPDATE prato
                SET disponibilidade = FALSE
                WHERE id IN (
                    SELECT id_prato
                    FROM usos
                    WHERE id_ingrediente = NEW.id
                );
            END IF;
        END;
    
    `;

    await connection.query(sql);
    
    }catch(error){
        console.error("Erro ao criar os triggers", error);

    }
}


export const createEvents = async(connection) => {
    try{
    const sql = 
    `
        SET GLOBAL event_scheduler = ON;

        CREATE EVENT atualizar_disponibilidade_pratos 
        ON SCHEDULE EVERY 1 MINUTE 
        DO
        BEGIN
            UPDATE prato
            SET disponibilidade = FALSE
            WHERE id IN (
                SELECT id_prato
                FROM usos
                WHERE id_ingrediente IN (
                    SELECT id
                    FROM ingredientes
                    WHERE data_validade < CURRENT_DATE
                )
            );
        END;


        CREATE EVENT atualizar_disponibilidade_pratos_quantidade
        ON SCHEDULE EVERY 1 MINUTE
        DO
        BEGIN
            UPDATE prato
            SET disponibilidade = FALSE
            WHERE id IN (
                SELECT id_prato
                FROM usos
                WHERE id_ingrediente IN (
                    SELECT id
                    FROM ingredientes
                    WHERE quantidade <= 0
                )
            );
        END;
    `;

    await connection.query(sql);

    }catch(error){
        console.error("Erro ao criar os events", error);

    }
}

export const craeteFunctions = async(connection) => {
    try{
    const sql = 
    `
        CREATE FUNCTION calculo(valor_compra DECIMAL(10, 2))
        RETURNS INT
        BEGIN
            DECLARE pontos INT;
            
            SET pontos = FLOOR(valor_compra / 10);
            
            RETURN pontos;
        END
    `;

    await connection.query(sql);

    }catch(error){
        console.error("Erro ao criar os Functions", error);

    }
}


export const createStoredProcedures = async(connection) => {
    try{
    const sql = 
    `
        -- Reajuste: Receba um reajuste em percentual e aumente o valor de todos os pratos. 
        

        CREATE PROCEDURE Reajuste(IN percentual DECIMAL(5, 2))
        BEGIN
            IF percentual > 0 THEN
                UPDATE prato
                SET valor = valor * (1 + (percentual / 100));
            ELSE
                SIGNAL SQLSTATE '45000' 
                SET MESSAGE_TEXT = 'O percentual de reajuste deve ser maior que zero.';
            END IF;
        END;

        -- OBS: Como é descrito que AUMENTE e não ALTERE o valor, subentendesse que o percentual DEVE ser positivo.


        -- Sorteio: Sorteie aleatoriamente um cliente, para que este cliente receba uma premiação de 100 pontos. 
        
        CREATE PROCEDURE Sorteio()
        BEGIN
            DECLARE cliente_id INT;
            DECLARE pontuacao INT;
            
            SELECT id, pontos INTO cliente_id, pontuacao
            FROM cliente
            ORDER BY RAND()
            LIMIT 1;
            
            UPDATE cliente
            SET pontos = pontos + 100
            WHERE id = cliente_id;
            
            SELECT cliente_id AS Cliente_Sorteado, 
                (SELECT nome 
                    FROM cliente 
                    WHERE id = cliente_id) AS Nome_Cliente,
                    pontuacao AS Pontuacao_Anterior,
                    (pontuacao + 100) AS Nova_Pontuacao;
        END;

       

        --  Use todos os pontos do usuário para comprar um prato, cada ponto está na proporção de 1:1 em valor de reais, caso o valor do prato tenha centavos use 
        -- um ponto extra para cobrir estes centavos, e caso a quantidade de pontos for maior do que o valor do prato o cliente devera ficar com a diferença e não ter o saldo zerado.

        CREATE PROCEDURE Gastar_pontos(IN cliente_id INT, prato_id INT)
        BEGIN 
            DECLARE pontuacao_cliente INT;
            DECLARE valor_prato DECIMAL(10,2);
            DECLARE pontos_necessarios INT;
            DECLARE pontos_restantes INT;
            
            SELECT 
                pontos INTO pontuacao_cliente
            FROM cliente
            WHERE id = cliente_id;
            
            SELECT 
                valor INTO valor_prato
            FROM prato
            WHERE id = prato_id;
            
            SET pontos_necessarios = CEIL(valor_prato);
            
            IF pontuacao_cliente >= pontos_necessarios THEN
                SET pontos_restantes = pontuacao_cliente - pontos_necessarios;
                
                UPDATE cliente
                SET pontos = pontos_restantes
                WHERE id = cliente_id;
                
                SELECT 
                        cliente_id AS Cliente_ID,
                        (SELECT nome 
                        FROM cliente 
                        WHERE id = cliente_id) AS Nome_Cliente,
                        valor_prato AS Valor_Prato,
                        pontos_necessarios as Pontos_Necessarios,
                        pontuacao_cliente AS Pontuacao_Cliente,
                        pontos_restantes AS Pontuacao_Restante_Cliente,
                        'O prato foi adquirido com sucesso!' AS Status;
            ELSE 
                SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Pontos insuficientes para realizar a compra.';
            END IF;
        END;


        CREATE PROCEDURE Estatisticas()
        BEGIN
            DECLARE produto_mais_vendido_id INT;
            DECLARE quantidade_produto_mais_vendido INT;
            DECLARE produto_menos_vendido_id INT;
            DECLARE quantidade_produto_menos_vendido INT;
            
            SELECT
                prato.id, SUM(venda.quantidade) INTO produto_mais_vendido_id, quantidade_produto_mais_vendido
            FROM venda
            JOIN prato ON prato.id = venda.id_prato
            GROUP BY prato.id
            ORDER BY SUM(venda.quantidade) DESC
            LIMIT 1;
            
            SELECT
                prato.id, SUM(venda.quantidade) INTO produto_menos_vendido_id, quantidade_produto_menos_vendido
            FROM venda
            JOIN prato ON prato.id = venda.id_prato
            GROUP BY prato.id
            ORDER BY SUM(venda.quantidade) ASC
            LIMIT 1;
                
            SELECT 
                prato.nome AS nome_produto_mais_vendido,
                (prato.valor * quantidade_produto_mais_vendido) AS valor_ganho_produto_mais_vendido
            FROM prato
            WHERE prato.id = produto_mais_vendido_id;
            
            SELECT 
                prato.nome AS nome_produto_menos_vendido,
                (prato.valor * quantidade_produto_menos_vendido) AS valor_ganho_produto_menos_vendido
            FROM prato
            WHERE prato.id = produto_menos_vendido_id;
            
            SELECT 
                YEAR(venda.dia) AS ano_maior_venda__produto_mais_vendido,
                MONTH(venda.dia) AS mes_maior_venda_produto_mais_vendido,
                SUM(venda.quantidade) AS total_vendido
            FROM venda
            JOIN prato ON prato.id = venda.id_prato
            WHERE prato.id = produto_mais_vendido_id
            GROUP BY YEAR(venda.dia), MONTH(venda.dia)
            ORDER BY total_vendido DESC
            LIMIT 1;

            SELECT 
                YEAR(venda.dia) AS ano_menor_venda_produto_mais_vendido,
                MONTH(venda.dia) AS mes_menor_venda_produto_mais_vendido,
                SUM(venda.quantidade) AS total_vendido
            FROM venda
            JOIN prato ON prato.id = venda.id_prato
            WHERE prato.id = produto_mais_vendido_id
            GROUP BY YEAR(venda.dia), MONTH(venda.dia)
            ORDER BY total_vendido ASC
            LIMIT 1;
            
            SELECT 
                YEAR(venda.dia) AS ano_maior_venda_produto_menos_vendido,
                MONTH(venda.dia) AS mes_menor_venda_produto_menos_vendido,
                SUM(venda.quantidade) AS total_vendido
            FROM venda
            JOIN prato ON prato.id = venda.id_prato
            WHERE prato.id = produto_menos_vendido_id
            GROUP BY YEAR(venda.dia), MONTH(venda.dia)
            ORDER BY total_vendido ASC
            LIMIT 1;
            
            SELECT 
                YEAR(venda.dia) AS ano_menor_venda_produto_menos_vendido,
                MONTH(venda.dia) AS mes_maior_venda_produto_menos_vendido,
                SUM(venda.quantidade) AS total_vendido
            FROM venda
            JOIN prato ON prato.id = venda.id_prato
            WHERE prato.id = produto_menos_vendido_id
            GROUP BY YEAR(venda.dia), MONTH(venda.dia)
            ORDER BY total_vendido DESC
            LIMIT 1;
            
            
        END;
        
    `;

    await connection.query(sql);

    }catch(error){
        console.error("Erro ao criar os Stored procedures", error);

    }
}

export const deleteDatabase = async (req, res, connection) => {
    await connection.execute('DROP DATABASE restaurante');
    res.writeHead(200);
    res.end(JSON.stringify('Database deletado'));
};
