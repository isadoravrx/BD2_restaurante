# Projeto Banco de Dados II

Equipe:
> Isadora Xavier<br/>
> José Almir<br/>
> Marcelo Henrique<br/>
> Maria Eduarda Santana<br/><br/>

- [CRUD](/CRUD)<br/><br/>
  O sistema deve conter a opção de criar e de destruir completamente o banco de dados;<br/>
  O sistema deve possuir a opção de cadastrar cada um dos itens.<br/>

- INICIALIZAÇÃO DO BANCO DE DADOS RESTAURANTE
  - [Criação do banco de dados e das tabelas;](/Database/a-tables.sql)<br/>
  - [O sistema deve possuir 10 elementos já cadastrados de cada tabela.](/Database/b-inserts.sql)

- [USUÁRIOS E CONSTRAINTS](/Database/c-user_privileges.sql)<br/><br/>
  Administrador – Com todas as permissões possíveis;<br/>
  Gerente – Com permissões de busca, de apagar e de edição dos registros feitos;<br/>
  Funcionário - Com permissão de adição de novos registros feitos e consultar os<br/>
registros de venda.

- [VIEWS](/Database/d-views.sql)<br/><br/>
  Implementação de 3 views diferentes utilizando JOINs e GROUP BY a cargo do grupo:<br/>
    - Tabela que exibe a quantidade vendida e a arrecadação de um prato em determinado mês<br/>
    - Tabela que informa os ingredientes com validade dentro dos próximos 30 dias ou já expiradas, e em qual prato ocorre seu uso<br/>
    - Tabela que informa o total de consumo por cliente<br/>

- [TRIGGERS](/Database/e-triggers.sql)<br/><br/>
  O cliente ganha 1 ponto para cada 10 reais gastos, implemente o trigger que 
automatiza este calculo;<br/>
  Quando um ingrediente vence a validade torne o prato que tem o ingrediente 
vencido indisponível;<br/>
  Se o cliente está tentando comprar um prato que está indisponível, não realize a 
compra;<br/>
  Venda – Sempre que uma venda for feita reduza em 1 a quantidade do produto na 
base de dados.<br/>

- [STORED PROCEDURES](Database/g-stored_procedures.sql)<br/><br/>
   Reajuste - Receba um reajuste em percentual e aumente o valor de todos os pratos.<br/>
   Sorteio – Sorteie aleatoriamente um cliente para que este cliente receba uma<br/>
premiação de 100 pontos.<br/> 
   Estatísticas - Vá na tabela de vendas e exiba as seguintes estatísticas:<br/>
  -  Produto mais vendido<br/> 
  - Vendedor associado ao produto mais vendido<br/> 
  - Produto menos vendido<br/> 
  - Valor ganho com o produto mais vendido<br/> 
  - Mês de maior vendas e mês de menor vendas do produto mais vendido<br/> 
  - Valor ganho com o produto menos vendido<br/> 
  - Mês de maior vendas e mês de menor vendas do produto menos vendido<br/> 

  Gastar_ponto - Use todos os pontos do usuário para comprar um prato, cada ponto<br/> 
está na proporção de 1:1 em valor de reais, caso o valor do prato tenha centavos use<br/> 
um ponto extra para cobrir estes centavos, e caso a quantidade de pontos for maior<br/> 
do que o valor do prato o cliente devera ficar com a diferença e não ter o saldo<br/> 
zerado.<br/><br/>
