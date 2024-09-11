---

# Trabalho de Banco de Dados - Sistema de Gerenciamento de RPG

📝 **Descrição**

Este projeto implementa um sistema de gerenciamento de RPG com diversas entidades e funcionalidades que permitem a criação e o controle de personagens, missões, itens, e combates, além de possibilitar a gestão de jogadores e suas sessões de login. O objetivo é criar um banco de dados robusto e funcional que suporte todas as operações necessárias para o jogo.

---

🚀 **Funcionalidades**
- **Gerenciamento de Personagens:** Criação, leitura, atualização e exclusão de personagens, incluindo suas habilidades e itens.
- **Gerenciamento de Missões:** Controle de missões com definição de objetivos, recompensas, e a participação de personagens.
- **Sistema de Combate:** Registro de combates entre personagens e inimigos em diferentes regiões.
- **Gerenciamento de Sessões:** Controle de login dos jogadores com armazenamento seguro de senhas e geração de tokens de sessão.
- **Consultas Relacionais:** Realização de consultas complexas envolvendo múltiplas tabelas.
- **Camada de Persistência:** Implementação de uma camada de persistência que conecta a interface gráfica do jogo ao banco de dados.

---

💻 **Modelo de Entidade Relacionamento**
- O modelo de entidade relacionamento foi desenvolvido utilizando [nome da ferramenta de modelagem].
- Inclui as entidades: `Personagem`, `Classe`, `Habilidades`, `Inimigo`, `Regiao`, `Combate`, `Item`, `NPC`, `Missoes`, `Recompensa`, e `Jogador`.
- As entidades estão devidamente normalizadas para garantir a integridade dos dados e a eficiência nas operações.
  
![MER](docs/MER_da_independencia.png)
---

💾 **Modelo Relacional**
- O modelo relacional foi gerado a partir do MER, mapeando cada entidade para uma tabela no banco de dados.
- As relações entre as tabelas foram definidas com chaves primárias e estrangeiras, assegurando a consistência referencial.

![MR](docs/MR_da_independencia.png)
---

🧠 **Consultas em Álgebra Relacional**
- O projeto inclui cinco consultas em álgebra relacional, cada uma envolvendo pelo menos três tabelas, demonstrando a complexidade e a robustez das interações entre os dados.

```
#pega o nome, a classe e as habilidades de um personagem
(usa as tabelas personagem, classe, personagem_habilidades e habilidades)

SELECT p.Nome AS Personagem, c.Nome AS Classe, h.Nome AS Habilidade
FROM Personagem p
JOIN Classe c ON p.Nome_classe = c.Nome
JOIN Personagem_habilidades ph ON p.id = ph.id_personagem
JOIN Habilidades h ON ph.Nome_habilidade = h.Nome;

==============================================================================

#lista os combates com a hora, regiao, nome dos inimigos e nome dos jogdores
(usa as tabelas combate, inimigo, personagem e região)

SELECT c.Hora, i.Nome AS Inimigo, p.Nome AS Personagem, r.Nome AS Regiao
FROM Combate c
JOIN Inimigo i ON c.id_inimigo = i.id
JOIN Personagem p ON c.id_personagem = p.id
JOIN Regiao r ON c.id_regiao = r.id;

==============================================================================

#lista as missões, com seus ojetivos e items de recompensa
(usa as tabelas missões, recompensa e item)

SELECT m.Nome AS Missao, m.Objetivo, i.Nome AS Item, r.Quantidade
FROM Missoes m
JOIN Recompensa r ON m.Nome = r.Nome_missao
JOIN Item i ON r.Nome_item = i.Nome;

==============================================================================

#lista os personagens com seu inventario e quantidade de items
(usa as tabelas personagem, personagens_itens e Item)

SELECT p.Nome AS Personagem, i.Nome AS Item, pi.Quantidade
FROM Personagem p
JOIN Personagens_itens pi ON p.id = pi.id_personagem
JOIN Item i ON pi.Nome_item = i.Nome;

==============================================================================

#lista as missões, os npcs que fornecem a missão e os personagens que atualmente participam da missão
(Usa a tabela missão, npc, participa_missões e personagem)

SELECT m.Nome AS Missao, npc.Nome AS NPC, p.Nome AS Personagem
FROM Missoes m
JOIN NPC npc ON m.id_fornecedor = npc.id
JOIN Participa_missoes pm ON m.Nome = pm.Nome_missao
JOIN Personagem p ON pm.id_personagem = p.id;
```
---

📝 **Avaliação das Formas Normais**
- As tabelas foram analisadas e normalizadas até a terceira forma normal, assegurando a eliminação de redundâncias e a minimização de anomalias de inserção, atualização, e exclusão.
  
![FN](docs/Formas-normais.png)

---

📜 **Script SQL**
- O script SQL utilizado para gerar o banco de dados é o arquivo "dump.sql" e está disponível no repositório do projeto no GitHub.
- Inclui a criação de todas as tabelas, índices, e a inserção de registros iniciais para teste.

---

