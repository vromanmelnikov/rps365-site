export const API_URL = `http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}`
export const STATIC_URL = `http://${process.env.NEXT_PUBLIC_STATIC_HOST}:${process.env.NEXT_PUBLIC_STATIC_PORT}`

export const ITEMS_URL = `${API_URL}/items`
export const RUBBER_ITEMS_URL = `${ITEMS_URL}?category=rubber`

export const TAGS_URL = `${API_URL}/tags`

export const SERT_URL = `${API_URL}/sertificats`
export const REAL_OBJECTS_URL = `${API_URL}/real_objects`
export const FEEDBACKS_URL = `${API_URL}/feedbacks`
export const POPULAR_GOODS_URL = `${API_URL}/popular_goods`
