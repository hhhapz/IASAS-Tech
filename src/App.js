import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homepage from './pages/Homepage'
import TheMap from './pages/Map';
import Report from './pages/Report';

const IDS = {
  first: "JBDISrTRDOk",
  last: "dQw4w9WgXcQ"
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
          <Route path="/map" exact >
            <TheMap pTransition={pTransition} pVariants={pVariants} />
          </Route>
          <Route path="/report/first" exact >
            <Report pTransition={pTransition} pVariants={pVariants} id={IDS.first} back="/" next="/map" />
          </Route>
          <Route path="/report/last" exact >
            <Report pTransition={pTransition} pVariants={pVariants} id={IDS.last} back="/map" next="/credits" />
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
