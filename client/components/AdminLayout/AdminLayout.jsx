import styles from "./admin-layout.module.scss";
import MainStyles from "../../styles/Main.module.scss";

import { Montserrat } from "next/font/google";
import AdminSide from "./AdminSide";


const montserrat = Montserrat({
  subsets: ['cyrillic', 'latin']
})

export default function AdminLayout({ children }) {
    return (
        <div className={`${styles.main} ${montserrat.className} ${MainStyles.container} container`} data-theme="mytheme">
          <AdminSide />
          <div className={`${styles.content} bg-base-200 w-full rounded-box`}>{children}</div>
        </div>
    );
  }