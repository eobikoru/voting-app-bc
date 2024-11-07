import React, { useState } from 'react'
import { runFireworks } from '../lib/utils';
import Notification from '../components/Notification';
import { useAccount } from 'wagmi'



const viewwinner = () => {
  const[isVisible, setIsVisible] = useState(false);

  const toggleList = () => {
    setIsVisible(!isVisible);
    runFireworks();
  } 
  const account = useAccount()
  console.log(account.address,"acct");
  
  if(account.address === undefined){
    return (
      <Notification/>
    )
  }
    
  return (
    <div className=''>
      <div className='bg-black flex-col flex items-center gap-5 w-[40vw] rounded-xl p-14 m-auto mt-40 font-raleway'>
         <h1 className='text-4xl font-bold text-white'>Winning proposal</h1>
         <button onClick={toggleList} className='bg-purple-800 rounded-sm p-2 w-32 text-sm  text-white text-center'>{isVisible ? 'Hide Details' : 'View Proposal'}</button>
         <div className={`flex flex-col gap-6 w-72 items-center bg-black text-white  text-3xl border border-violet-400 rounded-xl p-5 mt-12 ${isVisible ? 'flex' : 'hidden'} `}>
           <p>Description: </p>
           <p>Vote Count: </p>
           <p>Creator: </p>
         </div>

      </div>
      
     
    </div>
  )
}

export default viewwinner
