import axios from 'axios'
import items from './items.json'
import { API_URL } from 'shared/api.config'

const URL = `${API_URL}/items`

export default async function handler(req, res) {

    const items = await axios.get(URL)
    res.status(200).json(items)
}
