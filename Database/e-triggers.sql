CREATE TRIGGER atualizar_pontos -- atualiza a quantidade de pontos
AFTER INSERT ON venda
FOR EACH ROW
BEGIN
    UPDATE cliente
    SET pontos = pontos + FLOOR(NEW.valor / 10)
    WHERE id = NEW.id_cliente;
END


CREATE TRIGGER trigger_verificar_disponibilidade -- verifica a disponibilidade do prato
BEFORE INSERT ON venda
FOR EACH ROW
BEGIN
    IF NOT EXISTS (SELECT 1 FROM prato WHERE id = NEW.id_prato AND disponibilidade = TRUE) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Prato indisponível para compra';
    END IF;
END


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
END


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
END