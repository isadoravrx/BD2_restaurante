CREATE DATABASE restaurante;
USE restaurante;

CREATE TABLE IF NOT EXISTS cliente(
id_cliente INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50),
sexo CHAR,
idade INT,
nascimento DATE,
pontos INT
);

CREATE TABLE IF NOT EXISTS prato(
id_prato INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(20),
descricao VARCHAR(50),
valor INT,
disponibilidade BOOLEAN
);

CREATE TABLE IF NOT EXISTS fornecedor(
id_fornecedor INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50),
estado_origem VARCHAR(20)
);
