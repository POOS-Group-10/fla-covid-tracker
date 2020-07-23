import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const PostSearch = () =>
{
    var searchList = []
    const [searches, setSearches] = useState([])

    const getSearches = () => {
        const searchURL = 'search/';
        const URL = window.location.pathname;
        let search = URL.slice(URL.indexOf(searchURL) + searchURL.length)
        var searchQuery = search.split('%20')
        console.log(searchQuery)

        const payload = {
            items: searchQuery
        }

        axios({
            url: '../../api/searchPosts',
            method: 'POST',
            data: payload
        })
        .then((response) => {
            console.log('post search response: ' + response + ' ' + response)
            var x;
            for (x in response.data)
                searchList.push(response.data[x])
            console.log('search list array is: ' + searchList)
            setSearches(searchList)
            console.log(searches)
        })
        .catch((error) => {
            console.log('post search error: ' + error)
        })
    }

    const toPost = async (search, date) =>
    {
        console.log('search data is: ' + search + ' ' + date)
        // const url = 'http://localhost:3000/Posts/' + search + '/' + date
        const url = 'https://florida-covid-tracking.herokuapp.com/Posts/' + search + '/' + date
        console.log(url)
        window.location = url;
    }

    const displaySearches = () => {
        if (!searches.length) return null; // end function if 'posts' is empty.
        console.log('in display searches: ' + searches[0].body)
        return searches.map((search, index) => (

          <div>
            <div key={index} id ="blog" onClick={event => toPost(search.user, search.date)}>
            <h1 class="up">{search.user}</h1>
            <div className="divider"></div>
            <h3>{search.title}</h3>
            </div>
            <br></br>
          </div>

        ));
      };

    useEffect(() => {
        getSearches();
    }, [])

    return(
        <div>
            <div>{displaySearches()}</div>
        </div>
    );
}
export default PostSearch;