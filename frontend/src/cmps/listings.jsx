import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { GradientButton } from "./gradient-button";
import { InfoTr } from "./info-tr";


export function Listings() {

    const { myStays } = useSelector((storeState) => storeState.stayModule)
    const { isMobile } = useSelector((storeState) => storeState.systemModule)
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


    return (<>

        <section className="listing">
            <h1>listings {stays.length}</h1>

            {isMobile ? (<table className="listing-table">
                <tbody>

                    <tr>
                        <th>LISTING</th>
                        <th>LOCATION</th>
                        <th>DATE ADDED</th>
                    </tr>

                    {stays.map(stay => <InfoTr key={stay._id} stay={stay} />)}


                </tbody>
            </table>)
                : (<table className="listing-table">
                    <tbody>

                        <tr>
                            <th>LISTING</th>
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
                                <td><GradientButton onClickBtn={() => { navigate(`/dashboard/${stay._id}`) }} label={'Update'} className={"update-btn"} /></td>
                                <td>{stay.stayDetails.guests}</td>
                                <td>{stay.stayDetails.bedrooms}</td>
                                <td>{stay.price}</td>
                                <td>{stay.loc.country}, {stay.loc.city}</td>
                                <td>{new Date(stay.createdAt).getDate()}/{new Date(stay.createdAt).getMonth() + 1}</td>
                            </tr>
                        })}

                    </tbody>
                </table>)}


        </section>
    </>)
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