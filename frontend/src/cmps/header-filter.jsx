import { useEffect, useRef, useState } from "react"
import { useForm } from "../customHooks/useForm.js"
import { stayService } from "../services/stay.service.local"
import { utilService } from "../services/util.service.js"

export function HeaderFilter({ onSetFilter }) {

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter('filterByToEdit')
    }
    return <section className="car-filter full main-layout">
        <h2>Toys Filter</h2>
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

    </section>
}