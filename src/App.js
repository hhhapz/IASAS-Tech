import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Homepage from './pages/Homepage'
import TheMap from './pages/Map';
import Player from './pages/Player';
import Credits from './pages/Credits';

import {
  coin,

  homepage, frame,

  TV,

  bothBW, penelopeBW, calypsoBW, tiresiasBW,
  athena, monster, penelope, calypso, tiresias,

  stringhorBW, stringverBW, waveBW,

  creditsCanvas, creditsBG, TVCrop,
} from './Images'
import MHomepage from './pages/Mobile/MHomepage';
import MPlayer from './pages/Mobile/MPlayer';
import MMap from './pages/Mobile/MMap';
import MCredits from './pages/Mobile/MCredits';


const sendRequest = async (type, uuid) => {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const details = {
    width: vw,
    height: vh,
    type,
    uuid
  }
  const formBody = Object
    .keys(details)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(details[k])}`)
    .join("&")
  fetch("https://dev.teamortix.com/data", {
    method: "post",
    mode: "no-cors",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formBody
  })
}

const IDS = {
  first: {
    id: "SZhZwF054cE",
    next: "/map",
    back: "/",
    tv: true,
  },
  last: {
    id: "ghgknZocCjU",
    next: "/credits",
    back: "/map",
    tv: true,
  },

  penelope: {
    id: "-gUf-2GvBvQ",
    next: "/map/penelope",
    image: penelope
  },
  tiresias: {
    id: "bWEVZD10X5U",
    next: "/map/tiresias",
    image: tiresias
  },
  calypso: {
    id: "uNCyLn1zaPE",
    next: "/map/calypso",
    image: calypso
  },
  athena: {
    id: "mzrhKzCNymM",
    next: "/map/athena",
    image: athena
  },
  monster: {
    id: "YFVgBNTgjSc",
    next: "/map/monster",
    image: monster
  },
}

const pTransition = {
  duration: 1
}

const pVariants = {
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
}

const MIN_WIDTH = 768

function App() {
  const [width, setWidth] = useState(window.innerWidth)
  const [mobile, setMobile] = useState(width < MIN_WIDTH)
  const [scroll, setScroll] = useState(true)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  const updateWidth = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    if (!document.fullscreenElement && ["/report", "/video", "/map"].every(i => !location.pathname.startsWith(i))) {
      setMobile(window.innerWidth < MIN_WIDTH)
    }
  }, [width])

  useEffect(() => {
    window.addEventListener("resize", updateWidth)
    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  }, [setMobile])

  useEffect(() => {
    const path = location.pathname

    setTimeout(() => {

      if (mobile) {
        const sources = [TVCrop, coin, athena, monster, penelope, calypso, tiresias]
        sources.forEach(src => {
          const i = new Image()
          i.src = src
        })

        setTimeout(() => {
          setLoading(false)
        }, 3000);

      } else if (path.startsWith("/report") || path.startsWith("/video")) {
        const sources = [TV]
        let count = sources.length
        sources.forEach(src => {
          const i = new Image()
          i.src = src
          i.onload = () => {
            if (--count === 0) setLoading(false)
          }
        });
      } else if (path === "/map") {
        const sources = [bothBW, calypsoBW, tiresiasBW, penelopeBW, stringhorBW, stringverBW, waveBW, TV,
          athena, monster, calypso, penelope, tiresias]
        let count = sources.length
        sources.forEach(src => {
          const i = new Image()
          i.src = src
          i.onload = () => {
            if (--count === 0) setLoading(false)
          }
        });
      } else if (path === "/credits") {
        const sources = [creditsBG, creditsCanvas, TV]
        let count = sources.length
        sources.forEach(src => {
          const i = new Image()
          i.src = src
          i.onload = () => {
            if (--count === 0) setLoading(false)
          }
        });
      } else {
        const sources = [homepage, frame, TV]
        let count = sources.length
        sources.forEach(src => {
          const i = new Image()
          i.src = src
          i.onload = () => {
            if (--count === 0) setLoading(false)
          }
        });
      }
    }, 1500);
  }, [mobile])

  useEffect(() => {
    const uuid = window.localStorage.getItem("uuid") || uuidv4()
    window.localStorage.setItem("uuid", uuid)
    sendRequest("visit", uuid)
  }, [])

  useEffect(() => {
    const uuid = window.localStorage.getItem("uuid") || uuidv4()
    window.localStorage.setItem("uuid", uuid)
    sendRequest(location.pathname, uuid)
  }, [location])


  const extra = mobile ? (scroll ? "overflow-x-hidden" : "overflow-hidden")
    : "overflow-hidden"

  return (
    <div className={`App bg-backdrop select-none w-screen h-screen ${extra}`}>
      {loading && <motion.div className="w-screen h-screen bg-backdrop flex flex-col justify-center items-center"
        pTransition={pTransition} pVariants={pVariants}>
        <div className="psoload">
          <div class="straight"></div>
          <div class="curve"></div>
          <div class="center"></div>
          <div class="inner"></div>
        </div>
        {mobile && <h1 className="font-cursive mt-8 text-center text-2xl">View this on a desktop<br></br>device for the full experience!</h1>}
      </motion.div>}
      {!loading && mobile &&
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route path="/credits" exact >
              <MCredits pTransition={pTransition} pVariants={pVariants} />
            </Route>
            <Route path="/map" exact >
              <MMap pTransition={pTransition} pVariants={pVariants} setScroll={setScroll} />
            </Route>
            <Route path="/map/:watched" exact >
              <MMap pTransition={pTransition} pVariants={pVariants} setScroll={setScroll} />
            </Route>
            <Route path="/report/:type" exact >
              <MPlayer pTransition={pTransition} pVariants={pVariants} ids={IDS} />
            </Route>
            <Route path="/video/:type" exact >
              <MPlayer pTransition={pTransition} pVariants={pVariants} ids={IDS} />
            </Route>
            <Route path="/" exact >
              <MHomepage pTransition={pTransition} pVariants={pVariants} />
              <ToastContainer
                position={mobile ? "top-right" : "bottom-right"}
                autoClose={false}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
              />
            </Route>
            <Route>
              <MHomepage pTransition={pTransition} pVariants={pVariants} />
              <ToastContainer
                position={mobile ? "top-right" : "bottom-right"}
                autoClose={false}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
              />
            </Route>
          </Switch>
        </AnimatePresence>}

      {!loading && !mobile &&
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route path="/credits" exact >
              <Credits pTransition={pTransition} pVariants={pVariants} />
            </Route>
            <Route path="/map" exact >
              <TheMap pTransition={pTransition} pVariants={pVariants} />
            </Route>
            <Route path="/map/:watched" exact >
              <TheMap pTransition={pTransition} pVariants={pVariants} />
            </Route>
            <Route path="/report/:type" exact >
              <Player pTransition={pTransition} pVariants={pVariants} ids={IDS} />
            </Route>
            <Route path="/video/:type" exact >
              <Player pTransition={pTransition} pVariants={pVariants} ids={IDS} />
            </Route>
            <Route path="/" exact >
              <Homepage pTransition={pTransition} pVariants={pVariants} />
              <ToastContainer
                position={mobile ? "top-right" : "bottom-right"}
                autoClose={false}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
              />
            </Route>
            <Route>
              <Homepage pTransition={pTransition} pVariants={pVariants} />
              <ToastContainer
                position={mobile ? "top-right" : "bottom-right"}
                autoClose={false}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
              />
            </Route>
          </Switch>
        </AnimatePresence>}

    </div>
  );
}

export default App;
