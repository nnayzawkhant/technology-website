import React, { useState, useEffect } from 'react';
import styles from '../styles/Secondlatest.module.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {format} from "timeago.js";
import axios from 'axios';
import { API_URL, API_URLS } from './config/url';
import img from '../img/spinner.gif';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Link from 'next/link';
import Image from 'next/image';


const SecondLatest = () => {
    const [visiable, setVisiable] = useState(4);

    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchAllPosts()
    }, [page, visiable])

    const fetchAllPosts = async () => {
        setLoading(true)
        const fetch = await (await axios.get(API_URLS + `?sortBy=_id:desc&page=${page}&limit=${visiable}`)).data;
        console.log(fetch)
        setAllPosts(fetch)
        setPage(fetch?.page)
            setLoading(false)
    }

    const showMoreItems = () => {
        setVisiable(prev => prev + 2);
    }

    const handleNext = () => {
      
        setPage(page + 1)
      }
    
    const handlePrev = () => {
    setPage(page - 1)
    }
  return (
    <div className={styles.secondlate__container}>
        <div className={styles.page__btn}>
            <button className={styles.btn_pag} disabled={1 >= page} onClick={() => handlePrev()}><KeyboardArrowLeftIcon className={styles.key_btn}/></button>
            <span className={styles.page__span}>{allPosts.page}/{allPosts.totalPages}</span>
            <button className={styles.btn_pag} disabled={allPosts?.totalPages <= page} onClick={() => handleNext()}><KeyboardArrowRightIcon className={styles.key_btn}/></button>
        </div>
        <div className={styles.secondlate__wrapper}>
        
            {
                allPosts.results?.slice(0, visiable).map((item, i) => {
                    return (
                        <div className={styles.secondlate__card} key={i}>
                            <Link href={`details/${item.id}`} className={styles.secondlate__img} passHref><Image src={item.photo} width={1000} height={1000} alt=''/></Link>
                            <div className={styles.secondlate__late}>
                                <div className={styles.span__doc}>
                                    <div className={styles.span__under}></div>
                                    <Link href={`categories/${item.category.id}`} passHref><span className={styles.secondlate__span}>{item.category.categoryname}</span></Link>
                                </div>
                                <Link href={`details/${item.id}`} passHref><h2>{item.title}</h2></Link>
                                <div className={styles.secondlate__main}>
                                    <div className={styles.secondlate__little}>
                                        <Image src={item.user?.profilePic} width={40} height={40} alt=''/>
                                        <span>{item.user?.name}</span>
                                        <div className={styles.secondlate__icon}>
                                            <AccessTimeIcon fontSize='smaller'/>
                                            <span>{format(item.createdAt)}</span>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <button className={styles.secondlate__button} onClick={showMoreItems}>
            {
                loading ? (<Image src={img} width={40} height={40} alt=''/>) : (<span>LOAD MORE ...</span>)
            }
        </button>
    </div>
  )
}

export default SecondLatest