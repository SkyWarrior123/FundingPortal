import React, { useState, useEffect } from 'react'
import metamaskIcons from '../../assets/img/metamask.png'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { NavLink } from 'react-router-dom'





function HeroLogin() {

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');

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

    // update account, will cause component re-render
    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getAccountBalance(newAccount.toString());
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

    const chainChangedHandler = () => {
        // reload the page to avoid any errors with chain change mid use of application
        window.location.reload();
    }

    window.ethereum.on('accountsChanged', accountChangedHandler);
	window.ethereum.on('chainChanged', chainChangedHandler);
    return (
        <>
                    <NavLink to="/dashboard" 
                        onClick={connectWalletHandler} 
                        className=" cursor-pointer flex justify-center mt-8 space-x-3">
                        <div className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-orange-500 border border-transparent rounded-md shadow hover:bg-orange-700"> <span> <img className='w-10 pr-3' src={metamaskIcons} alt="" /> </span>
                            Connect to Metamask 
                        </div>

                    </NavLink>
        </>
    )
}

export default HeroLogin