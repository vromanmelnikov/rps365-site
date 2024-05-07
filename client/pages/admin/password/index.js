import AdminLayout from "components/AdminLayout/AdminLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AUTH_CODE_URL, AUTH_URL, MAIL_AUTH_CODE_URL } from "shared/api.config";

export default function Password() {
    const router = useRouter();

    useEffect(() => {
        const email = router.query.email;
        if (email) {
            const requestOptions = {
                method: "GET",
                redirect: "follow",
            };

            (async () => {
                const result = await fetch(
                    `${MAIL_AUTH_CODE_URL}?email=${email}`,
                    requestOptions
                );

                if (result.status === 404) {
                    alert("Неправильная почта");
                    router.push("/admin");
                } else if (result.status === 200) {
                    let codeResult = null;
                    let attemptCount = 0;

                    do {
                        let code = prompt("Введите код, присланный на почту");

                        const requestOptions = {
                            method: "GET",
                            redirect: "follow",
                        };

                        codeResult = await fetch(
                            `${AUTH_CODE_URL}?email=${email}&code=${code}`,
                            requestOptions
                        );

                        attemptCount++;

                        if (codeResult.status === 401) {
                            alert("Неверный код");
                        }
                    } while (codeResult.status !== 200 && attemptCount !== 3);

                    if (attemptCount === 3) {
                        alert("Вы превысили допустимое количество попыток!");
                        window.location.reload();
                    } else {
                        let password = "";

                        do {
                            password = prompt("Введите новый пароль");

                            if (password.length < 12) {
                                alert(
                                    "Пароль должен состоять как минимум из 12 символов"
                                );
                            }
                        } while (password.length < 12);

                        let secondPassword = "";

                        do {
                            secondPassword = prompt("Повторите новый пароль");

                            if (password !== secondPassword) {
                                alert(
                                    "Пароли не соврадают! Попробуйте еще раз"
                                );
                            }
                        } while (password !== secondPassword);

                        const myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");

                        const raw = JSON.stringify({
                            email,
                            password,
                        });

                        const requestOptions = {
                            method: "PUT",
                            headers: myHeaders,
                            body: raw,
                            redirect: "follow",
                        };

                        const passwordResult = await fetch(
                            AUTH_URL,
                            requestOptions
                        );

                        if (passwordResult.status === 200) {
                            alert('Пароль успешно сменен!')
                            router.push('/admin')
                        }
                    }
                }
            })();
        }
    }, [router]);

    return (
        <>
            <Head>
                <title>Смена пароля</title>
            </Head>
            <AdminLayout> </AdminLayout>
        </>
    );
}
