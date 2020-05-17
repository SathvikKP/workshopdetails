const express = require('express')
const app = express();
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
app.set('view engine','ejs');
app.use(bodyParser());
app.use(express.static('public'));



app.get('/',(req,res)=>{
  res.render('profiles');
});
app.get('/view_workshop',(req,res) => {
  MongoClient.connect("mongodb+srv://sathvikkp123:sathvikkp123@cluster0-tmqeo.mongodb.net/test?retryWrites=true&w=majority",function(err,client){
    if(!err){
      console.log("connected");
      //console.log(req.body);
      var db = client.db('mydb');
      var workshops = db.collection("workshop").find({}).toArray(function(err,result){
        if(err){
          throw err;
        }
        console.log(result);
        res.render('view_workshop',{data:{result:result}});
      });
    }
    else{
      db.close();
    }
  });
});
app.get('/add_workshop',(req,res) => {
  res.render('add_workshop',{data:{name_of_workshop:'',type_of_workshop:'',no_of_people:'',name_of_organizer:'',contact:''
                                        ,email:'',address:'',date:'',time:'',description:'',id:''}});
});


//-----------------------POST METHOD-------------------------------------------------
app.post('/process_post', function (req, res) {
    /* Handling the AngularJS post request*/
    console.log(req.body);
	//res.setHeader('Content-Type', 'text/html');
    /*response has to be in the form of a JSON*/
    req.body.serverMessage = "NodeJS replying to angular"
        
	
	
	MongoClient.connect("mongodb+srv://sathvikkp123:sathvikkp123@cluster0-tmqeo.mongodb.net/test?retryWrites=true&w=majority",function(err,client){
    if(!err){
      console.log("connected");
      console.log(req.body);
      var db = client.db('mydb');
      db.collection("workshop").insert(req.body);
      console.log("\n\nadded workshop succesfully! \n\n");
      //res.sendFile('done.html',{root: __dirname});
      
       res.send({'cmd':'done'});
    }
    else{
      db.close();
    }
  });
	
	
	
    console.log("Workshop Inserted-->"+JSON.stringify(req.body));
    /*Sending the respone back to the angular Client */
    
    //res.sendFile('done.html',{root: __dirname});
    
   
    
});


/*

app.post('/add_workshop_old',(req,res) => {
  MongoClient.connect("mongodb://127.0.0.1",function(err,client){
    if(!err){
      console.log("connected");
      console.log(req.body);
      var db = client.db('mydb');
      db.collection("workshop").insert(req.body);
      console.log("added");
      res.sendFile(__dirname+'/done.html');
    }
    else{
      db.close();
    }
  });
});

*/

app.get('/delete_workshop',(req,res)=>{
  MongoClient.connect("mongodb+srv://sathvikkp123:sathvikkp123@cluster0-tmqeo.mongodb.net/test?retryWrites=true&w=majority",function(err,client){
    if(!err){
      console.log("connected");
      //console.log(req.body);
      var db = client.db('mydb');
      var workshops = db.collection("workshop").find({}).toArray(function(err,result){
        if(err){
          throw err;
        }
        console.log(result);
        console.log("\n\n In delete_workshop... \n\n");
        res.render('delete_workshop',{data: {result:result}});
      });
    }else{
      db.close();
    }
  });
});

app.post('/delete',(req,res)=>{
  MongoClient.connect("mongodb+srv://sathvikkp123:sathvikkp123@cluster0-tmqeo.mongodb.net/test?retryWrites=true&w=majority",function(err,client){
    if(!err){
      console.log("connected");
      //console.log(req.body);
      var db = client.db('mydb');
      db.collection("workshop").deleteMany({id:req.body.id},function(err,obj){
          if(err){
            throw err;
          }
          var workshops = db.collection("workshop").find({}).toArray(function(err,result){
            console.log(result);
            console.log('\n\ndeleted '+req.body.id+"\n\n");
            //res.render('update_workshop',{data:{result:result}});
            res.send({'cmd':'deleted'});
            
          });
      });

    }else{
      db.close();
    }
  });
});
app.post('/update',(req,res)=>{
  MongoClient.connect("mongodb+srv://sathvikkp123:sathvikkp123@cluster0-tmqeo.mongodb.net/test?retryWrites=true&w=majority",function(err,client){
    if(!err){
      console.log("connected");
      var db = client.db('mydb');
      db.collection("workshop").findOne({id:req.body.id},function(err,obj_1){
          if(err){
            throw err;
          }
          db.collection("workshop").deleteOne({id:req.body.id},function(err,obj_2){
              if(err){
                throw err;
              }
              console.log('\n\nupdate success!?\n\n');
              console.log(obj_1);
              if (obj_1===null)
              {
              		res.sendFile(__dirname+'/error.html');
              }
              else
              {
              	res.render('add_workshop_2',{data:obj_1});
              //res.send({'cmd':'updatepage','data':'obj_1'});
              }
          });

      });

    }else{
      db.close();
    }
  });
});
app.post('/view_workshop',(req,res)=>{
  MongoClient.connect("mongodb+srv://sathvikkp123:sathvikkp123@cluster0-tmqeo.mongodb.net/test?retryWrites=true&w=majority",function(err,client){
    if(!err){
      console.log("connected");
      var db = client.db('mydb');
      var workshops = db.collection("workshop").find({id:req.body.id}).toArray(function(err,result){
        if(err){
          throw err;
        }
        console.log(result);
        console.log("\n\nViewing\n\n");
        res.render('view_workshop',{data:{result:result}});
      });
    }else{
      db.close;
    }
  })
})

app.get('/update_workshop',(req,res)=>{
  MongoClient.connect("mongodb+srv://sathvikkp123:sathvikkp123@cluster0-tmqeo.mongodb.net/test?retryWrites=true&w=majority",function(err,client){
    if(!err){
      console.log("connected");
      //console.log(req.body);
      var db = client.db('mydb');
      var workshops = db.collection("workshop").find({}).toArray(function(err,result){
        if(err){
          throw err;
        }
        console.log(result);
        console.log("\n\nIn update page...\n\n");
        res.render('update_workshop',{data: {result:result}});
      });
    }else{
      db.close();
    }
  });
});


app.post('/add_workshop',(req,res) => {
  MongoClient.connect("mongodb+srv://sathvikkp123:sathvikkp123@cluster0-tmqeo.mongodb.net/test?retryWrites=true&w=majority",function(err,client){
    if(!err){
      console.log("connected");
      console.log(req.body);
      var db = client.db('mydb');
      db.collection("workshop").insert(req.body);
      console.log("updated");
      res.sendFile(__dirname+'/done.html');
    }
    else{
      db.close();
    }
  });
});


app.listen(5000);
