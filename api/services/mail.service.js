function createCartMail(items, { name, number, email }, cost) {

    let html = ''

    html += `
        <h1 style="color: red">Заказ из корзины покупателя</h1>
        <p>Имя: ${name}</p>
        <p>Номер: <a href="tel:${number}">${number}</a></p>
    `
    html += `
        <table style="border: 1px solid black; border-collapse: collapse;">
            <tr>
                <th  style="border: 1px solid black; border-collapse: collapse; padding: 4px 8px">Название</th>
                <th  style="border: 1px solid black; border-collapse: collapse; padding: 4px 8px">Вид товара</th>
                <th  style="border: 1px solid black; border-collapse: collapse; padding: 4px 8px">Комплектация</th>
                <th  style="border: 1px solid black; border-collapse: collapse; padding: 4px 8px">Количество</th>
                <th  style="border: 1px solid black; border-collapse: collapse; padding: 4px 8px">Итоговая стоимость</th>
            <tr>
            <tr>
                ${items.map(
        (item, index) => {
            return (
                `
                    <th  style="border: 1px solid black; border-collapse: collapse; padding: 4px 8px">${item.title}</th>
                    <td style="border: 1px solid black; border-collapse: collapse; padding: 4px 8px">${item.subtitle}</td>
                    <td style="border: 1px solid black; border-collapse: collapse; padding: 4px 8px">${item.typeTitle}</td>
                    <td style="border: 1px solid black; border-collapse: collapse; padding: 4px 8px">${item.count}</td>
                    <td style="border: 1px solid black; border-collapse: collapse; padding: 4px 8px">${item.cost * item.count}р.</td>
                `
            )
        }
    )
        }
            </tr>
        </table>
        <p>Общая стоимость: ${cost}</p>
    `

    html = `
        <div style="display:flex;flex-direction:column;row-gap:12px">
            ${html}
        </div>
    `

    return html
}

function createRequestMail(name, number, request, email) {
    return `
        <h1 style="color: red">Заявка на консультацию</h1>
        <p>Имя: ${name}</p>
        <p>Номер: <a href="tel:${number}">${number}</a></p>
        <p>Почта: <a href="mail:${email}">${email ? email : 'не указана'}</a></p>
        <p>Вопрос: ${request ? request : 'не указан'}</p>
    `
}

function createCodeMail(email, code) {
    return `
    <h1 style="color: red">Заявка на восстановление пароля</h1>
    <p>Почта: ${email}</p>
    <p style="font-weight: 600">Код восстановления: ${code}</p>
`
}

module.exports = {
    createCartMail,
    createRequestMail,
    createCodeMail
}