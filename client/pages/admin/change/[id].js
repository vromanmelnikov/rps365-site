import ItemInfoForm from "components/Admin/ItemInfoForm/ItemInfoForm";
import AdminLayout from "components/AdminLayout/AdminLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ITEMS_URL } from "shared/api.config";
import authService from "shared/auth.service";

export default function Create() {

    const router = useRouter()

    const [item, setItem] = useState(null)

    useEffect(
        () => {
            const id = router.query.id

            if (id) {

                const requestOptions = {
                    method: "GET",
                    redirect: "follow"
                  };
                  
                  fetch(`${ITEMS_URL}/${id}`, requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        setItem(result)
                    })
                    .catch((error) => console.error(error));
            }

        }, [router]
    )

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
                <title>Изменение товара/услуги</title>
            </Head>
            <AdminLayout>
                <h1 style={{ marginBottom: '1rem' }}>Изменение товара/услуги</h1>
                <ItemInfoForm itemInfo={item}/>
            </AdminLayout>
        </>
    )

}