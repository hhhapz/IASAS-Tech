import { motion } from 'framer-motion';
import { React, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import YouTube from 'react-youtube';

import {
    TV,

    athenaBW, monsterBW, bothBW, penelopeBW, calypsoBW, tiresiasBW,
    both, penelope, calypso, tiresias,

    heartsBW, stringhorBW, stringverBW, waveBW,
    hearts, stringhor, stringver, wave,
} from '../Images'


// const INITIAL = 5000;
const INITIAL = 1500;

function Player({ pTransition, pVariants, ids }) {
    const [continuing, setContinuing] = useState(false)
    const [data, setData] = useState(undefined)
    const history = useHistory()
    let { type } = useParams()
    let { id, next, back, tv, image } = ids[type]

    useEffect(() => {
        if (!ids[type]) history.push("/")

        const preload = [
            athenaBW, monsterBW, bothBW, penelopeBW, calypsoBW, tiresiasBW,
            both, penelope, calypso, tiresias,

            heartsBW, stringhorBW, stringverBW, waveBW,
            hearts, stringhor, stringver, wave]

        if (type === "first") preload.forEach((src) => {
            const i = new Image()
            i.src = src
        })

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
        className={`flex justify-center items-center bg-backdrop h-full w-full ${tv ? "ml-4" : ""}`}>
        {image &&
            <img alt="" src={image} className="absolute top-0 right-0 h-2/6 pointer-events-none" />}
        {tv &&
            <div className="relative z-10">
                <img src={TV} className="max-w-screen max-h-screen pointer-events-none" alt="" />
                <YouTube
                    videoId={id}
                    id="reportPlayer"
                    onReady={onReportReady}
                    onEnd={pollFinish}
                    onPause={pollFinish}
                    containerClassName="absolute z-10 report-video"
                    opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                            controls: 0,
                            autoplay: 0,
                            enablejsapi: 1,
                            rel: 0,
                            modestbranding: 1,
                        }
                    }}
                />
            </div>}
        {!tv &&
            <div className="w-9/12 h-5/6 z-10">
                <YouTube
                    videoId={id}
                    id="reportPlayer"
                    onReady={onReportReady}
                    onEnd={pollFinish}
                    onPause={pollFinish}
                    containerClassName="max-w-full z-10 h-full"
                    opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                            controls: 0,

                            autoplay: 0,
                            enablejsapi: 1,
                            rel: 0,
                            modestbranding: 1,
                        }
                    }}
                />
            </div>}
        {skip &&
            <div className="absolute right-0 bottom-0 p-4 hover:text-yellow-900 cursor-pointer z-20" onClick={skip}>
                <h1 className="text-2xl xl:text-3xl 3xl:text-5xl font-cursive underline">Skip</h1>
            </div>}
        {back &&
            <div className="absolute left-0  bottom-0 p-4 hover:text-yellow-900 cursor-pointer z-20" onClick={goBack}>
                <h1 className="text-2xl xl:text-3xl 3xl:text-5xl font-cursive underline">Go back</h1>
            </div>
        }
    </motion.div>
}

export default Player