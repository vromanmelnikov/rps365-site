import Link from "next/link";
import styles from "./admin-side.module.scss";

export default function AdminSide() {

    return (
        <ul className={`${styles.main} menu bg-base-200 w-56 rounded-box`} >
            <li><Link href="/admin/items">Товары и услуги</Link></li>
            <li><Link href="/admin/images">Изображения</Link></li>
            {/* <li><a>Item 3</a></li> */}
        </ul>
    )
}