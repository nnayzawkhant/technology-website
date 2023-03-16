import Link from 'next/link'
import React, { useContext } from 'react'
import { LayoutContext } from './Layout/Layout';
import Image from 'next/image';
import '../styles/Search.module.css'


const Search = ({post}) => {
  let { search } = useContext(LayoutContext)

  return (
    <div className={(search === '') ? 'search-container-none' : 'search-container'}>
        <div className="search-items">
            {
                post?.results?.filter((data) => {
                    if(search === '') {
                        return data
                    } else if (data?.title.toLowerCase().includes(search.toLowerCase())) {
                        return data
                    }
                }).map((data, i) => (
                    <div className="search-item" key={i}>
                        <div className="search-image">
                            <Link href={`/details/${data.id}`}><Image src={data.photo} width={100} height={100}  alt=""/></Link>
                        </div>
                        <div className="search-text">
                            <Link href={`/details/${data.id}`} className='link'>{data.title}</Link>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Search;