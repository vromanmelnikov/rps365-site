import ItemInfoForm from "components/Admin/ItemInfoForm/ItemInfoForm";
import AdminLayout from "components/AdminLayout/AdminLayout";
import Head from "next/head";

export default function Create() {

    return (
        <>
            <Head>
                <title>Создание товара/услуги</title>
            </Head>
            <AdminLayout>
                <h1 style={{ marginBottom: '1rem' }}>Создание товара/услуги</h1>
                <ItemInfoForm />
            </AdminLayout>
        </>
    )

}