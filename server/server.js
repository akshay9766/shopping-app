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

app.get("/products", (req, res)=>{
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("shopping");
        database.collection("products").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
});

app.get("/details/:id", (req, res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(connectionString).then(clientObject=>{
         var database = clientObject.db("shopping");
         database.collection("products").find({ProductId:id}).toArray().then(document=>{
            res.send(document);
            res.end();
         })
    })
});

app.post("/addproducts", (req, res)=>{
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("shopping");
        var product = {
            "ProductId": parseInt(req.body.ProductId), 
            "Name": req.body.Name,
            "Price": parseFloat(req.body.Price),
            "Stock": (req.body.Stock=="true")?true:false
        };
        database.collection("products").insertOne(product).then(result=>{
            console.log("Record Inserted");
            res.redirect("/products");
            res.end();
        })
    })
});

app.put("/updateproduct",(req, res)=>{
    mongoClient.connect(connectionString).then(clientObject=>{
         var database = clientObject.db("shopping");
         var findQuery = {ProductId:parseInt(req.body.ProductId)};
         var updateQuery = {$set : {Name:req.body.Name, Price:parseFloat(req.body.Price), Stock:(req.body.Stock=="true")?true:false}};

         database.collection("products").updateOne(findQuery, updateQuery).then(result=>{
            console.log("Record Updated");
            res.redirect("/products");
            res.end();
         })
    })
});

app.delete("/deleteproduct/:id", (req, res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("shopping");
        database.collection("products").deleteOne({ProductId:id}).then(result=>{
            console.log("Record Deleted");
            res.redirect("/products");
            res.end();
        })
    })
});

app.get("/users", (request, response)=>{
    mongoClient.connect(connectionString).then((clientObject)=>{
        var database = clientObject.db("shopping");
        database.collection("users").find({}).toArray().then((documents)=>{
            response.send(documents);
        })
    })
});

app.post("/registeruser", (request, response)=>{
    var user = {
         "user_id": request.body.user_id,
         "user_name": request.body.user_name,
         "password": request.body.password, 
         "Email": request.body.Email,
         "Age": parseInt(request.body.Age),
         "Mobile": request.body.Mobile
    }
    mongoClient.connect(connectionString).then(clientObject=>{
         var database = clientObject.db("shopping");
         database.collection("users").insertOne(user).then(result=>{
            console.log("Record Inserted");
            response.redirect("/users");
         })
    })
});



app.listen(5000);
console.log("Server Started : http://127.0.0.1:5000");
