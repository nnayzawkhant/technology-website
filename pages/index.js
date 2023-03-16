import React from 'react'
import Feature from '../components/Featured'
import Search from '../components/Search'
import { API_URLS } from '../components/config/url'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const index = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const resultPost = await ( await axios.get(API_URLS + '?limit=100')).data
    setPosts(resultPost);
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div>
      <Search post={posts}/>
      <Feature/>
    </div>
  )
}



export default index