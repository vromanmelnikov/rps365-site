import axios from "axios"
import { useEffect, useState } from "react"
import { ITEMS_URL } from "shared/api.config"

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import styles from './items.module.scss'
import Link from "next/link";

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
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map(
                            (item, index) => {
                                return(
                                    <tr key={index}>
                                        <th>{item.id}</th>
                                        <td>{item.title}</td>
                                        <td>{item.subtitle}</td>
                                        <td ><Link href={``} className={`btn btn-circle btn-warning btn-sm`}><EditIcon /></Link></td>
                                        <td><Link href={``} className={`btn btn-circle  btn-error btn-sm`}><DeleteForeverIcon /></Link></td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}