import { useState } from "react"
import { stayService } from "../services/stay.service.local"



export function StayEdit() {

    const [stayToEdit, setStayToEdit] = useState(stayService.getEmptyStay())

    console.log(stayToEdit);


    return (
        <div>edit</div>
    )
}