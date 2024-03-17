import styles from "./cart-menu.module.scss";
import EmailIcon from "@mui/icons-material/Email";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import { useState } from "react";

export default function CartMenu({ cost }) {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  function onNumberChange(event) {
    let value = event.target.value;

    //TODO: check numbers

    const numbers = "0123456789";
    const chars = "()- ";

    if (value.length !== 16) {
      if (value.length === 1 && value[0] !== "(") {
        value = "(" + value;
      } else if (value.length === 4) {
        value += ") ";
      } else if (value.length === 5) {
        value =
          value.slice(0, value.length - 1) + ") " + value[value.length - 1];
      } else if (value.length === 6) {
        value = value.slice(0, 4);
      } else if (
        (value.length === 10 || value.length === 13) &&
        value.length === number.length - 1
      ) {
        value = value.slice(0, value.length - 1);
      } else if (
        (value.length === 10 || value.length === 13) &&
        value.length === number.length + 1
      ) {
        value =
          value.slice(0, value.length - 1) + "-" + value[value.length - 1];
      } else if (value.length === 9 || value.length === 12) {
        value = value;
      } else if (value.length === 9 || value.length === 12) {
        value += "-";
      }

      setNumber(value);
    }
  }

  function onEmailChange(event) {
    const value = event.target.value;
    setEmail(value);
  }

  return (
    <div className={`${styles.main} card w-96 bg-base-100 shadow-xl`}>
      <div className={`${styles.content} card-body`}>
        <h2 className="card-title">Стоимость заказа: {cost} рублей</h2>
        <div className="divider m-0"></div>
        <label className="input input-bordered flex items-center gap-2 w-lg">
          <input
          onChange={(event) => onEmailChange(event)}
            value={email}
            type="text"
            className="grow"
            placeholder="ваша_почта@mail.ru"
          />
          <EmailIcon fontSize="small" />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-lg">
          +7
          <input
            onChange={(event) => onNumberChange(event)}
            value={number}
            type="text"
            className="grow"
            placeholder="(999) 999-99-99"
          />
          <PhoneEnabledOutlinedIcon fontSize="small" />
        </label>
        <div className="divider m-0"></div>
        <div className="card-actions justify-end">
          <button className={`${styles.btn} btn btn-success`}>
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
}
