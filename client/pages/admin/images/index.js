import styles from './images.module.scss'
import AdminLayout from "components/AdminLayout/AdminLayout";
import Head from "next/head";

import SaveIcon from "@mui/icons-material/Save";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IMAGES_URL } from "shared/api.config";
import Images from "components/Admin/Images";

export default function AdminImages() {
    const [images, setImages] = useState([]);
    const [type, setType] = useState("real_object");

    useEffect(() => {
        if (type !== "") {
            const requestOptions = {
                method: "GET",
                redirect: "follow",
            };

            fetch(`${IMAGES_URL}?type=${type}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setImages(result);
                    console.log(result);
                })
                .catch((error) => console.error(error));
        }
    }, [type]);

    useEffect(() => {
        console.log(images);
    }, [images]);

    function onSubmit() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            images,
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(IMAGES_URL, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    return (
        <>
            <Head>
                <title>Изображения</title>
            </Head>
            <AdminLayout>
                <h1 style={{ marginBottom: "1rem" }}>Изображения</h1>
                <div role="tablist" className="tabs tabs-boxed">
                    <span
                        onClick={() => setType("real_object")}
                        role="tab"
                        className={`tab ${
                            type === "real_object" && "tab-active"
                        }`}
                    >
                        Галерея
                    </span>
                    <span
                        onClick={() => setType("sertificat")}
                        role="tab"
                        className={`tab ${
                            type === "sertificat" && "tab-active"
                        }`}
                    >
                        Серфтификаты
                    </span>
                    <span
                        onClick={() => setType("feedback")}
                        role="tab"
                        className={`tab ${type === "feedback" && "tab-active"}`}
                    >
                        Отзывы
                    </span>
                </div>
                <Images images={images} setImages={setImages} />
                <button
                    className={`${styles.submitBtn} btn btn-circle btn-success btn-lg`}
                    onClick={onSubmit}
                    style={{ color: "white" }}
                >
                    <SaveIcon fontSize="large" />
                </button>
            </AdminLayout>
        </>
    );
}
