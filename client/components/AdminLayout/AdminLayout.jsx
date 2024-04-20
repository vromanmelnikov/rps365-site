import styles from "./admin-layout.module.scss";
import MainStyles from "../../styles/Main.module.scss";
import AdminHeader from "./AdminHeader/AdminHeader";

import { Montserrat } from "next/font/google";


const montserrat = Montserrat({
  subsets: ['cyrillic', 'latin']
})

export default function AdminLayout({ children }) {
    return (
        <div className={`${styles.main} ${montserrat.className}`} data-theme="mytheme">
          <AdminHeader />
          <div className={`${MainStyles.container} ${styles.content}`}>{children}</div>
        </div>
    );
  }