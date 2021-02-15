import * as React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'
import Results from './Results'
import ThemeContext from '../contexts/theme'
import { Link } from 'react-router-dom'

//create the graphical instruction manual
function Instructions () {

    const theme = React.useContext(ThemeContext)
    return (
        <div className='instructions-container'>
            <h1 className='center-text header-lg'>
                Instructions
            </h1>
            <ol className='container-sm grid center-text battle-instructions'>
                <li>
                    <h3 className='header-sm'>Enter two Github users</h3>
                    <FaUserFriends className={`bg-${theme}`} color='rgb(255, 191, 116)' size={140} />
                </li>
                <li>
                    <h3 className='header-sm'>Battle</h3>
                    <FaFighterJet className={`bg-${theme}`} color='#727272' size={140} />
                </li>
                <li>
                    <h3 className='header-sm'>See the winners</h3>
                    <FaTrophy className={`bg-${theme}`} color='rgb(255, 215, 0)' size={140} />
                </li>
            </ol>
        </div>
    )
}

// controlled component (form state lives in react components)
    // the state is updated (and therefore UI is rerendered) on every keystroke added to the form input
// and uncontrolled component: form state lives inside dome
//    state update is tied to bound event handler
// favor controlled components

function PlayerInput({onSubmit, label}){
    const [username, setUsername] = React.useState('')
    const theme= React.useContext(ThemeContext)

    //when form is submitted
    // called by the onSubmit prop func passed to PlayerInput
    const handleSubmit = (event) => {
        event.preventDefault()
        // don't have any normal browser events take place???

        //pass new username to onSubmit prop of PlayerInput
        onSubmit(username)
    }
    // updates the state of the username value, which will be whatever the user typed into the input field
    // handle
    const handleChange = (event) =>{
        // console.log( event)
        //the state changes everytime a character is typed in the input form, but because no UI is updated until Submit is pressed, there is no rerendering?
        setUsername(event.target.value)
        // this.setState({
        //     username: event.target.value
        // })
    }

    return (
        <form className='column player' onSubmit={handleSubmit}>
            {/*when button is pushed, run the handle submit method */}
            {/*html is a reserved word, so like className, use htmlFor*/}
            <label htmlFor='username' className='player-label'>
                {label}
            </label>
            {/*with a controlled component, the value is going to be whatever is on the local state, so to update the text you need to update state*/}
            <div className='row player-inputs'>
                <input
                    type='text'
                    id='username'
                    className={`input-${theme}`}
                    placeholder='github username'
                    autoComplete='off'
                    value={username}
                    onChange={handleChange}
                />
                {/*if the username isn't a real username, submit won't be accessible */}
                <button
                    className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`}
                    type='submit'
                    disabled={!username}
                >
                    Submit
                </button>
            </div>
        </form>
    )
}

// class PlayerInput extends React.Component {
//     state = {
//         username: ''
//     }
//
//     //when form is submitted
//     // called by the onSubmit prop func passed to PlayerInput
//     handleSubmit = (event) => {
//         event.preventDefault()
//         // don't have any normal browser events take place???
//
//         //pass new username to onSubmit prop of PlayerInput
//         this.props.onSubmit(this.state.username)
//     }
//     // updates the state of the username value, which will be whatever the user typed into the input field
//     // handle
//     handleChange = (event) =>{
//         // console.log( event)
//         //the state changes everytime a character is typed in the input form, but because no UI is updated until Submit is pressed, there is no rerendering?
//         this.setState({
//             username: event.target.value
//         })
//     }
//
//     render() {
//         return (
//             <ThemeConsumer>
//                 {( theme ) => (
//                     <form className='column player' onSubmit={this.handleSubmit}>
//                         {/*when button is pushed, run the handle submit method */}
//                         {/*html is a reserved word, so like className, use htmlFor*/}
//                         <label htmlFor='username' className='player-label'>
//                             {this.props.label}
//                         </label>
//                         {/*with a controlled component, the value is going to be whatever is on the local state, so to update the text you need to update state*/}
//                         <div className='row player-inputs'>
//                             <input
//                                 type='text'
//                                 id='username'
//                                 className={`input-${theme}`}
//                                 placeholder='github username'
//                                 autoComplete='off'
//                                 value={this.state.username}
//                                 onChange={this.handleChange}
//                             />
//                             {/*if the username isn't a real username, submit won't be accessible */}
//                             <button
//                                 className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`}
//                                 type='submit'
//                                 disabled={!this.state.username}
//                             >
//                                 Submit
//                             </button>
//                         </div>
//                     </form>
//                 )}
//             </ThemeConsumer>
//         )
//     }
// }

PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

function PlayerPreview ({ username, onReset, label }) {

    const theme= React.useContext(ThemeContext)
    return (
        <div className='column player'>
            <h3 className='player-label'>{label}</h3>
            <div className={`row bg-${theme}`}>
                <div className='player-info'>
                    <img
                        className='avatar-small'
                        src={`https://github.com/${username}.png?size=200`}
                        alt={`Avatar for ${username}`}
                    />
                    <a
                        href={`https://github.com/${username}`}
                        className='link'>
                        {username}
                    </a>
                </div>
                <button className='btn-clear flex-center' onClick={onReset}>
                    <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
                </button>
            </div>
        </div>
    )
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

export default function Battle(){
    const [playerOne, setPlayerOne]= React.useState(null)
    const [playerTwo, setPlayerTwo]= React.useState(null)

    const handleSubmit=(id,player)=> id ==='playerOne'
        ? setPlayerOne(player)
        : setPlayerTwo(player)

    const handleReset = (id) => id === 'playerOne'
        ? setPlayerOne(null)
        : setPlayerTwo(null)

    return (
        <React.Fragment>
            {/*render instructions*/}
            <Instructions />

            <div className='players-container'>
                <h1 className='center-text header-lg'>Players</h1>
                <div className='row space-around'>
                    {/*if plyaerOne value is null (default), listen for input and update upon submit*/}
                    {playerOne === null
                        ? <PlayerInput
                            label='Player One'
                            onSubmit={(player) => handleSubmit('playerOne', player)}
                        />
                        //if playerOne is not default (onSubmit and handleSubmit have run), show preview of image and name and add resent functionality to button
                        : <PlayerPreview
                            username={playerOne}
                            label='Player One'
                            onReset={() => handleReset('playerOne')}
                        />
                    }
                    {/*ditto for playerTwo*/}
                    {playerTwo === null
                        ? <PlayerInput
                            label='Player Two'
                            onSubmit={(player) => handleSubmit('playerTwo', player)}
                        />
                        : <PlayerPreview
                            username={playerTwo}
                            label='Player Two'
                            onReset={() => handleReset('playerTwo')}
                        />
                    }
                </div>


                {/*if playerOne and playerTwo are NOT NULL, then add the battle button*/}
                {playerOne && playerTwo && (
                    //route to the w
                    <Link
                        className='btn dark-btn btn-space'
                        to={{
                            pathname: '/battle/results',
                            search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
                        }}
                    >
                        Battle
                    </Link>
                )}
            </div>
        </React.Fragment>
    )
}

// export default class Battle extends React.Component {
//     state={
//         playerOne: null,
//         playerTwo: null
//     }
//     // constructor(props) {
//     //     super(props)
//     //
//     //     this.state = {
//     //         playerOne: null,
//     //         playerTwo: null,
//     //     }
//     //
//     //     this.handleSubmit = this.handleSubmit.bind(this)
//     //     this.handleReset = this.handleReset.bind(this)
//     // }
//     handleSubmit =(id, player) => {
//         this.setState({
//             [id]: player
//         })
//     }
//     // if the reset button is pushed, set the playerOne/playerTwo state prop to null, which will remove the preview component and render the form
//     handleReset= (id) => {
//         this.setState({
//             [id]: null
//         })
//     }
//     render() {
//         const { playerOne, playerTwo } = this.state
//
//         return (
//             <React.Fragment>
//                 {/*render instructions*/}
//                 <Instructions />
//
//                 <div className='players-container'>
//                     <h1 className='center-text header-lg'>Players</h1>
//                     <div className='row space-around'>
//                         {/*if plyaerOne value is null (default), listen for input and update upon submit*/}
//                         {playerOne === null
//                             ? <PlayerInput
//                                 label='Player One'
//                                 onSubmit={(player) => this.handleSubmit('playerOne', player)}
//                             />
//                             //if playerOne is not default (onSubmit and handleSubmit have run), show preview of image and name and add resent functionality to button
//                             : <PlayerPreview
//                                 username={playerOne}
//                                 label='Player One'
//                                 onReset={() => this.handleReset('playerOne')}
//                             />
//                         }
//                         {/*ditto for playerTwo*/}
//                         {playerTwo === null
//                             ? <PlayerInput
//                                 label='Player Two'
//                                 onSubmit={(player) => this.handleSubmit('playerTwo', player)}
//                             />
//                             : <PlayerPreview
//                                 username={playerTwo}
//                                 label='Player Two'
//                                 onReset={() => this.handleReset('playerTwo')}
//                             />
//                         }
//                     </div>
//
//
//                     {/*if playerOne and playerTwo are NOT NULL, then add the battle button*/}
//                     {playerOne && playerTwo && (
//                         //route to the w
//                         <Link
//                             className='btn dark-btn btn-space'
//                             to={{
//                                 pathname: '/battle/results',
//                                 search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
//                             }}
//                         >
//                             Battle
//                         </Link>
//                     )}
//                 </div>
//             </React.Fragment>
//         )
//     }
// }