import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { setFilterBy } from "../store/stay.actions.js"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { IconContext } from "react-icons"
// List of icons for labels filter! 
import { VscKey } from 'react-icons/vsc'
import { MdOutlineBeachAccess, MdOutlineDirectionsBoatFilled } from 'react-icons/md'
import { GiWoodCabin, GiPineTree, GiCastle, GiIsland, GiCircleForest, GiStoneTower, GiWindmill, GiFarmTractor, GiUndergroundCave } from 'react-icons/gi'
import { FaCampground } from 'react-icons/fa'
import { BsSnow } from 'react-icons/bs'
import { HiHomeModern } from 'react-icons/hi2'
import { WiStars } from 'react-icons/wi'

import { useState, useEffect } from "react"



export function LabelsFilter() {

    const isHeadFilterExpanded = useSelector((storeState) => storeState.stayModule.isHeadFilterExpanded)
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
    const [searchParams, setSearchParams] = useSearchParams()
    const [shownLabels, setShownLabels] = useState(6)
    const [selectedLabel, setSelectedLabel] = useState('')

    useEffect(() => {
        labels = labels.slice(0, shownLabels)
    }, [])
    let labels = ['Trending', 'New', 'Beachfront', 'Cabins', 'Parks', 'Campers', 'Castles', 'Islands',
        'Boats', 'Home', 'Tropical', 'Towers', 'Windmills', 'Farms', 'Cave', 'Ski']

    const icons = [<WiStars />, <VscKey />, <MdOutlineBeachAccess />, <GiWoodCabin />, <GiPineTree />, <FaCampground />, <GiCastle />, <GiIsland />,
    <MdOutlineDirectionsBoatFilled />, <HiHomeModern />, <GiCircleForest />, <GiStoneTower />, <GiWindmill />, <GiFarmTractor />, <GiUndergroundCave />, <BsSnow />

    ]
    function onSetLabel(label) {
        setSearchParams({ ...filterBy, label })
        setFilterBy({ ...filterBy, label })
        setSelectedLabel(label)
    }
    // labels = labels.slice(0, shownLabels)

    function onScrollLabels(num) {

    }
    {/* <section className="flex justify-center labels-crusal-main"></section> */ }


    return <section className={`labels-container ${(isHeadFilterExpanded) ? 'hidden' : ''}`}> <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className={`flex align-center lables-filter-nav`}
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
            desktop: {
                breakpoint: {
                    max: 3000,
                    min: 1024
                },
                items: 12,
                partialVisibilityGutter: 40
            },
            mobile: {
                breakpoint: {
                    max: 464,
                    min: 0
                },
                items: 3,
                partialVisibilityGutter: 30
            },
            tablet: {
                breakpoint: {
                    max: 1000,
                    min: 464
                },
                items: 9,
                partialVisibilityGutter: 30
            }
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
    >



        {labels && labels.map((label, idx) => <div onClick={() => onSetLabel(label)} className={`flex align-center label-item`} style={{
            cursor: 'pointer',
            color: selectedLabel === label ? 'black' : '',
            borderBottomColor: selectedLabel === label ? 'black' : '',
            transition: 'all 0.3s ease',
          }} key={label}>
            <IconContext.Provider value={{ className: "label-icon", size: '20px' }}>
                <span>{icons[idx]}</span>
            </IconContext.Provider>
            <span>{label}</span>

        </div>)}



    </Carousel>

    </section>
}
