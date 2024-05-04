import Link from "next/link";
import Item from "./Item";
import styles from "./catalog-items.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CatalogItems({ items, categories }) {
    const router = useRouter();
    const [category, setCategory] = useState(categories[0]);

    const [sliceCount, setSliceCount] = useState(6);

    useEffect(() => {
    }, [sliceCount]);

    useEffect(() => {
        const categoryPath = router.asPath;
        if (categoryPath) {
            const category = categories.filter(
                (item) => item.href === categoryPath
            )[0];
            setCategory(category);
        }
    }, [router]);

    function showMore() {

        let length = items
            .filter(
                (item) =>
                    item.category.name === category.type ||
                    category.type === ""
            ).length

        let newSliceCount = sliceCount + 6;
        if (newSliceCount <= length + 6) {
            setSliceCount(newSliceCount);
        }
    }

    function showLess() {

        let length = items
            .filter(
                (item) =>
                    item.category.name === category.type ||
                    category.type === ""
            ).length

        let newSliceCount = sliceCount - 6;
        setSliceCount(newSliceCount);
    }

    return (
        <section className={`${styles.main}`}>
            <div className={`${styles.categories}`}>
                {categories.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            href={item.href}
                            className={`${styles.item} badge ${item.href === category.href && "badge-primary"
                                }  ${item.href !== category.href && "badge-outline"
                                } p-3`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </div>
            <div className={`${styles.items}`}>
                {items
                    .filter(
                        (item) =>
                            item.category.name === category.type ||
                            category.type === ""
                    )
                    .slice(0, sliceCount)
                    .map((item, index) => {
                        return <Item key={index} item={item} />;
                    })}
                {items.filter(
                    (item) =>
                        item.category.name === category.type ||
                        category.type === ""
                ).length === 0 && <h1>Товаров не найдено</h1>}
            </div>
            <div className={`${styles.paginationBtns} join`}>
                {sliceCount !== 6 && (
                    <button className={`btn join-item`} onClick={showLess}>
                        Меньше
                    </button>
                )}
                <button
                    disabled={sliceCount + 6 >= items.filter((item) =>item.category.name === category.type || category.type === "").length + 6}
                    className={`btn btn-primary join-item`}
                    onClick={showMore}
                >
                    Ещё товары
                </button>
            </div>
        </section>
    );
}
