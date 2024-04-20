import Link from "next/link";
import Item from "./Item";
import styles from "./catalog-items.module.scss";
import { allCategories } from "shared/static/static";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CatalogItems({ items, categories }) {

  console.log(categories)

  const router = useRouter()
  const [category, setCategory] = useState(categories[0])

  useEffect(
    () => {
      const categoryPath = router.asPath
      if (categoryPath) {
        const category = categories.filter(item => item.href === categoryPath)[0]
        setCategory(category)
      }
    }, [router]
  )

  return (
    <section className={`${styles.main}`}>
      <div className={`${styles.categories}`}>
        {
          categories.map((item, index) => {
            return (
              <Link key={index} href={item.href} className={`${styles.item} badge ${item.href === category.href && 'badge-primary'}  ${item.href !== category.href && 'badge-outline'} p-3`}>{item.name}</Link>
            )
          })
        }
      </div>
      <div className={`${styles.items}`}>
        {
          items.filter(item => item.category.name === category.type || category.type === '').map((item, index) => {
            return <Item key={index} item={item} />;
          })
        }
        {
          items.filter(item => item.category.name === category.type || category.type === '').length === 0
          &&
          <h1 >Товаров не найдено</h1>
        }
      </div>
    </section>
  );
}
