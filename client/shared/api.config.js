// export const API_URL = `https://mistydev.ru/api`
export const API_URL = `http://localhost:8000/api`
// export const STATIC_URL = `https://mistydev.ru/static`
export const STATIC_URL = `http://localhost:8080/static`
export const STATIC_UPLOAD_URL = `${STATIC_URL}/upload`
// export const STATIC_DELETE_URL = `${STATIC_URL}`

// export const API_URL = `http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}`
// export const STATIC_URL = `http://${process.env.NEXT_PUBLIC_STATIC_HOST}:${process.env.NEXT_PUBLIC_STATIC_PORT}`

export const AUTH_URL = `${API_URL}/auth`
export const AUTH_CODE_URL = `${AUTH_URL}/code`

export const ITEMS_URL = `${API_URL}/items`
export const ITEM_POPULARITY_URL = `${ITEMS_URL}/popularity`
export const ITEM_TYPES_URL = `${ITEMS_URL}/types`
export const ITEM_IMAGES_URL = `${ITEM_TYPES_URL}/images`
export const CATEGORIES_ITEMS_URL = `${ITEMS_URL}/categories`
export const PROPERTIES_URL = `${ITEMS_URL}/properties`

export const TAGS_URL = `${API_URL}/static/tags`
export const CATEGORIES_URL = `${API_URL}/static/categories`

export const IMAGES_URL = `${API_URL}/images`
export const SERT_URL = `${API_URL}/sertificats`
export const REAL_OBJECTS_URL = `${API_URL}/real_objects`
export const FEEDBACKS_URL = `${API_URL}/feedbacks`
export const POPULAR_GOODS_URL = `${ITEMS_URL}?popular=true`

export const MAIL_URL = `${API_URL}/mail`
export const MAIL_CART_URL = `${MAIL_URL}/cart`
export const MAIL_AUTH_CODE_URL = `${MAIL_URL}/code`
