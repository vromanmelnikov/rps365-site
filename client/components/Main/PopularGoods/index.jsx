import styles from './popular-goods.module.scss'
import mainPageStyles from '../main.module.scss'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function PopularGoods({ }) {

    const items = [
        {},
        {},
        {},
    ]

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
                                    <div className="card-body">
                                        <h2 className="card-title">Название товара</h2>
                                        <p>Описание товара</p>
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-primary">Buy Now</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <a href='/catalog' className={`btn`}>В каталог <ShoppingCartIcon/></a>
            </div>
        </section>
    )
}