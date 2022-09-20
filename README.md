<h1 align="center">Recommendation API Test</h1>

<h1 align="center">
    <a href="https://nodejs.org/en/">🔗 Node.js</a>
</h1>
 <p align="center">🚀Pequena API de recomendação de amigos atraves do CPFs</p>

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Docker](https://docs.docker.com/engine/install/), [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End Docker (servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/Jeh212/friend-recommendation.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd friend-recommendation

# Vá para a pasta server
$ docker-compose up

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>

    # http://localhost:3000/person
    # http://localhost:3000/person/:CPF
    # http://localhost:3000/relationship
    # http://localhost:3000/recommendations/89230878154
    # http://localhost:3000/clean
```

# Para testar na AWS usar o seguinte IP para acesso direto a aplicação:

    http://18.231.163.196:3000/person
    http://18.231.163.196:3000/person/:CPF
    http://18.231.163.196/relationship
    http://18.231.163.196/recommendations/89230878154
    http://18.231.163.196/clean
