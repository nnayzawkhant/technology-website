import React from 'react';
import styles from '../styles/NatureSwiper.module.css';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import Image from 'next/image';


const NatureSwiper = ({categoriesPosts}) => {
   
  return (
    <>
        <Swiper className={styles.swiper__wrapper}
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            // loop={true}
            slidesPerView="auto"
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
        >
        {categoriesPosts?.results?.map((item, i) => {
            return (
                    <SwiperSlide className={styles.single__swiper} key={i}>
                        <Link href={`/details/${item.id}`} passHref>
                            <Image src={item.photo} width={1000} height={1000} alt=''/>
                            <span>{item.title}</span>
                        </Link>
                    </SwiperSlide>
            )
        })}
    </Swiper>
    </>
  )
}

export default NatureSwiper