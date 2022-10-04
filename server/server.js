import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

//express settings
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//socket-io settings
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

app.get('/', function (req, res) {
  res.send('Hello from the server!')
})

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
  console.log('A user connected')

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected')
  })
})

//you can store your port number in a dotenv file, fetch it from there and store it in PORT
//we have hard coded the port number here just for convenience
const PORT = 5000

server.listen(PORT, function () {
  console.log(`listening on port : ${PORT}`)
})
