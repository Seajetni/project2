
import  axios  from 'axios';
import { useEffect, useState } from 'react';

const Menu1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chackRelay1, setChackRelay1] = useState()
  const [chackRelay2, setChackRelay2] = useState()
  const [chackRelay3, setChackRelay3] = useState()
  const [chackRelay4, setChackRelay4] = useState()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  async function handleOpenRelay1() {
  
    fetch(`https://sgp1.blynk.cloud/external/api/update?token=pwo5wVawia3Th0zu61Uw56n69RxUjUt9&v3=1`)
    await axios.put("https://api-kup.vercel.app/api/product/656f15639a600df3ec30edf6", {"description" : "ON"})
      .then(response => {
        
      })
      .catch(error => {
        
        console.error('Error sending request:', error);
      });
  }
  
  async function handleOFFRelay1() {
    
    fetch('https://sgp1.blynk.cloud/external/api/update?token=pwo5wVawia3Th0zu61Uw56n69RxUjUt9&v3=0')
    await axios.put("https://api-kup.vercel.app/api/product/656f15639a600df3ec30edf6", {"description" : "OFF"})
      .then(response => {
        
      })
      .catch(error => {
        
        console.error('Error sending request:', error);
      });
  }
  
  async function handleOpenRelay2() {
  
    fetch(`https://sgp1.blynk.cloud/external/api/update?token=pwo5wVawia3Th0zu61Uw56n69RxUjUt9&v4=1`)
    await axios.put("https://api-kup.vercel.app/api/product/656f18a89a600df3ec30edf7", {"description" : "ON"})
      .then(response => {
        
      })
      .catch(error => {
        
        console.error('Error sending request:', error);
      });
  }
  
  async function handleOFFRelay2() {
    
    fetch('https://sgp1.blynk.cloud/external/api/update?token=pwo5wVawia3Th0zu61Uw56n69RxUjUt9&v4=0')
    await axios.put("https://api-kup.vercel.app/api/product/656f18a89a600df3ec30edf7", {"description" : "OFF"})
      .then(response => {
        
      })
      .catch(error => {
        
        console.error('Error sending request:', error);
      });
  }

  async function handleOpenRelay3() {
  
    fetch(`https://sgp1.blynk.cloud/external/api/update?token=pwo5wVawia3Th0zu61Uw56n69RxUjUt9&v5=1`)
    await axios.put("https://api-kup.vercel.app/api/product/656f18d69a600df3ec30edf8", {"description" : "ON"})
      .then(response => {
        
      })
      .catch(error => {
        
        console.error('Error sending request:', error);
      });
  }
  
  async function handleOFFRelay3() {
    
    fetch('https://sgp1.blynk.cloud/external/api/update?token=pwo5wVawia3Th0zu61Uw56n69RxUjUt9&v5=0')
    await axios.put("https://api-kup.vercel.app/api/product/656f18d69a600df3ec30edf8", {"description" : "OFF"})
      .then(response => {
        
      })
      .catch(error => {
        
        console.error('Error sending request:', error);
      });
  }

  async function handleOpenRelay4() {
  
     fetch(`https://sgp1.blynk.cloud/external/api/update?token=pwo5wVawia3Th0zu61Uw56n69RxUjUt9&v6=1`)
    await axios.put("https://api-kup.vercel.app/api/product/656f18ee9a600df3ec30edf9", {"description" : "ON"})
      .then(response => {
        
      })
      .catch(error => {
        
        console.error('Error sending request:', error);
      });
  }
  
 async function handleOFFRelay4() {
    
    fetch('https://sgp1.blynk.cloud/external/api/update?token=pwo5wVawia3Th0zu61Uw56n69RxUjUt9&v6=0')
    await axios.put("https://api-kup.vercel.app/api/product/656f18ee9a600df3ec30edf9", {"description" : "OFF"})
      .then(response => {
        
      })
      .catch(error => {
        
        console.error('Error sending request:', error);
      });
  }


  useEffect(() => {
    const relay1Status = async () => {
      try {
        const res = await fetch('https://api-kup.vercel.app/api/product/656f15639a600df3ec30edf6');
        const data = await res.json();
        const status = data.data.description
        setChackRelay1(status)
      } catch (error) {
        console.error('Error fetching pH data:', error);
      }
    };
    const intervalId = setInterval(relay1Status, 1000);
  
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const relay2Status = async () => {
      try {
        const res = await fetch('https://api-kup.vercel.app/api/product/656f18a89a600df3ec30edf7');
        const data = await res.json();
        const status = data.data.description
        setChackRelay2(status)
      } catch (error) {
        console.error('Error fetching pH data:', error);
      }
    };
    const intervalId = setInterval(relay2Status, 1000);
  
    return () => clearInterval(intervalId);
  }, []); 

  useEffect(() => {
    const relay3Status = async () => {
      try {
        const res = await fetch('https://api-kup.vercel.app/api/product/656f18d69a600df3ec30edf8');
        const data = await res.json();
        const status = data.data.description
        setChackRelay3(status)
      } catch (error) {
        console.error('Error fetching pH data:', error);
      }
    };
    const intervalId = setInterval(relay3Status, 1000);
  
    return () => clearInterval(intervalId);
  }, []); 

  useEffect(() => {
    const relay4Status = async () => {
      try {
        const res = await fetch('https://api-kup.vercel.app/api/product/656f18ee9a600df3ec30edf9');
        const data = await res.json();
        const status = data.data.description
        setChackRelay4(status)
      } catch (error) {
        console.error('Error fetching pH data:', error);
      }
    };
    const intervalId = setInterval(relay4Status, 1000);
  
    return () => clearInterval(intervalId);
  }, []); 


  
  return (
    <div className="relative pointer-events-auto">
    <button
      onClick={toggleMenu}
      className="block pointer-events-auto  text-gray-500 focus:outline-none "
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>

    </button>

    <div
      className={`absolute   bottom-10  right-0 w-96 bg-white  rounded-3xl mt-16  ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      
      <div  className="py-2 px-4  text-black flex justify-center">
        <div className='flex'>
        <label htmlFor="">Status</label>
        <p className=' bg-yellow-400 rounded-2xl px-2'>{chackRelay1}</p>
        <label htmlFor="relay1" className=" mr-2">Relay1</label>
        </div>
        <button className=" bg-blue-500 rounded-3xl px-2 text-lg" onClick={handleOpenRelay1}>ON</button>
        <button className=" bg-red-500 rounded-3xl px-2 text-lg" onClick={handleOFFRelay1}>OFF</button>
      </div>

      <div  className="py-2 px-4  text-black flex justify-center">
        <div className='flex'>
        <label htmlFor="">Status</label>
        <p className=' bg-yellow-400 rounded-2xl px-2'>{chackRelay2}</p>
        <label htmlFor="relay2" className=" mr-2">Relay2</label>
        </div>
        <button className=" bg-blue-500 rounded-3xl px-2 text-lg" onClick={handleOpenRelay2}>ON</button>
        <button className=" bg-red-500 rounded-3xl px-2 text-lg" onClick={handleOFFRelay2}>OFF</button>
      </div>

      <div  className="py-2 px-4  text-black flex justify-center">
        <div className='flex'>
        <label htmlFor="">Status</label>
        <p className=' bg-yellow-400 rounded-2xl px-2'>{chackRelay3}</p>
        <label htmlFor="relay3" className=" mr-2">Relay3</label>
        </div>
        <button className=" bg-blue-500 rounded-3xl px-2 text-lg" onClick={handleOpenRelay3}>ON</button>
        <button className=" bg-red-500 rounded-3xl px-2 text-lg" onClick={handleOFFRelay3}>OFF</button>
      </div>

      <div  className="py-2 px-4  text-black flex justify-center">
        <div className='flex'>
        <label htmlFor="">Status</label>
        <p className=' bg-yellow-400 rounded-2xl px-2'>{chackRelay4}</p>
        <label htmlFor="relay4" className=" mr-2">Relay4</label>
        </div>
        <button className=" bg-blue-500 rounded-3xl px-2 text-lg" onClick={handleOpenRelay4}>ON</button>
        <button className=" bg-red-500 rounded-3xl px-2 text-lg" onClick={handleOFFRelay4}>OFF</button>
      </div>
    </div>
  </div>
  );
};

export default Menu1;
