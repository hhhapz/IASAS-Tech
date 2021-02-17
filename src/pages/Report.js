import { motion } from 'framer-motion';
import { React, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
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

function Report({ pTransition, pVariants, id, back, next }) {
    const [continuing, setContinuing] = useState(false)
    const [data, setData] = useState(undefined)
    const history = useHistory()

    useEffect(() => {

        setTimeout(() => {
        }, INITIAL)
    }, [])

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
        className="flex justify-center bg-backdrop">
        <div className="absolute right-0  bottom-0 p-4">
            <h1 className="text-xl font-cursive underline hover:text-yellow-900 cursor-pointer" onClick={skip}>Skip</h1>
        </div>
        <div className="absolute left-0  bottom-0 p-4">
            <h1 className="text-xl font-cursive underline hover:text-yellow-900 cursor-pointer" onClick={goBack}>Go back</h1>
        </div>
        <div className="relative">
            <img src={TV} className="max-w-screen max-h-screen relative" alt="" />
            <YouTube
                videoId={id}
                id="reportPlayer"
                onReady={onReportReady}
                onEnd={pollFinish}
                onPause={pollFinish}
                containerClassName="absolute report-video"
                opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                        autoplay: 0,
                        enablejsapi: 1,
                    }
                }}
            />
        </div>
    </motion.div>
}

export default Report