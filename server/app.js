const express = require( 'express')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)



app.use(bodyParser.urlencoded({extended:false}))

io.on('connection', (socket)=>{
  console.log(`connection to client`)
  socket.on('message', (value)=>{
    socket.emit('message', value.message)
    socket.broadcast.emit('message', value.message)
  })

  socket.on('triggerprev', (slide)=>{
    console.log(slide)
    socket.broadcast.emit('triggerprev',(slide.slide))
  })

  socket.on('triggernext', (slide)=>{
    socket.broadcast.emit('triggernext', (slide.slide))
  })
})

server.listen(3000,()=>{
  console.log(`Connection to server`)
})