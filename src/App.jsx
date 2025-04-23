import { useEffect, useRef, useState } from "react";

import './App.css'

const App = () => {
  const krpanoRef = useRef(null);
  const [krpanoLoaded, setKrpanoLoaded] = useState(false);
  const CDN_ACCOUNT_ID = "lzcu8n7b2"; // Set by imagekit/Cloudinary or any other CDN
  const IMAGE_BASE_URL = `https://ik.imagekit.io/${CDN_ACCOUNT_ID}/kr-pano`; // Set by imagekit/Cloudinary or any other CDN

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

  // useEffect(() => { // old way with static XML and static images
  //   if (!krpanoLoaded || !window.embedpano) return;

  //   window.embedpano({
  //     target: krpanoRef.current,
  //     xml: "/panoramic-viewer/pano.xml", // XML now correctly loads from public folder
  //     html5: "only",
  //     // passQueryParameters: false,
  //     onready: (krpano) => {
  //       console.log("krpano is ready", krpano);
  //       setTimeout(() => {
  //         // krpano.call("loadscene(myScene, null, MERGE);");
  //         krpano.actions.loadscene("myScene");
  //       }, 500);
  //     },
  //   });
  // }, [krpanoLoaded]);


  useEffect(() => { // dynamic image url way to load XML with fetch so that we can use a template with {{IMG_BASE}} and {{TS}} to avoid krpano to caching image 
    if (!krpanoLoaded || !window.embedpano) return;

    fetch('/panoramic-viewer/pano-template.xml').then(res => res.text())
      .then(xmlTemplate => {
        const ts = Date.now();
        const xml = xmlTemplate
          .replace(/{{IMG_BASE}}/g, IMAGE_BASE_URL)
          .replace(/{{TS}}/g, ts);
        const blob = new Blob([xml], { type: "text/xml" });
        const xmlURL = URL.createObjectURL(blob);
        // console.log("XML URL:", xmlURL);
        window.embedpano({
          target: krpanoRef.current,
          xml: xmlURL,
          html5: "only",
          onready: (krpano) => {
            console.log("krpano is ready");
            krpano.actions.loadscene("myScene");
          }
        });
      });
  }, [krpanoLoaded]);

  return <div ref={krpanoRef} style={{ width: "100vw", height: "100vh", position: "absolute", top: 0, left: 0 }} />;

};

export default App;
