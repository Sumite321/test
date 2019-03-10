var express = require('express') // not a relative path so it looks in the node_modules file
var bodyParser = require('body-parser')
var https = require('https');

// app variable
    // used to
        // listen for HTTP request
        // start server
var app = express() // invoke express as an app

// body parser functions USEd in middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SETs the template as the embedded javascript template, allows you to RENDER
app.set('view engine', 'ejs');



var todos = ['eat', 'sleep', 'build a crud app'];

var instructor = 'Elie'


app.get('/todos', function(req,res) {
    res.render('todos', { todos: todos })
})

app.get('/todos/new', function(req,res) {
    res.render('new-todo')
})

app.post('/todos', function(req, res) {
    var newTask = req.body.task;
    if (!todos.includes(newTask)){
        todos.push(newTask);
        res.redirect('/todos');
    } else {
        res.redirect('/todos');
    }
})

app.get('/api/:name', function(req1,res1) {

var options = {
  'method': 'POST',
  'hostname': 'api.todaqfinance.net',
  'path': '/accounts',
  'headers': {
    'Content-Type': 'application/json',
    'x-api-key': 'aeafa8a0-7596-44e3-8389-96e0b7fbeca9'
  }
};

var bodyHt = "";
var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    bodyHt = body.toString();
    console.log(body.toString());
res1.send(bodyHt + name);
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var name = req1.params.name;

var postData =  '{\n\t\"type\": \"account\",\n    \"data\": {\n    \t\"attributes\": {\n\t\t\t\"account-type\": \"individual\",\n\t\t\t\"admin-email\": \"${name}@example.com\",\n\t\t\t\"contact\": {\n\t\t\t   \"email\": \"patricia@example.com\",\n\t\t\t   \"phone\": \"555-555-5323\",\n\t\t\t   \"last-name\": \"Trie\",\n\t\t\t   \"first-name\": \"Patricia\",\n\t\t\t   \"address\": {\n\t\t   \t\t\t\"city\": \"Toronto\",\n\t\t             \"postal-code\": \"N4N2L1\",\n\t\t             \"province-region\": \"Ontario\",\n\t\t             \"street-address-1\": \"925 Madison Avenue\",\n\t\t             \"country\": \"CA\"\n\t\t\t   }\n\t   \t\t}\n\t\t}\n    }\n}';

var obj = JSON.parse(postData);

obj.data.attributes["admin-email"] = "smt@gmail.com";
obj.data.attributes.contact["email"] = "smt@gmail.com";
obj.data.attributes.contact["phone"] = "05996079066";
obj.data.attributes.contact["last-name"] = "test";
obj.data.attributes.contact["first-name"] = "test";
obj.data.attributes.contact.address["city"] = "London";
obj.data.attributes.contact.address["country"] = "UK";
obj.data.attributes.contact.address["postal-code"] = "N88576";
obj.data.attributes.contact.address["province-region"] = "Onta";
obj.data.attributes.contact.address["street-address-1"] = "885 afdf";


console.log(obj.data.attributes["admin-email"]);


req.write(JSON.stringify(obj));

req.end();

//res1.send(bodyHt);

   
})

app.post('/todos/:index', function(req, res) {
    var deleteIndex = req.params.index
    todos.splice(deleteIndex, 1);
    res.redirect('/todos');
})

//use dashes, not capitalizing for route names
app.get('/first-name', function(req, res){
    res.render('first', { firstName: instructor });
})

app.get('/joanne', function(request, response) {
    response.render('Hello Joanne!');
})

// colon : denotes a url parameter
app.get('/person/:name', function(request, response) {
    // get access to params
    var name = request.params.name
    response.send('Hi! ' + name);
})


// specify that the app is listening for a get request
app.get('/', function(request, response) {
    response.render('hello'); // because the view engine is set to ejs, this is asking it to render hello.ejs even though we haven't added the extension
})
// respond with a callback with (request, response) or shorthand: (req, res)

app.get('/login', function(request, response) {
    response.render('login');
})

app.post('/login', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    response.redirect('/welcome');
})

app.get('/welcome', function(req, res) {
    res.send('logged in')
})

app.get('/add/:num1/:num2', function(request, response) {
    var num1 = parseInt(request.params.num1);
    var num2 = parseInt(request.params.num2);

    if (isNaN(num1) || isNaN(num2)) {
        response.send('Please enter valid numbers.')
    } else {
        var answer = (num1 + num2).toString();
        response.send(answer);
    }

})

app.get('/add', function(request, response) {
    // URL paramenters => request.params
    // URL query => request.query
    var num1 = parseInt(request.query.num1);
    var num2 = parseInt(request.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        response.send('Please enter valid numbers.')
    } else {
        var answer = (num1 + num2).toString();
        response.send(answer);
    }
})

app.get('/subtract/:num1/:num2', function(request, response) {
    var num1 = parseInt(request.params.num1);
    var num2 = parseInt(request.params.num2);

    if (isNaN(num1) || isNaN(num2)) {
        response.send('Please enter valid numbers.')
    } else {
        var answer = (num1 - num2).toString();
        response.send(answer);
    }
})

app.get('/subtract', function(request, response) {
    // URL paramenters => request.params
    // URL query => request.query
    var num1 = parseInt(request.query.num1);
    var num2 = parseInt(request.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        response.send('Please enter valid numbers.')
    } else {
        var answer = (num1 - num2).toString();
        response.send(answer);
    }
})

app.get('/divide/:num1/:num2', function(request, response) {
    var num1 = parseInt(request.params.num1);
    var num2 = parseInt(request.params.num2);

    if (isNaN(num1) || isNaN(num2)) {
        response.send('Please enter valid numbers.')
    } else {
        var answer = (num1/num2).toString();
        response.send(answer)
    }
})

app.get('/divide', function(request, response) {
    // URL paramenters => request.params
    // URL query => request.query
    var num1 = parseInt(request.query.num1);
    var num2 = parseInt(request.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        response.send('Please enter valid numbers.')
    } else {
        var answer = (num1 / num2).toString();
        response.send(answer);
    }
})

app.get('/multiply/:num1/:num2', function(request, response) {
    var num1 = parseInt(request.params.num1);
    var num2 = parseInt(request.params.num2);

    if (isNaN(num1) || isNaN(num2)) {
        response.send('Please enter valid numbers.')
    } else {
        var answer = (num1*num2).toString();
        response.send(answer)
    }
})

app.get('/multiply', function(request, response) {
    // URL paramenters => request.params
    // URL query => request.query
    var num1 = parseInt(request.query.num1);
    var num2 = parseInt(request.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        response.send('Please enter valid numbers.')
    } else {
        var answer = (num1 * num2).toString();
        response.send(answer);
    }
})

// tell your server to start, give it a message
app.listen(3000, function(){
    console.log('Running on 3000');
})

