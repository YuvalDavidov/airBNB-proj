import { useState, useEffect } from "react"
import { CiCirclePlus } from 'react-icons/ci'
import { CiCircleMinus } from 'react-icons/ci'
import { IconContext } from "react-icons"


export function GuestFilter({ onSetGuestFilter }) {
    const [guestsAmount, setGuestsAmount] = useState({ total: 1, adults: 1, children: 0, infants: 0, pets: 0 })
    const minus = <IconContext.Provider value={{ color: 'grey', className: "plus-minus-icon", size: '40px' }}><CiCircleMinus /></IconContext.Provider>
    const plus = <IconContext.Provider value={{ color: 'grey', className: "plus-minus-icon", size: '40px' }}><CiCirclePlus /></IconContext.Provider>

    function handleGuestsAmount(type, diff) {
        let cloneState = { ...guestsAmount }
        if (cloneState.adults === 1 && type === 'adults' && diff === -1) return
        if (cloneState[type] === 0 && type !== 'adults' && diff === -1) return
        // if (type === 'pets' && !stayDetails.allowPets) return
        cloneState[type] += diff
        cloneState.total += diff
        setGuestsAmount(cloneState)
    }

    useEffect(() => {
        onSetGuestFilter(guestsAmount)
    }, [guestsAmount])

    return (
        <section className="guest-modal-filter">
            <div className="flex guest-line-filter">
                <div className="flex column">
                    <span className="guest-main-text">Adults</span>
                    <span className="ff-cereal-book fs14 light-color">Ages 13 or above..</span>
                </div>
                <span className=" flex align-center">
                    <button className={`${guestsAmount.adults === 1 ? 'not' : ''}`} onClick={() => { handleGuestsAmount('adults', - 1) }}>{minus}</button>
                    {guestsAmount.adults}
                    <button onClick={() => { handleGuestsAmount('adults', + 1) }}>{plus}</button>
                </span>
            </div>
            <div className="flex guest-line-filter">
                <div className="flex column">
                    <span className="guest-main-text">Children</span>
                    <span className="ff-cereal-book fs14 light-color">Ages 2-12</span>
                </div>
                <span className="flex align-center">
                    <button className={`${guestsAmount.children === 0 ? 'not' : ''}`} onClick={() => { handleGuestsAmount('children', - 1) }} >{minus}</button>
                    {guestsAmount.children}
                    <button onClick={() => { handleGuestsAmount('children', + 1) }}>{plus}</button>
                </span>
            </div>
            <div className="flex guest-line-filter">
                <div className="flex column">
                    <span className="guest-main-text">Infants</span>
                    <span className="ff-cereal-book fs14 light-color">Under 2</span>
                </div>
                <span className="flex align-center">
                    <button className={`${guestsAmount.infants === 0 ? 'not' : ''}`} onClick={() => { handleGuestsAmount('infants', - 1) }} >{minus}</button>
                    {guestsAmount.infants}
                    <button onClick={() => { handleGuestsAmount('infants', + 1) }}>{plus}</button>
                </span>
            </div>
            <div className="flex guest-line-filter">
                <span className="guest-main-text">Pets</span> <span className="flex align-center">
                    <button className={`${guestsAmount.pets === 0 ? 'not' : ''}`} onClick={() => { handleGuestsAmount('pets', - 1) }} >{minus}</button>
                    {guestsAmount.pets}
                    <button onClick={() => { handleGuestsAmount('pets', + 1) }}>{plus}</button>
                </span>
            </div>
        </section>
    )
}