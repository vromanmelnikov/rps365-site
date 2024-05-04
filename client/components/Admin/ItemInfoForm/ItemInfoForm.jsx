import styles from "./item-info-form.module.scss";

import { useEffect, useState } from "react";
import {
    CATEGORIES_URL,
    ITEM_IMAGES_URL,
    ITEM_TYPES_URL,
    ITEMS_URL,
    PROPERTIES_URL,
    STATIC_UPLOAD_URL,
    STATIC_URL,
    TAGS_URL,
} from "shared/api.config";

import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Router, useRouter } from "next/router";

async function getCategories() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const response = await fetch(CATEGORIES_URL, requestOptions);
        const response_1 = await response.text();
        return JSON.parse(response_1);
    } catch (err) {
        alert("Ошибка при получении категорий");
        return [];
    }
}

async function getTags() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const response = await fetch(TAGS_URL, requestOptions);
        const response_1 = await response.text();
        return JSON.parse(response_1);
    } catch (err) {
        alert("Ошибка при получении тегов");
        return [];
    }
}

async function getProperties() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const response = await fetch(PROPERTIES_URL, requestOptions);
        const response_1 = await response.text();
        return JSON.parse(response_1);
    } catch (err) {
        return {
            names: [],
            values: [],
        };
    }
}

function TypeInfo({
    type,
    index,
    addImage,
    deleteImage,
    onTypeChange,
    deleteType,
}) {
    return (
        <div
            className={`${styles.form} ${styles.type} bg-base-200 w-full rounded-box`}
        >
            <div className="divider">
                Тип товара #{index + 1}
                <button
                    className={`btn btn-circle btn-error btn-sm`}
                    onClick={() => deleteType(index)}
                >
                    <DeleteForeverIcon />
                </button>
            </div>
            <label className="input input-bordered flex items-center gap-2">
                Название
                <input
                    type="text"
                    className="grow"
                    placeholder="Комплектация 1"
                    name="title"
                    value={type.title}
                    onChange={(event) => onTypeChange(event, index)}
                />
            </label>
            <label className="form-control">
                <div className="label">
                    <span className="label-text">Описание типа</span>
                </div>
                <textarea
                    name="description"
                    value={type.description}
                    onChange={(event) => onTypeChange(event, index)}
                    className="textarea textarea-bordered h-24"
                    placeholder="1 манжета с отверстиями, 1 фланец, 1 хомут, 4 болта, 4 гайки, 4 прорезиненные шайбы, 1 инструкция по монтажу, упаковка."
                ></textarea>
            </label>
            <label className="input input-bordered flex items-center gap-2">
                Стоимость
                <input
                    type="number"
                    className="grow"
                    placeholder="Комплектация 1"
                    name="cost"
                    value={type.cost}
                    onChange={(event) => onTypeChange(event, index)}
                />
                рублей
            </label>
            <label className="input input-bordered flex items-center gap-2">
                Ведение подсчета в
                <input
                    type="text"
                    className="grow"
                    placeholder="шт., например."
                    name="itemType"
                    value={type.itemType}
                    onChange={(event) => onTypeChange(event, index)}
                />
            </label>
            <label className={`form-controll`}>
                <div className="label">
                    <span className="label-text">Изображения</span>
                </div>
                <div className={`${styles.images}`}>
                    <button
                        style={{ color: "white" }}
                        className="btn btn-circle btn-success btn-sm"
                    >
                        <AddIcon onClick={addImage} />
                    </button>
                    {type.images.map((item, imgIndex) => {
                        let src = "";

                        if (
                            item.id !== undefined ||
                            item.url === "EMPTY_IMAGE.png"
                        ) {
                            src = `${STATIC_URL}/${item.url}`;
                        } else {
                            src = item.url;
                        }

                        return (
                            <div className={`${styles.image}`} key={imgIndex}>
                                <Image
                                    src={src}
                                    width={1280}
                                    height={720}
                                    alt={"photo"}
                                />
                                <button
                                    className={`${styles.delete}`}
                                    onClick={() => deleteImage(index, imgIndex)}
                                >
                                    <CloseIcon fontSize="small" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </label>
        </div>
    );
}

function Property({
    property,
    index,
    onItemPropertyChange,
    properties,
    deleteProperty,
}) {
    return (
        <div className={`${styles.property}`}>
            <span>#{index + 1}</span>
            <Autocomplete
                id="name"
                freeSolo
                options={properties.names}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                    <TextField
                        value={property.name}
                        onChange={(event) =>
                            onItemPropertyChange(
                                event.target.value,
                                "name",
                                index
                            )
                        }
                        {...params}
                        label="Название"
                    />
                )}
                value={property.name}
                onChange={(event, newValue) =>
                    onItemPropertyChange(newValue, "name", index)
                }
                isOptionEqualToValue={(option, value) => option === value}
            />
            <Autocomplete
                id="value"
                freeSolo
                options={properties.values}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                    <TextField
                        value={property.name}
                        onChange={(event) =>
                            onItemPropertyChange(
                                event.target.value,
                                "value",
                                index
                            )
                        }
                        {...params}
                        label="Значение"
                    />
                )}
                value={property.value}
                onChange={(event, newValue) =>
                    onItemPropertyChange(newValue, "value", index)
                }
                isOptionEqualToValue={(option, value) => option === value}
            />
            <button
                className={`btn btn-circle btn-error btn-sm`}
                onClick={deleteProperty}
            >
                <DeleteForeverIcon />
            </button>
        </div>
    );
}

