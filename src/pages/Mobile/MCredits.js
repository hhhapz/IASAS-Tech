import { motion } from 'framer-motion';
import { React } from 'react'
import { useHistory } from 'react-router-dom';

import {
    creditsFull
} from '../../Images'

function MCredits({ pTransition, pVariants }) {
    const history = useHistory()

    const goBack = () => {
        history.push("/report/last")
    }

    return <motion.div initial="out" animate="in" exit="out" variants={pVariants} transition={pTransition}
        img className={`flex justify-center items-center bg-homepage bg-center bg-cover w-full min-h-screen`}>

        <div className="absolute right-0 top-0 p-4 z-10">
            <a className="text-2xl xl:text-3xl 3xl:text-5xl font-cursive underline" href="https://github.com/hhhapz/IASAS-Tech" target="_blank">Source Code</a>
        </div>

        <div className="absolute left-0  top-0 p-4 hover:text-yellow-900 cursor-pointer z-20" onClick={goBack}>
            <h1 className="text-2xl xl:text-3xl 3xl:text-5xl font-cursive underline">Go back</h1>
        </div>

        <img className="w-full mt-16 " src={creditsFull}></img>
    </motion.div>
}

export default MCredits