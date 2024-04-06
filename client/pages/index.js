import Layout from "components/Layout";
import AboutBlock from "components/Main/About";
import Advantages from "components/Main/Advantages";
import Feedbacks from "components/Main/Feedbacks";
import Info from "components/Main/Info";
import PopularGoods from "components/Main/PopularGoods";
import TitleBlock from "components/Main/TitleBlock";
import Head from "next/head";

export default function About() {
  const title = "Муфты проходные герметичные";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout >
        <TitleBlock />
        <Advantages />
        <PopularGoods />
        <AboutBlock />
        <Feedbacks />
        <Info />
      </Layout>
    </>
  );
}
