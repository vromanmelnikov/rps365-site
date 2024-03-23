import Layout from "components/Layout";
import Head from "next/head";

import styles from "./product.module.scss";
import ProductItem from "components/ProductItem";
import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";
import { ITEMS_URL } from "shared/api.config";
import axios from "axios";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Product({ product }) {
  const title = `${product.title}. ${product.subtitle}`;

  return (
    <>
      <Head>
        <title>{title}</title>
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
        </main>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {

  const items = (await axios.get(ITEMS_URL)).data

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
