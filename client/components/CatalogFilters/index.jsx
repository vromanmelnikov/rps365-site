import { sortFilters } from "shared/catalog.shared";
import styles from "./catalog-filters.module.scss";
import { Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Tags from "./Tags";

export default function CatalogFilters({ tags, filters, costRange, changeFilters, clearFilters }) {

  function onCostChange(event, type) {

    let value = parseInt(event.target.value)

    value = isNaN(value) ? '' : value.toString()

    let cost = { ...filters.cost }
    cost[type] = value

    changeFilters('cost', cost)

  }

  function onCostChangeBySlider(event, newValue) {

    if (newValue[1] - newValue[0] > 10) {
      let cost = {
        min: newValue[0],
        max: newValue[1]
      }
      changeFilters('cost', cost)
    }

  }

  function validateCost(event) {

    let cost = {
      min: parseInt(filters.cost.min),
      max: parseInt(filters.cost.max)
    }

    const validMin = costRange.min <= cost.min
    const validMax = costRange.max >= cost.max

    if (validMin === false) {
      cost.min = costRange.min
    }
    if (validMax === false) {
      cost.max = costRange.max
    }

    const minMoreMax = cost.max - cost.min <= 0
    if (minMoreMax) {
      const name = event.target.name
      if (name === 'max') {
        cost.max = cost.min + 10
      }
      else if(name === 'min') {
        cost.min = cost.max - 10
      }
    }

    if (validMin === false || validMax === false || minMoreMax ) {

      cost = {
        min: isNaN(cost.min) ? '' : cost.min.toString(),
        max: isNaN(cost.max) ? '' : cost.max.toString()
      }

      changeFilters('cost', cost)
    }
  }

  function onSortTypeChange(event) {
    const value = event.target.value
    changeFilters('sorting', value)
  }

  function saveFilters() {
    changeFilters('saved', true)
  }

  function changeTags(tag) {
    let tags = [...filters.tags]
    tags = tags.filter(item => item.id !== tag.id)
    if (tags.length === filters.tags.length) {
      tags.push(tag)
    }
    changeFilters('tags', tags)
  }

  return (
    <aside className={`${styles.filterSide}`}>
      <div className={`${styles.filterBtn}`}>
        <span className={`${styles.type}`}>Фильтр</span>
        <span className={`pointer`} onClick={clearFilters}>Сбросить</span>
      </div>
      <div className={`${styles.filter}`}>
        <span className={`${styles.type}`}>Сортировка</span>
        <select
          className={`${styles.select} select select-bordered w-full max-w-xs`}
          onChange={onSortTypeChange}
          value={filters.sorting}
        >
          {sortFilters.map((item, index) => {
            return <option key={index} value={item.value}>{item.name}</option>;
          })}
        </select>
      </div>
      <div className={`${styles.filter}`}>
        <span className={`${styles.type}`}>Цена, руб.</span>
        <div className={styles.costs}>
          <div className={styles.cost}>
            <span>От</span>
            <input
              type="number"
              placeholder="Руб."
              className="input input-bordered "
              value={filters.cost.min}
              onChange={(event) => onCostChange(event, 'min')}
              onBlur={validateCost}
              name="min"
            />
          </div>
          <div className={styles.cost}>
            <span>До</span>
            <input
              type="number"
              placeholder="Руб."
              className="input input-bordered "
              value={filters.cost.max}
              onChange={(event) => onCostChange(event, 'max')}
              onBlur={validateCost}
              name="max"
            />
          </div>
        </div>
        <Slider
          value={[
            filters.cost.min === '' ? costRange.min : parseInt(filters.cost.min),
            filters.cost.max === '' ? costRange.max : parseInt(filters.cost.max)
          ]}
          onChange={onCostChangeBySlider}
          valueLabelDisplay="auto"
          min={costRange.min}
          max={costRange.max}
        />
      </div>
      <div className={`${styles.filter}`}>
        <span className={`${styles.type}`}>Теги</span>
        <Tags tags={tags} changeTags={changeTags} choosenTags={filters.tags}/>
      </div>
      <button className={`btn btn-success btn-sm ${styles.saveBtn}`} onClick={saveFilters}>Сохранить</button>
    </aside>
  );
}
