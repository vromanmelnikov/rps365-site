import Image from 'next/image';
import styles from './images.module.scss'
import { useEffect, useState } from 'react';
import { STATIC_URL } from 'shared/api.config';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Photo({ image, isCurrent }) {

  const URL = `${STATIC_URL}/${image}`

  return (
    <Image style={isCurrent === false && { display: 'none' }} className={`${styles.image}`} src={URL} width='1600' height='0' alt='Фото товара'/>
  )
}

export default function Images({ images }) {

  const [current, setCurrent] = useState(0)

  function changeCurrent(fleshCurrent) { 
    if (fleshCurrent >= 0 && fleshCurrent < images.length) {
      setCurrent(fleshCurrent)
    }
  }

  useEffect(
    ()=>{
      setCurrent(0)
    }, [images]
  )

  return (
    <div className={`${styles.carousel}`}>
      <button className={`${styles.leftArrow} btn`} onClick={() => changeCurrent(current - 1)}>
        <ArrowBackIcon />
      </button>
      {
        images.map((item, index) => {
          return (
            <Photo key={index} image={item} isCurrent={index === current} />
          )
        })
      }
      <button className={`${styles.rightArrow} btn`} onClick={() => changeCurrent(current + 1)}>
        <ArrowBackIcon />
      </button>
    </div>
  );
}
