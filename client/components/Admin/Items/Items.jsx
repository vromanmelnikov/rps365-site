import axios from "axios"
import { useEffect, useState } from "react"
import { ITEMS_URL } from "shared/api.config"

import styles from './items.module.scss'

function Item({ item }) {

    return (
        <div className={`${styles.item} card bg-base-100 shadow-xl`}>
            <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p>{item.subtitle}</p>
                <div className="card-actions">
                    <button className="btn btn-warning">Изменить</button>
                    <button className="btn btn-error">Удалить</button>
                </div>
            </div>
        </div>
    )
}

export default function Items() {

    const [items, setItems] = useState([])

    useEffect(
        () => {
            axios.get(ITEMS_URL).then(
                (res) => {

                    setItems(res.data.items)
                }
            )
        }, []
    )

    return (
        <div className={`${styles.items}`}>
            {
                items.map(
                    (item, index) => {
                        return (
                            <Item key={index} item={item} />
                        )
                    }
                )
            }
        </div>
    )
}