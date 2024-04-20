import styles from "./cart-items.module.scss";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import cartService from "shared/cart.service";

function Item({ item, index, changeCost, deleteItem }) {
  const [count, setCount] = useState(item.count);

  function onCountChange(count) {
    if (count > 0) {
      setCount(count);
      const cost = cartService.changeProductCount(index, count);
      changeCost(cost)
    }
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <span>{item.subtitle}</span>
        <span>{item.type.title}</span>
        <div className={`${styles.actions} card-actions justify-start`}>
          <div className={`${styles.func}`}>
            <button className="btn btn-error btn-sm" onClick={() => deleteItem(index)}>
              <DeleteOutlineIcon />
            </button>
            <button className="btn btn-sm">
              <FavoriteBorderIcon color="primary" />
            </button>
          </div>
          <div className={`${styles.count}`}>
            <span className={`${styles.cost}`}>{item.type.cost} руб.</span>
            <button
              className="btn btn-sm btn-outline btn-primary btn-circle"
              onClick={() => onCountChange(count - 1)}
            >
              -
            </button>
            <input
              type="text"
              placeholder="1"
              className="input input-bordered input-primary w-full max-w-xs input-sm "
              value={count}
              onChange={(event) => {
                const count = parseInt(event.target.value);
                onCountChange(count);
              }}
            />
            <button
              className="btn btn-sm btn-outline btn-primary btn-circle"
              onClick={() => onCountChange(count + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartItems({ items, changeCost, deleteItem }) {
  return (
    <section className={`${styles.main}`}>
      {
        items.length === 0
        &&
        <h2 className={`${styles.noItems}`}>Нет товаров в корзине</h2>
      }
      {items.map((item, index) => {
        return (
          <Item key={index} item={item} index={index} changeCost={changeCost} deleteItem={deleteItem}/>
        );
      })}
    </section>
  );
}
