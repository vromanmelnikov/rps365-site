import styles from "./admin-side.module.scss";

export default function AdminSide() {

    return (
        <ul className={`${styles.main} menu bg-base-200 w-56 rounded-box`} >
            <li><a href="/admin/items">Товары и услуги</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 3</a></li>
        </ul>
    )
}