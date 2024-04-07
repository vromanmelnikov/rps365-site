import styles from './info.module.scss'
import mainPageStyles from '../main.module.scss'
import RouteIcon from '@mui/icons-material/Route';

export default function Info() {

    return (
        <section className={`${styles.main}`}>
            <h2 className={`${mainPageStyles.header} ${styles.header}`}>Как с нами связаться</h2>
            <div className={`${styles.blocks}`}>
                <div className={`${styles.map}`}>
                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A6c7bb92e99aeeeb5141843a37acccd917c3617d648134caeb6e4af021ea0dc51&amp;source=constructor" width="100%" height="300"></iframe>
                </div>
                <div className={`${styles.info}`}>
                    <div className={`${styles.item}`}>
                        <h3>Наши контакты</h3>
                        <p>8 999 999 99 99</p>
                        <p>8 999 999 99 99</p>
                    </div>
                    <div className={`${styles.item}`}>
                        <h3>Наш адрес</h3>
                        <p>г. Заречный, ул. 20-ая дорога, д. 33</p>
                        <p>Пн-Сб: 10:00-19:00</p>
                    </div>
                    <a className='btn btn-primary' target='_blank' href='https://yandex.ru/maps/11098/zarechny/?ll=45.174128%2C53.205237&mode=routes&rtext=~53.205237%2C45.174129&rtt=mt&ruri=~ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgo0MDM2Njk1NjQwEmbQoNC-0YHRgdC40Y8sINCf0LXQvdC30LXQvdGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMLCDQl9Cw0YDQtdGH0L3Ri9C5LCDRg9C70LjRhtCwIDIwLdGPINCU0L7RgNC-0LPQsCwgMzMiCg1OsjRCFSrSVEI%2C&z=16.7'>
                        Проложить маршрут
                        <RouteIcon />
                    </a>
                </div>
            </div>
        </section>
    )
}