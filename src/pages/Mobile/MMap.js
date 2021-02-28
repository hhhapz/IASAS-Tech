import { motion, AnimatePresence } from 'framer-motion'
import { React, useState, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import {
    coin,

    athena, monster, penelope, calypso, tiresias,
} from '../../Images'

const updateStorage = (name, value) => {
    let newStorage = {}
    if (window.localStorage["seen"]) {
        newStorage = JSON.parse(window.localStorage["seen"])
    }

    newStorage[name] = value
    window.localStorage["seen"] = JSON.stringify(newStorage)
}

const queryStorage = () => {
    let storage = window.localStorage["seen"]
    if (storage) return JSON.parse(storage)
    return {}
}

const completed = () =>
    queryStorage().penelope === "colour"
    && queryStorage().tiresias === "colour"
    && queryStorage().calypso === "colour"
    && queryStorage().athena === "both"

const titles = {
    penelope: {
        title: "The Faithful Wife",
        title2: "Penelope",
        description: "Odysseus’ wife whom he left behind when\n" +
            "he went off to fight the Trojan War. She was\n" +
            "alone with her son Telemachus for 20 years\n" +
            "while Odysseus took his sweet time returning\n" +
            "home. Penelope spent this time fighting off\n" +
            "suitors and weaving a shroud.\n",
        image: penelope,
    },
    tiresias: {
        title: "The Blind Prophet",
        title2: "Tiresias",
        description: "The blind prophet of the underworld.\n" +
            "Can see the future, and occasionally\n" +
            "shares some of his prophecies with others.",
        image: tiresias,
    },
    calypso: {
        title: "The Seductress",
        title2: "Calypso",
        description: "A beautiful nymph who captured Odysseus,\n" +
            "fell in love with him, and kept him on her\n" +
            "island for 7 years.",
        image: calypso,
    },
    monster: {
        title: "The Witch and the Monster",
        title2: "Scylla",
        description: "A once-beautiful nymph of the sea, she was\n" +
            "turned into a terrible monster by Circe, a\n" +
            "powerful witch who was jealous of Scylla.\n" +
            "(Circe also turned Odysseus’ men into pigs\n" +
            "when they landed on her island).",
        image: monster,
    },
    athena: {
        title: "The Deity",
        title2: "Athena",
        description: "A goddess of wisdom, war, handicraft\n" +
            "and practical reason.",
        image: athena,
    },
}

function MMap({ pTransition, pVariants, setScroll }) {
    const history = useHistory()
    let { watched } = useParams()
    const [top, setTop] = useState(0)
    const [modal, setModal] = useState("")
    const [modalStyle, setModalStyle] = useState("-z-10 opacity-0")
    const [charData, setCharData] = useState({
        penelope: "bw",
        tiresias: "bw",
        calypso: "bw",
        athena: "none",
    })

    const goNext = () => {
        history.push("/report/last")
    }

    const runOnScroll = (e) => {
        setTop(window.pageYOffset)
    }

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
            penelope: data.penelope,
            tiresias: data.tiresias,
            calypso: data.calypso,
            athena: data.athena,
        })

        window.addEventListener("scroll", runOnScroll, { passive: true })
        return () => window.removeEventListener("scroll", runOnScroll)
    }, [watched])

    const showVideo = (name) => {
        setModal(name)
        setScroll(false)
        setModalStyle("opacity-1")
    }

    const hideModal = () => {
        setModalStyle("opacity-0")
        setScroll(true)
        setTimeout(() => {
            setModal("")
            setModalStyle("-z-10 opacity-0 hidden")
        }, 500);
    }

    return <motion.div initial="out" animate="in" exit="out" variants={pVariants} transition={pTransition}
        className={`min-h-screen bg-homepage bg-cover bg-center flex flex-col items-center text-black font-cursive`}>
        {completed() ?
            <h1 className="mt-20 text-7xl font-cursive underline hover:text-yellow-900 cursor-pointer px-8"
                onClick={goNext}>Continue</h1>
            :
            <h1 className="mt-20 text-lg sm:text-xl stroke-semibold text-center">
                In order to learn the whole truth of a story, <br />
                    All perspectives must be considered, no voice denied.<br /><br />
                    Click on each character, and follow each journey,<br />
                    To learn the whole story, have each voice amplified.</h1>
        }
        <br />
        {!completed() && <div className="stroke-semibold max-w-sm sm:max-w-md flex justify-center items-center h-8 mt-4 px-2">
            <img className="h-8" src={coin} alt=""></img>
            <h3 className="ml-2 sm:text-lg"> Watch all five stories and collect all five&nbsp;coins on this page to reach the end of your journey.</h3>
        </div>}

        <div className="w-72 sm:w-full sm:max-w-md flex flex-col mt-8 mb-24 sm:ml-12">
            <div className="flex max-w-md items-center my-4" onClick={() => showVideo("athena")}>
                <img src={athena} className="w-16 mr-4"></img>
                <h3 className="underline text-2xl">The Deity</h3>
                {["monster", "both"].includes(charData.athena) &&
                    <img src={coin} className="w-6 ml-2"></img>}
            </div>
            <div className="flex max-w-md items-center" onClick={() => showVideo("tiresias")}>
                <img src={tiresias} className="w-16 mr-4 my-4"></img>
                <h3 className="underline text-2xl">The Blind Prophet</h3>
                {charData.tiresias === "colour" &&
                    <img src={coin} className="w-6 ml-2"></img>}
            </div>
            <div className="flex max-w-md items-center" onClick={() => showVideo("monster")}>
                <img src={monster} className="w-16 mr-4 my-4"></img>
                <h3 className="underline text-2xl">The Witch & The Monster</h3>
                {["athena", "both"].includes(charData.athena) &&
                    <img src={coin} className="w-6 ml-2"></img>}
            </div>
            <div className="flex max-w-md items-center" onClick={() => showVideo("calypso")}>
                <img src={calypso} className="w-16 mr-4 my-4"></img>
                <h3 className="underline text-2xl">The Seductress</h3>
                {charData.calypso === "colour" &&
                    <img src={coin} className="w-6 ml-2"></img>}
            </div>
            <div className="flex max-w-md items-center" onClick={() => showVideo("penelope")}>
                <img src={penelope} className="w-16 mr-4 my-4"></img>
                <h3 className="underline text-2xl">The Faithful Wife</h3>
                {charData.penelope === "colour" &&
                    <img src={coin} className="w-6 ml-2"></img>}
            </div>
        </div>


        <div style={{ top }}
            className={`absolute h-screen w-screen bg-opacity-50 bg-black flex justify-center items-center transition duration-500
                ${modalStyle}`}
            onClick={(e) => e.target.id === "modal" && hideModal()}>
            <div className="w-screen h-screen pt-12 p-6 sm:p-12 overflow-hidden font-cursive" id="modal">
                <div className="relative w-full h-full bg-backdrop">
                    <div className="block text-right">
                        <h2 className="inline-block text-2xl pt-2 px-6" onClick={hideModal}>×</h2>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-4xl sm:text-5xl text-center my-4">{titles[modal]?.title}</h1>
                        <h1 className="text-3xl sm:text-4xl text-center stroke-semibold mb-6">{titles[modal]?.title2}</h1>
                        <h3 className="text-lg stroke-semibold max-w-xs sm:max-w-sm px-4">
                            {titles[modal]?.description}
                        </h3>
                        <h3 onClick={() => history.push("/video/" + modal)}
                            className="mt-4 px-4 w-full underline stroke-bold text-2xl">Watch Video</h3>
                    </div>
                    <img src={titles[modal]?.image} className="absolute bottom-0 right-0 float-right h-2/6"></img>
                </div>
            </div>
        </div>

    </motion.div>
}

export default MMap