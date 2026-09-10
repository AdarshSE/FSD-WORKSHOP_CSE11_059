// import http from 'http';

//     const server=http.createServer((req,res)=>{
//     const url=req.url;
//     const method=req.method;
    
//     if(url=="/msg" && method=="GET"){
//         res.write("Adarsh Kumar");
//         res.end();
//     }

// });

// server.listen(3000,()=>{
//     console.log("server is running on port number 3000");
// });
// const request 
// import http from "http"
// const server = http.createServer((req, res) => {
//     res.write("hello world ")
//     res.end();
// });

// server.listen(3001, ()=>{
//     console.log("server is running on port 3001");
// });

//localhost:3001/


// const url = req.url 
// const method = req.method 

// if(url== "/msg" && method==("get") $ {port} )


// import http from "http";

// const server = http.createServer((req, res) => {

//     res.write("Hello World");

//     const url = req.url;
//     const method = req.method;

//     if (url === "/msg" && method === "GET") {

//         res.write("   This is the msg server page");
//         res.statusCode = 200 ;
//         res.setHeader("Content-Type" , "text/plain") ;
//         res.end("welcm to backend") ;

//     }

    // res.end();
    
// });

// server.listen(3000, () => {

//     console.log("Server is running on port 3000");

// });

// import http from "http";
//const users = ["Abhinav", "Rahul", "Aman", "Rohit"];
// const userdata = {
//     id: 2503201000059,
//     name: "Adarsh Kumar",
//     class: "cse-11",
//     reg:"newdata" 
// };

// const newdata = {
//     id:userdata.id ,
//     name:userdata.name ,
//     class:userdata.class ,
//     reg : userdata.reg  
// };
// // export default users;
// const server = http.createServer((req, res) => {

//     const url = req.url;
//     const method = req.method;

//     if (url == "/msg" && method == "GET") {

//         res.statusCode = 200;
//         res.setHeader("Content-Type", "text/plain");

//         res.end(" wlcm to backend");

//     }
//     else if(url == "/cis" && method == "GET"){
//         res.statusCode = 200 ;
//         res.setHeader("Content-Type" , "application/json") ;
//         //res.end(JSON.stringify(users)) ;
//         res.end(JSON.stringify(userdata)) ;
//     }
    // else if(url == "/create" && method == "POST"){
    //     let body = " " ;
    //     req.on("data" , content=>{
    //         body = body + content ; 
    //     })
    //     const method = req.method ;

    // }

//     else if (url == "/create" && method == "POST") {

//     let body = "Created Successfully";

//     req.on("data", chunk => {
//         body += chunk;
//     });

//     req.on("end", () => {

//         const newdata = JSON.parse(body);

//         res.statusCode = 201;
//         res.setHeader("Content-Type", "application/json");

//         res.end(JSON.stringify(newdata));
//     });
//     }
//     else if(url == "/delete" && method == "DELETE"){
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "text/plain");
//         res.end("Deleted Successfully");
//         const id = req.url.split("/")[2];
//         const index = userdata.findIndex(user => user.id == parseInt(id)); 
//         if (index !== -1)
//             return res.status(404).send("User not found");
//         userdata.splice(index, 1);
//     }
//     else {

//         res.statusCode = 404;
//         res.setHeader("Content-Type", "text/plain");

//         res.end("not found");
//     }

// });

// server.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });
import http from "http";
import fs from "node:fs/promises";

let port = 3001;
const filePath = "file.txt";

let userData = [];

async function readFile() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return data;
    } catch (err) {
        console.log("Error found", err);
        return "";
    }
}

const content = await readFile();

console.log(content, "12");

const server = http.createServer((req, resp) => {

    const url = req.url;
    const typ = req.method;

    // GET /msg
    if (url === "/msg" && typ === "GET") {

        resp.statusCode = 200;
        resp.setHeader("Content-Type", "application/json");

        resp.end(JSON.stringify(content));
    }

    // GET /sis
    else if (url === "/sis" && typ === "GET") {

        resp.statusCode = 200;
        resp.setHeader("Content-Type", "application/json");

        const user = {
            name: "aarav",
            id: 1223
        };

        resp.end(JSON.stringify(user));
    }

    // POST /create
    else if (url === "/create" && typ === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
                const data = JSON.parse(body);
                const newUser = {
                    id: data.id,
                    name: data.name,
                    age: data.age
                };
                userData.push(newUser);
                resp.end(JSON.stringify({message: "User created successfully"}));
            } 
        )
        }
    else if(url=="/user" && typ=="GET"){
        resp.end(JSON.stringify(userData));
    }
    else if(url.startsWith("/user/") && typ=="GET"){
        const gurl=url.split("/")[2];
        const index=userData.findIndex((u)=>u.id==id);
        resp.end(JSON.stringify(userData[index]));

    }
    else if(url=="/delete" && typ=="DELETE"){
        try{
        if(index==-1){
            return resp.end("Element found");
        }
        else{
            userData.splice();
        }
        }
        catch(err){
            console.log("Error ",err);
        }
    }
    else if(url.startsWith("/delete/") && typ=="DELETE"){
        
            const id=url.split("/")[2];
        const index=userData.findIndex((u)=>u.id==id);
        if(index==-1){
            return resp.end("Element found");
        }
        else{
            userData.splice(index,1);
        }
    }
    // Unknown route
    else {

        resp.statusCode = 404;
        resp.end("Route not found");
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});