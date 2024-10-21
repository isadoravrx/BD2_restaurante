CREATE DATABASE restaurante;
USE restaurante;

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

CREATE USER 'Administrador'@'localhost' IDENTIFIED BY 'adm7263';
CREATE USER 'Gerente'@'localhost' IDENTIFIED BY 'g@452';
CREATE USER 'Funcionario'@'localhost' IDENTIFIED BY 'Func_1267';

GRANT ALL ON *.* TO 'Administrador'@'localhost';
FLUSH PRIVILEGES;

GRANT SELECT, DELETE, UPDATE ON *.* TO 'Gerente'@'localhost';
FLUSH PRIVILEGES;

GRANT INSERT ON *.* TO 'Funcionario'@'localhost'; 
GRANT SELECT ON venda TO 'Funcionario'@'localhost';
FLUSH PRIVILEGES;

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

CREATE VIEW arrecadacao_prato_por_mes AS -- mostra a quantidade vendida e a arrecadação de um prato em determinado mês
SELECT p.nome AS prato, 
       MONTH(v.dia) AS mes,
       SUM(v.quantidade) AS quantidade_vendida,
       SUM(v.valor) AS total_arrecadado
FROM prato p
JOIN venda v ON p.id = v.id_prato
GROUP BY p.nome, MONTH(v.dia);

SELECT * FROM arrecadacao_prato_por_mes;

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

SELECT * FROM ingredientes_vencimento_proximo;


CREATE VIEW total_consumo_por_cliente AS -- informa o total de consumo por cliente
SELECT c.nome AS cliente,
       COUNT(v.id) AS total_consumo,
       SUM(v.valor) AS total_gasto
FROM cliente c
JOIN venda v ON c.id = v.id_cliente
GROUP BY c.id, c.nome
ORDER BY total_gasto DESC;

SELECT * FROM total_vendas_por_cliente;

-- Triggers

DELIMITER $$

CREATE TRIGGER atualizar_pontos -- atualiza a quantidade de pontos
AFTER INSERT ON venda
FOR EACH ROW
BEGIN
    UPDATE cliente
    SET pontos = pontos + FLOOR(NEW.valor / 10)
    WHERE id = NEW.id_cliente;
END$$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER trigger_verificar_disponibilidade -- verifica a disponibilidade do prato
BEFORE INSERT ON venda
FOR EACH ROW
BEGIN
    IF NOT EXISTS (SELECT 1 FROM prato WHERE id = NEW.id_prato AND disponibilidade = TRUE) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Prato indisponível para compra'; 
    END IF;
END$$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER trigger_reduzir_ingredientes -- reduz a quantidade dos ingredientes
AFTER INSERT ON venda
FOR EACH ROW
BEGIN
    UPDATE ingredientes
    SET quantidade = quantidade - 1
    WHERE id IN (
        SELECT id_ingrediente 
        FROM usos
        WHERE id_prato = NEW.id_prato
    );
END$$

DELIMITER ;
