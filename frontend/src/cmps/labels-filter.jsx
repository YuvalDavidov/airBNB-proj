import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { setFilterBy } from "../store/stay.actions.js"


import { IconContext } from "react-icons"
// List of icons for labels filter! 
import { VscKey } from 'react-icons/vsc'
import { MdOutlineBeachAccess, MdOutlineDirectionsBoatFilled } from 'react-icons/md'
import { GiWoodCabin, GiPineTree, GiCastle, GiIsland, GiCircleForest, GiStoneTower, GiWindmill, GiFarmTractor, GiUndergroundCave } from 'react-icons/gi'
import { FaCampground } from 'react-icons/fa'
import { BsSnow } from 'react-icons/bs'
import { HiHomeModern } from 'react-icons/hi2'

import { IoIosArrowDropright } from 'react-icons/io'
import { IoIosArrowDropleft } from 'react-icons/io'



export function LabelsFilter() {

    const isHeadFilterExpanded = useSelector((storeState) => storeState.stayModule.isHeadFilterExpanded)
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
    const [searchParams, setSearchParams] = useSearchParams()

    const labels = ['New', 'Beachfront', 'Cabins', 'National parks', 'Campers', 'Castles', 'Islands',
        'Boats', 'Home', 'Tropical', 'Towers', 'Windmills', 'Farms', 'Cave', 'Ski']

    const icons = [<VscKey />, <MdOutlineBeachAccess />, <GiWoodCabin />, <GiPineTree />, <FaCampground />, <GiCastle />, <GiIsland />,
    <MdOutlineDirectionsBoatFilled />, <HiHomeModern />, <GiCircleForest />, <GiStoneTower />, <GiWindmill />, <GiFarmTractor />, <GiUndergroundCave />, <BsSnow />

    ]
    function onSetLabel(label) {
        setSearchParams({ ...filterBy, label })
        setFilterBy({ ...filterBy, label })
        console.log('label----->', label)
    }


    return (
        <section className="flex justify-center labels-crusal-main">
            <IconContext.Provider value={{ color: "black", className: "arrow-icon", size: '30px' }}>
                <button><IoIosArrowDropleft /></button>
            </IconContext.Provider>

            <nav className={`flex align-center lables-filter-nav ${(isHeadFilterExpanded) ? 'hidden' : ''}`}>
                {labels && labels.map((label, idx) => <div onClick={() => onSetLabel(label)} className={'flex align-center label-item'} key={label}>
                    <span>{icons[idx]}</span>
                    <span>{label}</span>
                </div>)}
            </nav>
            <IconContext.Provider value={{ color: "black", className: "arrow-icon", size: '30px' }}>
                <button><IoIosArrowDropright /></button>
            </IconContext.Provider>
        </section>
    )
} 