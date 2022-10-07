const http = require('http')
const fs = require('fs')
const PORT = 3000

const server = http.createServer(function(req,res){
    console.log(req.url)
    if(req.url==='/')
    {
        res.writeHead(200,{'Content-Type':'text/html'})
        fs.readFile('index.html',(error,data)=>{
            res.write(data)
            res.end()
        })
    }
    else if(req.url==='/script')
    {
        res.writeHead(200,{'Content-Type':'text/javascript'})
        fs.readFile('script.js',(error,data)=>{
            res.write(data)
            res.end()
        })
    }
    else if(req.url==='/style')
    {
        res.writeHead(200,{'Content-Type':'text/css'})
        fs.readFile('style.css',(error,data)=>{
            res.write(data)
            res.end()
        })
    }
    else if(req.url==='/upload')
    {
        console.log(req.body)
        // fs.readFile('style.css',(error,data)=>{
        //     res.write(data)
        //     res.end()
        // })
    }
})

server.listen(PORT,(error)=>{
    if(error) console.log('Something went wrong',error)
    else
    console.log(`Server Running on ${PORT}`)
})