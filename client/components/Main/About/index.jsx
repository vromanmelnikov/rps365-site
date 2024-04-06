import styles from './about.module.scss'
import mainPageStyles from '../main.module.scss'
import Carousel from 'components/Carousel/Carousel'
import { STATIC_URL } from 'shared/api.config'

// import sert_1 from 'public/images/sertifiсat_1.jpg'
// import sert_2 from 'public/images/sertifiсat_2.jpg'
// import sert_3 from 'public/images/sertifiсat_3.jpg'
// import sert_4 from 'public/images/sertifiсat_4.jpg'
// import sert_5 from 'public/images/sertifiсat_5.jpg'
// import sert_6 from 'public/images/sertifiсat_6.jpg'
// import sert_7 from 'public/images/sertifiсat_7.jpg'

function Objects() {

    const images = [
        {
            url: `${STATIC_URL}/real_object_1.jpg`
        },
        {
            url: `${STATIC_URL}/real_object_2.jpg`
        },
        {
            url: `${STATIC_URL}/real_object_3.jpg`
        },
        {
            url: `${STATIC_URL}/real_object_4.jpg`
        },
        {
            url: `${STATIC_URL}/real_object_5.jpg`
        },
        {
            url: `${STATIC_URL}/real_object_6.jpg`
        },
        {
            url: `${STATIC_URL}/real_object_7.jpg`
        },
        {
            url: `${STATIC_URL}/real_object_8.jpg`
        },
        {
            url: `${STATIC_URL}/real_object_9.jpg`
        },
        {
            url: `${STATIC_URL}/real_object_10.jpg`
        },
        {
            url: `${STATIC_URL}/real_object_11.jpg`
        },
        {
            url: `${STATIC_URL}/real_object_12.jpg`
        },
        {
            url: `${STATIC_URL}/real_object_13.jpg`
        },
        {
            url: `${STATIC_URL}/real_object_14.jpg`
        },
        {
            url: `${STATIC_URL}/real_object_15.jpg`
        },
        {
            url: `${STATIC_URL}/real_object_16.jpg`
        },
    ]

    return (
        <div className={`${styles.items}`}>
            <Carousel images={images} height={'25rem'} expanded={true}/>
        </div>
    )
}

function Certificates() {

    const images = [
        
        {
            url: `${STATIC_URL}/sertificat_1.jpg`
        },
        {
            url: `${STATIC_URL}/sertificat_2.jpg`
        },
        {
            url: `${STATIC_URL}/sertificat_3.jpg`
        },
        {
            url: `${STATIC_URL}/sertificat_4.jpg`
        },
        {
            url: `${STATIC_URL}/sertificat_5.jpg`
        },
        {
            url: `${STATIC_URL}/sertificat_6.jpg`
        }
    ]

    return (
        <div className={`${styles.items}`}>
            <Carousel images={images} height={'25rem'} expanded={false}/>
        </div>
    )
}

export default function AboutBlock({ }) {

    return (
        <section className={`${styles.main}`}>
            <div className={`${styles.about}`}>
                <h2 className={`${mainPageStyles.header}`}>О нас</h2>
                <p>
                    Картельные сговоры не допускают ситуации, при которой базовые сценарии поведения пользователей могут быть преданы социально-демократической анафеме! С другой стороны, семантический разбор внешних противодействий не даёт нам иного выбора, кроме определения благоприятных перспектив. Приятно, граждане, наблюдать, как ключевые особенности структуры проекта и по сей день остаются уделом либералов, которые жаждут быть описаны максимально подробно.
                </p>
            </div>
            <div className={`${styles.certificates}`}>
                <h2 className={`${mainPageStyles.header}`}>Сертификаты качества</h2>
                <Certificates />
            </div>
            <div className={`${styles.objects}`}>
                <h2 className={`${mainPageStyles.header}`}>Наши продукты на реальных объектах</h2>
                <Objects/>
            </div>
        </section>
    )
}