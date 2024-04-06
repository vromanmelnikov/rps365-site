import styles from "./layout.module.scss";
import MainStyles from "../../styles/Main.module.scss";
import Header from "components/Header";
import Footer from "components/Footer";

import { Montserrat } from "next/font/google";


const montserrat = Montserrat({
  subsets: ['cyrillic', 'latin']
})

// className={montserrat.className} 

export default function Layout({ children }) {
  return (
      <div className={`${styles.main} ${montserrat.className}`} data-theme="mytheme">
      {/* <div className={`${styles.main}`} data-theme="mytheme"> */}
        <Header />
        <div className={`${MainStyles.container} ${styles.content}`}>{children}</div>
        <Footer />
      </div>
  );
}
