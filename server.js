const http=require("http");
const path=require("path");
const url=require("url");
const fs=require("fs");
const {add,sub,mul,div}=require('./calculate.js');
const server=http.createServer((req,res)=>{
    
   if(req.url==='/' && req.method==="GET"){
   const parsedurl=url.parse(req.url,true);
   //console.log(parsedurl);
   fs.readFile("index.html","utf-8",(err,data)=>{
    if(err){
        console.log(err);
    }else{
        res.writeHead(200,{"Content-Type":"text/html"})
        res.end(data);
    }
   });
   }


 else if(req.url.startsWith("/add") && req.method==="POST"){
    let body="";
    req.on("data",chunk =>{
        body+=chunk.toString();
    });
    req.on("end",()=>{
        const form=JSON.parse(body);
        const num1=parseFloat(form.num1);
      const num2=parseFloat(form.num2);
      if(isNaN(num1) || isNaN(num2)){
        res.writeHead(400,{"Content-Type":"text/plain"});
        return res.end("Invalid Input");
      }
       const result=add(num1,num2);
        res.writeHead(200,{"Content-Type":"text/plain"});
        return res.end(`Result:${result}`);
    });
   }


   else if(req.url.startsWith("/sub") && req.method==="POST"){
    let body="";
    req.on("data",chunk =>{
        body+=chunk.toString();
    });
    req.on("end",()=>{
        const form=JSON.parse(body);
        const num1=parseFloat(form.num1);
      const num2=parseFloat(form.num2);
      if(isNaN(num1) || isNaN(num2)){
        res.writeHead(400,{"Content-Type":"text/plain"});
        return res.end("Invalid Input");
      }
       const result=sub(num1,num2);
        res.writeHead(200,{"Content-Type":"text/plain"});
        return res.end(`Result:${result}`);
    });
   }
   else if(req.url.startsWith("/mul") && req.method==="POST"){
    let body="";
    req.on("data",chunk =>{
        body+=chunk.toString();
    });
    req.on("end",()=>{
        const form=JSON.parse(body);
        const num1=parseFloat(form.num1);
      const num2=parseFloat(form.num2);
      if(isNaN(num1) || isNaN(num2)){
        res.writeHead(400,{"Content-Type":"text/plain"});
        return res.end("Invalid Input");
      }
       const result=mul(num1,num2);
        res.writeHead(200,{"Content-Type":"text/plain"});
        return res.end(`Result:${result}`);
    });
   }

   else if(req.url.startsWith("/div") && req.method==="POST"){
    let body="";
    req.on("data",chunk=>{
        body+=chunk.toString();
    });
    req.on("end",()=>{
        const form=JSON.parse(body);
        const num1=parseFloat(form.num1);
      const num2=parseFloat(form.num2);
      if(isNaN(num1) || isNaN(num2)){
        res.writeHead(400,{"Content-Type":"text/plain"});
        return res.end("Invalid Input");
      }
      if(num2===0){
        res.writeHead(400, { "Content-Type": "text/plain" });
                return res.end("Error: Cannot divide by zero.");
      }
       const result=div(num1,num2);
        res.writeHead(200,{"Content-Type":"text/plain"});
        return res.end(`Result:${result}`);
    });
   }

   else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(3002,()=>{
     console.log("Server started on http://localhost:3002");
})