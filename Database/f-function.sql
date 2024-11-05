CREATE EVENT atualizar_disponibilidade_pratos
ON SCHEDULE EVERY 1 DAY
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

-- function
CREATE FUNCTION calculo(valor_compra DECIMAL(10, 2))
RETURNS INT
BEGIN
    DECLARE pontos INT;

    SET pontos = FLOOR(valor_compra / 10);

    RETURN pontos;
END