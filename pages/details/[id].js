import React, { useRef, useState, useEffect } from 'react';
import styles from '../../styles/Details.module.css'
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RightLatest from '../../components/RightLatest';
import axios from 'axios';
import {format} from "timeago.js";
import Link from 'next/link';
import Image from 'next/image';
import { API_URL, API_URLS } from '../../components/config/url';
import Search from '../../components/Search';
const Details = ({posts, relatedPosts, allposts}) => {
  return (
    <div className={styles.details__wrapper} >
      <Search post={allposts}/>
        {/* <DetailsSwiper cat={cat}/> */}
        <div className={styles.details__container}>
          <div className={styles.details__left}>
            <div className={styles.home__wrap}>
              <div className={styles.home__icon}>
                <HomeIcon/>
                <KeyboardArrowRightIcon/>
                <span>{posts?.category?.categoryname}</span>
              </div>
              <h1>{posts.title}</h1>
              <div className={styles.details__pfgroup}>
                <div className={styles.details__profile}>
                  <span>by</span>
                  <Image src={posts?.user?.profilePic} width={40} height={40} alt=''/>
                  <span>{posts?.user?.name} {format(posts?.user?.createdAt)}</span>
                </div>
              </div>
            </div>

            <Image src={posts.photo} width={1000} height={500} alt=''/>
            <div className={styles.hero_post_text}>
            <div dangerouslySetInnerHTML={{ __html: posts.desc }} ></div>
            </div>
            
            
            <div className={styles.offer__feature}>
              <LocalOfferIcon/>
              <a href={`/categories/${posts?.category?.id}`}><button>{posts?.category?.categoryname}</button></a>
              <p>{posts.viewCounts} views</p>
            </div>
            <div className={styles.history__group}>
              <span>NEXT STORY <KeyboardArrowRightIcon/></span>
              <div className={styles.isProgress}>
                <Link href='#' >{posts.title}</Link>
              </div>
            </div>
            <div className={styles.detailleft__profile}>
              <Image src={posts.user.profilePic} width={40} height={40} alt=''/>
              <div className={styles.detailleft__dev}>
                <a href='#'>{posts.user.name}</a>
                <p>Blogger, Developer</p>
              </div>
            </div>
            <div className={styles.details__related}>
              <h2>RELATED POSTS</h2>
              <div className={styles.relate__container}>
                {
                  relatedPosts?.map((item, i) => {
                    return (
                      <div className={styles.relate__card} key={i}>
                        
                          <Link href={item.id} passHref>
                            <Image src={item.photo} alt='' width={500} height={300}/>
                            <span>{item.title}</span>
                          </Link>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div>
              {/* <div className={styles.comment__header}>
                <p>0 Comments</p>
                <button>Login</button>
              </div> */}
              <div>
              </div>
            </div>
          </div>
          <div className={styles.details__right}>

              <RightLatest/>

          </div>
        </div>
    </div>
  )
};

export const getServerSideProps = async ({params}) => {
  const finalRes = await (await axios.get(API_URL + `${params.id}`)).data;

  const relate = await (await axios.get(API_URLS + `?sortBy=_id:desc&limit=3&category=${finalRes.category.id}`)).data;

  const updateCounts = await axios.patch(API_URL + `${params.id}`);

  const posts = await (await axios.get(API_URLS + '?limit=100')).data;


  return {
      props: {
          posts: finalRes,
          // cat : cats.results,
          relatedPosts: relate.results,
          allposts: posts
      },
  }
};

// export const getSecondServerSideProps = async () => {
  

//   return {
//       props: {
//           cats: res,
//       },
//   }
// };

export default Details;

