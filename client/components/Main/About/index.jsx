import styles from './about.module.scss'
import mainPageStyles from '../main.module.scss'
import Carousel from 'components/Carousel/Carousel'

function Objects({realObjects}) {

    return (
        <div className={`${styles.items}`}>
            <Carousel images={realObjects} height={'25rem'} expanded={true} />
        </div>
    )
}

function Certificates({sertificats}) {

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
                    Картельные сговоры не допускают ситуации, при которой базовые сценарии поведения пользователей могут быть преданы социально-демократической анафеме! С другой стороны, семантический разбор внешних противодействий не даёт нам иного выбора, кроме определения благоприятных перспектив. Приятно, граждане, наблюдать, как ключевые особенности структуры проекта и по сей день остаются уделом либералов, которые жаждут быть описаны максимально подробно.
                </p>
            </div>
            <div className={`${styles.certificates}`}>
                <h2 className={`${mainPageStyles.header}`}>Сертификаты качества</h2>
                <Certificates sertificats={props.sertificats} />
            </div>
            <div className={`${styles.objects}`}>
                <h2 className={`${mainPageStyles.header}`}>Наши продукты на реальных объектах</h2>
                <Objects realObjects={props.realObjects}/>
            </div>
        </section>
    )
}