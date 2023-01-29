import { useEffect, useState } from "react"
import { DateRange } from 'react-date-range';

export function DateFilter({ updateDate }) {

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
        <div className="date-modal">
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