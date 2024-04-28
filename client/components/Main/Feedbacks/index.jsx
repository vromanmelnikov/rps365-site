import styles from './feedbacks.module.scss'
import mainPageStyles from '../main.module.scss'
import { STATIC_URL } from 'shared/api.config'
import Carousel from 'components/Carousel/Carousel'

export default function Feedbacks({feedbacks}) {

    return (
        <section className={`${styles.main}`} id='feedbacks'>
            <div className={`${mainPageStyles.background}`}></div>
            <div className={`${mainPageStyles.content} ${styles.content}`}>
                <h2 className={`${mainPageStyles.header} ${mainPageStyles.color_header}`}>Отзывы наших клиентов</h2>
                <Carousel images={feedbacks} height={'30rem'} expanded={false}/>
            </div>
        </section>
    )
}