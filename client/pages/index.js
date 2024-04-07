import Layout from "components/Layout";
import AboutBlock from "components/Main/About";
import Advantages from "components/Main/Advantages";
import Feedbacks from "components/Main/Feedbacks";
import Info from "components/Main/Info";
import PopularGoods from "components/Main/PopularGoods";
import TitleBlock from "components/Main/TitleBlock";
import Head from "next/head";
import axios from "axios";
import { FEEDBACKS_URL, ITEMS_URL, POPULAR_GOODS_URL, REAL_OBJECTS_URL, RUBBER_ITEMS_URL, SERT_URL } from "shared/api.config";

export default function About(props) {
  const title = "Муфты проходные герметичные";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout >
        <TitleBlock products={props.products}/>
        <Advantages />
        <PopularGoods items={props.popularGoods} />
        <AboutBlock sertificats={props.sertificats} realObjects={props.realObjects} />
        <Feedbacks feedbacks={props.feedbacks} />
        <Info />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {

  const sertificats = (await axios.get(SERT_URL)).data
  const feedbacks = (await axios.get(FEEDBACKS_URL)).data
  const realObjects = (await axios.get(REAL_OBJECTS_URL)).data
  const popularGoods = (await axios.get(POPULAR_GOODS_URL)).data.map(item => {
    let min, max = 0
    const typeCosts = item.types.map(type => type.cost)
    min = Math.min(...typeCosts)
    max = Math.max(...typeCosts)
    return ({
      ...item,
      min,
      max,
      typeCosts
    })
  })

  const rubber = (await axios.get(`${RUBBER_ITEMS_URL}&_limit=3`)).data
  const plastic = []
  const steel = []

  const products = {
    rubber,
    plastic,
    steel
  }

  return ({
    props: {
      sertificats,
      feedbacks,
      realObjects,
      popularGoods,
      products
    }
  })
}

