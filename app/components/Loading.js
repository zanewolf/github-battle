import React from 'react'
import PropTypes from 'prop-types'

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

export default function Loading({text='Loading',speed = 300}){
    const [content, setContent]=React.useState(text)
    // const [speed, setSpeed] = React.useState(speed)

    React.useEffect(()=>{
        const id = window.setInterval(()=>{
            setContent((content)=>{
                return content === `${text}...`
                ? text
                : `${content}.`
            })
        },speed)

        return () => window.clearInterval(id)

    },[text,speed])

    return(
        <p style={styles.content}>
            {content}
        </p>
    )
}


// export default class Loading extends React.Component{
//
//     //read in the state props from where Loading is initialized, where they should specify the hastiness of the rerendering with speed and what text should be displayed (battling, loading)
//     state={
//         content: this.props.text,
//         speed: this.props.speed
//     }
//
//     componentDidMount(){
//         const {speed, text} = this.props
//
//        this.interval= window.setInterval(()=>{
//            // console.log(this.state.content)
//             this.state.content=== text + '...'
//             ? this.setState({content:text})
//                 // if you are simply rewriting the state you can just pass the new definition in using an object
//             //     but if you are rewriting content based on previous/current value, you need to do so in a function, where you read in the current value
//             : this.setState(({content})=>({ content: content + '.'}))
//         },speed)
//     }
//
//     //once loading is finished, need to clear the timer or else chaos ensues
//     componentWillUnmount() {
//         window.clearInterval(this.interval)
//     }
//
//     //every time the state is updated (at interval of speed, a re-render is triggered
//     render(){
//         return(
//             <p style={styles.content}>
//                 {this.state.content}
//             </p>
//         )
//     }
// }
//
Loading.propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number
}
//
// Loading.defaultProps = {
//     text: 'Loading',
//     speed: 300
// }
