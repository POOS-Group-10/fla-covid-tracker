import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import fetch from 'node-fetch';

import '../App.css';

const Home = () =>
{
    const url = 'http://localhost:3000/api/profile';
    const [userInfo, setUserInfo] = useState([])
    var list = []
   async function session()
    {
        const response = await fetch(url, {
            method:'GET',
            headers:{'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(json => {
        //   console.log("json " + JSON.stringify(json))
        console.log("entered!!!!")
          var j = JSON.stringify(json)
          list.push(j)
          setUserInfo(list)
          console.log("list " + list)
        })
        .catch(err => console.log(err))
    }

    return(
        <div onLoadStart={session}>
            <h1 >Welcome {userInfo}</h1> 
            <Link to='/'>Log out</Link>
            {/* <button onClick={session}>ClickMe</button>
            {userInfo} */}
        </div>
    );
}

export default Home;
