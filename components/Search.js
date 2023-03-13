import Link from 'next/link'
import React, { useContext } from 'react'
import { LayoutContext } from './Layout'

const Search = ({post}) => {
  let { search } = useContext(LayoutContext)

  return (
    <div className={(search === '') ? 'search-container-none' : 'search-container'}>
        <div className="search-items">
            {
                post?.results?.filter((data) => {
                    if(search === '') {
                        return 
                    } else if (data?.title.toLowerCase().includes(search.toLowerCase())) {
                        return data
                    }
                }).map((data, i) => (
                    <div className="search-item" key={i}>
                        <div className="search-image">
                            <img src={data.image} alt=""/>
                        </div>
                        <div className="search-text">
                            <Link href={`/posts/${data.id}`} className='link'>{data.title}</Link>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Search;