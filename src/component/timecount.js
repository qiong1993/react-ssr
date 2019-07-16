import React from 'react'

export default class extends React.Component{
    constructor(props){
        console.log('constructor类构造器调用，一次')
        super(props)
        this.state = {
            current:0
        }
    }

    static getDerivedStateFromProps(){
        console.log('getDerivedStateFromProps 会在调用 render 方法之前调用，它应返回一个对象来更新 state 初始化时会调用吗-yes ？ status更新时会调用吗 --yes')
        return null
    }
    getSnapshotBeforeUpdate(){
        console.log('getSnapshotBeforeUpdate 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 componentDidUpdate() 在render和componentDidUpdate中间调用 组件初始化时会调用吗-no ？ status更新时会调用吗--yes')
    }

    componentWillMount(){
        console.log('componentWillMount组件加载前调用，一次')
    }

    componentWillReceiveProps(){
        console.log('componentWillReceiveProps props有更新时调用？组件初始化时会调用吗-no ？ status更新时会调用吗--yes')
        return null
    }

    shouldComponentUpdate(){
        console.log('shouldComponentUpdate判断render是否要执行时调用？件初始化时会调用吗-no ？ status更新时会调用吗 --yes')
        return true
    }

    componentWillUpdate(){
        console.log('componentWillUpdate组件render前调用？组件初始化时会调用吗-no')
    }

    componentDidUpdate(){
        console.log('componentDidUpdate组件有props和status更新时调用 ？组件初始化时会调用吗-no')
    }

    componentDidMount(){
        console.log('componentDidMount组件被加载，正常只出现一次')
    }

    componentWillUnmount(){
        console.log('componentWillUnmount组件卸载前调用')
    }


    componentDidCatch(){
        console.log('componentDidCatch发生错误时 错误捕获')
    }

    testDate = 1

    add = () => {
        let {current} = this.state
        current++
        this.setState({current})

        //this.props.dispatch({type:'add'})
    }

    del = () => {
        let {current} = this.state
        current--
        this.setState({current})

        this.props.dispatch({type:'del'})
    }

    render(){

        console.log('do render')

        return (
            <div>
                <button onClick={this.add}>+</button>
                {this.state.current}
                <button onClick={this.del}>-</button>
                <br/>
                父组件传来的值：{this.props.passValue}
            </div>
        )
    }

}