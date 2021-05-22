import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'



function Profile() {
    const [userProfile,setProfile] = useState(null)
    const {userid} = useParams()
    const {state,dispatch} = useContext(UserContext)
    const [showfollow, setshowfollow] = useState(state?!state.following.includes(userid):true)
     
    useEffect(() => {
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result => {           
            setProfile(result)
        })
    },[])
 

    const followUser = () => {
        fetch('/follow',{
            method : "put",
            headers : {
                "Content-type" : "Application/json",
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId : userid
            })
            }).then(res => res.json())
            .then(data => {
                // console.log(data)
                dispatch({type: "UPDATE",payload :{following : data.following,followers : data.followers}})
                localStorage.setItem("user", JSON.stringify(data))
                setProfile((prevState) => {
                    return {
                        ...prevState,
                        user : {
                            ...prevState.user,
                            followers : [...prevState.user.followers,data._id]
                        }
                    }
                })
                setshowfollow(false)
        })
    }
 

    const unfollowUser = () => {
        fetch('/unfollow',{
            method : "delete",
            headers : {
                "Content-type" : "Application/json",
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId : userid
            })
            }).then(res => res.json())
            .then(data => {
                // console.log(data)
                dispatch({type: "UPDATE",payload :{following : data.following,followers : data.followers}})
                localStorage.setItem("user", JSON.stringify(data))
                setProfile((prevState) => {
                    const newFollower = prevState.user.followers.filter(item => item != data._id)
                    return {
                        ...prevState,
                        user : {
                            ...prevState.user,
                            followers : newFollower
                        }
                    }
                })
                setshowfollow(true)
        })
    }





    return (
   <>      
        {userProfile ? 
        <div style={{maxWidth:"1000px",margin:"auto auto"}}>
            <div style = {{
                display:"flex",
                justifyContent:"space-around",
                margin : "20px 200px",
                borderBottom: "3px solid #00c853"
            }}>
                <div >
                    <img style = {{width : "150px",height : "150px",borderRadius:"50%",border : "5px solid #00c853"}}
                    src = {userProfile.user.pic}
                    />
                </div>

                <div>
                    <h3>{userProfile.user.name}</h3>
                   {/* <h5>{userProfile.user.email}</h5> */}
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h6>{userProfile.posts.length} posts</h6>
                        <h6>{userProfile.user.followers.length} followers</h6>
                        <h6>{userProfile.user.following.length} following</h6>
                    </div>
                    {showfollow?
                    <button 
                    style = {{
                        margin : "10px"
                    }}
                    className = "btn waves-effect waves-light  #00c853 green accent-4"
                    onClick = {() => followUser()}
                    >
                    Follow
                    </button> 
                    :
                    <button 
                    style = {{
                        margin : "10px"
                    }}
                    
                    className = "btn waves-effect waves-light  #00c853 green accent-4"
                        onClick = {() => unfollowUser()}
                        >
                        Unfollow
                    </button> 
                    }
                    
                    
                    
                    
                    
                </div>

            </div>
            
            <div className = "gallery">

                {
                    userProfile.posts.map(item => {
                        return (
                        <img key = {item._id}
                        className ="item"  
                            src = {item.photo} alt = {item.title}/>
                        )
                    
                    })
                }

                
            </div> 
        </div>     

         :<h2>Loading...</h2>   }
        </>   

    )
}

export default Profile
