import { motion } from 'framer-motion';
import { React, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import canvas from '../assets/images/credits/canvas.gif'

function Credits({ pTransition, pVariants }) {
    const history = useHistory()

    const goBack = () => {
        history.push("/map")
    }

    useEffect(() => {

    }, [])


    return <motion.div initial="out" animate="in" exit="out" variants={pVariants} transition={pTransition}
        className={`flex justify-center items-center bg-credits bg-center bg-cover h-full w-full`}>

        <div className="relative z-10">
            <img src={canvas} className="max-w-screen max-h-screen pointer-events-none" alt="" />
        </div>

        <div className="absolute right-0  bottom-0 p-4 z-10">
            <h1 className="text-xl font-cursive underline text-white hover:text-gray-300 cursor-pointer" onClick={goBack}>Go back</h1>
        </div>

        {/* <ul class="list-reset flex border-b">
            <li class="-mb-px mr-1">
                <a class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-dark font-semibold" href="#">Active</a>
            </li>
            <li class="mr-1">
                <a class="bg-white inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold" href="#">Tab</a>
            </li>
            <li class="mr-1">
                <a class="bg-white inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold" href="#">Tab</a>
            </li>
            <li class="mr-1">
                <a class="bg-white inline-block py-2 px-4 text-grey-light font-semibold" href="#">Tab</a>
            </li>
        </ul> */}
    </motion.div>

}

export default Credits