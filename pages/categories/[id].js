import AccessTimeIcon from '@mui/icons-material/AccessTime'
import styles from '../../styles/Categories.module.css';
import React, { useEffect, useState } from 'react'
import RightLatest from '../../components/RightLatest';
import axios from 'axios';
import {format} from "timeago.js";
import Link from 'next/link';
import Image from 'next/image';
import { API_URL, API_URLS } from '../../components/config/url';
import { useRouter } from 'next/router'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const Categories = () => {
    // console.log(allCats.results?.category)
    let router = useRouter();
    const [visiable, setVisiable] = useState(3);
    const [allCats, setAllCats] = useState([])
    const [page, setPage] = useState(1);
    let id = router?.query?.id

    const fetchCats = async (id) => {
        const allResults = await (await axios.get(API_URLS + `?category=${id}&page=${page}&limit=${visiable}`)).data;
        setAllCats(allResults)
        setPage(allResults.page);
    }

    useEffect(() => {
        if (router.asPath !== router.route) {
            fetchCats(id)
          }
    }, [router, page, visiable])

    const showMoreItems = () => {
        setVisiable(prev => prev + 3);
    }

    const handleNext = () => {
      
        setPage(page + 1)
      }
    
    const handlePrev = () => {
    setPage(page - 1)
    }

  return (
    <div className={styles.categories__container}>
        
        <div className={styles.firstlatest__container}>
        <div className={styles.page__btn}>
            <button className={styles.btn_pag} disabled={1 >= page} onClick={() => handlePrev()}><KeyboardArrowLeftIcon className={styles.key_btn}/></button>
            <span className={styles.page__span}>{allCats.page}/{allCats.totalPages}</span>
            <button className={styles.btn_pag} disabled={allCats?.totalPages <= page} onClick={() => handleNext()}><KeyboardArrowRightIcon className={styles.key_btn}/></button>
        </div>
            
        {
            allCats?.results?.map((item, i) => {
                return (
                    <div className={styles.firstlatest__card} key={i}>
                        <Link href={`/details/${item.id}`} className={styles.first__img} passHref><Image src={item.photo} width={500} height={500} alt=''/></Link>
                        <div className={styles.first__late}>
                            <div className={styles.span__doc}>
                                <div className={styles.span__under}></div>
                                <Link href={`${item.category?.id}`} passHref><span className={styles.first__span}>{item.category?.categoryname}</span></Link>
                            </div>
                            <Link href={`/details/${item.id}`} passHref><h2>{item.title}</h2></Link>
                            <div className={styles.first__main}>
                                <div className={styles.first__little}>
                                    <Image src={item.user?.profilePic} width={30} height={30} alt=''/>
                                    <span>{item.user?.name}</span>
                                    <div className={styles.first__icon}>
                                        <AccessTimeIcon fontSize='small'/>
                                        <span>{format(item.createdAt)}</span>
                                    </div>
                                </div>
                                
                            </div>
                                <p dangerouslySetInnerHTML={{ __html: item.desc.slice(0, 150)}} />
                        </div>
                    </div>
                )
            })
        }
        <button className={styles.firstlate__button} onClick={showMoreItems}>LOAD MORE</button>
    </div>
      <div className={styles.categories__right}>
              <RightLatest/>
            
          </div>
    </div>
  )
}

// export const getServerSideProps = async ({params}) => {
//     const allResults = await (await axios.get(API_URLS + `?category=${params.id}`)).data;
//     return {
//         props: {
//             allCats : allResults,
//         },
//     }
//   };

export default Categories