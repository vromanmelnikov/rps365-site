import styles from "./cart-menu.module.scss";
import EmailIcon from "@mui/icons-material/Email";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import { useState } from "react";
import { parseNumber } from "shared/form.service";

export default function CartMenu({ cost }) {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  function onNumberChange(event) {

    const value = parseNumber(number, event.target.value)

    if (value !== null) {
      setNumber(value)
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
