import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { stayService } from "../services/stay.service.local"
import { loadMyStays, sortMyStays } from "../store/stay.actions";



export function Listings() {
    // 
    const { myStays } = useSelector((storeState) => storeState.stayModule)
    const [stays, setStays] = useState(myStays)
    const [descending, setDescending] = useState(false)
    const navigate = useNavigate()

    useEffectUpdate(() => {
        setStays(myStays)
    }, [myStays])

    function onSortByPrice() {
        if (descending) {
            let sortedStays = [...stays].sort((a, b) => b.price - a.price)
            setDescending(false)
            return setStays(sortedStays)
        }

        let sortedStays = [...stays].sort((a, b) => a.price - b.price)
        setDescending(true)
        setStays(sortedStays)

    }

    function onSortByLoc() {

    }

    if (!myStays) return <div>You dont have stays!!!!!!!</div>

    return (
        <section className="listing">
            <h1>listings {stays.length}</h1>

            <table className="listing-table">
                <tbody>

                    <tr>
                        <th>Listing</th>
                        <th>TODO</th>
                        <th>CAPACITY</th>
                        <th>BEDROOMS</th>
                        <th onClick={() => { onSortByPrice() }}>PRICE</th>
                        <th>LOCATION</th>
                        <th>DATE ADDED</th>
                    </tr>
                    {stays.map((stay) => {
                        return <tr key={stay._id} className="data">
                            <td className="listing-td" ><div><a href="#"><div onClick={() => { navigate(`/details/${stay._id}`) }} className="listing-prev"><img src={stay.imgUrls[0]} /><h3 className="-name">{stay.name}</h3></div></a></div>  </td>
                            <td><button onClick={() => { navigate(`/dashboard/${stay._id}`) }}>update</button></td>
                            <td>{stay.stayDetails.guests}</td>
                            <td>{stay.stayDetails.bedrooms}</td>
                            <td>{stay.price}</td>
                            <td>{stay.loc.country}, {stay.loc.city}</td>
                            <td>sometime</td>
                        </tr>
                    })}

                </tbody>
            </table>
        </section>
    )
}

const user = {
    "_id": "u103",
    "fullname": "User 1",
    "imgUrl": "/img/img1.jpg",
    "username": "user1",
    "password": "secret",
    "isHost": true,
    "staysIds": ['10006546', '10006547', '10006548']
}