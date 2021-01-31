import React from 'react';
import Homepage from './pages/Homepage'

function App() {
  const [stage, setStage] = React.useState("start")

  return (
    <div className="App">
      {stage === "start" && <Homepage></Homepage>}
    </div>
  );
}

export default App;
