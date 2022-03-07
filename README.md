# API de Games

## Endpoints

### GET /games

Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados.

#### Parametros

Nenhum

#### Respostas

##### OK! 200

Caso essa resposta aconteça , você receberá a listagem de todos os games.
Exemplo de resposta:

```
[
        {
            id:23,
            title: "Call of duty MW",
            year: 2019,
            price: 299
        },
        {
            id:65,
            title: "Sea of thieves",
            year: 2018,
            price: 179
        },
        {
            id:2,
            title: "Minecraft",
            year: 2008,
            price: 79
        }

    ]
```

##### Falha na autenticação! 401

Caso essa resposta aconteça, isso siginifica que aconteceu alguma falha durante o processo da requisição. Motivos: Token inválido, Token expirado.

Exemplo de resposta:

```
{
    "err": "token Inválido"
}

```

### POST /auth

Esse endpoint é responsável por fazer o processo de login.

#### Parametros

email: E-mail do usuário cadastrado no sistema.

password: Senha do usuário cadastrado no sistema, com aquele determinado email.

Exemplo:

```
{
    "email":"teste@gmail.com",
    "password":"123456"
}
```

#### Respostas

##### OK! 200

Caso essa resposta aconteça , você receberá o token JWT para conseguir acessar os endpoints protegidos na API.
Exemplo de resposta:

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0ZUBnbWFpbC5jb20iLCJpYXQiOjE2NDY2NTcyODIsImV4cCI6MTY0NjgzMDA4Mn0.-wUtRq2is9NnZ-QPOHjl1vjgsZNVIu_y5yZO1GUmZ60"
}
```

##### Falha na autenticação! 401

Caso essa resposta aconteça, isso siginifica que aconteceu alguma falha durante o processo da requisição. Motivos: Senha ou email incorretos.

Exemplo de resposta:

```
{err: "Credenciais inválidas!"}

```
