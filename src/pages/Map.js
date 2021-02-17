import { motion } from 'framer-motion';
import { React, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import athenaBW from '../assets/images/map/mono/athena.png'
import calypsoBW from '../assets/images/map/mono/calypso.png'
import athenaCalypsoBW from '../assets/images/map/mono/athena_calypso.png'

import penelopeBW from '../assets/images/map/mono/penelope.png'
import seductressBW from '../assets/images/map/mono/seductress.png'
import tiresiasBW from '../assets/images/map/mono/tiresias.png'
import athena from '../assets/images/map/colour/athena.png'
import penelope from '../assets/images/map/colour/penelope.png'
import seductress from '../assets/images/map/colour/seductress.png'
import tiresias from '../assets/images/map/colour/tiresias.png'

import heartsBW from '../assets/images/map/mono/hearts.png'
import shocklinesBW from '../assets/images/map/mono/shocklines.png'
import stringhorBW from '../assets/images/map/mono/stringhor.png'
import stringverBW from '../assets/images/map/mono/stringver.png'
import waveBW from '../assets/images/map/mono/wave.png'
import hearts from '../assets/images/map/colour/hearts.png'
import shocklines from '../assets/images/map/colour/shocklines.png'
import stringhor from '../assets/images/map/colour/stringhor.png'
import stringver from '../assets/images/map/colour/stringver.png'
import wave from '../assets/images/map/colour/wave.png'


// const INITIAL = 5000;
const INITIAL = 1500;

const queryStorage = () => {
    let storage = window.localStorage["seen"]
    if (storage) return JSON.parse(storage)
    return {}
}
const updateStorage = (name, value) => {
    let newStorage = {}
    if (window.localStorage["seen"]) {
        newStorage = JSON.parse(window.localStorage["seen"])
    }

    newStorage[name] = value
    window.localStorage["seen"] = JSON.stringify(newStorage)
}

function TheMap({ pTransition, pVariants }) {
    const [charData, setCharData] = useState({
        penelope: { type: "bw", classes: "" },
        tiresias: { type: "bw", classes: "" },
        seductress: { type: "bw", classes: "" },
        athena: { type: "none", classes: "" },
    })
    const history = useHistory()

    useEffect(() => {
        if (!queryStorage()) {
            updateStorage("penelope", "bw")
            updateStorage("tiresias", "bw")
            updateStorage("seductress", "bw")
            updateStorage("athena", "none")
        }
        const data = queryStorage()
        setCharData({
            penelope: { type: data.penelope, classes: "" },
            tiresias: { type: data.tiresias, classes: "" },
            seductress: { type: data.seductress, classes: "" },
            athena: { type: data.athena, classes: "" },
        })

        setTimeout(() => {
        }, INITIAL)
    }, [setCharData])

    const goBack = () => {
        history.push("/report")
    }

    const determineClasses = (name) => {
        return `absolute ${name} ${charData[name].classes}`
    }

    const onEnter = (name) => () => {
        const newData = { ...charData }
        if (name === "athena") newData[name].type = "both"
        else newData[name].type = "colour"
        setCharData(newData)
    }

    const onLeave = (name) => () => {
        const newData = { ...charData }
        newData[name].type = queryStorage()[name]

        setCharData(newData)
    }

    const onClick = (name) => () => {
        console.log("click", name)
    }

    const mouseMove = (name) => (e) => {
        if (name !== "athena" || charData[name].type !== "bw") return
        const newData = { ...charData }
        const rect = e.target.getBoundingClientRect()
        const mouseY = e.clientY
        const center = rect.y + rect.height / 2
        if (mouseY > center) newData[name].type = "athena"
        else newData[name].type = "calypso"
        setCharData(newData)
    }

    const cornerData = (name) => ({
        name,
        charData: charData[name],
        determineClasses,
        onEnter: onEnter(name),
        onLeave: onLeave(name),
        onClick: onClick(name),
        mouseMove: mouseMove(name)
    })

    return <motion.div initial="out" animate="in" exit="out" variants={pVariants} transition={pTransition}>
        <div className="w-screen h-screen flex justify-center items-center relative font-cursive">
            <div className="absolute right-0 left-0 mx-auto top-0 p-4 text-center">
                <h1 className="text-xl font-cursive underline hover:text-yellow-900 cursor-pointer" onClick={goBack}>Go back</h1>
            </div>
            <h3 className="text-3xl text-center">Over this map<br />Select a story to see<br />A different perspective<br />from The Unheard.</h3>
            <CornerImage bw={penelopeBW} colour={penelope} data={cornerData("penelope")} />
            <CornerImage bw={tiresiasBW} colour={tiresias} data={cornerData("tiresias")} />
            <CornerImage bw={seductressBW} colour={seductress} data={cornerData("seductress")} />
            <CornerImage athena={athenaBW} calypso={calypsoBW} both={athena} none={athenaCalypsoBW} data={cornerData("athena")} />

            <div className="absolute stringver pointer-events-none">
                <img alt="" src={charData.penelope.type === "colour" ? stringver : stringverBW} className="max-h-full"></img>
            </div>
            <div className="absolute stringhor pointer-events-none">
                <img alt="" src={charData.tiresias.type === "colour" ? stringhor : stringhorBW} className="w-full h-full"></img>
            </div>
            <div className="absolute hearts pointer-events-none">
                <img alt="" src={charData.seductress.type === "colour" ? hearts : heartsBW} className="w-full h-full"></img>
            </div>
            <div className="absolute shocklines pointer-events-nones">
                <img alt="" src={charData.seductress.type === "colour" ? shocklines : shocklinesBW} className="w-full h-full"></img>
            </div>
            <div className="absolute wave pointer-events-none">
                <img alt="" src={charData.athena.type !== "colour" ? waveBW : wave} className="w-full h-full"></img>
            </div>
        </div>
    </motion.div>
}

function CornerImage({ data, ...types }) {
    const { name, charData, onEnter, onLeave, onClick } = data
    return <div className={`absolute ${name} ${charData.classes}`} onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={onClick} onMouseMove={data.mouseMove}>
        <img alt="" src={types[charData.type]} className="max-h-full" />
    </div>
}

export default TheMap