import { motion } from 'framer-motion';
import { React, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  frame,
  greek1, greek2, greek3, greek4, greek5, greek6, greek7, greek8, greek9,
  latin1, latin2, latin3, latin4, latin5, latin6, latin7, latin8, latin9,
} from '../Images'

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
const latins = [latin1, latin2, latin3, latin4, latin5, latin6, latin7, latin8, latin9,].map((src, i) => {
  new Image().src = src
  return {
    src: src,
    delay: 100,
    initial: 0,
    animate: 1,
  }
})


const TITLE1 = "2xl:text-6xl xl:text-5xl text-4xl"
const TITLE2 = "2xl:text-5xl xl:text-4xl text-3xl"

function Homepage({ pTransition, pVariants }) {
  const [images, setImages] = useState(greeks)
  const [transition, setTransition] = useState(["strikethrough", "", "opacity-0"])
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
    setImages(greeks)

    setCode(setTimeout(() => {
      const newImages = greeks.slice()
      setTransition(["strikethrough strikethrough-enable", "", "opacity-0"])
      latins.forEach((src, i) => {
        setTimeout(() => {
          newImages[i] = src
          setImages(newImages.slice())
        }, BETWEEN * i + 800);
      })

      setTimeout(() => {
        setTransition(["strikethrough strikethrough-enable", "The Unheard", ""])
      }, BETWEEN * latins.length);

      setTimeout(() => {
        setTransition(["strikethrough strikethrough-enable", "The Unheard",
          "animate-pulse cursor-pointer hover:text-yellow-900"])
        setNext(true)
      }, BETWEEN * latins.length + PULSE);

      setCode(setTimeout(() => {
        toast.dark("Click the title to continue!")
      }, PROMPT));
    }, INITIAL))

    return () => {
      console.log("clear");
      clearTimeout(timeout)
    }
  }, [setImages, setNext])


  return <motion.div initial="out" animate="in" exit="out" variants={pVariants} transition={pTransition}
    className="h-screen w-screen bg-homepage bg-cover bg-center flex justify-center items-center">

    <div className="flex flex-col justify-between w-8/12 max-w-4xl">
      <span className="flex justify-center">
        <h2 className={`${TITLE2} font-cursive text-center mb-8 ${transition[0]}`}>The Odyssey, Book One, Chapter 2</h2>
      </span>
      <div className="flex flex-wrap justify-center">
        <img alt="" src={frame} className="w-1/2 h-full"></img>
        <div className="flex flex-col justify-evenly w-1/2 -mt-4">
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
      <h2 className={`inline-block ${TITLE1} font-cursive text-center replacement mt-12 ${transition[2]}`}
        onClick={next}
      >{transition[1]}&nbsp;</h2>
    </div>
  </motion.div>

}

export default Homepage