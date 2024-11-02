-- Reajuste - Receba um reajuste em percentual e aumente o valor de todos os pratos. 
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




