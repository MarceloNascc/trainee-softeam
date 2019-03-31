# trainee-softeam

Este repositório faz parte do processo de treinamento (trainee 2019) do backend da softeam.

### Estrutura de Pastas
```

├── node_modules            # Onde as dependências estão instaladas
├── controllers             # Onde o controle da aplicação fica, no nosso caso as operações de criar, remover, atualizar e buscar (Crud)           
├── test                    # teste da nossa aplicação
├── models                  # Modelos do banco de dados
├── router                  # Rotas da aplição 
├── index.js                # Ponto de entrada da api
├── package.json
└── README.md

```

### Instalação

O mini projeto requer os seguintes recursos instalados:

[Node.js]

[MongoDB]

Além disso as seguintes ferramentas foram usadas: 

[Postman] 

[VSCode]

[Swagger]

Instale as dependências e execute o aplicativo da seguinte maneira:

```sh
$ git clone https://github.com/MarceloNascc/trainee-softeam
$ cd trainee-softeam
$ npm install
$ npm start
```

### Scripts Disponíveis

No diretório do mini projeto, você pode executar:

#### `npm start`

Executa a api no modo de desenvolvimento.<br>
abra [http://localhost:8000](http://localhost:8000) para testar no Postman ou aplicativo de sua escolha.

O aplicativo é atualizado automaticamente se você fizer edições.<br>
Você irá ver os erros no console da aplicação.

#### Mocha

Para executar os testes é preciso fazer a instalção global do [mocha]. Para isso basta rodar os seguintes comandos, no diretório do mini projeto:

```sh
$ npm install -g mocha
$ mocha
```

[node.js]: <http://nodejs.org>  
[NPM]: <https://www.npmjs.com/>
[mocha]: <https://mochajs.org/>
[MongoDB]: <https://www.mongodb.com/>
[Postman]: <https://www.getpostman.com/>
[VSCode]: <https://code.visualstudio.com/>
[Swagger]: <https://swagger.io>