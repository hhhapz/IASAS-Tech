import React, { useEffect, useState } from 'react'
import anime from "animejs"

function WordEffect({ word, greekWord, index, changeIndex }) {
    const [current, setCurrent] = useState(greekWord)

    useEffect(() => {
        setTimeout(() => {
            setCurrent(word)
            anime.timeline({ loop: false })
                .add({
                    targets: `#we-${index}`,
                    scale: [14, 1],
                    opacity: [0, 1],
                    easing: "easeOutCirc",
                    duration: 600,
                    delay: () => 100
                })
        }, 3000 + 50 * changeIndex);
    }, [setCurrent, word, index])

    return <span id={`we-${index}`} className="mb-2" key={index}>
        {current}&nbsp;&nbsp;
    </span>
}

export default WordEffect