import React, { useState } from "react";
import { runFireworks } from "../lib/utils";
import Notification from "../components/Notification";
import { useAccount } from "wagmi";
import { useReadContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constant/constant";

interface Proposal {
  title: string;
  voteCount: number;
  creator: string;
}

const Winner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleList = () => {
    setIsVisible(!isVisible);
    runFireworks();
  };
  const account = useAccount();
  const { data } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getWinner",
  });


  if (!account.address) {
    return <Notification />;
  }


  const proposalData = data as Proposal | undefined;

  return (
    <div className="">
      <div className="w-[40vw] mt-40 mx-auto">

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Voting Controls</h3>
      
        <div className="grid grid-cols-2 gap-4">
          <button
            className="w-full py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          >
            Start Vote
          </button>
          <button
            className="w-full py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
          >
            End Vote
          </button>
        </div>
      </div>
    </div>
      <div className="bg-black flex-col flex items-center  mb-20 gap-5 w-[40vw] rounded-xl p-14 m-auto mt-4 font-raleway">
        <h1 className="text-4xl font-bold text-white">Winning proposal</h1>
        <button
          onClick={toggleList}
          className="bg-purple-800 rounded-sm p-2 w-32 text-sm text-white text-center"
        >
          {isVisible ? "Hide Details" : "View Proposal"}
        </button>
        <div
          className={`flex flex-col gap-6 w-[90%] items-center bg-black text-white text-3xl border border-violet-400 rounded-xl p-5 mt-12 ${
            isVisible ? "flex" : "hidden"
          } `}
        >
          {proposalData ? (
            <>
              <p><strong>Title:</strong>{proposalData.title}</p>
              <p><strong>Vote Count:</strong>{Number(proposalData.voteCount)}</p>
              <p><strong>Creator:</strong> {proposalData.creator ? `${proposalData.creator.slice(0, 6)}...${proposalData.creator.slice(-4)}` : 'N/A'}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Winner;
