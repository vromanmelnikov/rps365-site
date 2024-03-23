export const categories = [
    {
        name: 'Резина',
        href: '/catalog?category=rubber',
        type: 'rubber'
    },
    {
        name: 'Пластик',
        href: '/catalog?category=plastic',
        type: 'plastic'
    },
    {
        name: 'Сталь',
        href: '/catalog?category=steel',
        type: 'steel'
    },
]

export const allCategories = [
    {
        name: 'Все',
        href: '/catalog',
        type: ''
    },
    ...categories
]