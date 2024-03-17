import Layout from "components/Layout";
import CartItems from 'components/CartItems'

import Head from "next/head";

import styles from "./cart.module.scss";
import { useEffect, useState } from "react";
import CartMenu from "components/CartMenu";
import cartService from "shared/cart.service";

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

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <main className={`${styles.main}`} data-theme="mytheme">
          <h1>{title}</h1>
          <div className={`${styles.blocks}`}>
            <CartItems items={items} changeCost={changeCost} deleteItem={deleteItem}/>
            <CartMenu cost={cost} />
          </div>
        </main>
      </Layout>
    </>
  );
}
