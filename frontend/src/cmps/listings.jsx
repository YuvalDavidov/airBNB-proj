import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { stayService } from "../services/stay.service.local"
import { loadMyStays } from "../store/stay.actions";



export function Listings() {
    // 
    // const [stays, setStays] = useState(null)
    const { myStays } = useSelector((storeState) => storeState.stayModule)
    const navigate = useNavigate()


    useEffect(() => {
        loadMyStays({ hostId: user._id })
    }, [])

    if (!myStays) return <div>You dont have stays!!!!!!!</div>

    return (
        <section className="listing">
            <h1>listings {myStays.length}</h1>

            <table className="listing-table">
                <tbody>

                    <tr>
                        <th>Listing</th>
                        <th>TODO</th>
                        <th>CAPACITY</th>
                        <th>BEDROOMS</th>
                        <th>PRICE</th>
                        <th>LOCATION</th>
                        <th>DATE ADDED</th>
                    </tr>
                    {myStays.map((stay) => {
                        return <tr key={stay._id} className="data">
                            <td className="listing-td" ><div><a href="#"><div onClick={() => { navigate(`details/${stay._id}`) }} className="listing-prev"><img src={stay.imgUrls[0]} /><h3 className="-name">{stay.name}</h3></div></a></div>  </td>
                            <td><button>update</button></td>
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