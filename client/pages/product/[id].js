import Layout from "components/Layout";
import Head from "next/head";

import styles from "./product.module.scss";
import ProductItem from "components/ProductItem";
import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";
import { ITEMS_URL } from "shared/api.config";
import axios from "axios";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export default function Product({ product }) {
  const title = `${product.title ? product.title : 'Название товара'}. ${product.subtitle ? product.subtitle : 'Описание товара'}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={`${product.title}. ${product.subtitle}`}>
        </meta>
        <meta charSet="utf-8"></meta>
      </Head>
      <Layout>
        <main className={`${styles.main}`} data-theme="mytheme">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <a>Главная</a>
              </li>
              <li>
                <Link href={"/catalog"}>Каталог</Link>
              </li>
              <li>
                <b>{title}</b>
              </li>
            </ul>
          </div>
          <ProductItem product={product} />
          <div role="alert" id="cartAlert" className={`sendMailDone alert alert-success`}>
            <ShoppingCartOutlinedIcon />
            <span>Товар добавлен в корзину</span>
            <div>
              <button className="btn btn-sm"><a href="/cart">В корзину</a></button>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {

  const items = (await axios.get(ITEMS_URL)).data.items

  const paths = items.map((item) => ({
    params: { id: item.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {

  const product = (await axios.get(`${ITEMS_URL}/${params.id}`)).data

  return {
    props: {
      product,
    },
  };
}
