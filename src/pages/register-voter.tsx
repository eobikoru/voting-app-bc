import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constant/constant";
import { formatAddress } from "../lib/FormatAddress";
import { message} from "antd";
const RegisterVoter = () => {
  const account = useAccount();
  const { writeContract, error:errorOne, isError, isPending ,isSuccess} = useWriteContract();
  const [voterAddress, setVoterAddress] = useState<string>("");
  const [voterName, setVoterName] = useState<string>("");
  const [voterAge, setVoterAge] = useState<string>("");
  useEffect(() => {
    if(isSuccess){
      message.success({ 
        content: "Voter has been successfully registered.",
        duration: 3,
      });
    setVoterName("")
    setVoterAddress("")
    setVoterAge("")
    }
  
  },[isSuccess])
  useEffect(() => {
    if (isError) {
      if (errorOne?.message.includes("Voter is already registered")) {
        message.error({
         
          content: "Voter is already registered.",
          duration: 3,
        });
      } else if (errorOne?.message.includes("Voter must be at least 18 years old")) {
        message.error({
         
          content: "Voter must be at least 18 years old.",
          duration: 4,
        });
      } else if (errorOne?.message.includes("Only registered voters can perform this action")) {
        message.error({
         
          content: "Only registered voters can perform this action.",
          duration: 4,
        });
      } else if (errorOne?.message.includes("Only admin can perform this action")) {
        message.error({
         
          content: "Only admin can perform this action.",
          duration: 4,
        });
      }
    }
  }, [isError, errorOne]);
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
  const handleRegisterVoter = () => {
   
      const result = writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "registerVoter",
        args: [voterAddress, voterName, parseInt(voterAge)],
      });

     
   
      // If an error occurs during the contract call
     
  
  };

  // Check if all fields are empty and disable the button accordingly
  const isButtonDisabled = !voterAddress || !voterName || !voterAge;

  return (
    <section>
      <div className="h-[100vh] my-20 font-raleway">
        <div className="h-[100%] flex">
          <div className="flex-1">
            <div className="bg-black h-80 w-[85%] mx-auto mt-10 rounded-xl">
              <div className="h-80 flex justify-center flex-col w-[90%] mx-auto">
                <div className="bg-[#4f015b] h-10 text-white flex items-center justify-center">
                  <p>Create Candidate For Voting</p>
                </div>
                <div className="text-white my-7">
                  <p>
                    Blockchain voting organization, providing Ethereum
                    blockchain ecosystem.
                  </p>
                </div>
                <div className="bg-[#4f015b] h-10 text-white flex items-center justify-center">
                  <p>Create Candidate For Voting</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-[2]">
            <div className="bg-black text-white h-[70%] justify-center flex flex-col items-center w-[85%] mx-auto mt-10 rounded-xl">
              <div>
                <h1 className="text-[1.8rem] py-7">Register New Candidate</h1>
              </div>
              <div className="w-[80%] mx-auto">
                <label
                  htmlFor="input-voter-address"
                  className="block text-sm font-medium mb-3 dark:text-white"
                >
                  Voter Address:
                </label>
                <input
                  type="text"
                  id="input-voter-address"
                  className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm bg-black text-white"
                  placeholder="voter address"
                  value={voterAddress}
                  onChange={handleVoterAddressChange}
                />

                <label
                  htmlFor="input-voter-name"
                  className="block text-sm mt-3 font-medium mb-2 dark:text-white"
                >
                  Voter Name:
                </label>
                <input
                  type="text"
                  id="input-voter-name"
                  className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm bg-black text-white"
                  placeholder="voter name"
                  value={voterName}
                  onChange={handleVoterNameChange}
                />

                <label
                  htmlFor="input-voter-age"
                  className="block text-sm font-medium mb-2 mt-3 dark:text-white"
                >
                  Voter Age:
                </label>
                <input
                  type="text"
                  id="input-voter-age"
                  className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm bg-black text-white"
                  placeholder="voter age"
                  value={voterAge}
                  onChange={handleVoterAgeChange}
                />

                <button
                  className={`bg-[#4f015b] text-white font-semibold py-2 px-3 w-full my-6 rounded ${
                    isButtonDisabled  || isPending
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={handleRegisterVoter}
                  disabled={isButtonDisabled || isPending  } // Disable button if any field is empty
                >
               {isPending ? "Registering......" : "Register Voter"}  
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-black h-80 w-[85%] mx-auto mt-10 rounded-xl">
              <div className="text-white h-80 flex pt-6 flex-col w-[90%] mx-auto">
                <p className="text-white mb-2">Notice</p>
                <p>
                  Organizer:{" "}
                  {account?.address
                    ? `${formatAddress(account?.address)}`
                    : "Address not available"}
                </p>

                <p className="mt-6">
                  Only the organizer of the voting contract can create voter and
                  candidate for voting election
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterVoter;
