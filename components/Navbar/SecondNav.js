import React, {useEffect, useState} from 'react';
import styles from '../../styles/Secondnavbar.module.css';
import Link from 'next/link';
import axios from 'axios';
import { API_CATS } from '../config/url';

const SecondNav = () => {
  const [allCats, setAllCats] = useState([])

  const fetchCat = async () => {
    const cats = await (await axios.get(API_CATS + `?page=1&limit=4`)).data;
    setAllCats(cats)
    console.log(cats)

  }

  useEffect(() => {
    fetchCat()
  }, [])
  

  return (
    <div className={styles.second__wrapper}>
      <div><h1>Technology</h1></div>
      <nav>
        <ul>
          <li>
            <Link href="/">HOME</Link>
          </li>
          {
            allCats?.results?.map((item, i) => {
              return (
                <li key={i}>
                  <Link href={`/categories/${item.id}`}>{item.categoryname}</Link>
                </li>
              )
            })
          }
        </ul>
      </nav>
    </div>
  );
};

export default SecondNav;
