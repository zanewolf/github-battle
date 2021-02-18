import React from 'react'
import PropTypes from 'prop-types'
import {fetchPopularRepos} from "../utils/api";
import {FaUser, FaStar, FaCodeBranch, FaExclamationTriangle} from 'react-icons/fa'
import Card from "./Card";
import Loading from "./Loading";
import Tooltip from "./Tooltip";


function LanguagesNav({selected, onUpdateLanguage}){
    //reads in the current state of the selectedLanguage prop and the function to change the state
    // this function renders the menu of languages, which were hardcoded to the ones below
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return(
        <ul className='flex-center'>
            {/*iterating through the list of languages, creating a li item for each*/}
            {languages.map((language)=>(
                //give each language item it's own key, using lang name rather than number, because if the languages change, the numbers will too and there won't be any matching consistency
                <li key={language}>
                    <button
                        className='btn-clear nav-link'
                        style={language === selected ? {color: 'red' } :null}
                        onClick = {()=> onUpdateLanguage(language)}>
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    )
}

function ReposGrid ({ repos }) {
    // iterating through each item in the repo object to create a card
    return (
        <ul className='grid space-around'>
            {repos.map((repo, index) => {
                const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
                const { login, avatar_url } = owner

                return (
                    <li key={html_url}>
                        <Card
                            header={`#${index + 1}`}
                            avatar={avatar_url}
                            href={html_url}
                            name={login}
                        >
                            <ul className='card-list'>
                                <li>
                                    {/*for username, wrap the tooltip and give it the text you want to display and the jsx as children */}
                                    <Tooltip text={"Github Username"}>
                                        <FaUser color='rgb(255, 191, 116)' size={22} />
                                        <a href={`https://github.com/${login}`}>
                                            {login}
                                        </a>
                                    </Tooltip>
                                </li>
                                <li>
                                    <FaStar color='rgb(255, 215, 0)' size={22} />
                                    {stargazers_count.toLocaleString()} stars
                                </li>
                                <li>
                                    <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                                    {forks.toLocaleString()} forks
                                </li>
                                <li>
                                    <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                                    {open_issues.toLocaleString()} open
                                </li>
                            </ul>
                        </Card>
                    </li>
                )
            })}
        </ul>
    )
}

// proptypes are used during development but cut in production mode to lighten weight of webpack
// proptypes are a way to test devo
// the proptype must match expectation or it will throw an error
ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

function popularReducer(state,action){
    if (action.type==='success'){
        return {
            ...state,
            [action.selectedLanguage]: action.repos,
            error:null
        }
    } else if (action.type==='error'){
        return {
            ...state,
            error: action.error.message
        }
    } else {
        throw new Error("that action type isn't supported")
    }
}

export default function Popular(){
    const [selectedLanguage, setSelectedLanguage] = React.useState('All')
    const [state,dispatch] = React.useReducer(
        popularReducer,
        {error:null}
    )

    const isLoading = () => !state[selectedLanguage] && state.error===null
    const fetchedLanguages = React.useRef([])

    React.useEffect(()=>{
        if (fetchedLanguages.current.includes(selectedLanguage)===false){
            fetchedLanguages.current.push(selectedLanguage)

            fetchPopularRepos(selectedLanguage)
                .then((repos)=> dispatch({type:'success', selectedLanguage,repos}))
                .catch((error)=> dispatch({type: 'error', error}))
        }

    },[fetchedLanguages, selectedLanguage])

    return (
        //    react.fragment adds the html to the app div without creating a redundant div element
        <React.Fragment>
            {/*load the languagesNav menu with the correct language highlighted and with the function to update which language is selected upon click */}
            <LanguagesNav
                selected = {selectedLanguage}
                onUpdateLanguage ={(language)=>setSelectedLanguage(language)}
            />

            {/*if isloading returns true, then run the Loading component*/}
            {isLoading()&&<Loading text={'Fetching Repos'}/>}

            {/*if error is not null, then display it*/}
            {state.error && <p className='center-text error'>{state.error}</p>}

            {/*if loading is not true and error is not null, then load ReposGrid component, feeding in the prop of the repo array for the selected language */}
            {state[selectedLanguage] && <ReposGrid repos={state[selectedLanguage]} />}

        </React.Fragment>
    )

}

// export default class Popular extends React.Component {
//     state = {
//         selectedLanguage: 'All',
//         //default state of menu is all
//         repos: {},
//         // start with nothing cached
//         error:null,
//     //    and no errors
//     }
//
//     componentDidMount(){
//         this.updateLanguage(this.state.selectedLanguage)
//     }
//
//     // if a language is selected, change the state of the prop
//     updateLanguage=(selectedLanguage)=>{
//         this.setState({
//             selectedLanguage,
//             error:null
//         })
//
//         //if the repo for the selected language hasn't been grabbed, then grab it from the API
//         // if the repo entry for the selected language already exists (it's been cached) then skip
//         if (!this.state.repos[selectedLanguage]) {
//             fetchPopularRepos(selectedLanguage)
//                 .then((data)=>{
//                     //save the popular repos to the repos array prop
//                     this.setState((repos)=>({
//                         repos: {
//                             // ...repos concatenates the current state of the repo array with what we're adding to it, the new repo data just for the current language
//                             ...repos,
//                             [selectedLanguage]:data
//                         }
//                     }))
//                 })
//                 .catch((error) => {
//                     console.warn("Error fetching repos:", error)
//
//                     //and change the state prop error to not null
//                     this.setState({
//                         error: "There was an error fetching the repositories"
//                     })
//                 })
//         }
//     }
//     isLoading=()=>{
//         //grab the state props
//         const {selectedLanguage, repos, error} = this.state
//
//         //if there is no error and the repos array data simply doesn't exist yet, then return true
//         return !repos[selectedLanguage] && error===null
//     }
//
//     render(){
//         const {selectedLanguage, repos, error} = this.state
//
//         return (
//         //    react.fragment adds the html to the app div without creating a redundant div element
//         <React.Fragment>
//             {/*load the languagesNav menu with the correct language highlighted and with the function to update which language is selected upon click */}
//             <LanguagesNav
//                 selected = {selectedLanguage}
//                 onUpdateLanguage = {this.updateLanguage}
//             />
//
//             {/*if isloading returns true, then run the Loading component*/}
//             {this.isLoading()&&<Loading text={'Fetching Repos'}/>}
//
//             {/*if error is not null, then display it*/}
//             {error && <p className='center-text error'>{error}</p>}
//
//             {/*if loading is not true and error is not null, then load ReposGrid component, feeding in the prop of the repo array for the selected language */}
//             {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
//
//         </React.Fragment>
//         )
//
//     }
// }