import React from 'react'

const styles = {
    content:{
        fontSize: '35px',
        position: 'absolute',
        left: '0',
        right: '0',
        marginTop: '20px',
        textAlign: 'center'
    }
}


export default class Loading extends React.Component{
    constructor(props){
        super(props)

        this.state={
            content: props.text,
            interval: 300
        }
    }

    componentDidMount(){
        const {speed, text} = this.props

       this.interval= window.setInterval(()=>{
           console.log(this.state.content)
            this.state.content=== text + '...'
            ? this.setState({content:text}) // if you are simply rewriting it you can just pass the new definition in using an object
            //     but if you are rewriting content based on previous/current value, you need to do so in a function, where you read in the current value
            : this.setState(({content})=>({ content: content + '.'}))
        },speed)
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    render(){
        return(
            <p style={styles.content}>
                {this.state.content}
            </p>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    interval: PropTypes.number.isRequired
}

Loading.defaultProps = {
    text: 'Loading',
    interval: 300
}
