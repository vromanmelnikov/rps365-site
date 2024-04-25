import styles from './about.module.scss'
import mainPageStyles from '../main.module.scss'
import Carousel from 'components/Carousel/Carousel'

function Objects({ realObjects }) {

    return (
        <div className={`${styles.items}`}>
            <Carousel images={realObjects} height={'25rem'} expanded={true} />
        </div>
    )
}

function Certificates({ sertificats }) {

    return (
        <div className={`${styles.items}`}>
            <Carousel images={sertificats} height={'25rem'} expanded={false} />
        </div>
    )
}

export default function AboutBlock(props) {

    return (
        <section id='about' className={`${styles.main}`}>
            <div className={`${styles.about}`}>
                <h2 className={`${mainPageStyles.header}`}>О нас</h2>
                <p>
                    "РЕПЛАСТ-365" - это современное решение для проблем, подкрепленное более чем десятилетним опытом в сфере герметизации. Мы всегда слушаем наших партнеров, постоянно совершенствуем и обновляем нашу продукцию, добавляя новые решения. Наши продукты ориентированы на широкий спектр предприятий, где требуется качественная герметизация коммуникаций, включая нефтегазовую промышленность, строительство АЗС и НПЗ, а также зданий и других объектов.
                </p>
                <p>
                Мы предлагаем безопасные и высокоэффективные маслобензостойкие муфты по цене от производителя. Для получения более подробной информации, звоните по указанному номеру.
                </p>
            </div>
            <div className={`${styles.certificates}`}>
                <h2 className={`${mainPageStyles.header}`}>Мы учавствуем в выставках</h2>
                <Certificates sertificats={props.sertificats} />
            </div>
            <div className={`${styles.objects}`}>
                <h2 className={`${mainPageStyles.header}`}>Наши продукты на реальных объектах</h2>
                <Objects realObjects={props.realObjects} />
            </div>
        </section>
    )
}