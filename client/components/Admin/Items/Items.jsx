import axios from "axios";
import { useEffect, useState } from "react";
import { ITEM_POPULARITY_URL, ITEMS_URL } from "shared/api.config";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import styles from "./items.module.scss";
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
    );
}

export default function Items() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(ITEMS_URL).then((res) => {
            setItems(res.data.items);
        });
    }, []);

    function changePopularity(id, index) {
        const requestOptions = {
            method: "PUT",
            redirect: "follow",
        };

        fetch(`${ITEM_POPULARITY_URL}/${id}`, requestOptions)
            .then((response) =>
                response.ok ? response : Promise.reject(response)
            )
            .then((result) => {
                let newItems = [...items];
                // console.log(result)
                newItems[index].popular = !newItems[index].popular;
                setItems(newItems);
            })
            .catch((error) => {
                console.log(error);
                if (error.status === 503) {
                    alert("Нельзя добавлять больше 3 популярных товаров!");
                }
            });
    }

    function deleteItem(id) {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow",
        };

        fetch(`${ITEMS_URL}/${id}`, requestOptions)
            .then((response) =>
                response.ok ? response : Promise.reject(response)
            )
            .then((result) => {
                let newItems = items.filter(item => item.id !== id)
                setItems(newItems)
            })
            .catch((error) => console.error(error));
    }

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
                        <th></th>
                        <th>Популярный</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th>{item.id}</th>
                                <td>{item.title}</td>
                                <td>{item.subtitle}</td>
                                <td style={{ padding: ".75rem .25rem" }}>
                                    <Link
                                        href={`/admin/change/${item.id}`}
                                        className={`btn btn-circle btn-warning btn-sm`}
                                    >
                                        <EditIcon />
                                    </Link>
                                </td>
                                <td style={{ padding: ".75rem .25rem" }}>
                                    <button
                                        className={`btn btn-circle  btn-error btn-sm`}
                                        onClick={() => deleteItem(item.id)}
                                    >
                                        <DeleteForeverIcon />
                                    </button>
                                </td>
                                <td style={{ padding: ".75rem .25rem" }}>
                                    <Link
                                        href={`/product/${item.id}`}
                                        target="_blank"
                                        className={`btn btn-circle  btn-primary btn-sm`}
                                    >
                                        <OpenInNewIcon />
                                    </Link>
                                </td>
                                <td className={`${styles.popularCell}`}>
                                    <input
                                        type="checkbox"
                                        checked={item.popular === true}
                                        readOnly
                                        className="checkbox checkbox-primary"
                                        onClick={() =>
                                            changePopularity(item.id, index)
                                        }
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
