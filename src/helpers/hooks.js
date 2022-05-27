import { useState, useEffect } from "react"

export const useViewport = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })

        return () => window.removeEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
    }, [windowWidth] )

    return {windowWidth}
}

 