const express = require("express");
const socket = require("socket.io");
const http = require("http");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

const secretKeyJWT = "jwnefwkehcjhwj";
const port =3000;



const server = http.createServer(app);
const io = socket(server, {
    cors:{
        origin:"http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

app.use(
    cors(
        {
            origin:"http://localhost:5173/",
            methods: ["GET", "POST"],
            credentials: true,
        }
    )
    );

app.get("/", (req, res) =>{
    res.send("Hello World")
})

app.get("/login", (req, res) =>{

    const token = jwt.sign({_id:"abcdefghijkl"}, secretKeyJWT);
    res.cookie("token", token , {httpOnly:true, secure:true, sameSite: "none"}).json({
        message: "Login Success",
    });
})

const user = false;

io.use((socket, next) =>{
    cookieParser()(socket.request, socket.request.res, (err) =>{
        if (err) return next(err);

        const token = socket.request.cookies.token;
        if (!token) return next(new Error("Authentication Error"));

        const decoded = jwt.verify(token, secretKeyJWT);
        next();
    })
})
    


io.on("connection", (socket) =>{

    console.log("User connected");
    console.log("Id", socket.id);

    socket.on("disconnect", () =>{
        console.log("User Disconnected", socket.id);
    })



    socket.on("message", ({room, message}) =>{
        console.log({room, message});
        io.to(room).emit("receive-message", message);
    })


    return () =>{
        socket.disconnect();
    }

})






server.listen(port, () =>{
    console.log(`Server is listening at port ${port}`);
})