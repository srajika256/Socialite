import React, {useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

function Signin() {
    const {state,dispatch} =  useContext(UserContext)
    const history = useHistory()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
   
    function PostData (){
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)))
            {
                M.toast({html: "Invalid email"})
            }

        else {

        fetch("/signin", {
            method : "post",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                password,
                email 
            })
        }).then(res =>res.json())
        .then(data => 
            {
                console.log(data)
               if(data.error){
                M.toast({html: data.error}) 
               }
               else{
                    localStorage.setItem("jwt",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))
                    dispatch({type : "USER", payload : data.user })
                    M.toast({html : "Signed in"})
                    history.push('/')
                }
            })
        }       
    }


    return (
        <div className = "mycard">
            <div className = "card auth-card input-field">
                <h2 className = "brand-logo">Socialite</h2>
                <input
            type = "text"
            placeholder = "email"
            value = {email}
            onChange = {(e)=>{setEmail(e.target.value)}}
            />
            <input 
            type = "password"
            placeholder = "Password"
            value = {password}
            onChange = {(e)=>{setPassword(e.target.value)}}
            />
             
            <button className = "btn waves-effect waves-light  #00c853 green accent-4"
            onClick = {() => PostData()}
            >
                 SignIn
            </button>

                <h6>
                    <Link to="/signup">
                    Don't have an account ? 
                    </Link>
                </h6>

            </div>
        </div>
    )
}

export default Signin
