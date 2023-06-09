import React, { useEffect, useState } from 'react';
import styles from '../styles/LatestPosts.module.css';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import {format} from "timeago.js";
import { API_URLS } from './config/url';

const LatestPosts = () => {
    SwiperCore.use([Autoplay])
    const [latestPosts, setLatestPosts] = useState([]);

    useEffect(() => {
        fetchLatestPosts()
    }, [])

    const fetchLatestPosts = async () => {
        const fetch = await (await axios.get(API_URLS + '?sortBy=_id:desc')).data;
        // console.log(fetch)
        setLatestPosts(fetch)
    }
  return (
    <Swiper className={styles.google__swiper}
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
            delay: 2000,
            disableOnInteraction: false
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
    >
        {
            latestPosts?.results?.map((item, i) => {
                return (
                    <SwiperSlide className={styles.googlemust__container} key={i}>
                        <Link href={`/details/${item.id}`} passHref>
                            <Image src={item.photo} alt='' width={1000} height={1000}/>
                        </Link>
                        <div className={styles.google__main}>
                            <Link href={`/details/${item.id}`} passHref><h5>{item.title}</h5></Link>
                            <div className={styles.google__rain}>
                                <div className={styles.google__profile}>
                                    <PersonIcon fontSize='smaller'/>
                                    <span>{item.user?.name}</span>
                                </div>
                                <div className={styles.google__time}>
                                    <AccessTimeIcon fontSize='smaller'/>
                                    <span>{format(item.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                )
            })
        }
    </Swiper>
  )
}

export default LatestPosts;