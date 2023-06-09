import React, { useState } from 'react';
import styles from '../styles/RightLatest.module.css';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import { mustReadDatas } from './mustReadDatas';

const RightLatest = () => {
  const [mustread, setMustread] = useState(0);

  const handleMustChecked = (index) => {
    setMustread(index)
  }
  return (
    <div className={styles.rightlate__wrapper}>
      <img src='https://1.bp.blogspot.com/-DDHx9Lf12jg/YE859Qa6AvI/AAAAAAAAFks/hXfL-J7DXvcjsmLgdtLLKwb8GFcEo7MdACLcBGAsYHQ/s16000-rw/adso.jpg'/>
      <div className={styles.like__container}>
        <div className={styles.rightface__btn}>
          <FacebookOutlinedIcon/>

        </div>
        <div className={styles.rightperset__btn}>
          <PinterestIcon/>

        </div>
        {/* <div className={styles.righttwitter__btn}>
          <TwitterIcon/>

        </div> */}
        <div className={styles.rightIntag__btn}>
          <InstagramIcon/>

        </div>
      </div>
      {/* <div className={styles.subscribe}>
        <h2>Subscribe to Our New Stories</h2>
        <div className={styles.email__group}>
          <EmailIcon fontSize='small'/>
          <input type='email' placeholder='Email Address...'/>
        </div>
        <button className={styles.btn__card}>
          <SendIcon fontSize='small'/>
          <span>SUBMIT</span>
        </button>
      </div> */}
      <div className={styles.right__must}>
        <h2>READ</h2>
          <div className={styles.must__title}>
            {
              mustReadDatas.map((item, i) => {
                return (
                    <ul key={i}>
                      <li onClick={() => handleMustChecked(i)}>{item.name}</li>
                    </ul>
                )
              })
            }
          </div>
      </div>
      <div>
        {
          mustReadDatas[mustread].element
        }
      </div>
    </div>
  )
}

export default RightLatest