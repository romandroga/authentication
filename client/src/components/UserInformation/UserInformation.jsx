import React,{useEffect} from 'react'
import axios from 'axios';


const UserInformation = (data) => {

  useEffect(() => {

    axios.get("http://localhost:3001/login").then(res => console.log(res))
    console.log(data)
  }, [])
  return(

    <div>

      <p>User name: </p>
      <p>User email: </p>


    </div>

  )


}


export default UserInformation;


