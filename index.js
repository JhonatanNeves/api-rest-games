const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const JWTSecreat = "6sad5das5dsa54sads65dg98adn";

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function auth (req, res, next){
    const authToken = req.headers['authorization'];
    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];
        jwt.verify(token,JWTSecret,(err, data) => {
            if(err){
                res.status(401);
                res.json({err:"token Inválido"});
                
            }else{
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                next();
            }
        })
    }else{
        res.status(401);
        res.json({err: "Token Invalido!"});
    }
    
}

var DB = {
    games: [
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
        
    ],
    users: [
        {
            id: 1,
            name: "Jhonatan Neves",
            email: "teste@gmail.com",
            password: "123456"
        },
        {
            id: 2,
            name: "Alessandra Neves",
            email: "teste1@gmail.com",
            password: "123456789"
        }
    ]
}

app.get("/games", (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

app.get("/game/:id" ,auth, (req, res) =>{
    if(isNaN(req.params.id)) {
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if(game != undefined){
            res.statusCode = 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }
});

app.post("/game",(req,res) =>{
    var {title, price, year} = req.body;

    DB.games.push({
        id:200,
        title,
        price,
        year
    });

    res.sendStatus(200);
})

app.delete("/game/:id", auth,(req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);

        if(index == -1){
            res.sendStatus(404);
        }else {
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }
    }
});

app.put("/game/:id",auth,(req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if(game != undefined){
            
            var {title, price, year} = req.body;

            if(title != undefined){
                game.title = title;
            }
            if(price != undefined){
                game.price = price;
            }
            if(year != undefined){
                game.year = year;
            }
            
            res.sendStatus(200);

        }else{
            res.sendStatus(404);
        }
    }
})

app.post("/auth",(req, res) => {
    var {email,password} = req.body;

    if(email != undefined){
        
        var user =DB.users.find(u => u.email == email);
        
        if(user != undefined){
            if(user.password == password){

                jwt.sign({id: user.id, email:user.email},JWTSecreat,{expiresIn:'48h'},(err, token) => {
                    if(err){
                        res.status(400);
                        res.json({err:"Falha interna"});
                    }else{
                        res.status(200);
                        res.json({token: token});
                    }
                })
            }else{
                res.status(401);
                res.json({err: "Credenciais inválidas!"});
            }

        }else {
            res.status(404);
            res.json({err: "Email não existe!"});
        }

    }else{
        res.status(400);
        res.json({err: "Email invalido!"});
    }
})

app.listen(3000,() => {
    console.log("API RODANDO!");
});