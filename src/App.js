import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homepage from './pages/Homepage'
import TheMap from './pages/Map';
import Player from './pages/Player';
import Credits from './pages/Credits';

import athena from './assets/images/map/colour/athena.png'
import monster from './assets/images/map/colour/monster.png'
import penelope from './assets/images/map/colour/penelope.png'
import calypso from './assets/images/map/colour/calypso.png'
import tiresias from './assets/images/map/colour/tiresias.png'

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
    next: "/map/bWEVZD10X5U",
    image: tiresias
  },
  calypso: {
    id: "uNCyLn1zaPE",
    next: "/map/calypso",
    image: calypso
  },
  athena: {
    id: "xFrGuyw1V8s",
    next: "/map/athena",
    image: athena
  },
  monster: {
    id: "8UVNT4wvIGY",
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
  const location = useLocation()

  return (
    <div className="App bg-backdrop select-none w-screen h-screen overflow-hidden">
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
      </AnimatePresence>
      <ToastContainer
        position="bottom-right"
        autoClose={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </div>
  );
}

export default App;
