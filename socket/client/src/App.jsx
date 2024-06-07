import { useEffect, useMemo, useState } from 'react'
import {io} from "socket.io-client"
// const container = require("@mui/material");
import {Container, Stack, TextField, Typography} from '@mui/material'

const App = () => {
  const socket = useMemo(() =>
      io("http://localhost:3000")
  , []);

  const [message, setMessage] = useState("")
  const [room, setRoom] = useState("");
  // Initializes a state variable socketID with an empty string "".
  const [socketID, setSocketID] = useState("");
  const[messages, setMessages] = useState([]);

  console.log(messages);
  
  const handleSubmit= (e) =>{
    e.preventDefault();
    socket.emit("message", {message, room});
    setMessage("");
  }


  useEffect(() =>{

    socket.on("connect", () =>{
      setSocketID(socket.id);   //setSocketID updates with current (`socket.id`)
      console.log("connected", socket.id);
    })

    // socket.on("welcome", (s) =>{
    //   console.log(s);
    // })

    socket.on("receive-message", (data) =>{
      console.log(data);
      setMessages((messages) =>[...messages, data]);
    } )

  }, []);



  return <Container maxwidth="sm">
    {/* <Typography variant='h1' component="div" gutterBottom>
      Welcome to Socket.io
    </Typography> */}
    
    <Typography variant='h6' component="div" gutterBottom>
      {socketID}
    </Typography>

  <form onSubmit={handleSubmit} >
    <TextField
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    
    id='outlined-basic'
    label = "Message"
    variant="outlined" />


    {/* <Typography variant='h1' component="div" gutterBottom>
      {socket.id}
    </Typography> */}


    <TextField
    value={room}
    onChange={(e) => setRoom(e.target.value)}

    // id='outlined-basic'
    id='o'
     label = "Room"
      variant="outlined" />
    <button type='submit' variant="contained" color="primary" > Send</button>
  </form>

  <Stack>

    {messages.map((m, i) =>(
    <Typography key={i} variant="h6" component="div" gutterBottom>
      {m}
    </Typography>

    ))}

  </Stack>


    </Container>

};

export default App
