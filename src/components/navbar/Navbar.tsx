import React, { useState, useEffect } from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useAccount } from 'wagmi'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const account = useAccount()
  console.log(account.address,"acct");
  
  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (!event.target.closest('#dropdown')) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className='font-raleway'>
      <nav className="flex justify-between h-[5rem] items-center py-2 px-4 bg-black">
        <Link
          href="/"
          className="text-3xl font-bold text-white hover:text-gray-800 focus:outline-none dark:text-gray-200"
        >
          Chain Masters
        </Link>
  {
   account.address && (
      <>
      
       <div className="relative" id="dropdown">
          <button 
            onClick={toggleDropdown} 
            className="flex  py-2 px-3 items-center gap-x-2 text-sm font-bold text-black-600 border border-gray-400 bg-white rounded-xl p-1 px-2 hover:bg-gray-100 focus:outline-none dark:text-blue-500 dark:hover:bg-gray-700"
          >
            Features
            <svg className="transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white shadow-md rounded-lg">
              <div className="p-1 space-y-0.5">
                <Link href="/" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700" onClick={closeDropdown}>
                  Home
                </Link>
                <Link href="/registervoter" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700" onClick={closeDropdown}>
                  Register a voter
                </Link>
                <Link href="/createproposal" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700" onClick={closeDropdown}>
                  Create Proposal
                </Link>
                <Link href="/listofproposal" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700" onClick={closeDropdown}>
                 List of Proposal
                </Link>

                <Link href="/listofvoters" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700" onClick={closeDropdown}>
                 List of Voters
                </Link>
                <Link href="/viewwinner" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700" onClick={closeDropdown}>
                  View Winner
                </Link>
              </div>
            </div>
          )}
        </div>
      </>
    )
  }
       

        <ConnectButton />
      </nav>
    </section>
  );
};

export default Navbar;