📂 **Camada de Persistência**
- O projeto conta com uma camada de persistência que permite a interação entre a interface gráfica do jogo e o banco de dados.
- A arquitetura e o código fonte estão disponíveis no repositório do GitHub, junto com um diagrama que detalha essa camada.
  
  ![DM](docs/diagrama_camada_mapeamento.png)

---

🖥️ **Programa CRUD**
- Foi desenvolvido um programa com operações de CRUD (Create, Read, Update, Delete) para um conjunto de pelo menos três tabelas relacionadas.
- O código fonte do programa está disponível no repositório do GitHub.

---

👁️ **View e Procedure**
- O banco de dados implementa uma `View` (arquivo "view.sql") para simplificar consultas complexas.

```
CREATE VIEW personagens_em_missoes AS
SELECT
	personagem.nome AS nome_personagem,
	personagem.nivel,
	missoes.nome AS nome_missao,
	missoes.descricao
FROM personagem
JOIN participa_missoes ON participa_missoes.id_personagem = personagem.id
JOIN missoes ON participa_missoes.nome_missao = missoes.nome;
```

- Uma `Procedure` foi criada com comandos condicionais para automatizar operações frequentes no banco de dados.

```
CREATE OR REPLACE PROCEDURE checar_participacao_missao(
IN personagem_id INT,
IN missao_nome VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
-- checando existencia do personagem...
IF NOT EXISTS(
SELECT 1 FROM personagem 
WHERE id = personagem_id
) THEN
RAISE EXCEPTION 'Personagem % nao registrado.', personagem_id;
END IF;

-- checando existencia da missao...
IF NOT EXISTS(
SELECT 1 FROM missoes WHERE nome = missao_nome
) THEN
RAISE EXCEPTION 'Missao % nao registrada.', missao_nome;
END IF;

-- checando se o personagem faz missao...
IF NOT EXISTS(
SELECT 1 FROM participa_missoes 
WHERE id_personagem = personagem_id AND nome_missao = missao_nome
) THEN
RAISE EXCEPTION 'Personagem % nao esta na missao %', personagem_id, missao_nome;
END IF;

RAISE NOTICE 'Personagem % esta na missao %', personagem_id, missao_nome;

END 
$$;

CREATE OR REPLACE PROCEDURE completar_missao(
    IN personagem_id INT,
    IN missao_nome VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
recompensa_nome VARCHAR;
recompensa_quantidade INT;
BEGIN
    -- Checa se personagem esta participando da missao.
    CALL checar_participacao_missao(personagem_id, missao_nome);

-- recupera o nome do item que é recompensa da missao
SELECT nome_item INTO recompensa_nome FROM recompensa WHERE nome_missao = missao_nome;
-- recupera a quantidade desse item que a missao da
SELECT quantidade INTO recompensa_quantidade FROM recompensa WHERE nome_missao = missao_nome;

    -- Remove a participacao do personagem da missao
    DELETE FROM Participa_missoes
    WHERE id_personagem = personagem_id AND nome_missao = missao_nome;

    -- Adiciona os itens da missão ao inventário do personagem
    IF EXISTS(
SELECT 1 FROM personagens_itens
WHERE id_personagem = personagem_id AND nome_item = recompensa_nome
) THEN
-- se existe, da um update pra adicionar quantidade
UPDATE personagens_itens
SET quantidade = quantidade + recompensa_quantidade
WHERE id_personagem = personagem_id AND nome_item = recompensa_nome;
ELSE
INSERT INTO personagens_itens(id_personagem, nome_item, quantidade)
VALUES (personagem_id, recompensa_nome, recompensa_quantidade);
END IF;

    RAISE NOTICE 'Missao % completada com sucesso. % itens % foram adicionados no inventario do personagem %.', missao_nome, recompensa_quantidade, recompensa_nome, personagem_id;
END
$$;
```

---

📦 **Inserção de Dados Binários**
- As tabelas REGIAO, JOGADOR, PERSONAGEM, INIMIGO e NPC têm imagens inseridas como dados binários.

---

📖 **Como Executar**
Para executar o projeto, siga as etapas abaixo:

1. Clone o repositório do projeto:
   ```bash
   git clone [(https://github.com/edufrma/trabalho-banco-dados/)]
   ```

