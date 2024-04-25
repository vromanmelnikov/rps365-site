import styles from "./item.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Image from "next/image";
import Link from "next/link";
import { STATIC_URL } from "shared/api.config";

function getCostRange(types) {
  const costs = types.map((item) => item.cost);

  const result = {
    min: Math.min(...costs),
    max: Math.max(...costs),
  };

  return result;
}

function Photo({ image }) {

  const URL = `${STATIC_URL}/${image.url}`

  return (
    <Image src={URL} width='1600' height='0' alt="Фото"/>
  )
}

function Images({ images }) {

  return (
    <div className={`${styles.image}`}>
      {/* {
        images.map((item, index) => {
          return (
            <Photo key={index} image={item} />
          )
        })
      } */}
      <Photo image={images[0]} />
    </div>
  )
}

export default function Item({ item }) {
  const costRange = getCostRange(item.types);

  const images = item.types.map(type => type.images[0])

  return (
    <div className={`${styles.item} shadow-xl bg-base-200`}>
      <Link href={`/product/${item.id}`}>
        <Images images={images} />
      </Link>
      <div className={`${styles.info}`}>
        <Link href={`/product/${item.id}`}>
          <span className={`${styles.title}`}>{item.title}</span>
        </Link>
        <span className={`${styles.subtitle}`}>{item.subtitle}</span>
      </div>
      <div className={`${styles.btns}`}>
        <Link href={`/product/${item.id}`} className={`${styles.btn} btn btn-primary`}>
          {costRange.min} - {costRange.max} руб.
        </Link>
        {/* <label style={{ height: "100%" }} className="swap">
          <input type="checkbox" />
          <FavoriteBorderIcon
            color="primary"
            className={`${styles.icon} swap-off`}
          />
          <FavoriteIcon color="primary" className={`${styles.icon} swap-on`} />
        </label> */}
      </div>
    </div>
  );
}
