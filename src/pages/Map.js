import { motion } from 'framer-motion';
import { React, useState, useEffect } from 'react'
import MouseTooltip from '../components/MouseTooltip'
import { useHistory, useParams } from 'react-router-dom'

import coin from '../assets/images/coin.png'

import athenaBW from '../assets/images/map/mono/athena.png'
import monsterBW from '../assets/images/map/mono/monster.png'
import bothBW from '../assets/images/map/mono/athena_monster.png'

import penelopeBW from '../assets/images/map/mono/penelope.png'
import calypsoBW from '../assets/images/map/mono/calypso.png'
import tiresiasBW from '../assets/images/map/mono/tiresias.png'

import both from '../assets/images/map/colour/both.png'
import penelope from '../assets/images/map/colour/penelope.png'
import calypso from '../assets/images/map/colour/calypso.png'
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
const titles = {
    penelope: "The Faithful Wife",
    tiresias: "The Blind Prophet",
    calypso: "The Seductress",
    athena: "The Witch and the Monster",
    monster: "The Deity",
}

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
    console.log(newStorage);
    window.localStorage["seen"] = JSON.stringify(newStorage)
}

const completed = () =>
    queryStorage().penelope === "colour"
    && queryStorage().tiresias === "colour"
    && queryStorage().calypso === "colour"
    && queryStorage().athena === "both"


