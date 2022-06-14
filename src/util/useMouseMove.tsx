import React, {useEffect, useState} from 'react'

export const useMouseMove = () => {
    const [position, setPosition] = useState({x: 0, y: 0})
    const handleMouseMove = (e) => {
        setPosition({
            x: e.x, y: e.y
        })
    }
    useEffect(
        () => {
            window.addEventListener("mousemove", handleMouseMove)
            return () => {
                window.removeEventListener("mousemove", handleMouseMove)
            }
        },
        [] // Recall only if ref changes
    );

    return [position.x, position.y]
}
