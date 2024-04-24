import Layout from "components/Layout";
import CartItems from 'components/CartItems'

import Head from "next/head";

import styles from "./cart.module.scss";
import { useEffect, useState } from "react";
import CartMenu from "components/CartMenu";

import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

import cartService from "shared/cart.service";
import alertService from "shared/alert.service";

export default function Cart() {
  const title = "Корзина";

  const [items, setItems] = useState([])
  const [cost, setCost] = useState(0)

  const changeCost = (cost) => setCost(cost)

  useEffect(
    () => {
      const cartItems = JSON.parse(window.localStorage.getItem('cart'))

      if (cartItems) {
        setItems(cartItems)
      }

      const cost = parseInt(window.localStorage.getItem('cost'))

      if (cost) {
        setCost(cost)
      }
    }, []
  )

  function deleteItem(index) {
    let newItems = items.filter((item, itemIndex) => index !== itemIndex)
    setItems(newItems)

    const cost = cartService.deleteItem(index)
    setCost(cost)
  }

  function clearCart() {
    setItems([])
    setCost(0)
    cartService.clearCart()
    alertService.openAlert('mailAlert')
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content='Компания "РЕПЛАСТ-365" предлагает уникальное решение для проблем, 
          связанных с герметизацией. Мы специализируемся на разработке и обеспечении
           надежной герметизации технических сетей, кабельных коммуникаций и трубных 
           разводок от воздействия внешних факторов'>
        </meta>
        <meta charSet="utf-8"></meta>
      </Head>
      <Layout>
        <main className={`${styles.main}`} data-theme="mytheme">
          <h1>{title}</h1>
          <div className={`${styles.blocks}`}>
            <CartItems items={items} changeCost={changeCost} deleteItem={deleteItem} />
            <CartMenu cost={cost} clearCart={clearCart}/>
          </div>
        </main>
        <div role="alert" id="mailAlert" className={`sendMailDone alert alert-success`}>
          <MarkEmailReadIcon />
          <span>В скором времени мы ответим на Вашу заявку!</span>
          <div>
            <button className="btn btn-sm"><a href="/catalog">В каталог</a></button>
          </div>
        </div>
      </Layout>
    </>
  );
}
