import styles from './title-block.module.scss'
import mainPageStyles from '../main.module.scss'
import { Oswald } from 'next/font/google'
import React from 'react'

const oswald = Oswald({
    subsets: ['cyrillic'],
    weight: '500',
    style: 'normal'
})

function WordMenu({ children, styleName, products, category }) {

    return (
        <span className={`${styles.menu} ${styleName}`}>
            {children}
            <span className={`${styles.dropdown} dropdown`}>
                <ul className={`${styles.items} p-2 shadow menu`}>
                    {
                        products.length !== 0 
                        ?
                        products.map((item, index) => {
                            return(
                                <li key={index}><a target="_blank" href={`/product/${item.id}`}>
                                    <span className={`${styles.title}`}>{item.title}</span>
                                    <span className={`${styles.subtitle}`}>{item.subtitle}</span>
                                </a></li>
                            )
                        })
                        :
                        <h2>На данный момент товары не реализуются</h2>
                    }
                    <a className={`btn btn-primary ${styles.btn}`} href={`/catalog?category=${category}`}>Перейти в каталог</a>
                </ul>
            </span>
        </span>
    )
}

export default function TitleBlock({ products }) {

    return (
        <section className={`${styles.main}`}>
            <div style={{ backgroundColor: 'black' }} className={`${mainPageStyles.background}`}></div>
            <div className={`${styles.info}`}>
                <div className={`${styles.title}`}>
                    <div className={`${styles.words}`}>
                        <WordMenu styleName={`${styles.word_1}`} products={products.rubber} category='rubber'>
                            <span className={`${styles.word}`} >
                                <span className={`${styles.highlighted}`}>РЕ</span>
                                <span>ЗИНА</span>
                            </span>
                        </WordMenu>
                        <WordMenu styleName={`${styles.word_2}`} products={products.plastic} category='plastic'>
                            <span className={`${styles.word}`}>
                                <span className={`${styles.highlighted}`}>ПЛА</span>
                                <span>СТИК</span>
                            </span>
                        </WordMenu>
                        <WordMenu styleName={`${styles.word_3}`} products={products.steel} category='steel'>
                            <span className={`${styles.word}`}>
                                <span className={`${styles.highlighted}`}>СТ</span>
                                <span>АЛЬ</span>
                            </span>
                        </WordMenu>
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