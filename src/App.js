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

  creditsCanvas, creditsBG,
} from './Images'
import Mobile from './pages/Mobile';

const IDS = {
  first: {
    id: "oGIT6A6ciuI",
    next: "/map",
    back: "/",
    tv: true,
  },
  last: {
    id: "V1MKKxArJL0",
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

function App() {
  const [mobile, setMobile] = useState(window.innerWidth < 1024)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  const updateWidth = () => {
    setMobile(window.innerWidth < 1024)
  }

  useEffect(() => {
    window.addEventListener("resize", updateWidth)
    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  }, [setMobile])

  useEffect(() => {
    const path = location.pathname

    if (mobile) {
      const sources = [homepage, athena, monster, tiresias, penelope, coin, calypso]
      let count = sources.length
      sources.forEach(src => {
        const i = new Image()
        i.src = src
        i.onload = () => {
          if (--count === 0) setLoading(false)
        }
      });
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
      const sources = [bothBW, calypsoBW, tiresiasBW, penelopeBW, stringhorBW, stringverBW, waveBW, TV]
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
  }, [mobile])

  return (
    <div className={`App bg-backdrop select-none w-screen h-screen ${mobile ? "" : "overflow-hidden"}`}>
      {loading && <motion.div className="w-screen h-screen bg-backdrop flex justify-center items-center" pTransition={pTransition} pVariants={pVariants}>
        <svg className="animate-spin -ml-1 mr-3 w-1/12 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </motion.div>}
      {!loading && mobile && <Mobile pTransition={pTransition} position={pVariants} />}
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
            </Route>
            <Route>
              <Homepage pTransition={pTransition} pVariants={pVariants} />
            </Route>
          </Switch>
        </AnimatePresence>}

      {!loading && !mobile &&
        <ToastContainer
          position="bottom-right"
          autoClose={false}
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
        />}
    </div>
  );
}

export default App;
