import React, {useEffect, useRef, useState} from 'react';
import styles from '../../styles/Secondnavbar.module.css';
import Link from 'next/link';
import axios from 'axios';
import { API_CATS } from '../config/url';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import DehazeIcon from '@mui/icons-material/Dehaze';

const SecondNav = ({setSearch}) => {
  
  const [allCats, setAllCats] = useState([])

  const navRef = useRef();

  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState(false);
  const navToggle = () => {
      if (active === "nav__menu") {
          setActive("nav__menu nav__active");
      } else setActive("nav__menu");
      setIcon(prev => !prev)
  };

  const fetchCat = async () => {
    const cats = await (await axios.get(API_CATS + `?page=1&limit=4`)).data;
    setAllCats(cats)
    console.log(cats)

  }


  useEffect(() => {
    fetchCat()
  }, [])
  

  return (
    <>
    <div className={styles.second__wrapper}>
      <div><h1>ANYAR News</h1></div>
      <nav className='nav__cls'>
        <ul>
          <li className="nav__item">
            <Link href="/" style={{ textDecoration: 'none' }} className="nav__link">HOME</Link>
          </li>
          <li className="nav__item">
            <Link href="/contact" style={{ textDecoration: 'none' }} className="nav__link">CONTACT</Link>
          </li>
          <li className="nav__item">
            <Link href="/about" style={{ textDecoration: 'none' }} className="nav__link">ABOUT</Link>
          </li>
          {
            allCats?.results?.slice(0,2).map((item, i) => {
              return (
                <li key={i} className="nav__item">
                  <Link href={`/categories/${item.id}`} style={{ textDecoration: 'none' }} className="nav__link">{item.categoryname}</Link>
                </li>
              )
            })
          }
        </ul>
        
      </nav>
      
      <div className={styles.header_right}>
            <div className={styles.search}>
              <input type="search" placeholder='Search...' onChange={e => setSearch(e.target.value)} className={styles.search_input}/>
              <SearchIcon className={styles.searcn_icon}/>
            </div>
          </div>
          
      {
                    icon ? <div onClick={navToggle} className='header-button' >
                         <DehazeIcon />
                    </div> :
                     <div onClick={navToggle} className='header-button' >
                        <DisabledByDefaultIcon />
                    </div>
                }
    </div>
    <ul className={active}>
    <li className="nav__item">
      <Link href="/" style={{ textDecoration: 'none' }} className="nav__link">HOME</Link>
    </li>
    <li className="nav__item">
            <Link href="/contact" style={{ textDecoration: 'none' }} className="nav__link">CONTACT</Link>
          </li>
          <li className="nav__item">
            <Link href="/about" style={{ textDecoration: 'none' }} className="nav__link">ABOUT</Link>
          </li>
    {
      allCats?.results?.map((item, i) => {
        return (
          <li key={i} className="nav__item">
            <Link href={`/categories/${item.id}`} style={{ textDecoration: 'none' }} className="nav__link">{item.categoryname}</Link>
          </li>
        )
      })
    }
  </ul>
  </>
  );
};

export default SecondNav;
