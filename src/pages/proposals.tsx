import { useState, useEffect  } from 'react';
import { useAccount } from "wagmi";
import { useReadContract,useWriteContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constant/constant";
import Notification from "../components/Notification";
import { message} from "antd";
type Proposal = {
  id: string;
  timestamp: BigInt;
  creator: string;
  title: string;
  description: string;
  voteCount: BigInt;  // Add voteCount here
};

const Proposals = () => {
  const account = useAccount();
  const { writeContract , error:errorOne, isError, isPending ,isSuccess } = useWriteContract();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  useEffect(() => {
    if(isSuccess){
      message.success({
        content: "Voter has voted successfully .",
        duration: 3,
      });
      setIsModalOpen(false);
    }
  },[isSuccess]);
  useEffect(() => {
    if (isError) {
      if (errorOne?.message.includes("You have already voted")) {
        message.error({
          content: "You have already voted.",
          duration: 3,
        });
      }
     else if (errorOne?.message.includes("Voting is not active")) {
        message.error({
          content: "Voting is not active.",
          duration: 3,
        });
      }
      else if (errorOne?.message.includes("Only registered voters can perform this action")) {
        message.error({
          content: "Only registered voters can perform this action.",
          duration: 4,
        });
      }
    }
  }, [isError, errorOne]);

  if (!account.address) {
    return <Notification />;
  }

  const { data, error } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "listProposals",
  });

  const proposals = Array.isArray(data) ? (data as Proposal[]) : [];



  const handleViewClick = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProposal(null);
  };

  const handleVote = () => {
    const proposalId = selectedProposal?.id.toString(); // Or use Number(selectedProposal.id) for number
   
    try {
      
      const result = writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "vote",
        args: [proposalId], 
      });
      // If the contract call is successful
    } catch (error) {
      // If an error occurs during the contract call
      console.error(error);
    }
  }
  return (
    <div className="font-raleway">
      <div className="bg-black rounded-xl p-10 w-[70%] m-auto mt-36">
        <h1 className="text-center font-bold text-3xl py-5 text-white">
          List Of Proposals
        </h1>
        <div className="flex flex-col">
          {!proposals.length ? (
            <div className="flex justify-center h-70">
              <img src="/image/illus.webp" alt="No Proposals" />
            </div>
          ) : (
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="border rounded-lg overflow-hidden dark:border-neutral-700">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                    <thead className="bg-gray-50 dark:bg-neutral-700">
                      <tr>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Timestamp</th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Creator</th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Title</th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Description</th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Vote Count</th> {/* Add voteCount column */}
                        <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {proposals.map((proposal: Proposal) => (
                        <tr key={proposal.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                            {new Date(Number(proposal.timestamp.toString()) * 1000).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            {proposal.creator && proposal.creator.length > 4
                              ? proposal.creator.slice(0, 3) + '****' + proposal.creator.slice(-4)
                              : proposal.creator}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            {proposal.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 overflow-hidden text-ellipsis max-w-xs">
                            {proposal.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            {Number(proposal.voteCount.toString())} {/* Convert BigInt to number */}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <button
                              type="button"
                              onClick={() => handleViewClick(proposal)}
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedProposal && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full">
            <h2 className="text-2xl font-bold text-center mb-4">{selectedProposal.title}</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <strong>Timestamp:</strong>
                <span>{new Date(Number(selectedProposal.timestamp.toString()) * 1000).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <strong>Creator:</strong>
                <span>
                  {selectedProposal.creator && selectedProposal.creator.length > 4
                    ? selectedProposal.creator.slice(0, 3) + '****' + selectedProposal.creator.slice(-4)
                    : selectedProposal.creator}
                </span>
              </div>
              <div className="flex justify-between">
                <strong>Title:</strong>
                <span>{selectedProposal.title}</span>
              </div>
              <div className="flex justify-between">
                <strong>Description:</strong>
                <span className=' max-w-[19rem]'>{selectedProposal.description}</span>
              </div>
              <div className="flex justify-between">
                <strong>Vote Count:</strong>
                <span>{Number(selectedProposal.voteCount.toString())}</span> {/* Display voteCount correctly */}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 mr-4 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
              <button
                disabled={isPending}
                onClick={handleVote}
                className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ${
                  isPending
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {isPending ? "Voting......" : "Vote"}  
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proposals;
