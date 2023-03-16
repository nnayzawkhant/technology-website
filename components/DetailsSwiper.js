import React from 'react';
import styles from '../styles/DetailsSwiper.module.css';

import { Navigation, Pagination, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import Image from 'next/image';
import { API_URLS } from './config/url';

const DetailsSwiper = ({cat}) => {
  SwiperCore.use([Autoplay])
  return (
        <div>
          <Swiper className={styles.swiper__wrapper}
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={5}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false
                }}
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
            {cat.map((item, i) => {
                return (
                        <SwiperSlide className={styles.single__swiper} key={i}>
                            
                            <Link href={`${item.id}`} passHref>
                              <Image src={item.photo} alt='' width={500} height={500}/>
                              <span>{item.title}</span>
                            </Link>
                        </SwiperSlide>
                )
            })}
        </Swiper>
        </div>
  )
}

export const getServerSideProps = async () => {

  const res = await (await axios.get(API_URLS)).data;


  return {
      props: {
          swipers : res.results
      },
  }
};

export default DetailsSwiper