CREATE DATABASE restaurante;
USE restaurante;

CREATE TABLE IF NOT EXISTS cliente(
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50),
sexo CHAR,
idade INT,
nascimento DATE,
pontos INT,
CONSTRAINT CHECK (sexo = 'f' OR sexo = 'm' OR sexo = 'o')
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
estado_origem VARCHAR(20),
CONSTRAINT CHECK (estado_origem = 'Alagoas' OR estado_origem = 'Bahia' OR estado_origem = 'Ceará' OR estado_origem = 'Maranhão' OR estado_origem = 'Paraíba' OR estado_origem = 'Pernambuco' OR estado_origem = 'Piauí' OR estado_origem = 'Rio Grande do Norte' OR estado_origem = 'Sergipe'
OR estado_origem = 'Acre' OR estado_origem = 'Amapá' OR estado_origem = 'Amazonas' OR estado_origem = 'Pará' OR estado_origem = 'Rondônia' OR estado_origem = 'Roraima' OR estado_origem = 'Tocantins'
OR estado_origem = 'Espírito Santo' OR estado_origem = 'Minas Gerais' OR estado_origem = 'Rio de Janeiro' OR estado_origem = 'São Paulo'
 OR estado_origem = 'Distrito Federal' OR estado_origem = 'Goiás' OR estado_origem = 'Mato Grosso' OR estado_origem = 'Mato Grosso do Sul')
);

CREATE TABLE IF NOT EXISTS ingredientes(
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(30),
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