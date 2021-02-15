import * as React from 'react'
import ThemeContext from '../contexts/theme'
import {NavLink} from 'react-router-dom'

const activeStyle = {
    color: 'rgb(187,46,31)'
}

export default function Nav ({toggleTheme}) {

    const theme = React.useContext(ThemeContext)
    return (
        // grab the props from the react context that is being passed through the tree
        ///*putting JSX within a render prop {({theme,toggleTheme})=>()} means that everything within the prop has access to the theme state props*/
        <nav className='row space-between'>
            <ul className={'row nav'}>
                <li>
                    {/*/*the Navlink element has the ability to be styled, as opposed to the Link element */}
                    <NavLink to={'/'} exact activeStyle={activeStyle} className={'nav-link'}>Popular</NavLink>
                </li>
                <li>
                    <NavLink to={'/battle'} activeStyle={activeStyle} className={'nav-link'}>Battle</NavLink>
                </li>
            </ul>
            <button
                style={{fontSize: 30}}
                className='btn-clear'
                onClick={toggleTheme}
            /*    toggleTheme is the function to toggle theme that was added to the theme provider and imported*/
            >
                {theme === 'light' ? '🔦' : '💡'}
            </button>
        </nav>
    )
}
