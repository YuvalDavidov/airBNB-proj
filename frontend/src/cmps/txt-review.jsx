import { useEffect } from "react"
import { useState } from "react"
import { RiArrowRightSLine } from "react-icons/ri"



export function TxtReview({ reviewTxt }) {

    const [isOpen, setIsOpen] = useState(false)

    return (<>
        <div className={`txt ${isOpen ? 'open' : ''}`} >
            {reviewTxt}
        </div>
        {reviewTxt.length > 180 && <div className="show"><a onClick={() => { setIsOpen(!isOpen) }}> {isOpen ? 'show less' : 'show more'}  </a> {<RiArrowRightSLine />}</div>}

    </>)
}