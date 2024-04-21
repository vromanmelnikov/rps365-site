export function parseNumber(prevNumber, number) {

    let value = number

    const numbers = "0123456789";
    const chars = "()- ";

    if (prevNumber.length === 0 && (number.length === 11 || number.length === 12)) {
        return null
    }

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
            value.length === prevNumber.length - 1
        ) {
            value = value.slice(0, value.length - 1);
        } else if (
            (value.length === 10 || value.length === 13) &&
            value.length === prevNumber.length + 1
        ) {
            value =
                value.slice(0, value.length - 1) + "-" + value[value.length - 1];
        } else if (value.length === 9 || value.length === 12) {
            value = value;
        } else if (value.length === 9 || value.length === 12) {
            value += "-";
        }

        return value
    }
    else {
        return null
    }

}