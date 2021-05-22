import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

function Signup() {
    const history = useHistory()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)

    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])


    const uploadFields = () => {
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)))
        {
            M.toast({html: "Invalid email"})
        }


    else {
    fetch("/signup", {
        method : "post",
        headers:{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            name ,
            password,
            email,
            pic : url
        })
    }).then(res =>res.json())
    .then(data => 
        {
           if(data.error){
            M.toast({html: data.error}) 
           }
           else{
               M.toast({html : data.message})
                history.push('/signin')
            }
        })
    }


    }

    const uploadPic = ()=>{   
            const data = new FormData()
            data.append("file",image)
            data.append("upload_preset","socialite")
            data.append("cloud_name","socialite9000")
      
            fetch("	https://api.cloudinary.com/v1_1/socialite9000/image/upload", {
            method:"post",
            body : data
    
            })
            .then(res=>res.json())
            .then(data => {
                console.log(data)
               setUrl(data.url)
            })
            .catch(err => {
                console.log(err)
            })  
    }

    function PostData (){
        if(image)
        {
            uploadPic()
        }
        else
        {
            uploadFields()
        }
        
       
    }

    return (
        <div className = "mycard">
        <div className = "card auth-card input-field">
            <h2 className = "brand-logo">Socialite</h2>
            <input
            type = "text"
            placeholder = "Name"
            value = {name}
            onChange = {(e) => {setName(e.target.value)}}
            />
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
            <div className="file-field input-field">
                <div className="btn #00c853 green accent-4">
                    <span><i className="material-icons">add</i></span>
                    
                    <input type="file" 
                    onChange = {(e) => {setImage(e.target.files[0])}}
                    />
                    
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
             
            <button className = "btn waves-effect waves-light  #00c853 green accent-4"
            onClick = {() => PostData()}
            >
                 SignUP
            </button>
            <h6>
            <Link to="/signin">
            Already have an account ? 
            </Link>
            </h6>
        </div>
        
    </div>
    )
}

export default Signup
