import React, { useState } from "react";
import { runFireworks } from "../lib/utils";
import Notification from "../components/Notification";
import { useAccount } from "wagmi";
import { useReadContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constant/constant";

const Winner = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleList = () => {
    setIsVisible(!isVisible);
    runFireworks();
  };
  const account = useAccount();
  const { data, error } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getWinner",
  });
  

  if (!account.address) {
    return <Notification />;
  }
  
  return (
    <div className="">
      <div className="bg-black flex-col flex items-center gap-5 w-[40vw] rounded-xl p-14 m-auto mt-40 font-raleway">
        <h1 className="text-4xl font-bold text-white">Winning proposal</h1>
        <button
          onClick={toggleList}
          className="bg-purple-800 rounded-sm p-2 w-32 text-sm  text-white text-center"
        >
          {isVisible ? "Hide Details" : "View Proposal"}
        </button>
        <div
          className={`flex flex-col gap-6 w-72 items-center bg-black text-white  text-3xl border border-violet-400 rounded-xl p-5 mt-12 ${
            isVisible ? "flex" : "hidden"
          } `}
        >
            <p><strong>Title:</strong> </p>
            <p><strong>Vote Count:</strong> </p>
            <p><strong>Creator:</strong> </p> 
        </div>
      </div>
    </div>
  );
};

export default Winner;
