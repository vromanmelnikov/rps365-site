import { useState } from 'react'
import styles from './request-modal.module.scss'

import emailValidator from 'email-validator'
import cartService from "shared/cart.service";
import { parseNumber } from "shared/form.service";
import EmailIcon from "@mui/icons-material/Email";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { MAIL_URL } from 'shared/api.config';
import alertService from 'shared/alert.service';

export default function RequestModal() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [request, setRequest] = useState("")

    const [sending, setSending] = useState(false)

    const [error, setError] = useState({
        name: false,
        email: false,
        number: false,
        request: false,
        noItems: false
    })

    function onNumberChange(event) {

        const value = parseNumber(number, event.target.value)

        if (value !== null) {
            setNumber(value)
        }

    }

    function onRequestChange(event) {
        const value = event.target.value;
        setRequest(value);
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
            return
        }

        // const cartData = cartService.getCartForMail()

        const data = {
            name,
            number: `+7 ${number}`,
            request,
            email
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

        fetch(MAIL_URL, requestOptions)
            .then((result) => {

                setSending(false)
                document.getElementById('requestModal').close()
                alertService.openAlert('requestAlert')

            })
            .catch((error) => {

                setSending(false)
                document.getElementById('requestModal').close()
                alertService.openAlert('errorAlert')
            });

    }

    function onDialogClose() {
        setError({
            name: false,
            email: false,
            number: false,
            request: false,
            noItems: false
        })
        setName('')
        setEmail('')
        setRequest('')
        setNumber('')
    }

    return (
        <dialog id="requestModal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Есть вопросы к нам?</h3>
                <form className={`${styles.form}`} onSubmit={onSubmit}>
                    <div className={`${styles.input}`}>
                        <label className={`${error.name && 'input-error'} input input-bordered flex items-center gap-2 w-lg`}>
                            <input
                                onChange={(event) => onNameChange(event)}
                                onFocus={onInputFocus}
                                value={name}
                                // name="name"
                                type="text"
                                className="grow"
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
                                className="grow"
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
                                className="grow"
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
                    <div className={`${styles.input}`}>
                        <textarea
                            value={request}
                            className={`textarea textarea-bordered`}
                            placeholder="Напишите вопрос здесь или задайте во время звонка"
                            onChange={onRequestChange}
                        >
                        </textarea>
                        {/* <span className={`${styles.error} ${error.number && styles.opened}`}>
                            Номер не заполнен
                        </span> */}
                    </div>
                    <button className={`${styles.btn} btn btn-success`}>
                        {
                            sending === true
                                ?
                                <span className="loading loading-dots loading-lg"></span>
                                :
                                'Получить консультацию'
                        }
                    </button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop" onSubmit={onDialogClose}>
                <button>close</button>
            </form>
        </dialog>
    )
}