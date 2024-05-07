import AdminLayout from "components/AdminLayout/AdminLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import authService from "shared/auth.service";

export default function Admin() {

    const router = useRouter()

    useEffect(
        () => {
            if (authService.isAuth() === true) {

                router.push('/admin/items')
            }
            else {
                const email = prompt('Введите почту')
                const password = prompt('Введите пароль')

                authService.login(email, password).then(
                    result => {
                        if (result === 'OK') {
                            router.push('/admin/items')
                        }
                        else if (result === 'NO_USER') {
                            alert('Неверная почта')
                            window.location.reload()
                        }
                        else if (result === 'PASSWORD_ERROR') {
                            const flag = confirm('Неверный пароль. Хотите поменять пароль?',)
                            if (flag === true) {
                                const doubleEmail = prompt('Повторите почту', email)
                                router.push(`/admin/password?email=${doubleEmail}`)
                                // alert(`Заявка отправлена на почту ${doubleEmail}`)
                            }
                            else {
                                window.location.reload()
                            }
                        }
                    }
                )
            }
        }, []
    )

    return (
        <>
            <Head>
                <title>Панель администратора</title>
            </Head>
            <AdminLayout>
                
            </AdminLayout>
        </>
    )
}