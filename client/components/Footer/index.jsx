import styles from "./footer.module.scss";
import mainStyles from '../../styles/Main.module.scss'

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import RouteIcon from '@mui/icons-material/Route';

import { useState } from "react";
import { parseNumber } from "shared/form.service";
import alertService from "shared/alert.service";

export default function Footer() {

  const [name, setName] = useState("")
  const [number, setNumber] = useState("")

  function onNameChange(event) {
    const value = event.target.value

    setName(value)
  }

  function onNumberChange(event) {

    const value = parseNumber(number, event.target.value)

    if (value !== null) {
      setNumber(value)
    }
  }

  function onSubmit(event) {
    event.preventDefault()
    document.getElementById('requestModal').showModal()
  }

  return (
    <footer
      className={`${styles.footer} footer footer-center p-6 bg-base-200 text-base-content rounded`}
    >
      <div className={`${mainStyles.container} ${styles.content}`}>
        <form className={`${styles.form}`} onSubmit={onSubmit}>
          <span>Оставьте свои контакты, если у вас возник вопрос!</span>
          <div className={`${styles.formContent}`}>
            {/* <label className={`${styles.input} input input-bordered flex items-center gap-2`}>
              <PersonOutlineOutlinedIcon color="primary" />
              <input
                value={name}
                onChange={(event) => onNameChange(event)}
                name="name"
                type="text"
                className="grow"
                placeholder="Фамилия и имя" />
            </label>
            <label className={`${styles.input} input input-bordered flex items-center gap-2`}>
              <PhoneEnabledOutlinedIcon color="primary" />
              +7
              <input
                value={number}
                onChange={(event) => onNumberChange(event)}
                name="number"
                type="text"
                className="grow"
                placeholder="(999) 999-99-99" />
            </label> */}
            <button className={`btn`} >Получить консультацию</button>
          </div>
        </form>

        <hr className={`${styles.divider}`} />

        <nav className={`${styles.pages}`}>
          <a href="/catalog">Каталог</a>
          <a href="/#about">О нас</a>
          <a href="">Галерея</a>
        </nav>

        <nav className={`${styles.info}`}>
          <div className={`${styles.media}`}>
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
          </div>
          <div className={`${styles.main}`}>
            <div className={`${styles.item}`}>
              <h3>Наши контакты <PhoneEnabledOutlinedIcon fontSize="small" /></h3>
              <a href="tel:8(8412)608-228">8 (8412) 608-228</a>
              <a href="tel:8(8412)700-495">8 (8412) 700-495</a>
            </div>
            <div className={`${styles.item}`}>
              <h3>Наш адрес <RouteIcon fontSize="small" /></h3>
              <a target="_blank" href="https://yandex.ru/maps/11098/zarechny/house/ulitsa_20_ya_doroga_33/YEwYdwBkSEcOQFtpfX5xdH5gYw==/?ll=45.174128%2C53.205237&z=16.7">г. Заречный, ул. 20-ая дорога, д. 33</a>
              <p>Пн-Сб: 10:00-19:00</p>
            </div>
          </div>
        </nav>

        <aside className={`${styles.bottom}`}>
          <p>© ООО &#34;РЕПЛАСТ 365&#34;. Все права защищены</p>
        </aside>
      </div>
    </footer>
  );
}
