import styles from './popular-goods.module.scss'
import mainPageStyles from '../main.module.scss'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'next/image'
import { STATIC_URL } from 'shared/api.config';
import Link from 'next/link';

export default function PopularGoods({ items }) {

    return (
        <section className={`${styles.main}`}>
            <div className={`${mainPageStyles.background}`}></div>
            <div className={`${mainPageStyles.content} ${styles.content}`}>
                <h2 className={`${mainPageStyles.header} ${mainPageStyles.color_header}`}>Популярные товары и услуги</h2>
                <div className={`${styles.items}`}>
                    {
                        items.map((item, index) => {
                            return (
                                <div key={index} className={`card bg-base-100 shadow-xl ${styles.item}`}>
                                    <figure>
                                        <Image src={`${STATIC_URL}/${item.types[0].images[0].url}`} width={512} height={0} alt="Shoes"></Image>
                                    </figure>
                                    <Link href={`/product/${item.id}`} className="card-body">
                                        <h2 className="card-title">{item.title}</h2>
                                        <p>{item.subtitle}</p>
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-primary">{item.typesCosts.min} - {item.typesCosts.max} руб.</button>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
                <a href='/catalog' className={`btn`}>В каталог <ShoppingCartIcon /></a>
            </div>
        </section>
    )
}