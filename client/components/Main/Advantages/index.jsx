import styles from './advantages.module.scss'
import mainPageStyles from '../main.module.scss'
import ChatIcon from '@mui/icons-material/Chat';

import RecommendIcon from '@mui/icons-material/Recommend';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import StarIcon from '@mui/icons-material/Star';

export default function Advantages({ }) {

    const items = [
        {
            title: 'Высокое качество',
            items: [
                'Срок эксплуатации продукции более 10 лет',
                'Высокое качество комплектующих',
                'Маслобензостойкая резина',
            ],
            icon: <RecommendIcon fontSize='large'/>
        },
        {
            title: 'Фокус на клиента',
            items: [
                'Цены ниже импортных аналогов в 2-4 раза',
                'Сроки поставки от 2 дней',
                'Изготовдение по спецзаказам по вашим требованиям'
            ],
            icon: <PersonSearchIcon fontSize='large'/>
        },
        {
            title: 'Сертификация',
            items: [
                'Собственное производство',
                'Сертифицированная продукция',
            ],
            icon: <DoneAllIcon fontSize='large'/>
        },
        {
            title: 'Оличительные характеристики товара',
            items: [
                'Проходные муфты подходят сразу на три типоразмера труб',
                'Диаметр муфт от 16 до 250 мм'
            ],
            icon: <StarIcon fontSize='large'/>
        }
    ]

    return (
        <section className={`${styles.main}`}>
            <h2 className={`${mainPageStyles.header} ${styles.header}`}>Почему Вам стоит покупать у нас</h2>
            <div className={`${styles.items}`}>
                {
                    items.map((advantage, index) => {
                        return (
                            <div key={index} className={`${styles.item}`}>
                                <span className={`${styles.title}`}>
                                    {advantage?.icon}
                                    <p>{advantage.title}</p>
                                </span>
                                <div className={`${styles.advantages}`}>
                                    {
                                        advantage.items.map(
                                            (item, itemIndex) => {
                                                return(
                                                    <p className={`${styles.advantage}`}>- {item}</p>
                                                )
                                            }
                                        )
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <a href='#feedbacks' className={`btn btn-primary ${styles.btn}`}>Отзывы о нашей работе <ChatIcon/> </a>
        </section>
    )
}