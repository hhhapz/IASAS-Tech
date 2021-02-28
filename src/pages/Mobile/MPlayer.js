import { motion } from 'framer-motion';
import { React, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import YouTube from 'react-youtube';

import {
    TVCrop,

    athena, monster, penelope, calypso, tiresias, coin, creditsFull
} from '../../Images'


// const INITIAL = 5000;
const INITIAL = 1500;

function MPlayer({ pTransition, pVariants, ids }) {
    const [continuing, setContinuing] = useState(false)
    const [data, setData] = useState(undefined)
    const history = useHistory()
    let { type } = useParams()
    let { id, next, back, tv, image } = ids[type]

    useEffect(() => {
        if (!type || !ids[type]) history.push("/")

        const preloadFirst = [athena, monster, penelope, calypso, tiresias, coin]
        const preloadLast = [creditsFull]

        if (type === "first") preloadFirst.forEach((src) => {
            const i = new Image()
            i.src = src
        })

        if (type === "last") preloadLast.forEach((src) => {
            const i = new Image()
            i.src = src
        })

        window.scrollY = 0
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0

    }, [history, ids, type])

    const onReportReady = (data) => {
        setData(data)
        setTimeout(() => {
            data.target.playVideo()
        }, 500);
    }

    const goBack = () => {
        history.push(back)
        if (!data) return
        data.target.pauseVideo()
    }

    const skip = () => {
        history.push(next)
        if (!data) return
        data.target.pauseVideo()
    }

    const pollFinish = (data) => {
        const target = data.target
        const elapsed = target.getCurrentTime() / target.getDuration()
        if (elapsed < 0.98 || continuing) {
            return
        }
        setContinuing(true)
        history.push(next)
    }

    return <motion.div initial="out" animate="in" exit="out" variants={pVariants} transition={pTransition}
        className={`flex justify-center items-center bg-backdrop w-full ${tv ? "my-32" : "my-20"}`}>
        {image &&
            <img alt="" src={image} className="absolute bottom-0 right-0 h-2/6 pointer-events-none" />}
        {tv &&
            <div className="relative z-10">
                <img src={TVCrop} className="w-screen max-h-screen" alt="" />
                <YouTube
                    videoId={id}
                    id="reportPlayer"
                    onReady={onReportReady}
                    onEnd={pollFinish}
                    onPause={pollFinish}
                    containerClassName="absolute z-10 m-report-video"
                    opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                            autoplay: 0,
                            enablejsapi: 1,
                            rel: 0,
                            modestbranding: 1,
                        }
                    }}
                />
            </div>}
        {!tv &&
            <div className="relative z-10">
                <img src={TVCrop} className="w-screen max-h-screen opacity-0" alt="" />
                <YouTube
                    videoId={id}
                    id="reportPlayer"
                    onReady={onReportReady}
                    onEnd={pollFinish}
                    onPause={pollFinish}
                    containerClassName="absolute m-report-notv"
                    opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                            controls: 1,

                            autoplay: 0,
                            enablejsapi: 1,
                            rel: 0,
                            modestbranding: 1,
                        }
                    }}
                />
            </div>}
        {skip &&
            <div className="absolute right-0 top-0 p-4 hover:text-yellow-900 cursor-pointer z-20" onClick={skip}>
                <h1 className="text-2xl xl:text-3xl 3xl:text-5xl font-cursive underline">Skip</h1>
            </div>}
        {back &&
            <div className="absolute left-0  top-0 p-4 hover:text-yellow-900 cursor-pointer z-20" onClick={goBack}>
                <h1 className="text-2xl xl:text-3xl 3xl:text-5xl font-cursive underline">Go back</h1>
            </div>
        }
    </motion.div>
}

export default MPlayer