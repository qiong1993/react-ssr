//import styles from './index.scss'
import React from 'react'

import TimeCount from './component/timecount'
import {Routers,Router,Link} from './component/HistoryRouters'

import {createStore,combineReducers} from 'redux'

import { Provider, connect} from 'react-redux'

console.log('@@@@@@@@@@@@@@@')

const styles = {}

const simpleReducer = (status =10, action)=>{
    switch (action.type){
        case 'add':
            return status+2
        case 'del':
            return status -2
        default:
            return status
    }
}

class App extends React.Component{

    constructor(props){
        super(props)
        this.state={
            //passValue:store.getState().simpleReducer,
            passValue:props.simpleReducer,
            componentShow:false
        }
    }

    componentDidMount(){
        store.subscribe(()=>{
            this.setState({passValue:store.getState().simpleReducer})
        })
    }

    updateValue = () => {
        this.props.dispatch({
            type:'add'
        })
        // let {passValue} = this.state
        // ++passValue
        // this.setState({
        //     passValue
        // })
    }

    updateNan = () =>{
        this.setState({})
    }

    displayComponent = () =>{
        this.setState({componentShow:!this.state.componentShow})
    }

    render(){
        const {passValue,componentShow} = this.state
        const timeCountProps = {
            passValue,
            dispatch:this.props.dispatch
        }

        const {simpleReducer, pathReducer} = this.props
        console.log("path:",pathReducer)
        
        return (
            <div>
                <nav>导航条哦</nav>
                <div className={styles.content}>
                    内容块
                    <p>connect {simpleReducer}</p>
                    <p>入口文件内容</p>
                    <p className={styles.class1}>单独的classname<span className={styles.class2}>class1 下的class2</span></p>
                    <p className="class3">全局样式文件</p>
                    <button onClick={this.updateValue}>父组件更新</button>

                    <button onClick={this.updateNan}>父组件更新 值不更新只是触发render</button>

                    <button onClick={this.displayComponent}>子组件显现消失</button>


                    {componentShow ? <TimeCount {...timeCountProps}/> : ''}

                    <Routers defaultPath={pathReducer}>
                        <dl>
                            <dt><Link to='a'>a</Link></dt>
                            <dt><Link to='b'>b</Link></dt>
                        </dl>
                        

                        <Router path='a' component={TimeCount} {...timeCountProps}/>
                        <Router path='b' render={()=> <div>我是路由b</div>}/>
                    </Routers>
                </div>
                <footer>
                    底部
                </footer>
            </div>
            
        )
    }

}

const WrappedApp = connect(({simpleReducer,pathReducer}) => ({simpleReducer,pathReducer}))(App)


export default  ({path}={}) => {
    console.log('!!!!!path',path)

    const pathReducer = (status=path)=>status


    const store = createStore(combineReducers({simpleReducer,pathReducer}))

    console.log('!!!!!store',store.getState())

    return (
        <Provider store={store}>
            <WrappedApp/>
        </Provider>
      )
}