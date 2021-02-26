import { motion } from 'framer-motion';
import { React, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import {
    coin,

    athena, monster, penelope, calypso, tiresias,
} from '../Images'

function Mobile({ pTransition, pVariants }) {
    const history = useHistory()

    useEffect(() => {
    })

    return <motion.div initial="out" animate="in" exit="out" variants={pVariants} transition={pTransition}
        className="min-h-screen bg-homepage bg-cover bg-center flex flex-col items-center text-black font-cursive">
        <h1 className="text-5xl md:text-6xl text-center stroke-bold mt-10">The Unheard</h1>

        <h3 className="text-xl sm:text-2xl md:text-3xl max-w-sm md:max-w-lg px-6 mt-12">To experience the full immersion of
        JIS IASAS Drama, Dance, and Tech,
            we suggest you visit this site on a desktop device!</h3>

        <h3 className="text-lg sm:text-xl md:text-2xl max-w-sm md:max-w-lg px-6 mt-4">Alternatively, you can watch the full show
        video over <a className="text-pink-900 underline" onClick={() => alert("This has not been implemented yet")} href="#">here</a></h3>


        <h3 className="text-2xl md:text-3xl sm:w-96 md:max-w-md mx-8 mt-8">Drama and Dance Performances:</h3>

        <div className="w-64 sm:w-80 flex flex-col mt-8 mb-24">
            <div className="flex md items-center my-4 w-full">
                <img src={coin} className="w-10 mr-4"></img>
                <h3 className="underline">Bloomberg Report 1</h3>
            </div>
            <div className="flex max-w-md items-center my-4">
                <img src={athena} className="w-10 mr-4"></img>
                <h3 className="underline">The Deity</h3>
            </div>
            <div className="flex max-w-md items-center">
                <img src={tiresias} className="w-10 mr-4 my-4"></img>
                <h3 className="underline">The Blind Prophet</h3>
            </div>
            <div className="flex max-w-md items-center">
                <img src={monster} className="w-10 mr-4 my-4"></img>
                <h3 className="underline">The Witch & The Monster</h3>
            </div>
            <div className="flex max-w-md items-center">
                <img src={calypso} className="w-10 mr-4 my-4"></img>
                <h3 className="underline">The Seductress</h3>
            </div>
            <div className="flex max-w-md items-center">
                <img src={penelope} className="w-10 mr-4 my-4"></img>
                <h3 className="underline">The Faithful Wife</h3>
            </div>
            <div className="flex max-w-md items-center">
                <img src={coin} className="w-10 mr-4 my-4"></img>
                <h3 className="underline">Bloomberg Report 2</h3>
            </div>
        </div>

    </motion.div>
}

export default Mobile