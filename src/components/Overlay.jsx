
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

import  axios  from 'axios';
import MenuPump from "./MenuPump";
import MenuPH from "./MenuPH";
import MenuESP32 from "./MenuESP32";


export const slideAtom = atom(0);


export const Overlay = () => {
  const [slide, setSlide] = useAtom(slideAtom);
  const [displaySlide, setDisplaySlide] = useState(slide);
  const [visible, setVisible] = useState(false);
  const [espStatus, setEspStatus] = useState("")
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
    const NewValue = async () => {
      try {
        const res = await fetch('https://blynk.cloud/external/api/get?token=pwo5wVawia3Th0zu61Uw56n69RxUjUt9&v1');
        const data = await res.json();
        const newPH = parseFloat(data).toFixed(2);
        setPH(newPH);
        
      } catch (error) {
        console.error('Error fetching pH data:', error);
      }
    };

    const intervalId = setInterval(NewValue, 1000);

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
      path: "models/pH.glb",
      mainColor: "#ffdec0",
      name: "pH",
      description: "ค่า pH ของน้ำ",
      price: "Value",
      range: pH, 
    },
    {
      path: "models/pump.glb",
      mainColor: "#f9c0ff",
      name: "Water pump & Fertilizer Valve",
      description: "ปั้มน้ำ",
      price: "Status",
      status: "Oky"
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


const [statusRelay, setStatusRelay] = useState(false)



useEffect(() => {
  const pumpStatus = () => {
    if(displaySlide === 2){
      setStatusRelay(true)
    }else{
      setStatusRelay(false)
    }
  }
 
  const intervalId = setInterval(pumpStatus, 1000);

  return () => clearInterval(intervalId);
}, [displaySlide]); // Adding 'count' as a dependency


const [statusPH, setStatusPH] = useState(false)



useEffect(() => {
  const pHStatus = () => {
    if(displaySlide === 1){
      setStatusPH(true)
    }else{
      setStatusPH(false)
    }
  }
 
  const intervalId = setInterval(pHStatus, 1000);

  return () => clearInterval(intervalId);
}, [displaySlide]); // Adding 'count' as a dependency

const [statusESP, setStatusESP] = useState(false)



useEffect(() => {
  const ESPStatus = () => {
    if(displaySlide === 0){
      setStatusESP(true)
    }else{
      setStatusESP(false)
    }
  }
 
  const intervalId = setInterval(ESPStatus, 1000);

  return () => clearInterval(intervalId);
}, [displaySlide]); // Adding 'count' as a dependency
 
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
           <p>Smart Hydroponic</p>
            
           
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
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
</svg>


                <p className="font-semibold text-3xl">
                  {scenes[displaySlide].price.toLocaleString()}
                </p>
              </div>
              <p className="text-sm opacity-80">สถานะตอนนี้</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
</svg>

                <p className="font-semibold text-3xl ">
                  {scenes[displaySlide].range}
                </p>
                <div >
                    {statusRelay ? (
                      <MenuPump/>
                   ) : (
                      <div></div>
                  )}
                </div>
                <div >
                    {statusPH ? (
                      <MenuPH/>
                   ) : (
                      <div></div>
                  )}
                </div>
                <div >
                    {statusESP ? (
                      <MenuESP32/>
                   ) : (
                      <div></div>
                  )}
                </div>
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
