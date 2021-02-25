import { motion } from 'framer-motion';
import { React, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import canvas from '../assets/images/credits/canvas.png'

const pages = [
    {
        name: "production",
        title: "Production Team",
    },
    {
        name: "cast1",
        title: "The Cast"
    },
    {
        name: "cast2",
        title: "The Cast (Cont)"
    },
    {
        name: "web",
        title: "Web Team"
    },
]
function Credits({ pTransition, pVariants }) {
    const history = useHistory()

    const container = useRef(null);
    const titles = useRef(null);
    const [page, setPage] = useState("production")

    const goBack = () => {
        history.push("/report/last")
    }

    return <motion.div initial="out" animate="in" exit="out" variants={pVariants} transition={pTransition}
        className={`flex justify-center items-center bg-credits bg-center bg-cover h-full w-full`}>

        <div className="relative z-10">
            <img src={canvas} className="max-w-screen max-h-screen pointer-events-none" alt="" />
            <div className="absolute credits font-cursive text-center" ref={container}>
                <div ref={titles}>
                    <h1 className="text-center text-3xl xl:text-4xl 2xl:text-5xl pt-2 xl:py-4">The Unheard</h1>
                    <ul className="list-reset flex text-lg xl:text-2xl 2xl:text-3xl justify-center">
                        {pages.map((data, i) => {
                            const liStyle = data.name == page
                                ? "mr-4 border-b-3 border-yellow-900 text-yellow-900"
                                : "mr-4 border-b-3 border-black text-black"
                            return <li key={i} className={liStyle}>
                                <a className="inline-block py-1 px-1 hover:text-yellow-900" href="#"
                                    onClick={(e) => setPage(data.name)} >{data.title}</a>
                            </li>
                        }
                        )}
                    </ul>
                </div>

                {page === "production" &&
                    <div>
                        <h2 className="mt-6 2xl:mt-6 text-center font-sunday"><strong className="stroke-semibold">DIRECTED BY</strong> ERICA AND MIKE CALI</h2>
                        <h2 className="mt-2 text-center font-sunday"><strong className="stroke-semibold">WRITTEN BY</strong> ERICA CALI</h2>
                        <div className="mt-4 xl:mt-6 2xl:mt-6 flex justify-center text-black text-sm xl:text-base font-sunday uppercase">
                            <div className="flex-col text-center stroke-medium w-48 xl:w-64 2xl:w-72">
                                <h3 className="stroke-bold">Cinematographers</h3>
                                <h3 className="text-center">Didik JULIANTO</h3>
                                <h3 className="">Deva R.</h3>
                                <h3 className="">Indi M.</h3>
                                <h3 className="">Da Bin C.</h3>
                                <h3 className="">Tiffany J.</h3>
                                <h3 className="stroke-bold mt-4">Video Editors</h3>
                                <h3 className="">Nicholas Pudjarmintao ('16)</h3>
                                <h3 className="">Deva R. '22</h3>
                            </div>
                            <div className="flex-col text-center stroke-medium w-48 xl:w-64 2xl:w-72">
                                <h3 className="text-center stroke-bold">Costume Design</h3>
                                <h3 className="">Ulfa</h3>
                                <h3 className="mt-4 stroke-bold">Hair and Makeup</h3>
                                <h3 className="">Francisukus Setiawan</h3>
                                <h3 className="mt-4 stroke-bold">Lighting Design</h3>
                                <h3 className="">Yuni Adamsyah</h3>
                                <h3 className="">Mike Cali</h3>
                            </div>
                            <div className="flex-col text-center stroke-medium w-48 xl:w-64 2xl:w-72">
                                <h3 className="stroke-bold">Vegas Choreographer</h3>
                                <h3 className="">Amanda Seath</h3>
                                <h3 className="mt-4 stroke-bold">Publicity</h3>
                                <h3 className="">JIS Communications Office</h3>
                                <h3 className="mt-4 stroke-bold">Photography</h3>
                                <h3 className="">Scotty Graham</h3>
                                <h3 className="mt-4 stroke-bold">Set Construction</h3>
                                <h3 className="">JIS Facilities</h3>
                            </div>
                        </div>
                    </div>}

                {page === "cast1" &&
                    <div className="mt-4 xl:mt-6 2xl:mt-16 flex justify-center text-black text-sm xl:text-base 2xl:text-lg font-sunday uppercase">
                        <div className="flex-col text-center stroke-medium w-48 xl:w-64 2xl:w-72">
                            <h3 className="stroke-bolder text-base xl:text-lg">Bloomberg Report</h3>
                            <h3 className="xl:mt-2 mt-1 stroke-bold">Newsreporter</h3>
                            <h3 className="text-center">Miya L.</h3>

                            <h3 className="xl:mt-4 mt-3 stroke-bolder text-base xl:text-lg">The Blind Prophet</h3>
                            <h3 className="xl:mt-2 mt-1 stroke-bold">Tiresias</h3>
                            <h3 className="text-center">Chris G.</h3>
                            <h3 className="xl:mt-2 mt-1 stroke-bold">Suits Dancers</h3>
                            <h3 className="text-center">Maura H., Lana S.,</h3>
                            <h3 className="text-center">Adjani A.</h3>
                            <h3 className="xl:mt-2 mt-1 stroke-bold">Dance Sequence</h3>
                            <h3 className="text-center">Jacqueline H.</h3>
                            <h3 className="text-center">Layla Azwa ND., Ayune I.</h3>
                        </div>
                        <div className="flex-col text-center stroke-medium w-48 xl:w-64 2xl:w-72">
                            <h3 className="stroke-bolder text-base xl:text-lg">The Seductress</h3>
                            <h3 className="xl:mt-2 mt-1 stroke-bold">Vegas Showgirl Dancers</h3>
                            <h3 className="text-center">Jisoo L., Kayla S.,</h3>
                            <h3 className="text-center">Dananya C., Kelly S.,</h3>
                            <h3 className="text-center">Abigail S.</h3>
                            <h3 className="xl:mt-2 mt-1 stroke-bold">Callie</h3>
                            <h3 className="text-center">Jisoo L.</h3>
                            <h3 className="xl:mt-2 mt-1 stroke-bold">Vegas Showgirls (Backstage)</h3>
                            <h3 className="text-center">Dain C., Miya L.,</h3>
                            <h3 className="text-center">Poppy H., Abigail S.</h3>
                            <h3 className="xl:mt-2 mt-1 stroke-bold">Stage Manager</h3>
                            <h3 className="text-center">Laurette P.</h3>
                            <h3 className="xl:mt-2 mt-1 stroke-bold">Dance Sequence</h3>
                            <h3 className="text-center">Jisoo L.</h3>
                        </div>
                        <div className="flex-col text-center stroke-medium w-48 xl:w-64 2xl:w-72">
                            <h3 className="stroke-bolder text-base xl:text-lg">The Deity</h3>
                            <h3 className="xl:mt-2 mt-1 stroke-bold">Dr. Athena</h3>
                            <h3 className="">Ahreumbi R.</h3>
                            <h3 className="xl:mt-3 mt-2 stroke-bold">Lab Suits</h3>
                            <h3 className="">Laurette P., Poppy H.</h3>
                            <h3 className="xl:mt-3 mt-2 stroke-bold">Dance Sequence</h3>
                            <h3 className="">Ahreumbi R., Maura H.,</h3>
                            <h3 className="">Kayla G., Dananya C.,</h3>
                            <h3 className="">Kelly S., Abigail S., Dain C.,</h3>
                            <h3 className="">Adjani A., Amanda N.</h3>
                        </div>
                    </div>}

                {page === "cast2" &&
                    <div className="mt-4 xl:mt-6 2xl:mt-16 flex justify-center text-black text-sm xl:text-base 2xl:text-lg font-sunday uppercase">
                        <div className="flex-col text-center stroke-medium w-48 xl:w-64 2xl:w-72">
                            <h3 className="stroke-bolder text-base xl:text-lg">The Faithful Wife</h3>
                            <h3 className="xl:mt-2 mt-1 stroke-bold">Telemachus</h3>
                            <h3 className="text-center">Artur P.</h3>
                            <h3 className="xl:mt-2 mt-1 stroke-bold">Penny</h3>
                            <h3 className="text-center">Taj D.</h3>
                            <h3 className="xl:mt-2 mt-1 stroke-bold">Dance Sequence</h3>
                            <h3 className="text-center">Lana S.</h3>
                        </div>
                        <div className="flex-col text-center stroke-medium w-48 xl:w-64 2xl:w-72">
                            <h3 className="stroke-bolder text-base xl:text-lg">The Witch and the Monster</h3>
                            <h3 className="xl:mt-2 mt-1 stroke-bold">Circe</h3>
                            <h3 className="text-center">Lana S.</h3>
                            <h3 className="xl:mt-2 mt-1 stroke-bold">Scylla</h3>
                            <h3 className="text-center">Amanda N.</h3>
                            <h3 className="xl:mt-2 mt-1 stroke-bold">Dance Sequence</h3>
                            <h3 className="text-center">Amanda N.</h3>
                        </div>
                    </div>}

                {page === "web" &&
                    <div className="mt-4 xl:mt-6 2xl:mt-16 flex justify-center text-black text-sm xl:text-base font-sunday uppercase">
                        <div className="flex-col text-center stroke-medium w-48 xl:w-64 2xl:w-72">
                            <h3 className="text-center stroke-bold">Web Design Director</h3>
                            <h3 className="">Marilou Anderson</h3>
                            <h3 className="mt-4 stroke-bold">Web Designers</h3>
                            <h3 className="">Hamza A.</h3>
                            <h3 className="">Meagan C.</h3>
                            <h3 className="">Orsen Q</h3>
                        </div>
                        <div className="flex-col text-center stroke-medium w-48 xl:w-64 2xl:w-72">
                            <h3 className="stroke-bold">Web Developer</h3>
                            <h3 className="">Hamza A.</h3>
                            <h3 className="mt-4 text-center stroke-bold">Developer Operations</h3>
                            <h3 className="">Orsen Q.</h3>
                            <h3 className="mt-4 stroke-bold">Web Designers</h3>
                            <h3 className="">Brianna P.</h3>
                        </div>
                    </div>}
            </div>
        </div>


        <div className="absolute left-0 top-0 p-4 z-10">
            <a className="text-xl 2xl:text-2xl font-cursive underline text-white hover:text-gray-300 cursor-pointer" href="https://github.com/hhhapz/IASAS-Tech" target="_blank">Source Code</a>
        </div>

        <div className="absolute right-0  bottom-0 p-4 z-10">
            <h1 className="text-xl 2xl:text-2xl font-cursive underline text-white hover:text-gray-300 cursor-pointer" onClick={goBack}>Go back</h1>
        </div>

    </motion.div>

}

export default Credits