import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homepage from './pages/Homepage'
import TheMap from './pages/Map';
import Player from './pages/Player';
import Credits from './pages/Credits';

import athena from './assets/images/map/mono/calypso.png'
import calypso from './assets/images/map/mono/athena.png'
import penelope from './assets/images/map/colour/penelope.png'
import seductress from './assets/images/map/colour/seductress.png'
import tiresias from './assets/images/map/colour/tiresias.png'

const IDS = {
  first: {
    id: "JBDISrTRDOk",
    next: "/map",
    back: "/",
    tv: true,
  },
  last: {
    id: "dQw4w9WgXcQ",
    next: "/credits",
    back: "/map",
    tv: true,
  },

  penelope: {
    id: "Gs069dndIYk",
    next: "/map/penelope",
    back: "/map",
    image: penelope
  },
  tiresias: {
    id: "Rbm6GXllBiw",
    next: "/map/tiresias",
    back: "/map",
    image: tiresias
  },
  seductress: {
    id: "fNFzfwLM72c",
    next: "/map/seductress",
    back: "/map",
    image: seductress
  },
  athena: {
    id: "xFrGuyw1V8s",
    next: "/map/athena",
    back: "/map",
    image: athena
  },
  calypso: {
    id: "8UVNT4wvIGY",
    next: "/map/calypso",
    back: "/map",
    image: calypso
  },
}

function App() {
  const location = useLocation()
  const pTransition = {
    duration: 2
  }
  const pVariants = {
    in: {
      opacity: 1
    },
    out: {
      opacity: 0
    }
  }

  return (
    <div className="App bg-backdrop w-screen h-screen overflow-hidden">
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
