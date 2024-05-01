import styles from "./images.module.scss";
import AdminLayout from "components/AdminLayout/AdminLayout";
import Head from "next/head";

import SaveIcon from "@mui/icons-material/Save";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IMAGES_URL, STATIC_UPLOAD_URL } from "shared/api.config";
import Images from "components/Admin/Images";

export default function AdminImages() {
    const [images, setImages] = useState([]);
    const prevImages = useRef([])
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
                    prevImages.current = result
                    console.log(result);
                })
                .catch((error) => console.error(error));
        }
    }, [type]);

    useEffect(() => {
        if (images.length > prevImages.current.length) {
            const lastImage = document.getElementById(`image_${images.length - 1}`)
            lastImage.scrollIntoView({behavior: 'smooth', block: 'end'})
            // console.log(lastImage)
            prevImages.current = images
        }
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

    function addImage() {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.multiple = false;
        fileInput.accept = ".png,.jped,.jpg";

        let reader = new FileReader();

        fileInput.onchange = (event) => {
            const formData = new FormData();
            formData.append("file", fileInput.files[0]);

            const requestOptions = {
                method: "POST",
                body: formData,
                redirect: "follow",
            };

            fetch(`${STATIC_UPLOAD_URL}`, requestOptions)
                .then((response) => response.text())
                .then((result) => {

                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    const raw = JSON.stringify({
                        url: result,
                        type,
                    });

                    const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow",
                    };

                    fetch(IMAGES_URL, requestOptions)
                        .then((response) => response.json())
                        .then((result) => {
                            setImages([...images, result])
                        })
                        .catch((error) => console.error(error));

                })
                .catch((error) => console.error(error));
        };

        fileInput.click();
    }

    return (
        <>
            <Head>
                <title>Изображения</title>
            </Head>
            <AdminLayout>
                <h1 style={{ marginBottom: "1rem" }}>
                    Изображения
                    <button
                        className={`btn btn-circle btn-success btn-sm`}
                        style={{ marginLeft: ".5rem" }}
                        onClick={addImage}
                    >
                        +
                    </button>
                </h1>
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
                <Images images={images} setImages={setImages} prevImages={prevImages}/>
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
