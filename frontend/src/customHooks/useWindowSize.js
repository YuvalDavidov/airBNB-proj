import { useEffect, useState } from "react";

const getSize = () => {
    return {
        innerWidth: window.innerWidth
    }
}

export const useWindowSize = () => {
    let [windowSize, setiWndowSize] = useState(getSize())


    const handleResize = () => {
        setiWndowSize(getSize())
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return windowSize
}