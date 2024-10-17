CREATE DATABASE restaurante;
USE restaurante;

CREATE TABLE IF NOT EXISTS cliente(
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50),
sexo CHAR,
idade INT,
nascimento DATE,
pontos INT
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
estado_origem VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS ingredientes(
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50),
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