export default function ItemInfoForm({ itemInfo }) {
    const router = useRouter();

    const [item, setItem] = useState({
        title: "Муфта проходная герметичная РПС",
        subtitle: "Крепление на саморезах и забивных анкерах",
        isService: "false",
        types: [
            {
                title: "Комплектация 1",
                description:
                    "1 манжета без отверстий, 1 фланец, 1 хомут, 4 самореза, 4 прорезиненные шайбы, 1 инструкция по монтажу, упаковка.",
                cost: 680,
                itemType: "шт.",
                images: [],
            },
        ],
        categoryId: "1",
        tags: [
            // { id: 1, name: 'Для бетона/фундамента' }
        ],
        properties: [
            {
                name: "",
                value: "",
            },
        ],
    });

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [properties, setProperties] = useState({
        names: [],
        values: [],
    });

    const [actions, setActions] = useState({
        images: [],
        properties: [],
        tags: [],
    });

    const [tagInput, setTagInput] = useState("");

    async function getStaticInfo() {
        return new Promise((resolve, reject) => {
            getCategories().then((res) => {
                setCategories(res);

                getTags().then((res) => {
                    setTags(res);

                    getProperties().then((res) => {
                        setProperties(res);

                        resolve(1);
                    });
                });
            });
        });
    }

    useEffect(() => {
        getStaticInfo().then((res) => {});
    }, []);

    useEffect(() => {
        if (itemInfo !== undefined && itemInfo !== null) {
            let newItem = { ...itemInfo };
            newItem.categoryId = newItem.category.id.toString();
            delete newItem.category;
            newItem.isService = newItem.isService.toString();

            setItem(newItem);
        }
    }, [categories, tags, properties, itemInfo]);

    useEffect(() => {
        // console.log(item);
    }, [item]);

    function onItemChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        setItem({
            ...item,
            [name]: value,
        });
    }

    function onTypeChange(event, typeIndex) {
        const name = event.target.name;
        const value = event.target.value;

        const types = item.types;
        types[typeIndex][name] = value;

        setItem({ ...item, types });
    }

    function addImage(typeIndex) {
        const type = item.types[typeIndex];

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.multiple = false;
        fileInput.accept = ".png,.jped,.jpg";

        let reader = new FileReader();

        fileInput.onchange = (event) => {
            const formData = new FormData();
            formData.append("file", fileInput.files[0]);

            reader.onload = (e) => {
                const image = document.createElement("img");
                image.src = e.target.result;

                if (type.id !== undefined) {
                    const requestOptions = {
                        method: "POST",
                        body: formData,
                        redirect: "follow",
                    };

                    fetch(`${STATIC_UPLOAD_URL}`, requestOptions)
                        .then((response) => response.text())
                        .then((result) => {
                            const myHeaders = new Headers();
                            myHeaders.append(
                                "Content-Type",
                                "application/json"
                            );

                            const raw = JSON.stringify({
                                url: result,
                                ItemTypeId: type.id,
                            });

                            const requestOptions = {
                                method: "POST",
                                headers: myHeaders,
                                body: raw,
                                redirect: "follow",
                            };

                            fetch(ITEM_IMAGES_URL, requestOptions)
                                .then((response) => response.json())
                                .then((result) => {
                                    let types = item.types;
                                    types[typeIndex].images = result;
                                    setItem({
                                        ...item,
                                        types,
                                    });
                                })
                                .catch((error) =>
                                    alert("Ошибка загрузки изображения")
                                );
                        })
                        .catch((error) => alert("Ошибка загрузки изображения"));
                } else {
                    let types = item.types;

                    types[typeIndex].images.push({
                        url: e.target.result,
                        formData,
                    });

                    setItem({ ...item, types });
                }
            };

            reader.readAsDataURL(fileInput.files[0]);
        };

        fileInput.click();
    }

    function deleteImage(typeIndex, imageIndex) {
        let types = item.types;
        let type = types[typeIndex];

        const image = type.images[imageIndex];

        type.images = type.images.filter((img, index) => index !== imageIndex);

        // if (type.images.length === 0) {
        //     type.images.push({
        //         url: 'EMPTY_IMAGE.png'
        //     })
        // }

        types[typeIndex] = type;

        if (itemInfo === undefined || image?.id === undefined) {
            setItem({
                ...item,
                types,
            });
        } else {
            const requestOptions = {
                method: "DELETE",
                redirect: "follow",
            };

            fetch(`${ITEM_IMAGES_URL}/${image.id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    let types = item.types;
                    types[typeIndex].images = result;
                    setItem({
                        ...item,
                        types,
                    });

                    const requestOptions = {
                        method: "DELETE",
                        redirect: "follow",
                    };

                    fetch(`${STATIC_URL}?url=${image.url}`, requestOptions)
                        .then((response) => response.ok ? response : Promise.reject(response))
                        .then((result) => {
                            console.log(result);

                            setItem({
                                ...item,
                                types,
                            });

                            // if (type.images.length === 0) {
                            //     onSubmit()
                            // }
                        })
                        .catch((error) => {
                            console.log(error)
                        });
                })
                .catch((error) => alert("Ошибка удаления изображения"));
        }
    }

    function onTagsChange(event, newValue) {
        // const value = event
        setItem({
            ...item,
            tags: newValue,
        });
    }

    function addNewTag() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            name: tagInput,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(TAGS_URL, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                getTags().then((res) => {
                    console.log(res);
                    let newTag = res.filter((tag) => tag.name === tagInput)[0];
                    setItem({
                        ...item,
                        tags: [...item.tags, newTag],
                    });
                    setTags(res);
                    setTagInput("");
                });
            })
            .catch((error) => alert("Ошибка добавления тегов"));
    }

    function addNewType() {
        const newType = {
            title: "",
            description: "",
            cost: 0,
            itemType: "",
            images: [],
        };

        setItem({
            ...item,
            types: [...item.types, newType],
        });
    }

    function deleteType(typeIndex) {
        let types = item.types.filter((type, index) => index !== typeIndex);
        let id = item.types[typeIndex].id;

        if (itemInfo === undefined || id === undefined) {
            setItem({
                ...item,
                types,
            });
        } else {
            const requestOptions = {
                method: "DELETE",
                redirect: "follow",
            };

            fetch(`${ITEM_TYPES_URL}/${id}`, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    setItem({
                        ...item,
                        types,
                    });
                })
                .catch((error) => alert("Ошибка удаления типа продукта"));
        }
    }

    async function onSubmit() {
        console.log("submit");

        let errors = [];

        if (item.title === "") {
            errors.push("Пустое название товара");
        }
        if (item.subtitle === "") {
            errors.push("Пустой тип товара");
        }

        if (item.types.length === 0) {
            errors.push(`Должен быть хотя бы один тип`);
        }

        for (let i = 0; i < item.types.length; i++) {
            if (item.types[i].title === "") {
                errors.push(`Пустое название у типа #${i + 1}`);
            }
            if (item.types[i].description === "") {
                errors.push(`Пустое описание у типа #${i + 1}`);
            }
            if (item.types[i].cost === 0) {
                errors.push(`Добавьте стоимость типу #${i + 1}`);
            }
            if (item.types[i].itemType === 0) {
                errors.push(`Добавьте стоимость типу #${i + 1}`);
            }
        }

        for (let i = 0; i < item.properties.length; i++) {
            if (
                item.properties[i].name === "" ||
                item.properties[i].value === ""
            ) {
                errors.push(`Пустое название или значение свойства #${i + 1}`);
            }
        }

        if (errors.length !== 0) {
            errors = `- ${errors.join("\n- ")}`;

            alert(errors);

            return;
        }

        if (itemInfo === undefined) {
            let newItem = item;

            newItem.isService = newItem.isService === "true" ? true : false;
            newItem.categoryId = parseInt(newItem.categoryId);
            newItem.tags = newItem.tags.map((tag) => tag.id);

            for (let i = 0; i < newItem.types.length; i++) {
                let images = newItem.types[i].images;
                if (images.length === 0) {
                
                } else {
                    for (let j = 0; j < images.length; j++) {
                        const formdata = images[j].formData;

                        const requestOptions = {
                            method: "POST",
                            body: formdata,
                            redirect: "follow",
                        };

                        const url = await fetch(
                            STATIC_UPLOAD_URL,
                            requestOptions
                        ).then((response) => response.text());

                        images[j] = {
                            url,
                        };
                    }
                }

                newItem.types[i].images = images;
            }

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify(newItem);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            fetch(ITEMS_URL, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    console.log(result);
                    alert("Добавлено!");
                    router.push(`/admin/change/${result}`)
                })
                .catch((error) => console.error(error));
        } else {
            let newItem = item;

            newItem.isService = newItem.isService === "true" ? true : false;
            newItem.categoryId = parseInt(newItem.categoryId);
            newItem.tags = newItem.tags.map((tag) => tag.id);
            newItem.properties = newItem.properties.map((prop) => ({
                name: prop.name,
                value: prop.value,
            }));

            for (let i = 0; i < newItem.types.length; i++) {
                let images = newItem.types[i].images;
                if (images.length === 0) {
                    newItem.types[i].images.push({
                        url: "EMPTY_IMAGE.png",
                    });
                } else {
                    for (let j = 0; j < images.length; j++) {
                        let url = "";

                        if (images[j].id === undefined) {
                            const formdata = images[j].formData;

                            const requestOptions = {
                                method: "POST",
                                body: formdata,
                                redirect: "follow",
                            };

                            url = await fetch(
                                STATIC_UPLOAD_URL,
                                requestOptions
                            ).then((response) => response.text());
                        } else {
                            url = images[j].url;
                        }

                        images[j] = {
                            url,
                        };
                    }
                }

                newItem.types[i].images = images;
            }

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify(newItem);

            const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };
            // return

            fetch(`${ITEMS_URL}/${newItem.id}`, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    const requestOptions = {
                        method: "GET",
                        redirect: "follow",
                    };

                    fetch(`${ITEMS_URL}/${item.id}`, requestOptions)
                        .then((response) => response.json())
                        .then((result) => {
                            let newItem = { ...result };
                            newItem.categoryId = newItem.category.id.toString();
                            delete newItem.category;
                            newItem.isService = newItem.isService.toString();

                            setItem(newItem);

                            alert('Обновлено!')
                        })
                        .catch((error) => console.error(error));
                })
                .catch((error) => console.error(error));
        }
    }

    function onItemPropertyChange(newValue, key, index) {
        let properties = item.properties;
        properties[index] = {
            ...properties[index],
            [key]: newValue,
        };

        setItem({
            ...item,
            properties,
        });
    }

    function addProperty() {
        let properties = item.properties;

        properties.push({
            name: "",
            value: "",
        });

        setItem({
            ...item,
            properties,
        });
    }

    function deleteProperty(propIndex) {
        if (item.properties.length === 1) {
            alert("У товара должно быть хотя бы одно свойство!");
            return;
        }

        let properties = item.properties.filter(
            (item, index) => index !== propIndex
        );

        setItem({
            ...item,
            properties,
        });
    }

    return (
        <div className={`${styles.form}`}>
            <label className="input input-bordered flex items-center gap-2">
                Название
                <input
                    type="text"
                    className="grow"
                    placeholder="Муфта"
                    name="title"
                    value={item.title}
                    onChange={onItemChange}
                />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                Тип
                <input
                    type="text"
                    className="grow"
                    placeholder="Крепление на болтах и гайках"
                    name="subtitle"
                    value={item.subtitle}
                    onChange={onItemChange}
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Услуга или товар?</span>
                </div>
                <select
                    className="select select-bordered w-full"
                    name="isService"
                    value={item.isService}
                    onChange={onItemChange}
                >
                    <option value={false}>Товар</option>
                    <option value={true}>Услуга</option>
                </select>
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Выберите категорию</span>
                </div>
                <select
                    className="select select-bordered w-full"
                    name="categoryId"
                    value={item.categoryId}
                    onChange={onItemChange}
                >
                    <option disabled>Категория</option>
                    {categories.map((item, index) => {
                        return (
                            <option key={index} value={item.id}>
                                {item.rusName}
                            </option>
                        );
                    })}
                </select>
            </label>

            <div className={`form-contol`}>
                <div className="label">
                    <span className={`${styles.flexHeader} label-text`}>
                        Свойства
                        <button
                            className={`btn btn-circle btn-success btn-sm`}
                            onClick={addProperty}
                        >
                            <AddIcon fontSize="small" />
                        </button>
                    </span>
                </div>
                <div className={`${styles.properties}`}>
                    {item.properties.map((item, index) => {
                        return (
                            <Property
                                key={index}
                                property={{
                                    name: item.name,
                                    value: item.value,
                                }}
                                index={index}
                                properties={properties}
                                onItemPropertyChange={onItemPropertyChange}
                                deleteProperty={() => deleteProperty(index)}
                            />
                        );
                    })}
                </div>
            </div>
            <Autocomplete
                id="disabled-options-demo"
                multiple
                options={tags}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField
                        value={tagInput}
                        onChange={(event) => setTagInput(event.target.value)}
                        {...params}
                        label="Выберите тэги"
                    />
                )}
                onChange={onTagsChange}
                value={item.tags}
                isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                }
                noOptionsText={
                    <button
                        className={`btn btn-success btn-sm`}
                        onClick={addNewTag}
                        style={{ color: "white" }}
                    >
                        добавить
                    </button>
                }
            />
            {item.types.map((item, index) => {
                return (
                    <TypeInfo
                        key={index}
                        type={item}
                        index={index}
                        addImage={() => addImage(index)}
                        deleteImage={deleteImage}
                        onTypeChange={onTypeChange}
                        deleteType={deleteType}
                    />
                );
            })}
            <button
                className={`btn btn-success btn-sm`}
                onClick={addNewType}
                style={{ color: "white" }}
            >
                добавить новый тип
            </button>
            <button
                className={`${styles.submitBtn} btn btn-circle btn-success btn-lg`}
                onClick={onSubmit}
                style={{ color: "white" }}
            >
                <SaveIcon fontSize="large" />
            </button>
        </div>
    );
}
