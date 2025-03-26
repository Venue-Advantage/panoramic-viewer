import { useEffect, useRef, useState } from "react";

import './App.css'

const App = () => {
  const krpanoRef = useRef(null);
  const [krpanoLoaded, setKrpanoLoaded] = useState(false);
 
  useEffect(() => {
    const scriptId = "krpano-script";
  
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "/panoramic-viewer/krpano.js"; // krpano.js should be in /public/panoramic-viewer/
      script.onload = () => {
        console.log("krpano.js loaded successfully");
        setKrpanoLoaded(true);
      };
      script.onerror = () => console.error("Error loading krpano.js");
      document.body.appendChild(script);
    } else {
      setKrpanoLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!krpanoLoaded || !window.embedpano) return;
  
    window.embedpano({
      target: krpanoRef.current,
      xml: "/panoramic-viewer/pano.xml", // XML now correctly loads from public folder
      html5: "only",
      // passQueryParameters: false,
      onready: (krpano) => {
        console.log("krpano is ready", krpano);
        setTimeout(() => {
          // krpano.call("loadscene(myScene, null, MERGE);");
          krpano.actions.loadscene("myScene");
        }, 500);
      },
    });
  }, [krpanoLoaded]);


  // return <div ref={krpanoRef} style={{ width: "800px", height: "800px" }} />;
  return <div ref={krpanoRef} style={{ width: "100vw", height: "100vh", position: "absolute", top: 0, left: 0 }} />;

};

export default App;
