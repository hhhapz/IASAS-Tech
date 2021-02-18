import { motion } from 'framer-motion';
import { React, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

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

        <h1>This page is still in development :(</h1>

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