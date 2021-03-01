import { motion } from 'framer-motion';
import { React, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
    greek1, greek2, greek3, greek4, greek5, greek6, greek7, greek8, greek9,
    mlatin1, latin2, latin3, latin4, latin5, latin6, latin7, latin8, latin9,
} from '../../Images'

const INITIAL = 4000;
// const INITIAL = 0;
const BETWEEN = 300;
const PULSE = 1000;
const PROMPT = 15000;

const greeks = [greek1, greek2, greek3, greek4, greek5, greek6, greek7, greek8, greek9,].map((src, i) => {
    new Image().src = src
    return {
        src: src,
        delay: INITIAL + (i + 1) * BETWEEN,
        initial: 1,
        animate: 0,
    }
})
const latins = [mlatin1, latin2, latin3, latin4, latin5, latin6, latin7, latin8, latin9,].map((src, i) => {
    new Image().src = src
    return {
        src: src,
        delay: 100,
        initial: 0,
        animate: 1,
    }
})


const TITLE1 = "sm:text-5xl text-4xl"
const TITLE2 = "sm:text-3xl text-2xl stroke-semibold"

function MHomepage({ pTransition, pVariants }) {
    const [images, setImages] = useState(greeks)
    const [transition, setTransition] = useState(["strikethrough", "", "opacity-0", "hidden"])
    const [timeout, setCode] = useState(-1)
    const [canNext, setNext] = useState(false)
    const history = useHistory()

    const next = () => {
        if (!canNext) return
        setNext(false)
        toast.dismiss()
        clearTimeout(timeout)
        history.push("/report/first")
    }

    useEffect(() => {
        toast.dismiss()
        setImages(greeks)

        setCode(setTimeout(() => {
            const newImages = greeks.slice()
            setTransition(["strikethrough strikethrough-enable", "", "opacity-0", "hidden"])
            latins.forEach((src, i) => {
                setTimeout(() => {
                    newImages[i] = src
                    setImages(newImages.slice())
                }, BETWEEN * i + 800);
            })

            setTimeout(() => {
                setTransition(["strikethrough strikethrough-enable", "The Unheard", "", "hidden"])
            }, BETWEEN * latins.length);

            setTimeout(() => {
                setTransition(["strikethrough strikethrough-enable", "The Unheard",
                    "animate-pulse cursor-pointer hover:text-yellow-900", "hidden"])
                setNext(true)
            }, BETWEEN * latins.length + PULSE);

            setCode(setTimeout(() => {
                setTransition(["strikethrough strikethrough-enable", "The Unheard",
                    "animate-pulse cursor-pointer hover:text-yellow-900", ""])
                toast.dismiss()
                toast.dark("Tap the title to continue!")
            }, PROMPT));
        }, INITIAL))

        return () => {
            toast.dismiss()
            clearTimeout(timeout)
        }
    }, [setImages, setNext])

    return <motion.div initial="out" animate="in" exit="out" variants={pVariants} transition={pTransition}
        className="w-screen min-h-screen bg-homepage bg-cover bg-center flex flex-col justify-center items-center
            text-black font-cursive">

        <div className="flex flex-col justify-between overflow-hidden">
            <span className="flex justify-center">
                <h2 className={`${TITLE2} font-cursive text-center mb-12 ${transition[0]}`}>The Odyssey, Book One, Chapter&nbsp;2</h2>
            </span>
            <div className="flex flex-wrap justify-center">
                <div className="flex flex-col justify-evenly w-10/12 sm:w-10/12 max-w-sm -mt-4">
                    {images.map((data, i) => <motion.img src={data.src} key={i} alt="" className="pointer-events-none"
                        initial={{
                            opacity: data.initial
                        }}
                        animate={{
                            opacity: data.animate
                        }}
                        transition={{
                            duration: .5,
                            delay: data.delay / 1000
                        }}

                    />)}
                </div>
            </div>
            <div className="absolute bottom-0 right-0 text-right">
                <svg xmlns="http://www.w3.org/2000/svg" className={`${transition[3]} animate-bounce`}
                    width="40" height="40" viewBox="0 0 20 20" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z" fill="#4A5568" />
                </svg>
            </div>
            <h2 className={`inline-block ${TITLE1} font-cursive text-center replacement mt-12 ${transition[2]}`}
                onClick={next}
            >{transition[1]}&nbsp;</h2>
        </div>

    </motion.div>
}

export default MHomepage