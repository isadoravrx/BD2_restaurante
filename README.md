# Projeto Banco de Dados II

Equipe:
> Isadora Xavier<br/>
> José Almir<br/>
> Marcelo Henrique<br/>
> Maria Eduarda Santana<br/><br/>

1. [CRUD](/CRUD) - TypeScript e SQL<br/><br/>
  O sistema pode criar e de destruir completamente o banco de dados;<br/>
  O sistema possui a opção de cadastrar cada um dos itens.<br/><br/>

2. INICIALIZAÇÃO DO BANCO DE DADOS RESTAURANTE<br/>
  - [Criação do banco de dados, das tabelas e dos constraints;](/Database/a-tables.sql)<br/>
    - cliente(id, nome, sexo, idade, nascimento, pontos) 
    - prato(id, nome, descricao, valor, disponibilidade) 
    - fornecedor(id, nome, estado_origem) 
    - ingredientes(id, nome, data_fabricacao, data_validade, quantidade, observacao) 
    - usos(id_prato(FK), id_ingrediente(FK)) 
    - venda(id, id_cliente(FK), id_prato(FK), quantidade, dia, hora, valor)<br/><br/>
    -  Sexo deve ser ‘m’ ou ‘f’ ou ‘o’ 
    -  Cidade_origem deve ser um dos estados brasileiros 
    -  Disponibilidade deve ser um booleano, true ele está disponível, false ele está indispinível<br/>
  - [O sistema contém 10 elementos já cadastrados em cada tabela.](/Database/b-inserts.sql)<br/><br/>

3. [USUÁRIOS E PRIVILÉGIOS](/Database/c-user_privileges.sql)<br/><br/>
  - Administrador (possui todas as permissões possíveis);<br/>
  - Gerente (possui permissões de busca, de apagar e de edição dos registros feitos);<br/>
  - Funcionário (possui permissão de adição de novos registros feitos e consultar os<br/>
registros de venda).<br/><br/>

4. [VIEWS](/Database/d-views.sql)<br/><br/>
  Implementação de 3 views diferentes utilizando JOINs e GROUP BY a cargo do grupo:<br/>
    - Tabela que exibe a quantidade vendida e a arrecadação de um prato em determinado mês<br/>
    - Tabela que informa os ingredientes com validade dentro dos próximos 30 dias ou já expiradas, e em qual prato ocorre seu uso<br/>
    - Tabela que informa o total de consumo por cliente<br/><br/>

5. [TRIGGERS](/Database/e-triggers.sql)<br/><br/>
  - O cliente ganha 1 ponto para cada 10 reais gastos, implemente o trigger que 
automatiza este calculo;<br/>
  - Quando um ingrediente vence a validade torne o prato que tem o ingrediente 
vencido indisponível;<br/>
  - Se o cliente está tentando comprar um prato que está indisponível, não realize a 
compra;<br/>
  - Venda – Sempre que uma venda for feita reduza em 1 a quantidade do produto na 
base de dados.<br/><br/>

6. [STORED PROCEDURES](Database/g-stored_procedures.sql)<br/><br/>
   Reajuste - Recebe um reajuste em percentual e aumenta o valor de todos os pratos.<br/>
   Sorteio – Sorteia aleatoriamente um cliente para que este cliente receba uma<br/>
premiação de 100 pontos.<br/> 
   Estatísticas - na tabela de vendas e exibe as seguintes estatísticas:<br/>
      - Produto mais vendido<br/> 
      - Vendedor associado ao produto mais vendido<br/> 
      - Produto menos vendido<br/> 
      - Valor ganho com o produto mais vendido<br/> 
      - Mês de maior vendas e mês de menor vendas do produto mais vendido<br/> 
      - Valor ganho com o produto menos vendido<br/> 
      - Mês de maior vendas e mês de menor vendas do produto menos vendido<br/> 

    Gastar_ponto - Usa todos os pontos do usuário para comprar um prato, cada ponto<br/> 
está na proporção de 1:1 em valor de reais, caso o valor do prato tenha centavos use<br/> 
um ponto extra para cobrir estes centavos, e caso a quantidade de pontos for maior<br/> 
do que o valor do prato o cliente devera ficar com a diferença e não ter o saldo<br/> 
zerado.<br/><br/>

7. [FUNÇÃO](Database/f-function.sql)<br/><br/> 
  Cálculo: Recebe um valor representando a compra e retorna a quantidade de pontos<br/> 
referente à compra, 1 ponto para cada 10 reais gastos, valores que não completam<br/> 
os 10 reais NÃO geram ponto; 
