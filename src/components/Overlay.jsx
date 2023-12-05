import { Axios } from "axios";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import Menu1 from "./Menu1";



export const slideAtom = atom(0);


export const Overlay = () => {
  const [slide, setSlide] = useAtom(slideAtom);
  const [displaySlide, setDisplaySlide] = useState(slide);
  const [visible, setVisible] = useState(false);
  const [espStatus, setEspStatus] = useState("")
  const [pumpWater, setPumpWater] = useState("ON")
  const [pH, setPH] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 1000);
  }, []);

  useEffect(() => {
    setVisible(false);
    setTimeout(() => {
      setDisplaySlide(slide);
      setVisible(true);
    }, 2600);
  }, [slide]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://blynk.cloud/external/api/get?token=pwo5wVawia3Th0zu61Uw56n69RxUjUt9&v1');
        const data = await res.json();
        const newPH = parseFloat(data).toFixed(2);
        setPH(newPH);
        
      } catch (error) {
        console.error('Error fetching pH data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId); 
  }, []); 

  
   const scenes = [
    {
      path: "models/esp32.glb",
      mainColor: "#c0ffe1",
      name: "ESP32",
      description: "บอร์ด ESP32",
      price: "Status",
      range: espStatus,
    },
    {
      path: "models/pump.glb",
      mainColor: "#f9c0ff",
      name: "Water pump & Fertilizer Valve",
      description: "ปั้มน้ำ",
      price: "Status",
      range: pumpWater,
      oN: "TurnON",
      Off: "TurnOFF",
    },
    {
      path: "models/pH.glb",
      mainColor: "#ffdec0",
      name: "pH",
      description: "ค่า pH ของน้ำ",
      price: "Value",
      range: pH, 
    },
  ];

  useEffect(() => {
  const espStatus = async () => {
    try {
      const res = await fetch('https://blynk.cloud/external/api/isHardwareConnected?token=pwo5wVawia3Th0zu61Uw56n69RxUjUt9');
      const data = await res.json();
      const newStatus = data
      if(newStatus === false){
        setEspStatus("OFF")
        
      }else if(newStatus === true){
        setEspStatus("ON")
        
        
      }
    } catch (error) {
      console.error('Error fetching pH data:', error);
    }
  };
  const intervalId = setInterval(espStatus, 1000);

  return () => clearInterval(intervalId);
}, []); 






  return (
    <>
      <div
        className={`fixed z-10 top-0 left-0 bottom-0 right-0 flex flex-col justify-between pointer-events-none text-black ${
          visible ? "" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <div
          className="w-50 mx-auto mt-8 text-3xl font-bold pointer-events-auto "
        >
           <p>Hydroponic Farm</p>
            
           
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 flex-1 flex items-center justify-between p-4">
          <svg
            onClick={() =>
              setSlide((prev) => (prev > 0 ? prev - 1 : scenes.length - 1))
            }
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer"
            onClick={() =>
              setSlide((prev) => (prev < scenes.length - 1 ? prev + 1 : 0))
            }
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </div>
        <div className="bg-gradient-to-t from-white/90 pt-20 pb-10 p-4 flex items-center flex-col text-center">
          <h1 className="text-5xl font-extrabold">
            {scenes[displaySlide].name}
          </h1>
          <p className="text-opacity-60 italic">
            {scenes[displaySlide].description}
          </p>
          <div className="flex items-center gap-12 mt-10">
            <div className="flex flex-col items-center">
              <div className="flex gap-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
</svg>

                <p className="font-semibold text-3xl">
                  {scenes[displaySlide].price.toLocaleString()}
                </p>
              </div>
              <p className="text-sm opacity-80">สถานะตอนนี้</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"

                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z"
                  />
                </svg>
                <p className="font-semibold text-3xl ">
                  {scenes[displaySlide].range}
                </p>
                <Menu1/>
              </div>
              <div>
                </div>
              <p className="text-sm opacity-80"></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
