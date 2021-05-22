import React, {useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'



function CreatePost() {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setURL] = useState("")


    useEffect(() => {
        if(url){
        fetch("/createpost", {
            method : "post",
            headers :{
                "content-type" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },
            body : JSON.stringify({
                title,
                body,
                photo : url
            })
        }).then(res=>res.json())
        .then (data => {
            if(data.error){
                M.toast({html: data.error}) 
            }
            else{
                M.toast({html : "Successfully Created post"})
                history.push('/')
            }
        }).catch(err => {
            console.log(err)
        })
        }
    
    }, [url])

    const postDetails = () => {
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
           setURL(data.url)
        })
        .catch(err => {
            console.log(err)
        })  

    }

    return (
        <div className = "card input-file"
        style = {{
           margin : "50px auto",
           maxWidth : "60%",
           padding : "20px",
        //    textAlign : "center"
        }}
        >
            <input 
            type = "text" 
            placeholder = "title"
            value = {title}
            onChange = {(e) => {setTitle(e.target.value)}}
            />

            <input 
            type = "text" 
            placeholder = "body"
            value = {body}
            onChange = {(e) => {setBody(e.target.value)}}
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
            onClick = {() => postDetails()}
            >
                     Post
            </button>
            
        </div>
    )
}

export default CreatePost
