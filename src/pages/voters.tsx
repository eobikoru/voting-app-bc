import React from "react";
import Notification from "../components/Notification";
import { useAccount } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constant/constant";
import { useReadContract } from "wagmi";
type Voter = {
  name: string;
  age: BigInt;
  registrationTime: BigInt;
  voterAddress: string;
};
const Voters = () => {
  const account = useAccount();

  if (!account.address) {
    return <Notification />;
  }
  const { data: getRegisteredVotersData } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getRegisteredVoters",
  });
  const voters = Array.isArray(getRegisteredVotersData)
    ? (getRegisteredVotersData as Voter[])
    : [];

  return (
    <div className="font-raleway my-32">
        <div className="bg-black rounded-xl p-10 w-[70%] m-auto mt-14">
            <h1 className="text-center font-bold text-3xl py-5 mb-4 text-white">
              List Of Voters
            </h1>
            <div className="flex flex-col">
              {!getRegisteredVotersData ? (
                <>
                  <div className="flex justify-center h-70">
                    <img src="/image/illus.webp" alt="sdk" />
                  </div>
                </>
              ) : (
                <>
                  <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                      <div className="border rounded-lg overflow-hidden dark:border-neutral-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                          <thead className="bg-gray-50 dark:bg-neutral-700">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                              >
                                Voter Address
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                              >
                                Age
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                              >
                                Registration Time
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                            {voters.map((voter: Voter, index: number) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                  {voter.voterAddress}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                  {voter.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                  {voter.age.toString()}
                                </td>{" "}
                                {/* Convert BigInt to String */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                  {new Date(
                                    Number(voter.registrationTime.toString()) *
                                      1000
                                  ).toLocaleString()}
                                </td>{" "}
                                {/* Convert BigInt to String and then handle as Unix timestamp */}
                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                  <button
                                    type="button"
                                    className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
      
     
    </div>
  );
};

export default Voters;
