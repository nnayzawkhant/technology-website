import React, { useState } from 'react';
import styles from '../styles/Feature.module.css';
import RightLatest from './RightLatest';
import { useEffect } from 'react';
import LensIcon from '@mui/icons-material/Lens';
import axios from 'axios';
import {format} from "timeago.js";
import NatureSwiper from './NatureSwiper';
import Link from 'next/link';
import Image from 'next/image'
import { featureLatesDatas } from './featureLatesDatas';
import { API_CATS, API_URLS } from './config/url';


const Featured = () => {

  const [latest, setLatest] = useState(0);

  const [posts, setPosts] = useState([]);
  const [headPosts, setHeadPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesPosts, setCategoriesPosts] = useState([]);
  const [query, setQuery] = useState()

  const loadPosts = async () => {
    const result = await (await axios.get(API_URLS + '?sortBy=viewCounts:desc&limit=6')).data;
    // console.log(result)
    setPosts(result)
  }

  const loadCategoriesPosts = async () => {
    let queryURL = API_URLS 
    if(query){
      queryURL += `?category=${query}`
    }
    const result = await (await axios.get(queryURL)).data;
    // console.log(result, 'hello')
    setCategoriesPosts(result)
  }

  const headerPosts = async () => {
    const result = await (await axios.get(API_URLS + '?sortBy=_id:desc&limit=4')).data;
    // console.log(result)
    setHeadPosts(result)
  }

  const fetchCategories = async () => {
    const cats = await (await axios.get(API_CATS)).data;
    // console.log(cats)
    setCategories(cats);

  }

  useEffect(() => {
    loadPosts()
    headerPosts()
    fetchCategories()
    loadCategoriesPosts()
  }, [query])

  const gadgetChecked = (id) => {
    setQuery(id)
  }

  const lastestChecked = (index) => {
    setLatest(index)
  }

  

  return (
    <>
    <section className={styles.section_gp}>
        {
          headPosts?.results?.map((dat, i) => {
            return (
              <div  className={styles.blog_header_content} key={i}>
                <Link href={`/details/${dat.id}`} passHref>
                  <Image src={dat.photo} className={styles.image_ratio}  width={500} height={400} layout="responsive" alt=''/>
                </Link>
                <div className={styles.blog_content_overlay}>
                    <Link href={`/categories/${dat.category.id}`} passHref><span>{dat.category.categoryname}</span></Link>
                    <Link href={`/details/${dat.id}`} passHref><h3>{dat.title}</h3></Link>
                    <div className={styles.grid__papar}>
                      <p>{dat.user?.name}</p>
                      <div className={styles.doc__grid}></div>
                      <p>{format(dat.createdAt)}</p>
                    </div>
                </div>
            </div>
            )
          })
        }
    </section>
    <div className={styles.popular__wrapper}>
      <div className={styles.popular__nav}>
        <h1>POPULAR</h1>
      
      </div>
      {/* <div className={styles.popular__outline}></div> */}
    </div>
    <div>
    <div className={styles.flex__container}>
        {
            posts?.results?.map((item, i) => {
                return (
                    <div className={styles.flex__card} key={i}>
                        <Link href={`/details/${item.id}`} className={styles.link_popular}>
                          <Image src={item.photo} className={styles.photo__img} width={1000} height={1000} alt=''/>
                        <p className={styles.link__p}>0{i + 1}</p>
                        <p>{item.title}</p>
                        </Link>
                    </div>
                )
            })
        }
    </div>
    </div>
    <div className={styles.popular__wrapper}>
      <div className={styles.popular__nav}>
        <h1>CATEGORIES</h1>
        <div className={styles.button__group}>
          {
            categories?.results?.slice(2,4).map((item, i) => {
              return (
                <div key={i}>
                  <button className={styles.btn__btn} onClick={() => gadgetChecked(item.id)}>{item.categoryname}</button>
                </div>
              )
            })
          }
        </div>
      </div>
      {/* <div className={styles.popular__outline}></div> */}
    </div>
    <div>
      <NatureSwiper categoriesPosts={categoriesPosts}/>
    </div>
    <div className={styles.latest__container}>
      <div className={styles.late__small}>
        <div className={styles.popular__wrapper}>
          <div className={styles.popular__nav}>
            <h1>LATEST</h1>
            <div className={styles.button__group}>
              {featureLatesDatas.map((item, i) => {
                return (
                  <div key={i}>
                    <button onClick={() => lastestChecked(i)}>{item.icon}</button>
                  </div>
                )
              })}
            </div>
          </div>
          {/* <div className={styles.popular__outline}></div> */}
        </div>
        <div>
          {
            featureLatesDatas[latest].element
          }
        </div>
      </div>
      <div className={styles.right__late}>
        <RightLatest/>
      </div>
    </div>
    </>
  )
}

export const getServerSideProps = async () => {

  const postResults = await (await axios.get(API_URLS)).data;



  return {
      props: {
          postres : postResults.results,
      },
  }
};

export default Featured