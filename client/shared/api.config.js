export const API_URL = `http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}`
export const STATIC_URL = `http://${process.env.NEXT_PUBLIC_STATIC_HOST}:${process.env.NEXT_PUBLIC_STATIC_PORT}`

export const ITEMS_URL = `${API_URL}/items`
export const CATEGORIES_ITEMS_URL = `${ITEMS_URL}/categories`

export const TAGS_URL = `${API_URL}/static/tags`
export const CATEGORIES_URL = `${API_URL}/static/categories`

export const IMAGES_URL = `${API_URL}/images`
export const SERT_URL = `${API_URL}/sertificats`
export const REAL_OBJECTS_URL = `${API_URL}/real_objects`
export const FEEDBACKS_URL = `${API_URL}/feedbacks`
export const POPULAR_GOODS_URL = `${ITEMS_URL}?popular=true`

export const MAIL_URL = `${API_URL}/mail`
export const MAIL_CART_URL = `${MAIL_URL}/cart`
