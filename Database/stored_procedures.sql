-- Reajuste: Receba um reajuste em percentual e aumente o valor de todos os pratos. 
DELIMITER //

CREATE PROCEDURE Reajuste(IN percentual DECIMAL(5, 2))
BEGIN
    IF percentual > 0 THEN
        UPDATE prato
        SET valor = valor * (1 + (percentual / 100));
    ELSE
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'O percentual de reajuste deve ser maior que zero.';
    END IF;
END//

DELIMITER ;
-- OBS: Como é descrito que AUMENTE e não ALTERE o valor, subentendesse que o percentual DEVE ser positivo.


--Sorteio: Sorteie aleatoriamente um cliente, para que este cliente receba uma premiação de 100 pontos. 
DELIMITER //
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
END//

DELIMITER ;

--  Use todos os pontos do usuário para comprar um prato, cada ponto está na proporção de 1:1 em valor de reais, caso o valor do prato tenha centavos use 
--um ponto extra para cobrir estes centavos, e caso a quantidade de pontos for maior do que o valor do prato o cliente devera ficar com a diferença e não ter o saldo zerado.

DELIMITER //
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
END//
DELIMITER ;

DELIMITER //
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
	FROM venda
    JOIN prato ON prato.id = venda.id_prato
    WHERE id_prato = produto_mais_vendido_id;
    
	SELECT 
		prato.nome AS nome_produto_menos_vendido,
		(prato.valor * quantidade_produto_menos_vendido) AS valor_ganho_produto_menos_vendido
	FROM venda
    JOIN prato ON prato.id = venda.id_prato
    WHERE id_prato = produto_menos_vendido_id;
     
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
		MONTH(venda.dia) AS mes_menor_venda_produto_menos_vendido,
		SUM(venda.quantidade) AS total_vendido
	FROM venda
	JOIN prato ON prato.id = venda.id_prato
    WHERE prato.id = produto_menos_vendido_id
	GROUP BY YEAR(venda.dia), MONTH(venda.dia)
	ORDER BY total_vendido ASC
	LIMIT 1;
    
    
END//

DELIMITER ;