import { useState } from "react"
import { useNavigate } from "react-router";
import { GradientButton } from "./gradient-button";



export function InfoTr({ stay }) {

    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    return (<>
        <tr key={stay._id} className="data" onClick={() => { setIsOpen(!isOpen) }}>
            <td className="listing-td" ><div><a href="#"><div className="listing-prev"><img src={stay.imgUrls[0]} /><h3 className="-name">{stay.name}</h3></div></a></div>  </td>
            <td>{stay.loc.country}, {stay.loc.city}</td>
            <td>{new Date(stay.createdAt).getDate()}/{new Date(stay.createdAt).getMonth() + 1}</td>
        </tr>

        {isOpen && <tr className="info-tr">
            <td className="listing-stay-details">
                <div><span>guests amount:</span>  {stay.stayDetails.guests}</div>
                <div><span>bedrooms amount:</span> {stay.stayDetails.bedrooms}</div>
                <div><span>price:</span> ${stay.price}</div>


            </td>
            <td></td>
            <td> <GradientButton onClickBtn={() => { navigate(`/dashboard/${stay._id}`) }} label={'Update'} className={"update-btn"} /></td>

        </tr>}
    </>)
}

