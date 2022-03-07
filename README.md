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
