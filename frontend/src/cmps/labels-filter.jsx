import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import { stayService } from "../services/stay.service.local"


export function LabelsFilter() {

    const isHeadFilterExpanded = useSelector((storeState) => storeState.stayModule.isHeadFilterExpanded)

    const [labels, setLabels] = useState([])

    useEffect(() => {
        loadLabels()
    }, [])

    async function loadLabels() {
        let uniqueListOfLabels
        try {
            const stays = await stayService.query(stayService.getDefaultFilter())
            const labels = stays.map(stay => {
                return stay.labels
            })
            uniqueListOfLabels = [...new Set(labels.join().split(','))]

            // console.log("uniqueListOfLabels------->", uniqueListOfLabels)
            setLabels(uniqueListOfLabels)

        } catch (err) {
            console.error('Cant load the lables from the sever!')
        }

    }

    function onSetLabel(label) {
        console.log('label----->', label)
    }


    return (

        <nav className={`flex lables-filter-main-nav ${(isHeadFilterExpanded) ? 'hidden' : ''}`}>
            {labels && labels.map(label => <span onClick={() => onSetLabel(label)} className={'label-item'} key={label}>{label}</span>)}
        </nav>
    )
} 