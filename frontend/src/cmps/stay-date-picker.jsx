import { useEffect, useState } from "react"
// import * as React from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export function StayDatePicker({ updateDate, setDatePickerModal }) {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    useEffect(() => {
        if (!state[0].endDate) return
        setDate()
    }, [state[0]])

    function setDate() {
        updateDate(state[0])
        if (state[0].endDate !== state[0].startDate) {
            setDatePickerModal(false)
        }
    }

    function getDisabledDates() {
        let dates = []
        let d = new Date()

        for (let i = 1; i <= 60; i++) {
            dates.push(d.setDate(d.getDate() - 1))
        }
        return dates
    }

    return (
        <div>
            <DateRange
                editableDateInputs={true}
                onChange={item => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
                disabledDates={getDisabledDates()}
            />

        </div>
    )
}