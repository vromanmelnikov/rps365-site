import styles from "./header.module.scss";
import MainStyles from "../../styles/Main.module.scss";
import Link from "next/link";
import Image from "next/image";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import React, { useEffect, useState } from "react";
import CartMenu from "./CartMenu";
// import { categories } from "shared/static/static";

import logo from 'public/images/logo.jpg'
import { CATEGORIES_URL } from "shared/api.config";
// import { CATEGORIES_URL } from "shared/api.config";

export default function Header() {
  const links = [
    {
      text: "Каталог",
      href: "/catalog",
    },
  ];

  const [categories, setCategories] = useState([])

  useEffect(
    () => {

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      fetch(CATEGORIES_URL, requestOptions)
        .then((response) => response.text())
        .then((result) => {

          const categories = JSON.parse(result).map(category => {
            return {
              name: category.rusName,
              type: category.name,
              href: `/catalog?category=${category.name}`
            }
          })

          setCategories(categories)

        })
        .catch((error) => console.error(error));

    }, []
  );

  return (
    <header className={styles.header}>
      <div className={styles.mainBack}>
        <section className={`${MainStyles.container} ${styles.main}`}>
          <Link href='/' className={styles.logo}>
            <Image src={logo} width="150" height='150' alt="RPS365" />
          </Link>
          <ul className={styles.links}>
            {links.map((item, index) => {
              return (
                <li className={styles.link} key={index}>
                  <Link href={item.href}>
                    <span>{item.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className={styles.infoBlock}>
            <div
              className="tooltip tooltip-bottom"
              data-tip="Нажми и перейди на карту"
            >
              <a className={styles.info} target='_blank' href='https://yandex.ru/maps/11098/zarechny/?ll=45.174128%2C53.205237&mode=routes&rtext=~53.205237%2C45.174129&rtt=mt&ruri=~ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgo0MDM2Njk1NjQwEmbQoNC-0YHRgdC40Y8sINCf0LXQvdC30LXQvdGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMLCDQl9Cw0YDQtdGH0L3Ri9C5LCDRg9C70LjRhtCwIDIwLdGPINCU0L7RgNC-0LPQsCwgMzMiCg1OsjRCFSrSVEI%2C&z=16.7'>
                <span>Пн-Сб: 10:00-19:00</span>
                <span>г. Заречный, ул. 20-ая дорога, д. 33</span>
              </a>
            </div>
            <div className={`${styles.phoneBlock} dropdown dropdown-bottom`}>
              <div
                tabIndex={0}
                role="button"
                className={`${styles.makeCall} btn btn-circle`}
              >
                <PhoneEnabledOutlinedIcon fontSize="large" />
              </div>

              <div
                tabIndex={0}
                className={`${styles.phones} dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52`}
              >
                <li>
                  <a href="tel:8(8412)608-228">8 (8412) 608-228</a>
                </li>
                <hr />
                <li>
                  <a href="tel:8(8412)700-495">8 (8412) 700-495</a>
                </li>
              </div>
            </div>
          </div>
          <div className={styles.functionals}>
            {/* <div className={`${styles.cartBlock} btn btn-circle `}>
              <div className="indicator">
                <FavoriteBorderIcon fontSize="large" />
              </div>
            </div> */}
            <CartMenu />
          </div>
        </section>
      </div>
      <div className={styles.destinyBack}>
        <section className={`${MainStyles.container} ${styles.destiny}`}>
          <ul className={`${styles.tags}`}>
            {categories.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <Link href={item.href} className={`btn btn-ghost`} key={index}>
                    {item.name}
                  </Link>
                  {index !== categories.length - 1 && (
                    <div className="divider divider-horizontal"></div>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
          <div className={`${styles.finder}`}>
            <div className="divider divider-horizontal"></div>
            {/* <label className={`input input-bordered flex items-center gap-2`}>
              <input type="text" className="grow" placeholder="Найти товар" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label> */}
            <button className={`btn btn-sm`} onClick={() => document.getElementById('requestModal').showModal()}>Возникли вопросы?</button>
          </div>
        </section>
      </div>
    </header>
  );
}
