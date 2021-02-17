import { motion } from 'framer-motion';
import CrossFadeImage from '../components/Crossfade'
import { React, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import frame from '../assets/images/homepage/frame.webp'
import { toast } from 'react-toastify'


const greeks = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => require(`../assets/images/homepage/greek${i}.webp`).default)
const latins = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => require(`../assets/images/homepage/latin${i}.webp`).default)

const INITIAL = 5000;
// const INITIAL = 0;
const BETWEEN = 500;
const PULSE = 1000;
const PROMPT = 15000;

const TITLE1 = "2xl:text-6xl xl:text-5xl text-4xl"
const TITLE2 = "2xl:text-5xl xl:text-4xl text-3xl"

function Homepage({ showPage, pTransition, pVariants }) {
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
    setTimeout(() => {
      const newImages = greeks
      setTransition(["strikethrough strikethrough-enable", "", "opacity-0"])
      latins.forEach((src, i) => {
        setTimeout(() => {
          newImages[i] = src
          setImages(newImages.slice())
        }, BETWEEN * i);
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
    }, INITIAL)
  }, [setImages, setNext])


  return <motion.div initial="out" animate="in" exit="out" variants={pVariants} transition={pTransition}

    className="h-screen w-screen bg-homepage bg-cover bg-center flex justify-center items-center">
    <div className="flex flex-col justify-between w-7/12 max-w-2xl">
      <span className="flex justify-center">
        <h2 className={`${TITLE2} font-cursive text-center mb-8 ${transition[0]}`}>The Odyssey, Book One, Chapter 2</h2>
      </span>
      <div className="flex flex-wrap justify-center">
        <img alt="" src={frame} className="w-1/2"></img>
        <div className="flex flex-col justify-evenly w-1/2">
          {images.map((src, i) => <CrossFadeImage src={src} duration={1000} key={i} alt="" timingFunction="ease-in-out"></CrossFadeImage>)}
        </div>
        <h2 className={`${TITLE1} font-cursive text-center replacement mt-12 ${transition[2]}`}
          onClick={next}
        >{transition[1]}&nbsp;</h2>
      </div>
    </div>
  </motion.div>

}

export default Homepage