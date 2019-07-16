import {getHashPath} from '../utils'
import React from 'react'

const RouterContext = React.createContext('')

class Routers extends React.Component {
    state = {
        
    }

    onChangeHash = (e) => {
        const currentPath = getHashPath(e.newURL)
        this.setState({currentPath})
    }

    componentDidMount(){
        this.setState({currentPath : getHashPath(window.location.href)}) 
        window.addEventListener('hashchange', this.onChangeHash)
    }

    componentWillUnmount(){
        window.removeEventListener('hashchange',this.onChangeHash)
    }

    render(){

        console.log('routers this.state.currentPath',this.state.currentPath)
        
        return (
            <RouterContext.Provider value={this.state.currentPath}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}

const Router = ({path,render,component,...props}) => {
    return (
        <RouterContext.Consumer>
            { currentPath => currentPath == path ? component ? React.createElement(component,props)  : render() :''}
        </RouterContext.Consumer>
    )
}

const Link = ({to,...props}) => <a {...props} href={"#"+to}></a>





export {
    Routers,
    Router,
    Link
}