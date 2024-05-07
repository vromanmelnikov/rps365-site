import ItemInfoForm from "components/Admin/ItemInfoForm/ItemInfoForm";
import AdminLayout from "components/AdminLayout/AdminLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import authService from "shared/auth.service";

export default function Create() {

    const router = useRouter()

    useEffect(
        () => {
            if (authService.isAuth() === false) {
                router.push('/admin')
            }
        }, []
    )

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