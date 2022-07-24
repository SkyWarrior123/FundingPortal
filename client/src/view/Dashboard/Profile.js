import React, { useState, useEffect } from "react";
import { FaWallet } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import src from '../../assets/img/avatar4.jpg'
import UserTable from './UserTable'
import CreatorTable from './CreatorTable'
import { NavLink } from "react-router-dom";
import { ethers } from "ethers";


export default function Profile() {

  const [creator, setCreator] = useState(1);

  const [userInfo, setUserInfo] = useState(1);

  const makeCreator = () => {
    setCreator(!creator);
  }

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [userBalance, setUserBalance] = useState(null);



  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log('MetaMask Here!');

      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          accountChangedHandler(result[0]);
          setConnButtonText('Wallet Connected');
          getAccountBalance(result[0]);
        })
        .catch(error => {
          setErrorMessage(error.message);

        });

    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  }

  const getAccountBalance = (account) => {
    window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then(balance => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
}

  useEffect(() => {

    connectWalletHandler();


  }, [])

  return (
    <>
      <Navbar />
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80')"
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-gray-300">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={src}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                        style={{ maxWidth: "150px" }}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        onClick={makeCreator}
                        className={`${creator ? "text-red-600 bg-white border-2 border-red-500 active:bg-white " : "text-white bg-red-500 active:bg-red-600"}  uppercase   hover:shadow-md shadow  px-4 py-2  rounded-xl outline-none focus:outline-none sm:mr-2 mb-1`}
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        Creator Mode : <span className={`font-bold`} > {creator ? "ON" : "OFF"} </span>
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {userBalance}
                        </span>
                        <span className="text-sm text-gray-500">Ether Balance</span>
                      </div>

                      

                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 ">
                    Name
                  </h3>
                 
                  <div className="mb-2 text-gray-700 mt-10">
                    {/* <i className=" mr-2 text-lg text-gray-500"></i> */}
                    <FaWallet className='inline' />
                    <span className="px-3" >
                      Wallet Address : {defaultAccount}
                    </span>
                  </div>
                  <NavLink to="/getinfo" >
                    <div className=" cursor-pointer mb-2 font-bold text-blue-600">
                      <FiEdit className="inline text-black " />
                      <span className="ml-1" > Edit info </span>
                    </div>
                  </NavLink>
                </div>
                <div className="flex flex-wrap">
                  {
                    creator ? (<div className="mt-10 mx-auto py-10 border-t w-fit border-gray-300 text-center">

                      {userInfo ? <CreatorTable /> : "Enter your Details by editing info"}

                    </div>) : ""
                  }
                  <div className="mt-10 mx-auto py-10 border-t w-fit border-gray-300 text-center">

                    <UserTable />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}