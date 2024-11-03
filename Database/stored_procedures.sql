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
