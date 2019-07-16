const express = require('express')
// const webpackDevMiddleware = require('webpack-dev-middleware')
// const webpack = require('webpack')
// const config = require('./webpack.config.js')
// const plugin = new webpackDevMiddleware(compile)
// app.use(plugin)


//const compile = webpack(config())

const React = require('react')

const ReactDomServer = require('react-dom/server')
//const component = React.createElement('div',{className:'test'},'server render react com')
//const component = <div>jsx 语法糖</div>
const component = require('./src/index').default

const app = express()

app.get('*',(req,res) => {

    const result =  ReactDomServer.renderToString(component())

    res.send(`
        <!DOCTYPE html>
            <html><body>
                ${result}
            </body></html>`)
    res.end()
})
app.listen(3000, () => {
    console.log('!!!!!!!server start')
})