import styles from './advantages.module.scss'
import mainPageStyles from '../main.module.scss'
import ChatIcon from '@mui/icons-material/Chat';

export default function Advantages({ }) {

    const items = [
        {},
        {},
        {},
        {},
        {},
        {},
    ]

    return (
        <section className={`${styles.main}`}>
            <h2 className={`${mainPageStyles.header} ${styles.header}`}>Почему Вам стоит покупать у нас</h2>
            <div className={`${styles.items}`}>
                {
                    items.map((item, index) => {
                        return (
                            <div key={index} className={`${styles.item}`}></div>
                        )
                    })
                }
            </div>
            <a href='#feedbacks' className={`btn btn-primary ${styles.btn}`}>Отзывы о нашей работе <ChatIcon/> </a>
        </section>
    )
}