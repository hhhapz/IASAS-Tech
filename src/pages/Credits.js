import { motion } from 'framer-motion';
import { React, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import frame from '../assets/images/homepage/frame.webp'
import { toast } from 'react-toastify'

function Credits({ pTransition, pVariants }) {
    const history = useHistory()

    const goBack = () => {
        history.push("/map")
    }

    useEffect(() => {

    }, [])


    return <motion.div initial="out" animate="in" exit="out" variants={pVariants} transition={pTransition}
        className="h-screen w-screen bg-homepage bg-cover bg-center flex justify-center items-center">
        <div className="absolute left-0  bottom-0 p-4">
            <h1 className="text-xl font-cursive underline hover:text-yellow-900 cursor-pointer" onClick={goBack}>Go back</h1>
        </div>

        <h2 className="text-4xl font-cursive text-center mb-8">WORK IN PROGRESS :)</h2>
    </motion.div>

}

export default Credits