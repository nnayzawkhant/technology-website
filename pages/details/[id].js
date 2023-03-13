import React, { useRef, useState, useEffect } from 'react';
import styles from '../../styles/Details.module.css'
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import EmailIcon from '@mui/icons-material/Email';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RedditIcon from '@mui/icons-material/Reddit';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RightLatest from '../../components/RightLatest';
import axios from 'axios';
import {format} from "timeago.js";
import Link from 'next/link';
import Image from 'next/image';
import DetailsSwiper from '../../components/DetailsSwiper';
import { API_URL, API_URLS } from '../../components/config/url';
const Details = ({posts, relatedPosts}) => {
  console.log(relatedPosts, 'hello')
  const [btnGroupShown, setBtnGroupShown] = useState(false);

  // const status = posts.viewCounts;

  // const statusClass = (index) => {
  //   if (index - status < 1) return styles.done;
  //   if (index - status === 1) return styles.inProgress;
  //   if (index - status > 1) return styles.undone;
  // }

  const btnShown = () => {
    setBtnGroupShown(prev => !prev);
  }
  return (
    <div className={styles.details__wrapper} >
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
                {/* <div className={styles.details__comment}>
                  <ChatBubbleOutlineIcon fontSize='small'/>
                  <span>0</span>
                </div> */}
              </div>
              <div>
                <button>
                  <FacebookTwoToneIcon/>
                </button>
                <button>
                  <TwitterIcon/>
                </button>
                <button>
                  <PinterestIcon/>
                </button>
                <button>
                  <EmailIcon/>
                </button>
                <button onClick={btnShown}>
                  <MoreVertIcon/>
                </button>
              </div>
              <div className={`${btnGroupShown ? styles.detailsbtn__group : styles.details__btngroup}`}>
                <button>
                  <RedditIcon/>
                </button>
                <button>
                  <TelegramIcon/>
                </button>
                <button>
                  <WhatsAppIcon/>
                </button>
                <button>
                  <LinkedInIcon/>
                </button>
                <button>
                  <ExpandCircleDownIcon/>
                </button>
              </div>
            </div>

            <Image src={posts.photo} width={1000} height={500} alt=''/>
            <div dangerouslySetInnerHTML={{ __html: posts.desc }} ></div>
            
            <div className={styles.offer__feature}>
              <LocalOfferIcon/>
              <a href={`/categories/${posts?.category?.id}`}><button>{posts?.category?.categoryname}</button></a>
              <p>{posts.viewCounts} views</p>
            </div>
            {/* <div className={styles.history__group}>
              <span>NEXT STORY <KeyboardArrowRightIcon/></span>
              <div className={styles.isProgress}>
                <Link href='#' >{posts.title}</Link>
              </div>
            </div> */}
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


  return {
      props: {
          posts: finalRes,
          // cat : cats.results,
          relatedPosts: relate.results
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

