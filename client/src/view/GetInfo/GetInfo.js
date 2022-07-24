import React, {useState} from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios';


function GetInfo() {

 

  const [userName,setUserName] = useState("");
  const [userEmail,setUserEmail] = useState("");
  const [userWebsite,setUserWebsite] = useState("");
  const [userImage,setUserImage] = useState(null);

  
  
  const submitData = async (events) => {
    events.preventDefault();

    const fd=new FormData();
    fd.append("name",userName)
    fd.append("email",userEmail)
    fd.append("website",userWebsite)
    fd.append("userImage",userImage)

    const data = await axios.post("https://hackineuron.herokuapp.com/api/users",fd);
    console.log(data)

    console.log(" info "+userName);
    console.log(" info "+userEmail);
    console.log(" info "+userWebsite);
  }

  

  return (
    <div style={{ backgroundImage: `url("https://images.unsplash.com/photo-1642104704074-907c0698cbd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80")` }} className='h-screen bg-cover' >
      <Navbar />

      <div className='w-6/12 mx-auto bg-none p-16 backdrop-blur-sm h-fit my-auto rounded-lg ' >


        <form   >
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="example@email.com" required=""  onChange={e => setUserEmail(e.target.value)} />
          </div>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
            <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" placeholder="Name"  onChange={e => setUserName(e.target.value)} />
          </div>
          <div className="mb-6">
            <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Website</label>
            <input type="text" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" placeholder="Website"  onChange={e => setUserWebsite(e.target.value)} />
          </div>


          <label className="block  mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="file_input">Upload file</label>
          <input className="block w-full p-1 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer  focus:outline-none mb-3" aria-describedby="file_input_help" id="file_input" type="file"
          onChange={e => setUserImage(e.target.files[0])}


          />



          <button onClick={submitData}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>


      </div>

      {/* <Footer /> */}
    </div>
  )
}

export default GetInfo