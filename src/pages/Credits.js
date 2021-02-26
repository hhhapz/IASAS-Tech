import { motion } from 'framer-motion';
import { React, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { creditsCanvas } from '../Images'

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
    const [page, setPage] = useState("production")

    const goBack = () => {
        history.push("/report/last")
    }

    return <motion.div initial="out" animate="in" exit="out" variants={pVariants} transition={pTransition}
        className="flex justify-center items-center bg-credits bg-center bg-cover h-full w-full">

        <div className="relative z-10">
            <img src={creditsCanvas} className="max-w-screen max-h-screen pointer-events-none" alt="" />
            <div className="absolute credits font-cursive text-center">
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

                {page === "production" &&
                    <div>
                        <h2 className="mt-6 2xl:mt-10 text-center font-sunday"><strong className="stroke-semibold">DIRECTED BY</strong> ERICA AND MIKE CALI</h2>
                        <h2 className="mt-2 2xl:mt-4 text-center font-sunday"><strong className="stroke-semibold">WRITTEN BY</strong> ERICA CALI</h2>
                        <div className="mt-4 xl:mt-6 2xl:mt-6 flex justify-center text-black text-sm xl:text-base font-sunday uppercase">
                            <div className="flex-col text-center stroke-medium w-48 xl:w-64 2xl:w-72">
                                <h3 className="stroke-bold">Cinematographers</h3>
                                <h3>Didik JULIANTO</h3>
                                <h3>Deva R.</h3>
                                <h3>Indi M.</h3>
                                <h3>Da Bin C.</h3>
                                <h3>Tiffany J.</h3>

                                <h3 className="mt-4 stroke-bold">Video Editors</h3>
                                <h3>Nicholas Pudjarmintao ('16)</h3>
                                <h3>Deva R. '22</h3>
                            </div>
                            <div className="flex-col text-center stroke-medium mt-8 w-48 xl:w-64 2xl:w-72">
                                <h3 className="stroke-bold">Costume Design</h3>
                                <h3>Ulfa</h3>
                                <h3>Hair and Makeup</h3>
                                <h3>Francisukus Setiawan</h3>
                                <h3 className="mt-4 stroke-bold">Lighting Design</h3>
                                <h3>Yuni Adamsyah</h3>
                                <h3>Mike Cali</h3>
                            </div>
                            <div className="flex-col text-center stroke-medium w-48 xl:w-64 2xl:w-72">
                                <h3 className="stroke-bold">Vegas Choreographer</h3>
                                <h3>Amanda Seath</h3>
                                <h3 className="mt-4 stroke-bold">Publicity</h3>
                                <h3>JIS Communications Office</h3>
                                <h3 className="mt-4 stroke-bold">Photography</h3>
                                <h3>Scotty Graham</h3>
                                <h3 className="mt-4 stroke-bold">Set Construction</h3>
                                <h3>JIS Facilities</h3>
                            </div>
                        </div>
                    </div>}

                {page === "cast1" &&
                    <div className="mt-4 xl:mt-6 2xl:mt-16 flex justify-center text-black text-sm xl:text-base 2xl:text-lg font-sunday uppercase">
                        <div className="text-center stroke-medium w-48 xl:w-64 2xl:w-72">
                            <h3 className="credits-title mt-12">The Faithful Wife</h3>
                            <h3 className="credits-subtitle">Telemachus</h3>
                            <h3 className="credits-name">Artur P.</h3>
                            <h3 className="credits-subtitle">Penny</h3>
                            <h3 className="credits-name">Taj D.</h3>
                            <h3 className="credits-subtitle">Dance Sequence</h3>
                            <h3 className="credits-name">Lana S.</h3>
                        </div>

                        <div className="text-center stroke-medium w-48 xl:w-64 2xl:w-72">
                            <h3 className="credits-title">Bloomberg Report</h3>
                            <h3 className="credits-subtitle">Newsreporter</h3>
                            <h3 className="credits-name">Miya L.</h3>

                            <h3 className="mt-2 credits-title">The Blind Prophet</h3>
                            <h3 className="credits-subtitle">Tiresias</h3>
                            <h3 className="credits-name">Chris G.</h3>

                            <h3 className="credits-subtitle">Suits Dancers</h3>
                            <h3 className="credits-name">Maura H., Lana S.,</h3>
                            <h3 className="credits-name">Adjani A.</h3>

                            <h3 className="credits-subtitle">Dance Sequence</h3>
                            <h3 className="credits-name">Jacqueline H.</h3>
                            <h3 className="credits-name">Layla Azwa ND.,</h3>
                            <h3 className="credits-name">Ayune I.</h3>
                        </div>

                        <div className="flex-col text-center stroke-medium w-48 xl:w-64 2xl:w-72">
                            <h3 className="credits-title mt-12">The Witch and the Monster</h3>
                            <h3 className="credits-subtitle">Circe</h3>
                            <h3 className="credits-name">Lana S.</h3>
                            <h3 className="credits-subtitle">Scylla</h3>
                            <h3 className="credits-name">Amanda N.</h3>
                            <h3 className="credits-subtitle">Dance Sequence</h3>
                            <h3 className="credits-name">Amanda N.</h3>
                        </div>
                    </div>}

                {page === "cast2" &&
                    <div className="mt-4 xl:mt-6 2xl:mt-16 flex justify-center text-black text-sm xl:text-base 2xl:text-lg font-sunday uppercase">
                        <div className="text-center stroke-medium">
                            <h3 className="credits-title">The Seductress</h3>
                            <div className="flex">
                                <div className="mr-4">
                                    <h3 className="credits-subtitle">Vegas Showgirl Dancers</h3>
                                    <h3 className="credits-name">Jisoo L., Kayla S.,</h3>
                                    <h3 className="credits-name">Dananya C., Kelly S.,</h3>
                                    <h3 className="credits-name">Abigail S.</h3>
                                    <h3 className="credits-subtitle">Callie</h3>
                                    <h3 className="credits-name">Jisoo L.</h3>
                                </div>
                                <div className="ml-4">
                                    <h3 className="credits-subtitle">Vegas Showgirls (Backstage)</h3>
                                    <h3 className="credits-name">Dain C., Miya L.,</h3>
                                    <h3 className="credits-name">Poppy H., Abigail S.</h3>

                                    <h3 className="credits-subtitle">Stage Manager</h3>
                                    <h3 className="credits-name">Laurette P.</h3>

                                    <h3 className="credits-subtitle">Dance Sequence</h3>
                                    <h3 className="credits-name">Jisoo L.</h3>
                                </div>
                            </div>
                        </div>

                        <div className="text-center stroke-medium w-48 xl:w-64 2xl:w-72">
                            <h3 className="credits-title">The Deity</h3>
                            <h3 className="credits-subtitle">Dr Athena</h3>
                            <h3 className="credits-name">Ahreumbi R.</h3>

                            <h3 className="credits-subtitle">Lab Suits</h3>
                            <h3 className="text-center text-base">Laurette P., Poppy H.</h3>

                            <h3 className="credits-subtitle">Dance Sequence</h3>
                            <h3 className="text-center text-base">Ahreumbi R., Maura H.,</h3>
                            <h3 className="text-center text-base">Kayla G., Dananya C.,</h3>
                            <h3 className="text-center text-base">Kelly S., Abigail S., Dain C.,</h3>
                            <h3 className="text-center text-base">Adjani A., Dain C.,</h3>
                            <h3 className="text-center text-base">Amanda N.</h3>
                        </div>
                    </div>}

                {page === "web" &&
                    <div className="mt-4 xl:mt-6 2xl:mt-16 flex justify-center text-black text-sm xl:text-base font-sunday uppercase">
                        <div className="flex-col text-center stroke-medium w-48 xl:w-64 2xl:w-72">
                            <h3 className="text-center stroke-bold">Web Design Director</h3>
                            <h3>Marilou Anderson</h3>
                            <h3 className="mt-4 stroke-bold">Web Designers</h3>
                            <h3>Hamza A.</h3>
                            <h3>Meagan C.</h3>
                            <h3>Orsen Q</h3>
                        </div>
                        <div className="flex-col text-center stroke-medium w-48 xl:w-64 2xl:w-72">
                            <h3 className="stroke-bold">Web Developer</h3>
                            <h3>Hamza A.</h3>
                            <h3 className="mt-4 stroke-bold">Developer Operations</h3>
                            <h3>Orsen Q.</h3>
                            <h3 className="mt-4 stroke-bold">Web Designers</h3>
                            <h3>Brianna P.</h3>
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