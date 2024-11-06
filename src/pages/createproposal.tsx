import React from "react";
import Notification from '../components/Notification';
import { useAccount } from 'wagmi'
const createproposal = () => {
  const account = useAccount()
  console.log(account.address,"acct");
  
  if(account.address === undefined){
    return (
      <Notification/>
    )
  }
  return (


<section>
<div className="h-[100vh] font-raleway">
  <div className=" h-[100%] flex">
    <div className=" flex-1">
      <div className=" bg-black h-80 w-[85%] mx-auto mt-10 rounded-xl">
      <div className=" h-80 flex justify-center flex-col w-[90%] mx-auto ">
      <div className="bg-[#4f015b] h-10 text-white flex items-center justify-center">
        <p >Create Proposal For Voting </p>
      </div>
      <div className=" text-white my-7">
      <p >Blockchain voting organization , provide ethereum blockchain eco system. </p>
      </div>
      <div className="bg-[#4f015b] h-10 text-white flex items-center justify-center">
        <p >Create Proposal For Voting </p>
      </div>
      </div>
      </div>
    </div>
    <div className=" flex-[2]">
    <div className=" bg-black  text-white h-[70%] justify-center flex flex-col items-center w-[95%] mx-auto mt-10 rounded-xl">
    
  <div className=" w-[80%]"> 
  <h1 className="text-3xl text-center text-white my-10 font-bold">
        Create proposal
      </h1>
      <div className="flex justify-center items-center ">
        <textarea
          name="proposal"
          id="text"
          className="bg-white border-0  p-4 rounded h-64 shadow-sm w-full  resize-none"
          placeholder="Enter your proposal here..."
          ></textarea>

      </div>
      <div className="flex justify-center items-center ">
  <button 
    className="bg-[#4f015b] text-white font-semibold my-8 rounded p-2 w-1/3 max-w-2xl"
    >
    Create Proposal
  </button>


  </div>
      

    </div>
   </div>
    </div>
    <div className=" flex-1">
    <div className=" bg-black h-80 w-[85%] mx-auto mt-10 rounded-xl">
    <div className=" text-white h-80 flex pt-6 flex-col w-[90%] mx-auto ">
     <p className="text-white mb-2">Notice</p>
     <p>Organizer: {account?.address ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}` : "Address not available"}</p>
     <p className="mt-6">Only organizer of the voting contract can create a proposal  for voting election</p>

     
     </div>
    </div>
    </div>
  </div>
</div>



   
    </section>
  );
};

export default createproposal;
