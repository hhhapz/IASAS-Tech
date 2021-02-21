import { motion } from 'framer-motion';
import { React, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import TV from '../assets/images/tv.png'
import YouTube from 'react-youtube';

// const INITIAL = 5000;
const INITIAL = 1500;

// function toggle(elem, state) {
//     var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
//         (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
//         (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
//         (document.msFullscreenElement && document.msFullscreenElement !== null);

//     if (!isInFullScreen && state) {
//         if (elem.requestFullscreen) {
//             elem.requestFullscreen();
//         } else if (elem.mozRequestFullScreen) {
//             elem.mozRequestFullScreen();
//         } else if (elem.webkitRequestFullScreen) {
//             elem.webkitRequestFullScreen();
//         } else if (elem.msRequestFullscreen) {
//             elem.msRequestFullscreen();
//         }
//     }
//     if (isInFullScreen && !state) {
//         if (document.exitFullscreen) {
//             document.exitFullscreen();
//         } else if (document.webkitExitFullscreen) {
//             document.webkitExitFullscreen();
//         } else if (document.mozCancelFullScreen) {
//             document.mozCancelFullScreen();
//         } else if (document.msExitFullscreen) {
//             document.msExitFullscreen();
//         }
//     }
// }

function Player({ pTransition, pVariants, ids }) {
    const [continuing, setContinuing] = useState(false)
    const [data, setData] = useState(undefined)
    const history = useHistory()
    let { type } = useParams()
    let { id, next, back, tv, image } = ids[type]

    useEffect(() => {
        if (!ids[type]) history.push("/")

        setTimeout(() => {
        }, INITIAL)
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
        console.log(elapsed, continuing);
        if (elapsed < 0.98 || continuing) {
            return
        }
        setContinuing(true)
        history.push(next)
    }

    return <motion.div initial="out" animate="in" exit="out" variants={pVariants} transition={pTransition}
        className="flex justify-center items-center bg-backdrop h-full w-full">
        {image &&
            <img alt="" src={image} className="absolute top-0 right-0 h-2/6 pointer-events-none" />}
        {tv &&
            <div className="relative z-10">
                <img src={TV} className="max-w-screen max-h-screen ml-8 pointer-events-none" alt="" />
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
                            autoplay: 0,
                            enablejsapi: 1,
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
                            autoplay: 0,
                            enablejsapi: 1,
                        }
                    }}
                />
            </div>}
        {skip &&
            <div className="absolute right-0  bottom-0 p-4 hover:text-yellow-900 cursor-pointer z-10" onClick={skip}>
                <h1 className="text-2xl 2xl:text-3xl 3xl:text-5xl font-cursive underline">Skip</h1>
            </div>}
        {back &&
            <div className="absolute left-0  bottom-0 p-4 hover:text-yellow-900 cursor-pointer z-10" onClick={goBack}>
                <h1 className="text-2xl 2xl:text-3xl 3xl:text-5xl font-cursive underline">Go back</h1>
            </div>
        }
    </motion.div>
}

export default Player