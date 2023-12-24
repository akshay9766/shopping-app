var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");

var connectionString = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.get("/products", (req, res) => {
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("Shopping");
        database.collection("products").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
});

app.get("/category/:catname", (req, res) => {
    var cat = req.params.catname;
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("Shopping");
        database.collection("products").find({ category: cat }).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
});

app.get("/banner1/:catname", (req, res) => {
    var cat = req.params.catname;
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("Shopping");
        database.collection("banner1").find({ category: cat }).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
});

app.get("/banner2/:catname", (req, res) => {
    var cat = req.params.catname;
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("Shopping");
        database.collection("banner2").find({ category: cat }).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
});

app.get("/poster/:catname", (req, res) => {
    var cat = req.params.catname;
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("Shopping");
        database.collection("poster").find({ category: cat }).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
});

app.get("/details/:id", (req, res) => {
    var id = parseInt(req.params.id);
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("Shopping");
        database.collection("products").find({ productId: id }).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
});

app.get("/users", (request, response) => {
    mongoClient.connect(connectionString).then((clientObject) => {
        var database = clientObject.db("Shopping");
        database.collection("users").find({}).toArray().then((documents) => {
            response.send(documents);
        })
    })
});

app.post("/registeruser", (request, response) => {
    var user = {
        "id": request.body.userid,
        "name": request.body.fullname,
        "username": request.body.username,
        "password": request.body.password,
        "email": request.body.Email,
        "mobno": request.body.Mobile,
        "addr": request.body.adress,
        "pincode": request.body.pincode
    }
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("Shopping");
        database.collection("users").insertOne(user).then(result => {
            console.log("Record Inserted");
            response.redirect("/users");
        })
    })
});

app.post("/addtocart", (request, response) => {
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("shopping");
        var product = {
            "ProductId": parseInt(req.body.ProductId)
        };
        database.collection("cart").insertOne(product).then(result => {
            console.log("Record Inserted");
            res.redirect("/cart");
            res.end();
        })
    })
});

app.get("/getcartdetails", (request, response) => {
    mongoClient.connect(connectionString).then((clientObject) => {
        var database = clientObject.db("Shopping");
        database.collection("cart").find({}).toArray().then((documents) => {
            response.send(documents);
        })
    })
});



app.listen(5000);
console.log("Server Started : http://127.0.0.1:5000");
