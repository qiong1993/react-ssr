const http = require('http')

http.createServer((req,res) => {
    console.log('req',req,'res',res)
    res.writeHead(200)
    res.end('success')
}).listen(4000,()=>{
    console.log('listen at 4000')
})