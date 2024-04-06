import styles from './title-block.module.scss'
import mainPageStyles from '../main.module.scss'
import { Oswald } from 'next/font/google'

const oswald = Oswald({
    subsets: ['cyrillic'],
    weight: '500',
    style: 'normal'
})

export default function TitleBlock({ }) {

    return (
        <section className={`${styles.main}`}>
            <div style={{backgroundColor: 'black'}} className={`${mainPageStyles.background}`}></div>
            <div className={`${styles.info}`}>
                {/* <div className={`${styles.title} ${oswald.className}`}> */}
                <div className={`${styles.title}`}>
                    <div className={`${styles.words}`}>
                        <span className={`${styles.word}`}>
                            <span className={`${styles.highlighted}`}>РЕ</span>
                            <span>ЗИНА</span>
                        </span>
                        <span className={`${styles.word}`}>
                            <span className={`${styles.highlighted}`}>ПЛА</span>
                            <span>СТИК</span>
                        </span>
                        <span className={`${styles.word}`}>
                            <span className={`${styles.highlighted}`}>СТ</span>
                            <span>АЛЬ</span>
                        </span>
                        <div className={`${styles.line} divider divider-primary`}></div>
                    </div>
                    <div className={`${styles.line} divider divider-primary divider-horizontal`}></div>
                    <div className={`${styles.numbers}`}>
                        365
                    </div>
                </div>
                <p className={`${styles.desc}`}>Муфты компании «РЕПЛАСТ 365» - это надежная герметизация Ваших сетей, трубных разводок, кабельных линий от различных влияний внешних факторов.</p>
            </div>
        </section>
    )
}