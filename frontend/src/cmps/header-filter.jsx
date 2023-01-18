import { Fragment, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useForm } from "../customHooks/useForm.js"

import { stayService } from "../services/stay.service.local"
import { utilService } from "../services/util.service.js"
import { setFilterBy } from "../store/stay.actions.js"

import { IoSearchCircleSharp } from 'react-icons/io5'
import { IconContext } from "react-icons"


export function HeaderFilter() {

    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
    const isHeadFilterExpanded = useSelector((storeState) => storeState.stayModule.isHeadFilterExpanded)
    const [filterByToEdit, setFilterByToEdit, handleChange] = useForm()


    function onSubmitFilter(ev) {
        ev.preventDefault()
        setFilterBy(filterByToEdit)
    }
    return (
        <Fragment>
            {!isHeadFilterExpanded &&
                <section className="toy-header-filter flex">
                    <button className="header-filter-btn flex"><div>Anywhere</div></button> |
                    <button className="header-filter-btn flex"><div>Any week</div></button> |
                    <button className="header-filter-btn guests flex"><div>Add guests</div></button>
                    <IconContext.Provider value={{ color: "red", size: '30px' }}>
                        <div>
                            <IoSearchCircleSharp /></div>
                    </IconContext.Provider>

                </section>
            }
            {isHeadFilterExpanded &&
                <section className="toy-header-filter expanded flex">
                    <form onSubmit={onSubmitFilter}>
                        <label htmlFor="name">name:</label>
                        <input type="text"
                            id="name"
                            name="name"
                            placeholder="By name"
                        // value={filterByToEdit.name}
                        // onChange={handleChange}
                        // ref={elInputRef}
                        />

                        <label htmlFor="maxPrice">Max price:</label>
                        <input type="number"
                            id="maxPrice"
                            name="maxPrice"
                            placeholder="By max price"
                        // value={filterByToEdit.maxPrice}
                        // onChange={handleChange}
                        />


                    </form>

                </section>}
        </Fragment>
    )
}