function TheMap({ pTransition, pVariants }) {
    const [tooltip, setTooltip] = useState({
        text: "",
        show: false,
        offsetX: 30
    })
    const [charData, setCharData] = useState({
        penelope: { type: "bw", classes: "" },
        tiresias: { type: "bw", classes: "" },
        calypso: { type: "bw", classes: "" },
        athena: { type: "none", classes: "" },
    })

    const history = useHistory()
    let { watched } = useParams()

    useEffect(() => {

        if (Object.keys(queryStorage()).length === 0) {
            updateStorage("penelope", "bw")
            updateStorage("tiresias", "bw")
            updateStorage("calypso", "bw")
            updateStorage("athena", "none")
        }
        if (watched) {
            switch (watched) {
                case "penelope":
                case "tiresias":
                case "calypso":
                    updateStorage(watched, "colour")
                    break
                case "athena":
                    if (queryStorage().athena === "both") {
                        break
                    }
                    if (queryStorage().athena === "athena") updateStorage("athena", "both")
                    else updateStorage("athena", "monster")
                    break
                case "monster":
                    if (queryStorage().athena === "both") break
                    if (queryStorage().athena === "monster") updateStorage("athena", "both")
                    else updateStorage("athena", "athena")
                    break
                default:
                    console.log("unknown param", watched);
            }
        }

        const data = queryStorage()
        setCharData({
            penelope: { type: data.penelope, classes: "" },
            tiresias: { type: data.tiresias, classes: "" },
            calypso: { type: data.calypso, classes: "" },
            athena: { type: data.athena, classes: "" },
        })

        setTimeout(() => {
        }, INITIAL)
    }, [setCharData, watched])

    const goBack = () => {
        history.push("/report/first")
    }
    const goNext = () => {
        history.push("/report/last")
    }

    const determineClasses = (name) => {
        return `absolute ${name} ${charData[name].classes}`
    }

    const onEnter = (name) => () => {
        const newData = { ...charData }
        if (name !== "athena") newData[name].type = "colour"
        setCharData(newData)
    }

    const onLeave = (name) => () => {
        setTooltip({ ...tooltip, show: false, text: "" })
        const newData = { ...charData }
        newData[name].type = queryStorage()[name]

        setCharData(newData)
    }

    const onClick = (name) => () => {
        if (name !== "athena") {
            history.push(`/video/${name}`)
            return
        }

        if (charData[name].type === "athena") history.push(`/video/monster`)
        else history.push(`/video/athena`)
    }

    const mouseMove = (name) => (e) => {
        if (name !== "athena") {
            setTooltip({
                text: titles[name],
                show: true,
                offsetX: 20
            })
            return
        }
        const newData = { ...charData }
        const rect = e.target.getBoundingClientRect()
        const mouseX = e.clientX
        const mouseY = e.clientY
        const athenaCornerX = rect.x + rect.width * 0.414
        const athenaCornerY = rect.y + rect.height * 0.359

        if ((mouseX < athenaCornerX && mouseY < athenaCornerY) ||
            (mouseX > athenaCornerX && mouseY > athenaCornerY)) newData[name].type = "monster"
        else newData[name].type = "athena"
        setTooltip({
            text: titles[newData[name].type],
            show: true,
            offsetX: 20
        })
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
            <div className="absolute right-0 left-0 mx-auto top-0 p-4 text-center flex justify-center">
                <h3 className="text-xl font-cursive underline hover:text-yellow-900 cursor-pointer px-8" onClick={goBack}>Go back</h3>
            </div>
            <div className="relative">
                {completed() ?
                    <h1 className="text-7xl font-cursive underline hover:text-yellow-900 cursor-pointer px-8"
                        onClick={goNext}>Continue</h1> :

                    <h1 className="lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl text-center px-12">
                        In order to learn the whole truth of a story, <br />
                    All perspectives must be considered, no voice denied.<br /><br />
                    Click on each character,  and follow each journey,<br />
                    To learn the whole story; hear the tale from each side.</h1>
                }
                <br />
                {!completed() && <div className="absolute top-full text-sm xl:text-lg 2xl:text-xl 3xl:text-2xl w-full flex justify-center items-center h-8 mt-4">
                    <img className="h-8" src={coin} alt=""></img>
                    <h3 className="ml-2"> Watch all five stories on this page to reach the end of your journey.</h3>
                </div>}
            </div>

            <CornerImage bw={penelopeBW} colour={penelope} data={cornerData("penelope")} />
            <CornerImage bw={tiresiasBW} colour={tiresias} data={cornerData("tiresias")} />
            <CornerImage bw={calypsoBW} colour={calypso} data={cornerData("calypso")} float />
            <CornerImage athena={athenaBW} monster={monsterBW} both={both} none={bothBW} float data={cornerData("athena")} />

            <div className="absolute stringver pointer-events-none">
                <img alt="" src={charData.penelope.type === "colour" ? stringver : stringverBW} className="max-h-full"></img>
            </div>
            <div className="absolute stringhor pointer-events-none">
                <img alt="" src={charData.tiresias.type === "colour" ? stringhor : stringhorBW} className="w-full h-full"></img>
            </div>
            <div className="absolute hearts pointer-events-none">
                <img alt="" src={charData.calypso.type === "colour" ? hearts : heartsBW} className="w-full h-full"></img>
            </div>
            <div className="absolute shocklines pointer-events-none">
                <img alt="" src={charData.calypso.type === "colour" ? shocklines : shocklinesBW} className="w-full h-full"></img>
            </div>
            <div className="absolute wave pointer-events-none">
                <img alt="" src={["both", "athena"].includes(charData.athena.type) ? wave : waveBW} className="w-full h-full"></img>
            </div>
        </div>
        <MouseTooltip
            visibile={tooltip.show}
            offsetX={tooltip.offsetX}
            offsetY={20}
        >
            <div className={`font-cursive bg-black text-white py-1 px-2 rounded whitespace-nowrap ${tooltip.show ? "" : "hidden"}`}>
                {tooltip.text}
            </div>
        </MouseTooltip>
    </motion.div>
}

function CornerImage({ data, ...types }) {
    const { name, charData, onEnter, onLeave, onClick } = data
    return <div className={`absolute cursor-pointer ${name} ${charData.classes}`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onClick}
        onMouseMove={data.mouseMove}>
        <img alt="" src={types[charData.type]}
            className={`max-h-full pointer-events-none ${types.float ? "float-right" : ""}`} />
    </div>
}

export default TheMap