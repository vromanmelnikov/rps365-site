import styles from './tags.module.scss'

function Tag({ tag, choosen, onTagClick }) {

    return (
        <span className={`${styles.tag} ${choosen && styles.choosen}`} onClick={() => onTagClick(tag)}>{tag.name}</span>
    )
}

export default function Tags({ tags, changeTags, choosenTags }) {

    function onTagClick(tag) {
        changeTags(tag)
    }

    return (
        <div className={`${styles.tags}`}>
            {
                tags.map((item, index) => {

                    const choosen = Boolean(choosenTags.filter(tag => tag.id === item.id)[0])

                    return (
                        <Tag key={index} tag={item} onTagClick={onTagClick} choosen={choosen}/>
                    )
                })
            }
        </div>
    )
}