2. Execute o script SQL para criar o banco de dados:
   ```bash
      CREATE TABLE Regiao (
         id SERIAL PRIMARY KEY,
         Nome VARCHAR(255),
         Foto BYTEA
      );

      CREATE TABLE Jogador (
         id SERIAL PRIMARY KEY,
         Nome VARCHAR(255),
         Senha VARCHAR(255),
         Foto bytea
      );

      CREATE TABLE Classe (
         Nome VARCHAR(255) PRIMARY KEY,
         Recurso VARCHAR(255)
      );

      CREATE TABLE Habilidades (
         Nome VARCHAR(255) PRIMARY KEY,
         Custo INTEGER,
         Dano INTEGER
      );

      CREATE TABLE Efeitos_habilidades (
         efeito VARCHAR(255) PRIMARY KEY,
         Nome_habilidade VARCHAR(255),
         FOREIGN KEY (Nome_habilidade) REFERENCES Habilidades(Nome)
      );

      CREATE TABLE Personagem (
         id SERIAL PRIMARY KEY,
         Nome VARCHAR(255),
         Nivel INTEGER,
         Controlador INTEGER,
         Nome_classe VARCHAR(255),
         Foto BYTEA,
         FOREIGN KEY (Nome_classe) REFERENCES Classe(Nome),
         FOREIGN KEY (Controlador) REFERENCES Jogador(Id)
      );

      CREATE TABLE Personagem_habilidades (
         id_personagem INTEGER,
         Nome_habilidade VARCHAR(255),
         PRIMARY KEY (id_personagem, Nome_habilidade),
         FOREIGN KEY (id_personagem) REFERENCES Personagem(id),
         FOREIGN KEY (Nome_habilidade) REFERENCES Habilidades(Nome)
      );

      CREATE TABLE Inimigo (
         id SERIAL PRIMARY KEY,
         Nome VARCHAR(255),
         Nivel INTEGER,
         Foto BYTEA
      );

      CREATE TABLE Inimigo_habilidades (
         id_inimigo INTEGER,
         Nome_habilidade VARCHAR(255),
         PRIMARY KEY (id_inimigo, Nome_habilidade),
         FOREIGN KEY (id_inimigo) REFERENCES Inimigo(id),
         FOREIGN KEY (Nome_habilidade) REFERENCES Habilidades(Nome)
      );

      CREATE TABLE Combate (
         Hora TIMESTAMP,
         id_regiao INTEGER,
         id_inimigo INTEGER,
         id_personagem INTEGER,
         PRIMARY KEY (Hora, id_regiao, id_inimigo, id_personagem),
         FOREIGN KEY (id_regiao) REFERENCES Regiao(id),
         FOREIGN KEY (id_inimigo) REFERENCES Inimigo(id),
         FOREIGN KEY (id_personagem) REFERENCES Personagem(id)
      );

      CREATE TABLE NPC (
         id SERIAL PRIMARY KEY,
         Nome VARCHAR(255),
         Tipo VARCHAR(255),
         Foto BYTEA
      );

      CREATE TABLE Item (
         Nome VARCHAR(255) PRIMARY KEY,
         Preço DECIMAL
      );

      CREATE TABLE Efeitos_itens (
         efeito VARCHAR(255),
         Nome_item VARCHAR(255),
         PRIMARY KEY (efeito, Nome_item),
         FOREIGN KEY (Nome_item) REFERENCES Item(Nome)
      );

      CREATE TABLE Arma (
         Nome VARCHAR(255) PRIMARY KEY,
         Ataque INTEGER,
         Tipo VARCHAR(255),
         FOREIGN KEY (Nome) REFERENCES Item(Nome)
      );

      CREATE TABLE Armadura (
         Nome VARCHAR(255) PRIMARY KEY,
         Defesa INTEGER,
         Tipo VARCHAR(255),
         FOREIGN KEY (Nome) REFERENCES Item(Nome)
      );

      CREATE TABLE Personagens_itens (
         id_personagem INTEGER,
         Nome_item VARCHAR(255),
         Quantidade INTEGER,
         PRIMARY KEY (id_personagem, Nome_item),
         FOREIGN KEY (id_personagem) REFERENCES Personagem(id),
         FOREIGN KEY (Nome_item) REFERENCES Item(Nome)
      );

      CREATE TABLE Missoes (
         Nome VARCHAR(255) PRIMARY KEY,
         Objetivo VARCHAR(255),
         Descricao TEXT,
         id_fornecedor INTEGER,
         FOREIGN KEY (id_fornecedor) REFERENCES NPC(id)
      );

      CREATE TABLE Participa_missoes (
         id_personagem INTEGER,
         Nome_missao VARCHAR(255),
         PRIMARY KEY (id_personagem, Nome_missao),
         FOREIGN KEY (id_personagem) REFERENCES Personagem(id),
         FOREIGN KEY (Nome_missao) REFERENCES Missoes(Nome)
      );

      CREATE TABLE Recompensa (
         Nome_missao VARCHAR(255),
         Nome_item VARCHAR(255),
         Quantidade INTEGER,
         PRIMARY KEY (Nome_missao, Nome_item),
         FOREIGN KEY (Nome_missao) REFERENCES Missoes(Nome),
         FOREIGN KEY (Nome_item) REFERENCES Item(Nome)
      );

      CREATE TABLE Sessao (
         id SERIAL PRIMARY KEY,
         id_jogador INTEGER,
         token VARCHAR(255),
         expiration TIMESTAMP NOT NULL,
         FOREIGN KEY (id_jogador) REFERENCES Jogador(id)
      );
   ```
3. Execute o seed para popular o banco de dados:
   ```bash
   node seed.js

4. Compile e execute o programa:
   ```bash
    npm run dev

5. Acesse o programa e explore as funcionalidades de gerenciamento de RPG!

---
