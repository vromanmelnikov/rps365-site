import styles from './feedbacks.module.scss'
import mainPageStyles from '../main.module.scss'
import { STATIC_URL } from 'shared/api.config'
import Carousel from 'components/Carousel/Carousel'

export default function Feedbacks() {

    const images = [
        
        {
            url: `${STATIC_URL}/feedback_1.jpg`
        },
        {
            url: `${STATIC_URL}/feedback_2.jpg`
        },
        {
            url: `${STATIC_URL}/feedback_3.jpg`
        },
        {
            url: `${STATIC_URL}/feedback_4.jpg`
        },
        {
            url: `${STATIC_URL}/feedback_5.jpg`
        },
    ]

    return (
        <section className={`${styles.main}`} id='feedbacks'>
            <div className={`${mainPageStyles.background}`}></div>
            <div className={`${mainPageStyles.content} ${styles.content}`}>
                <h2 className={`${mainPageStyles.header} ${mainPageStyles.color_header}`}>Отзывы наших клиентов</h2>
                <Carousel images={images} height={'25rem'} expanded={false}/>
            </div>
        </section>
    )
}