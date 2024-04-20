import Layout from "components/Layout";
import AboutBlock from "components/Main/About";
import Advantages from "components/Main/Advantages";
import Feedbacks from "components/Main/Feedbacks";
import Info from "components/Main/Info";
import PopularGoods from "components/Main/PopularGoods";
import TitleBlock from "components/Main/TitleBlock";
import Head from "next/head";
import axios from "axios";
import { CATEGORIES_ITEMS_URL, FEEDBACKS_URL, IMAGES_URL, ITEMS_URL, POPULAR_GOODS_URL, REAL_OBJECTS_URL, RUBBER_ITEMS_URL, SERT_URL } from "shared/api.config";

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

  const staticImages = (await axios.get(IMAGES_URL)).data
  const sertificats = staticImages.filter(image => image.type === 'sertificat')
  const feedbacks = staticImages.filter(image => image.type === 'feedback')
  const realObjects = staticImages.filter(image => image.type === 'real_object')
  const popularGoods = (await axios.get(POPULAR_GOODS_URL)).data.items

  const products = (await axios.get(CATEGORIES_ITEMS_URL)).data

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

