import React from 'react'

export default function Hover(){
    const [hovering, setHovering] = React.useState(false)

    const onMouseOver=()=>setHovering(true)
    const onMouseOut=()=>setHovering(false)

    return [hovering, {onMouseOver,onMouseOut}]

    // return (
    //     <div onMouseOver={mouseOver} onMouseOut={mouseOut}>
    //         {/*this.props.children is a function that expects to receive the hovering state, as specified in the function passed to the Hover component in tooltip*/}
    //         {/*render the children with the proper hovering state. */}
    //         {this.props.children(hovering)}
    //     </div>
    // )
}