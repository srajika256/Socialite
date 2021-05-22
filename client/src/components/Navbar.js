import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'

function Navbar() {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()

    const renderList = () => {
        if(state){
            return [
                <li><Link to="/createpost">Create Post</Link></li>,
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/myfollowingpost">Explore</Link></li>,
                
                <li> 
                    <button className = "btn waves-effect waves-light #33691e light-green darken-4"
                onClick = { () => {
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push('/signin')
                }
                }>
                    Logout
                </button>
                </li>
                
            ]
        } 
        else {
            return [
            <li><Link to="/signin">Signin</Link></li>,
            <li><Link to="/signup">Signup</Link></li>
            ]
        }   

    }
    




    return (
    <nav>
        <div className="nav-wrapper #00c853 green accent-4">
        <Link to= {state?"/":"/signin"} className="brand-logo left">Socialite</Link>
        <ul id="nav-mobile" className="right">
            {renderList()}
        </ul>
        </div>
    </nav>
    )
}

export default Navbar

