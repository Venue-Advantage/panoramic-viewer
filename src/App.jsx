import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import KrpanoImg from './assets/krpano-img.png';
import Front from './assets/6-set-img-krpano/front.png';
import Back from './assets/6-set-img-krpano/back.png';
import Left from './assets/6-set-img-krpano/left.png';
import Right from './assets/6-set-img-krpano/right.png';
import Top from './assets/6-set-img-krpano/top.png';
import Bottom from './assets/6-set-img-krpano/bottom.png';
import './App.css'
import PanoramaViewer from './components/PanoramaViewer';

function App() {
  const [view, setView] = useState("cube")
  const [imageFile, setImageFile] = useState(KrpanoImg);
  const cubeImages = [
    Back,
    Front,
    Top,
    Bottom,
    Left,
    Right
  ];
  return (
    <>
      {/* <div>
        <div>  
          <img src={viteLogo} className="logo" alt="Vite logo" />
           <img src={reactLogo} className="logo react" alt="React logo" />
        </div>
        <div>
          <a onClick={() => setView("sphere")}> Sphere </a>
          <a onClick={() => setView("cube")}> Cube </a>
        </div>
      </div>
      <div>
        Upload your 360 image
        <input type="file" accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
              const imageUrl = event.target.result;
              setImageFile(imageUrl);
            };
            reader.readAsDataURL(file);
          }
          } />
      </div> */}

      <div style={{ width: "100vw", height: "100vh" }}>
        <PanoramaViewer imageUrl={imageFile} view={view} imageSet={cubeImages} />
      </div>
    </>
  )
}

export default App
