import Image from "next/image";
import styles from "./images.module.scss";
import { IMAGES_URL, STATIC_URL } from "shared/api.config";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function Images({ images, prevImages, setImages }) {
    function changeQueue(position, index) {
        let newImages = [...images];

        if (position === "PREV") {
            if (index === 0) {
                return;
            }
            let currImg = images[index];
            let prevImg = images[index - 1];

            newImages[index] = {
                ...currImg,
                queueNumber: prevImg.queueNumber,
            };

            newImages[index - 1] = {
                ...prevImg,
                queueNumber: currImg.queueNumber,
            };
        } else if (position === "NEXT") {
            if (index === images.length - 1) {
                return;
            }
            let currImg = images[index];
            let nextImg = images[index + 1];

            newImages[index] = {
                ...currImg,
                queueNumber: nextImg.queueNumber,
            };

            newImages[index + 1] = {
                ...nextImg,
                queueNumber: currImg.queueNumber,
            };
        }

        setImages(newImages);
    }

    function deleteImage(index) {
        const image = images[index];

        const newImages = images.filter((img, imgIndex) => imgIndex !== index);

        const requestOptions = {
            method: "DELETE",
            redirect: "follow",
        };

        fetch(`${IMAGES_URL}/${image.id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                fetch(`${STATIC_URL}?url=${image.url}`, requestOptions)
                    .then((response) => response.text())
                    .then((result) => {
                        setImages(newImages);
                        prevImages.current = newImages
                    })
                    .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
    }

    function showImage(url) {
        window.open(url, "_blank")
    }

    return (
        <div className={`${styles.images}`}>
            {images
                .sort((a, b) => a.queueNumber - b.queueNumber)
                .map((img, index) => {
                    const src = `${STATIC_URL}/${img.url}`;

                    return (
                        <div key={index} className={`${styles.image}`} id={`image_${index}`}>
                            <button
                                className={`${styles.arrow} ${styles.prev} btn btn-circle`}
                                onClick={() => changeQueue("PREV", index)}
                            >
                                {"<"}
                            </button>
                            <Image
                                src={src}
                                width={1280}
                                height={720}
                                alt="photo"
                                onClick={() => showImage(src)}
                            />
                            <button
                                className={`${styles.arrow} ${styles.next} btn btn-circle`}
                                onClick={() => changeQueue("NEXT", index)}
                            >
                                {">"}
                            </button>
                            <button
                                className={`${styles.deleteBtn} btn btn-circle btn-error btn-sm`}
                                onClick={() => deleteImage(index)}
                            >
                                <DeleteForeverIcon fontSize="small" />
                            </button>
                        </div>
                    );
                })}
        </div>
    );
}
