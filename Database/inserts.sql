

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