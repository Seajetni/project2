
import  axios  from 'axios';
import { useEffect, useState } from 'react';

const MenuESP32 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [statusESP32, setStatusESP32] = useState()


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  async function handleReset() {
  
    fetch(`https://sgp1.blynk.cloud/external/api/update?token=pwo5wVawia3Th0zu61Uw56n69RxUjUt9&v7=1`)
    
      .then(response => {
        fetch(`https://sgp1.blynk.cloud/external/api/update?token=pwo5wVawia3Th0zu61Uw56n69RxUjUt9&v7=0`)
      })
      .catch(error => {
        
        console.error('Error sending request:', error);
      });
  }

  
 
  



  
  return (
    <div className="relative pointer-events-auto">
    <button
      onClick={toggleMenu}
      className="block pointer-events-auto  text-gray-500 focus:outline-none "
    >
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
</svg>


    </button>

    <div
      className={`absolute    bottom-10  right-0 w-96 bg-white  rounded-3xl mt-16  ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
        <button onClick={handleReset} className=' rounded-3xl bg-yellow-200 p-2'>Reset</button>
  </div>
  </div>
  
  );
};

export default MenuESP32;
