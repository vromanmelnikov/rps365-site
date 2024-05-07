import Items from "components/Admin/Items/Items";
import AdminLayout from "components/AdminLayout/AdminLayout";
import Head from "next/head";

import AddIcon from '@mui/icons-material/Add';
import Link from "next/link";
import { useEffect } from "react";
import authService from "shared/auth.service";
import { useRouter } from "next/router";

export default function AdminItems() {

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
                <title>Товары и услуги</title>
            </Head>
            <AdminLayout>
                <h1 style={{ marginBottom: '1rem' }}>
                    Товары и услуги
                    <Link href={'/admin/create'} className="btn btn-success btn-sm" style={{color: 'white', marginLeft: '1rem'}}><AddIcon /></Link>
                </h1>
                <Items />
            </AdminLayout>
        </>
    )
}