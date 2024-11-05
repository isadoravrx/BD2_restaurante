

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
