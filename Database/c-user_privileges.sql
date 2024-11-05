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