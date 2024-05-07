import styles from "./item.module.scss";
import Image from "next/image";
import Link from "next/link";
import { STATIC_URL } from "shared/api.config";

function Photo({ image }) {
    const URL = `${STATIC_URL}/${image.url}`;

    return <Image src={URL} width="1600" height="0" alt="Фото" />;
}

function Images({ images }) {
    return (
        <div className={`${styles.image}`}>
            {
                //TODO: изображения с нескольких типов
            }
            <Photo image={images[0]} />
        </div>
    );
}

export default function Item({ item }) {
    const images = item.types.map((type) => type.images[0]);

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
                <Link
                    href={`/product/${item.id}`}
                    className={`${styles.btn} btn btn-primary`}
                >
                    {item.typesCosts.min === item.typesCosts.max
                        ? `${item.typesCosts.min} руб.`
                        : `${item.typesCosts.min} - ${item.typesCosts.max} руб.`}
                </Link>
            </div>
        </div>
    );
}
