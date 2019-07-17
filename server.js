const express = require('express')
const path = require('path')
const component = require('./src/server-index').default

const ReactDomServer = require('react-dom/server')

const app = express()

app.use('/dist',express.static(path.join(__dirname, 'dist')))

app.get('*',(req,res) => {

    const result =  ReactDomServer.renderToString(component({path:'b'}))

    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    res.end(`  
        <!DOCTYPE html>
            <html>
                <head>
                    <link rel='stylesheet' href="/dist/main.css"/>
                </head>
                <body>
                    <div id="app">${result}</div>
                    <script src='/dist/bundle.js'></script>
                </body>
            </html>`)
})
app.listen(3000, () => {
    console.log('listen 3000')
})