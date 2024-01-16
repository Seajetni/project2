
import  axios  from 'axios';
import { useEffect, useState } from 'react';

const Menu2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [slope, setSlope] = useState()
  const [offset, setOffset] = useState()
  const [valueSlope, setValueSlope] = useState()
  const [valueOffset, setValueOffset] = useState()
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    const relayStatus = async () => {
      try {
        const res =  await axios.get("https://api-kup.vercel.app/api/product/6551a3d4bd6eeffe50f8d24f")
        const data = res.data.data

        setValueSlope(data.slope)
        setValueOffset(data.offset)
        
      } catch (error) {
        console.error('Error fetching pH data:', error);
      }
    };
    const intervalId = setInterval(relayStatus, 1000);
  
    return () => clearInterval(intervalId);
  }, []);


  
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Your Axios PUT request code here
    const apiUrl = 'https://api-kup.vercel.app/api/product/6551a3d4bd6eeffe50f8d24f';
    const updatedData = { slope, offset };

    axios.put(apiUrl, updatedData)
      .then(response => {
        console.log('Update successful:', response.data);
      })
      .catch(error => {
        console.error('Error updating data:', error.message);
      });
  };
  



  
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
   <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
      <label htmlFor="slope" className="text-blue-500 mb-2">Slope ค่าตอนนี้ {valueSlope}</label>
      <input
        className="border-2 border-blue-300 px-3 py-2 mb-4 rounded-lg focus:outline-none focus:border-blue-500"
        type="text"
        value={slope}
        onChange={(e) => setSlope(e.target.value)}
        placeholder='ใส่ค่าใหม่'
      />
      <label htmlFor="offset" className="text-green-500 mb-2">Offset ค่าตอนนี้ {valueOffset}</label>
      <input
        className="border-2 border-green-300 px-3 py-2 mb-4 rounded-lg focus:outline-none focus:border-green-500"
        type="text"
        value={offset}
        onChange={(e) => setOffset(e.target.value)}
        placeholder='ใส่ค่าใหม่'
      />
      <button type='submit' className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Save</button>
    </form>
  </div>
  </div>
  
  );
};

export default Menu2;
