
import React, { useState, useEffect } from "react";
import { useAccount } from 'wagmi';
import { useWriteContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constant/constant";


const RegisterVoter = () => {
  const account = useAccount();
  const { writeContract } = useWriteContract();
  const [voterAddress, setVoterAddress] = useState<string>('');
  const [voterName, setVoterName] = useState<string>('');
  const [voterAge, setVoterAge] = useState<string>('');

  // Handle input changes
  const handleVoterAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoterAddress(e.target.value);
  };

  const handleVoterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoterName(e.target.value);
  };

  const handleVoterAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoterAge(e.target.value);
  };

  // Handle registration logic and display success or error messages
  const handleRegisterVoter = async () => {
    try {
      console.log('Voter Registered:', { voterAddress, voterName, voterAge });
      
      const result = await writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: 'registerVoter',
        args: [voterAddress, voterName, parseInt(voterAge)],
      });
       console.log(result)
      // If the contract call is successful
     
    } catch (error) {
      // If an error occurs during the contract call
    
      console.error(error);
    }
  };

  // Check if all fields are empty and disable the button accordingly
  const isButtonDisabled = !voterAddress || !voterName || !voterAge;


const registervoter = () => {
  return (
    <section>
<div className="h-[100vh] font-raleway">
  <div className=" h-[100%] flex">
    <div className=" flex-1">
      <div className=" bg-black h-80 w-[85%] mx-auto mt-10 rounded-xl">
      <div className=" h-80 flex justify-center flex-col w-[90%] mx-auto ">
      <div className="bg-[#4f015b] h-10 text-white flex items-center justify-center">
        <p >Creat Candidate For Voting </p>
      </div>
      <div className=" text-white my-7">
      <p >Blockchain voting organization , provide ethereum blockchain eco system. </p>
      </div>
      <div className="bg-[#4f015b] h-10 text-white flex items-center justify-center">
        <p >Creat Candidate For Voting </p>
      </div>
      </div>
      </div>
    </div>
    <div className=" flex-[2]">
    <div className=" bg-black text-white h-[70%] justify-center flex flex-col items-center w-[85%] mx-auto mt-10 rounded-xl">
      <div>

      <h1 className="text-[1.8rem] py-7 ">Register New Candidate</h1>
      </div>
      <div className="w-[80%] mx-auto ">
          <label
            htmlFor="input-label"
            className="block text-sm font-medium mb-3  dark:text-white"
          >
            Voter Address:
          </label>
          <input
            type="text"
            id="input-label"
            className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="voter address"
          />

          <label
            htmlFor="input-label"
            className="block text-sm mt-3 font-medium mb-2 dark:text-white"
          >
            Voter Name:
          </label>
          <input
            type="text"
            id="input-label"
            className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="voter name"
          />

          <label
            htmlFor="input-label"
            className="block text-sm font-medium mb-2 mt-3 dark:text-white"
          >
            Voter Age:
          </label>
          <input
            type="email"
            id="input-label"
            className="py-2 px-3  block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="voter age"
          />
          <button className="bg-[#4f015b] text-white font-semibold py-2 px-3  w-full my-6 rounded">
            Register Voter
          </button>
        </div>
   </div>
    </div>
    <div className=" flex-1">
    <div className=" bg-black h-80 w-[85%] mx-auto mt-10 rounded-xl">
    <div className=" text-white h-80 flex pt-6 flex-col w-[90%] mx-auto ">
     <p className="text-white mb-2">Notice</p>
     <p>Organizer: 0xliiut87tf.....</p>
     <p className="mt-6">Only organizer of the voting contract can create voter and candidate for voting election</p>

     
     </div>
    </div>
    </div>
  </div>
</div>


    </section>
  );
};

export default registervoter;
