import styles from "./layout.module.scss";
import MainStyles from "../../styles/Main.module.scss";
import Header from "components/Header";
import Footer from "components/Footer";

import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import WarningIcon from '@mui/icons-material/Warning';

// import { Montserrat } from "next/font/google";
import RequestModal from "components/RequestModal";

// const montserrat = Montserrat({
//   subsets: ['cyrillic', 'latin']
// })

// className={montserrat.className} 

export default function Layout({ children }) {
  return (
    // <div className={`${styles.main} ${montserrat.className}`} data-theme="mytheme">
    <div className={`${styles.main}`} data-theme="mytheme">
      <Header />
      <div role="alert" id="requestAlert" className={`sendMailDone alert alert-success`}>
        <MarkEmailReadIcon />
        <span>В скором времени мы ответим на Вашу заявку!</span>
        <div>
        </div>
      </div>
      <div role="alert" id="errorAlert" className={`sendMailDone alert alert-error`}>
        <WarningIcon />
        <span>Возникла ошибка!</span>
        <div>
        </div>
      </div>
      <div className={`${MainStyles.container} ${styles.content}`}>{children}</div>
      <Footer />
      <RequestModal />
    </div>
  );
}
