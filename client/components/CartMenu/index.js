import styles from "./cart-menu.module.scss";
import EmailIcon from "@mui/icons-material/Email";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useState } from "react";
import { parseNumber } from "shared/form.service";
import emailValidator from 'email-validator'
import cartService from "shared/cart.service";
import { MAIL_CART_URL } from "shared/api.config";

export default function CartMenu({ cost, clearCart }) {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const [sending, setSending] = useState(false)

  const [error, setError] = useState({
    name: false,
    email: false,
    number: false,
    noItems: false
  })

  function onNumberChange(event) {

    const value = parseNumber(number, event.target.value)

    if (value !== null) {
      setNumber(value)
    }

  }

  function onInputFocus(event) {

    const name = event.target.name
    setError({
      ...error,
      [name]: false
    })

  }

  function onNameChange(event) {
    const value = event.target.value;
    setName(value);
  }

  function onEmailChange(event) {
    const value = event.target.value;
    setEmail(value);
  }

  function onSubmit(event) {
    event.preventDefault()

    let submitError = { ...error }
    let errorFlag = false

    if (cost === 0) {
      submitError.cost = true
      setError(submitError)
      return
    }

    if (name === '') {
      submitError.name = true
      errorFlag = true
    }
    if (email === '' || emailValidator.validate(email) === false) {
      submitError.email = true
      errorFlag = true
    }
    if (number.length !== 15) {
      console.log(number.length)
      submitError.number = true
      errorFlag = true
    }

    if (errorFlag === true) {
      setError(submitError)
      console.log(submitError)
      return
    }

    const cartData = cartService.getCartForMail()

    const data = {
      user: {
        name,
        number: `+7 ${number}`,
      },
      items: cartData.items,
      cost: cartData.cost
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(data);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    setSending(true)

    fetch(MAIL_CART_URL, requestOptions)
      .then((response) => response.text())
      .then((result) => {

        clearCart()
        setSending(false)

      })
      .catch((error) => console.error(error));

  }

  return (
    <div className={`${styles.main} card w-96 bg-base-100 shadow-xl`}>
      <form className={`${styles.content} card-body`} onSubmit={onSubmit}>
        <h2 className={`card-title ${error.cost && styles.noItems}`}>Стоимость заказа: {cost} рублей</h2>
        <span className={`${styles.noItemsText} ${error.cost && styles.opened}`}>Нет товаров в корзине</span>
        <div className="divider m-0"></div>
        <div className={`${styles.input}`}>
          <label className={`${error.name && 'input-error'} input input-bordered flex items-center gap-2 w-lg`}>
            <input
              onChange={(event) => onNameChange(event)}
              onFocus={onInputFocus}
              value={name}
              // name="name"
              type="text"
              // className="grow"
              placeholder="Ваше имя"
            />
            <PersonOutlineOutlinedIcon fontSize="small" />
          </label>
          <span className={`${styles.error} ${error.name && styles.opened}`}>
            Имя не заполнено
          </span>
        </div>
        <div className={`${styles.input}`}>
          <label className={`${error.email && 'input-error'} input input-bordered flex items-center gap-2 w-lg`}>
            <input
              onChange={(event) => onEmailChange(event)}
              onFocus={onInputFocus}
              value={email}
              // name="email"
              type="text"
              // className="grow"
              placeholder="ваша_почта@mail.ru"
            />
            <EmailIcon fontSize="small" />
          </label>
          <span className={`${styles.error} ${error.email && styles.opened}`}>
            Почта не заполнена или неправильна
          </span>
        </div>
        <div className={`${styles.input}`}>
          <label className={`${error.number && 'input-error'} input input-bordered flex items-center gap-2 w-lg`}>
            +7
            <input
              onChange={(event) => onNumberChange(event)}
              value={number}
              // name="number"
              type="text"
              // className="grow"
              placeholder="(999) 999-99-99"
              onFocus={(e) => {
                e.target.setAttribute("autoComplete", "none")
                onInputFocus(e)
              }}
            />
            <PhoneEnabledOutlinedIcon fontSize="small" />
          </label>
          <span className={`${styles.error} ${error.number && styles.opened}`}>
            Номер не заполнен
          </span>
        </div>
        <div className="divider m-0"></div>
        <div className="card-actions justify-end">
          <button disabled={cost === 0} className={`${styles.btn} btn btn-success`}>
            {
              sending === true 
              ?
              <span className="loading loading-dots loading-lg"></span>
              :
              'Оформить заказ'
            }
          </button>
        </div>
      </form>
    </div>
  );
}
