import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'



function Profile() {
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
   
    // console.log(state)

    useEffect(() => {
        fetch('/mypost',
        {
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result => {
            // console.log(result)
            setPics(result.mypost)
            // console.log(mypics)
        })
    },[])

    useEffect(() => {
        if(image)
        {
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
               localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
               dispatch({type:"UPDATEPIC",payload:data.url})
            })
            .catch(err => {
                console.log(err)
            })
        }
    },[image])
 
    const updatePhoto = (file)=>{
          setImage(file)
    }
    


    return (
        <div style={{maxWidth:"1000px",margin:"auto auto"}}>
            <div style = {{
                display:"flex",
                justifyContent:"space-around",
                margin : "20px 200px",
                borderBottom: "3px solid #00c853"
            }}>
                <div>
                    <div>
                        <img style = {{width : "150px",height : "150px",borderRadius:"50%",border : "5px solid #00c853"}}
                        src = {state?state.pic:"Loading"}
                        />
                    </div>
                   
                   
                    <div style = {{marginBottom: "10px"}}>
                    {/* <button className = "btn waves-effect waves-light  #00c853 green accent-4"
                        onClick={()=>{updatePhoto()}}>
                        Update Profile
                    </button> */}
                    <div className="file-field input-field">
                        <div className="btn #00c853 green accent-4">
                            <span> Update Profile</span>
                            
                            <input type="file" 
                            onChange = {(e) => {updatePhoto(e.target.files[0])}}
                            />
                            
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    </div>


                </div>

                <div>
                    <h3>{state?state.name:"UserName"}</h3>
                   
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h6>{mypics.length} posts</h6>
                        <h6>{state?state.followers.length:0} followers</h6>
                        <h6>{state?state.following.length:0} following</h6>
                    </div>


            </div>
            

            {/* <button className = "btn waves-effect waves-light  #00c853 green accent-4"
            >
                 Update Profile
            </button> */}
            </div>
            <div className = "gallery">

                {
                    mypics.map(item => {
                        return (
                        <img key = {item._id}
                        className ="item"  
                            src = {item.photo} alt = {item.title}/>
                        )
                    
                    })
                }

                
            </div>
        
        </div>        
    )
}

export default Profile
