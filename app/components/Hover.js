import React from 'react'


//replaced the higher order component withHover because it introduces naming collisions
//it's just a component, not a function

//no props are being passed to Hover, but we are passing children by wrapping jsx in the hover component
export default class Hover extends React.Component {

    state={
        hovering: false
    }

    mouseOver =() => {
        this.setState({
            hovering: true
        })
    }

    mouseOut = () => {
        this.setState({
            hovering: false
        })
    }

    // we aren't passing any p
    render() {
        return (
            <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                {/*this.props.children is a function that expects to receive the hovering state, as specified in the function passed to the Hover component in tooltip*/}
                {/*render the children with the proper hovering state. */}
                {this.props.children(this.state.hovering)}
            </div>
        )
    }
}

