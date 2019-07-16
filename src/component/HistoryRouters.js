import {getHistoryPath} from '../utils'
import React from 'react'

const RouterContext = React.createContext('')

class Routers extends React.Component {
    state = {}
    
    onChangeHistory = () => {
        const currentPath = getHistoryPath(window.location.href)
        this.setState({currentPath})
    }

    componentDidMount(){
        this.setState({currentPath : getHistoryPath(window.location.href)})
        window.addEventListener('popstate', this.onChangeHistory)
    }

    componentWillUnmount(){
        window.removeEventListener('popstate',this.onChangeHistory)
    }

    render(){

        const {currentPath} = this.state
        const {onChangeHistory} = this
        
        return (
            <RouterContext.Provider value={{currentPath,onChangeHistory}}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}

const Router = ({path,render}) => {
    return (
        <RouterContext.Consumer>
            { ({currentPath}) => currentPath == path && render()}
        </RouterContext.Consumer>
    )
}

const Link = ({to,...props}) => <RouterContext.Consumer>
    {({onChangeHistory}) => <a {...props} href={to} onClick={(e)=>{
        e.preventDefault()
        window.history.pushState(null,'',to)
        onChangeHistory()
    }}></a>}
</RouterContext.Consumer>





export {
    Routers,
    Router,
    Link
}