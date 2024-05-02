import { useEffect, useId, useRef, useState } from 'react'
import styles from './carousel.module.scss'
import Image from "next/image";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { STATIC_URL } from 'shared/api.config';

function CarouselDialog() {

}

export default function Carousel({ images, height, expanded }) {

    const id = useId().replaceAll(':', '')
    const [loadCounter, setLoadcounter] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [currImage, setCurrImage] = useState(null)
    const [expandFlag, setExpandFlag] = useState(false)

    const [currImageIndex, setCurrImageIndex] = useState(null)

    useEffect(
        () => {
            if (loadCounter === images.length) {
                // conso
                const middleImageIndex = parseInt(images.length / 2)
                setCurrImageIndex(middleImageIndex)
                const carousel = document.getElementById(id)
                // carousel.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
                const middleImage = carousel.querySelector(`#image_${id}_${middleImageIndex}`)
                carousel.scrollTo({ left: middleImage.offsetLeft - middleImage.width / 2 })
            }
        }, [loadCounter]
    )

    useEffect(
        () => {
            if (currImage !== null) {
                try {
                    document.getElementById(`carousel_modal_${id}`).showModal()
                }
                catch (error) {

                }
            }
        }, [currImage]
    )

    useEffect(
        () => {
            console.log(currImageIndex)
        }, [currImageIndex]
    )

    function goToLeft() {

        // const div = document.getElementById(id)

        const newIndex = currImageIndex === 0 ? images.length - 1 : currImageIndex - 1
        const newImage = document.getElementById(`image_${id}_${newIndex}`)
        newImage.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'center'})
        setCurrImageIndex(newIndex)


        // if (div.scrollLeft === 0) {
        //     div.scrollBy({ left: div.scrollWidth, top: 0, behavior: 'smooth' })
        // }
        // else {
        //     div.scrollBy({ left: -(div.scrollWidth / images.length), top: 0, behavior: 'smooth' })
        // }
    }

    function goToRight() {


        // const div = document.getElementById(id)

        const newIndex = currImageIndex === images.length - 1 ? 0 : currImageIndex + 1
        const newImage = document.getElementById(`image_${id}_${newIndex}`)
        newImage.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'center'})
        setCurrImageIndex(newIndex)

        // if (div.scrollWidth - div.clientWidth - div.scrollLeft < 5) {
        //     div.scrollBy({ left: -div.scrollWidth, top: 0, behavior: 'smooth' })
        // }
        // else {
        //     div.scrollBy({ left: (div.scrollWidth / images.length), top: 0, behavior: 'smooth' })
        // }
    }

    function prevImage() {
        setLoaded(false)
        if (currImage !== 0) {
            setCurrImage(prev => prev - 1)
        }
        else {
            setCurrImage(images.length - 1)
        }
    }

    function nextImage() {
        setLoaded(false)
        if (currImage !== images.length - 1) {
            setCurrImage(prev => prev + 1)
        }
        else {
            setCurrImage(0)
        }
    }

    function toggleExpandedBlock(event) {
        const block = document.getElementById(`expandedCarousel_${id}`)
        let opened = block.getAttribute('open')
        if (opened === null) {
            block.setAttribute('open', '')
            setExpandFlag(true)
        }
        else if (opened === '') {
            block.removeAttribute('open')
            setExpandFlag(false)
            if (event.target.id === 'bottomExpandBtn') {
                const link = document.createElement('a')
                link.href = `#${id}`
                link.click()
            }
        }
    }

    function onModalImageLoad(event) {
        setLoaded(true)
    }
    return (
        <div className={`${styles.carousel}`}>
            <div className={`${styles.main}`}>
                <span onClick={() => goToLeft()} className={`${styles.leftArrow} btn btn-circle `}>
                    <ArrowBackIcon />
                </span>
                <div id={id} style={{ height: `${height}` }} className={`${styles.images} carousel_block`}>
                    {
                        images.sort((a, b) => a.queueNumber - b.queueNumber).map((item, index) => {

                            return (
                                <Image
                                    onClick={() => {
                                        setCurrImage(index)
                                    }}
                                    loading='lazy'
                                    onLoad={e => {
                                        setLoadcounter(prev => prev + 1)
                                    }}
                                    src={`${STATIC_URL}/${item.url}`}
                                    width={512}
                                    height={0}
                                    alt='photo'
                                    key={index}
                                    className={`${styles.image}`}
                                    id={`image_${id}_${index}`}
                                />

                            )
                        })
                    }
                </div>
                <span onClick={() => goToRight()} className={`${styles.rightArrow} btn btn-circle `}>
                    <ArrowBackIcon />
                </span>
            </div>
            {
                expanded === true &&
                <>
                    <button onClick={(e) => toggleExpandedBlock(e)} className={`${styles.expandBtn} btn btn-primary`}>
                        {
                            expandFlag === false
                                ?
                                <>
                                    Развернуть <ExpandMoreIcon />
                                </>
                                :
                                <>
                                    Свернуть <ExpandLessIcon />
                                </>
                        }
                    </button>
                    <div id={`expandedCarousel_${id}`} className={`${styles.expandedBlock}`}>
                        {
                            images.map((item, index) => {
                                return (
                                    <Image
                                        key={index}
                                        onClick={() => {
                                            setCurrImage(index)
                                        }}
                                        src={`${STATIC_URL}/${item.url}`}
                                        width={512}
                                        height={'100'}
                                        alt='Выбранное фото'
                                        className={`${styles.modalImage}`} />
                                )
                            })
                        }
                    </div>
                    {
                        expandFlag === true &&
                        <button id='bottomExpandBtn' onClick={(e) => toggleExpandedBlock(e)} className={`${styles.expandBtn} btn btn-primary`}>
                            Свернуть <ExpandLessIcon />
                        </button>
                    }
                </>
            }
            <dialog id={`carousel_modal_${id}`} className="modal">
                <div className={`${styles.modal} modal-box`} >
                    <form className="modal-backdrop" method="dialog" onSubmit={(e) => setCurrImage(null)} >
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
                    </form>
                    <span onClick={() => prevImage()} className={`${styles.leftArrow} btn btn-circle `}>
                        <ArrowBackIcon />
                    </span>
                    {
                        currImage !== null &&
                        <Image
                            src={`${STATIC_URL}/${images[currImage].url}`}
                            width={1024}
                            height={'400'}
                            alt='Выбранное фото'
                            className={`${styles.modalImage}`}
                            onLoad={onModalImageLoad}
                        />
                    }
                    {
                        loaded === false &&
                        <span className={`${styles.modalLoading} loading loading-dots loading-lg`}></span>
                    }
                    {/* <span className={`${styles.modalLoading} loading loading-dots loading-lg`}></span> */}
                    <span onClick={() => nextImage()} className={`${styles.rightArrow} btn btn-circle `}>
                        <ArrowBackIcon />
                    </span>
                </div>
            </dialog>


        </div>
    )
}