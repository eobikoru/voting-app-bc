import React, { useState, useEffect } from "react";
import { runFireworks } from "../lib/utils";
import Notification from "../components/Notification";
import { useAccount } from "wagmi";
import { useReadContract, useWriteContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constant/constant";
import { message } from "antd";

interface Proposal {
  title: string;
  voteCount: number;
  creator: string;
}

const Winner = () => {
  const { writeContract, error: errorOne, isError, isPending, isSuccess } = useWriteContract();
  const { writeContract: contractTwo, error: errorTwo, isError: isErrorTwo, isPending: isPendingTwo, isSuccess: isSuccessTwo } = useWriteContract();
  const [isVisible, setIsVisible] = useState(false);
  const toggleList = () => {
    setIsVisible(!isVisible);
    runFireworks();
  };

  useEffect(() => {
    if (isSuccess) {
      message.success({
        content: "Voting has started.",
        duration: 3,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (errorOne?.message.includes("Only admin can perform this action")) {
      message.error({
        content: "Only admin can perform this action.",
        duration: 4,
      });
    }
  }, [errorOne]);

  useEffect(() => {
    if (errorTwo?.message.includes("Only admin can perform this action")) {
      message.error({
        content: "Only admin can perform this action.",
        duration: 4,
      });
    }
  }, [errorTwo]);

  useEffect(() => {
    if (isSuccessTwo) {
      message.success({
        content: "Voting has ended.",
        duration: 3,
      });
    }
  }, [isSuccessTwo]);

  const account = useAccount();
  const { data } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getWinner",
  });

  // Fetch isVotingActive data and include the refetch function
  const { data: isVotingActiveData, refetch } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "isVotingActive",
  });

  console.log("isVotingActiveData", isVotingActiveData);

  if (!account.address) {
    return <Notification />;
  }

  const handleStartVote = () => {
    const result = writeContract({
      abi: CONTRACT_ABI,
      address: CONTRACT_ADDRESS,
      functionName: "toggleVoting",
      args: [true],
    });

    // Refetch data after starting the vote
    refetch();
  };

  const handleEndVote = () => {
    const result = contractTwo({
      abi: CONTRACT_ABI,
      address: CONTRACT_ADDRESS,
      functionName: "toggleVoting",
      args: [false],
    });

    // Refetch data after ending the vote
    refetch();
  };


  const proposalData = data as Proposal | undefined;

  return (
    <div className="">
      <div className="w-[40vw] mt-40 mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Voting Controls</h3>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                if (!(isPending || isVotingActiveData)) {
                  handleStartVote();
                }
              }}
              className={`w-full py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 ${
                isPending || isVotingActiveData
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {isPending ? "Starting vote....." : "Start Vote"}
            </button>
            <button
              onClick={() => {
                if (!(isPendingTwo || !isVotingActiveData)) {
                  handleEndVote();
                }
              }}
              className={`w-full py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 ${
                isPendingTwo || !isVotingActiveData
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {isPendingTwo ? "Ending vote....." : "End Vote"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-black flex-col flex items-center mb-20 gap-5 w-[40vw] rounded-xl p-14 m-auto mt-4 font-raleway">
        <h1 className="text-4xl font-bold text-white">Winning proposal</h1>
        {isVotingActiveData === false && proposalData ? (
          <button
            onClick={toggleList}
            className="bg-purple-800 rounded-sm p-2 w-32 text-sm text-white text-center"
          >
            {isVisible ? "Hide Details" : "View Proposal"}
          </button>
        ) : isVotingActiveData === true ? (
          <p className="text-white text-lg mt-4">
            Voting needs to end before the winner can be shown.
          </p>
        ) : (
          <p className="text-white text-lg mt-4">
            Voting hasn't started or no vote has been made.
          </p>
        )}

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
