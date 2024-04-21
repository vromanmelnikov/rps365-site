import axios from "axios"
import { MAIL_CART_URL } from "./api.config"

class ApiService {

    sendCart(items, {name, number, email}, cost) {

        const data = {
            items, 
            user: {
                name, 
                number,
                email
            },
            cost
        }

        return axios.post(MAIL_CART_URL, data)
    }
}

export default ApiService = new ApiService()