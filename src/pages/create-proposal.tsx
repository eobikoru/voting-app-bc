import React, { useState , useEffect} from "react";
import Notification from "../components/Notification";
import { useAccount } from "wagmi";
import { useWriteContract } from "wagmi";
import { formatAddress } from "../lib/FormatAddress";
import { message} from "antd";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constant/constant";

const CreateProposal = () => {
  const account = useAccount();
  const { writeContract, error:errorOne, isError, isPending ,isSuccess} = useWriteContract();
  const [proposalTitle, setProposalTitle] = useState(""); // State for proposal title
  const [proposalText, setProposalText] = useState(""); // State for proposal description
  useEffect(() => {
    if(isSuccess){
      message.success({
       content: "Proposal has been successfully created.",
        duration: 3,
      });
      setProposalTitle("")
      setProposalText("")
    }
  
  },[isSuccess])

  useEffect(() => {
    if (isError) {
      if (errorOne?.message.includes("Only registered voters can perform this action")) {
        message.error({
          content: "Only registered voters can perform this action.",
          duration: 3
         });
      } 
    }
  }, [isError, errorOne]);

// Only registered voters can perform this action
  // Handle title input change
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProposalTitle(event.target.value);
  };

  // Handle description input change
  const handleProposalChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProposalText(event.target.value);
    console.log(proposalText);
  };

  if (account.address === undefined) {
    return <Notification />;
  }

  const handleSubmit = () => {
    console.log(proposalTitle, proposalText);
    // createProposal
    try {
      const result = writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "createProposal",
        args: [proposalTitle, proposalText], // Pass both title and description to contract
      });
      console.log(result);
      // If the contract call is successful
    } catch (error) {
      // If an error occurs during the contract call
      console.error(error);
    }
  };

  return (
    <section>
      <div className="h-[100vh] my-32 font-raleway">
        <div className=" h-[100%] flex">
          <div className=" flex-1">
            <div className=" bg-black h-80 w-[85%] mx-auto mt-10 rounded-xl">
              <div className=" h-80 flex justify-center flex-col w-[90%] mx-auto ">
                <div className="bg-[#4f015b] h-10 text-white flex  items-center justify-center">
                  <p>Create Proposal For Voting </p>
                </div>
                <div className=" text-white my-7">
                  <p>
                    Blockchain voting organization , provide ethereum blockchain
                    eco system.{" "}
                  </p>
                </div>
                <div className="bg-[#4f015b] h-10 text-white flex items-center justify-center">
                  <p>Create Proposal For Voting </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex-[2]">
            <div className=" bg-black text-white h-[70%] justify-center flex flex-col items-center w-[95%] mx-auto mt-10 rounded-xl">
              <div className=" w-[80%]">
                <h1 className="text-3xl text-center text-white my-10 font-bold">
                  Create proposal
                </h1>
                {/* Proposal Title input */}
                <div className="flex justify-center items-center my-4">
                  <input
                    type="text"
                    className="bg-white border-0 p-4 rounded w-full shadow-sm"
                    placeholder="Enter proposal title here..."
                    value={proposalTitle}
                    onChange={handleTitleChange}
                    style={{ color: "black" }}
                  />
                </div>
                {/* Proposal Description textarea */}
                <div className="flex justify-center items-center">
                  <textarea
                    name="proposal"
                    id="text"
                    className="bg-white border-0 p-4 rounded h-64 shadow-sm w-full resize-none"
                    placeholder="Enter your proposal description here..."
                    value={proposalText} // Bind the value to state
                    onChange={handleProposalChange} // Handle change
                    style={{ color: "black" }} // Set text color to black
                  ></textarea>
                </div>
                <div className="flex justify-center items-center ">
                  <button
                    className={`bg-[#4f015b] text-white font-semibold py-2 px-3 w-full my-6 rounded ${
                      !proposalTitle || !proposalText || isPending
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    disabled={!proposalTitle || !proposalText || isPending} // Disable the button if title or text is empty
                    onClick={handleSubmit}
                  >
                      {isPending ? "Creating proposal....": "Create Proposal"} 
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex-1">
            <div className=" bg-black h-80 w-[85%] mx-auto mt-10 rounded-xl">
              <div className=" text-white h-80 flex pt-6 flex-col w-[90%] mx-auto ">
                <p className="text-white mb-2">Notice</p>
                <p>
                  Organizer:{" "}
                  {account?.address
                    ? `${formatAddress(account?.address)}`
                    : "Address not available"}
                </p>
                <p className="mt-6">
                  Only organizer of the voting contract can create a proposal
                  for voting election
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProposal;
