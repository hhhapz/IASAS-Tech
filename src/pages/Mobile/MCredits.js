import { motion } from 'framer-motion';
import { React } from 'react'

import {
    creditsFull
} from '../../Images'

function MCredits({ pTransition, pVariants }) {
    return <motion.div initial="out" animate="in" exit="out" variants={pVariants} transition={pTransition}
        className={`flex justify-center items-center bg-backdrop w-full`}>
        <img className="w-full" src={creditsFull}></img>
    </motion.div>
}

export default MCredits