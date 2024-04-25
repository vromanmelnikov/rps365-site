import Layout from "components/Layout";
import Head from "next/head";
import styles from "./catalog.module.scss";
import CatalogFilters from "components/CatalogFilters";
import CatalogItems from "components/CatalogItems";
import { useEffect, useState } from "react";
import axios from "axios";
import { CATEGORIES_URL, ITEMS_URL, TAGS_URL } from "shared/api.config";

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';

const NO_FILTERS = {
  sorting: 'COST_UP',
  cost: {
    min: '',
    max: ''
  },
  tags: [],
  types: {
    products: true,
    services: true
  },
  saved: true
}

function applySortFilter(sortType, items) {

  if (sortType === 'COST_UP') {

    return items.sort((a, b) => {
      if (a.min > b.min) return 1
      if (a.min === b.min) return 0
      if (a.min < b.min) return -1
    })

  }
  else if (sortType === 'COST_DOWN') {

    return items.sort((a, b) => {
      if (a.min > b.min) return -1
      if (a.min === b.min) return 0
      if (a.min < b.min) return 1
    })

  }

}

function applyCostFilter({ min, max }, item) {
  let flag = {
    min: true,
    max: true
  }
  if (min !== '') {
    flag.min = item.typesCosts.min >= min
  }
  if (max !== '') {
    flag.max = item.typesCosts.max >= max
  }

  return flag.min && flag.max
}

function applyTagsFilter(tagsID, item) {

  if (tagsID.length === 0) {
    return true
  }

  const hasTags = item.tagsID.find(tagID => tagsID.includes(tagID) === true)
  return hasTags >= 0

}

function applyFilters(filters, items) {

  let filteredItems = []

  for (let item of items) {
    const tagsID = filters.tags.map(tag => tag.id)
    if (
      applyCostFilter(filters.cost, item) === true
      && applyTagsFilter(tagsID, item) === true
    ) {
      filteredItems.push(item)
    }
  }

  filteredItems = applySortFilter(filters.sorting, filteredItems)

  return filteredItems

}

export default function Catalog({ items, tags, costRange, categories }) {

  const [filteredItems, setFilteredItems] = useState([]);

  const [filters, setFilters] = useState(NO_FILTERS)

  useEffect(() => {
    if (filters.saved === true) {
      setFilteredItems(applyFilters(filters, items));
    }
  }, [filters])

  function changeFilters(filterName, value) {
    setFilters({
      ...filters,
      saved: false,
      [filterName]: value
    })
  }

  function clearFilters() {
    setFilters(NO_FILTERS)
  }

  function openFilters() {
    const filters = document.getElementById('filters')
    console.log(filters)
    const opened = filters.getAttribute('opened')
    if (opened === '') {
      filters.removeAttribute('opened')
    }
    else {
      filters.setAttribute('opened', '')
    }
  }

  const title = "Каталог";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content='Компания "РЕПЛАСТ-365" предлагает уникальное решение для проблем, 
          связанных с герметизацией. Мы специализируемся на разработке и обеспечении
           надежной герметизации технических сетей, кабельных коммуникаций и трубных 
           разводок от воздействия внешних факторов'>
        </meta>
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <main className={`${styles.main}`} data-theme="mytheme">
          <div className={`${styles.breadcrumbs} text-sm breadcrumbs`}>
            <ul>
              <li>
                <a>Главная</a>
              </li>
              <li>
                <b>Каталог</b>
              </li>
            </ul>
            <label  className={`${styles.filterToggler} btn btn-primary btn-circle btn-sm swap swap-rotate`} >
              <input type="checkbox" onChange={openFilters}/>
              <FilterAltIcon className="swap-off fill-current"/>
              <CloseIcon className="swap-on fill-current"/>              
            </label>
          </div>
          <div className={`${styles.catalog}`}>
            <CatalogFilters tags={tags} filters={filters} costRange={costRange} changeFilters={changeFilters} clearFilters={clearFilters} />
            <CatalogItems items={filteredItems} categories={categories} />
          </div>
        </main>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {

  const data = (await axios.get(ITEMS_URL)).data

  const items = data.items
  const costRange = data.costRange
  const tags = (await axios.get(TAGS_URL)).data
  let categories = (await axios.get(CATEGORIES_URL)).data.map(category => {
    return {
      name: category.rusName,
      type: category.name,
      href: `/catalog?category=${category.name}`
    }
  })

  categories.unshift({
    name: 'Все',
    href: '/catalog',
    type: ''
  })

  return ({
    props: { items, tags, costRange, categories }
  })
}
