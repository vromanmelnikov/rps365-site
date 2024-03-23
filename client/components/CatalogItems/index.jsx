import Link from "next/link";
import Item from "./Item";
import styles from "./catalog-items.module.scss";
import { allCategories } from "shared/static/static";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CatalogItems({ items }) {

  const router = useRouter()
  const [category, setCategory] = useState(allCategories[0])

  useEffect(
    () => {
      const categoryPath = router.asPath
      if (categoryPath) {
        const category = allCategories.filter(item => item.href === categoryPath)[0]
        setCategory(category)
      }
    }, [router]
  )

  return (
    <section className={`${styles.main}`}>
      <div className={`${styles.categories}`}>
        {
          allCategories.map((item, index) => {
            return (
              <Link key={index} href={item.href} className={`${styles.item} badge ${item.href === category.href && 'badge-primary'}  ${item.href !== category.href && 'badge-outline'} p-3`}>{item.name}</Link>
            )
          })
        }
      </div>
      <div className={`${styles.items}`}>
        {
          items.filter(item => item.category === category.type || category.type === '').map((item, index) => {
            return <Item key={index} item={item} />;
          })
        }
      </div>
    </section>
  );
}
