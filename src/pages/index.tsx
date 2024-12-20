import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAccount} from "wagmi";
import { useReadContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constant/constant";
import Notification from "../components/Notification";

type Voter = {
  name: string;
  age: BigInt;
  registrationTime: BigInt;
  voterAddress: string;
};

const Home: NextPage = () => {
  const account = useAccount();
  // console.log(account.address, "acct");

  /*
  const voteContract = {
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
  } as const;

  const { data: multpleData } = useReadContracts({
    contracts: [
      {
        ...voteContract,
        functionName: "getVotingStatistics",
      },
      {
        ...voteContract,
        functionName: "getRegisteredVoters",
      },
    ],
  });
  */

  const { data, error } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getVotingStatistics",
  });

  const { data: getRegisteredVotersData } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getRegisteredVoters",
  });



  if (!account.address) {
    return <Notification />;
  }

  const stats: [number, number, number] = Array.isArray(data)
    ? (data as [number, number, number])
    : [0, 0, 0];

  // Explicitly cast getRegisteredVotersData to an array of Voter objects
  const voters = Array.isArray(getRegisteredVotersData)
    ? (getRegisteredVotersData as Voter[])
    : [];

  return (
    <div className={styles.container}>
      <Head>
        <title>Voting App</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="my-32 font-raleway">
        <div className="bg-black w-[70%] mx-auto">
          <h2 className="p-8 text-4xl font-bold text-center animate-gradient bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-700">
            Chain Master Decentralized Voting System
          </h2>
        </div>

        <div className="h-40 bg-black mt-10 gap-4 w-[70%] items-center flex mx-auto">
          {["No of Votes", "No of Voters", "No of Proposals"].map(
            (label, index) => (
              <div
                key={index}
                className="h-[80%] text-white text-[1.3rem] bg-[#4f015b] flex-1 flex justify-center items-center font-bold"
              >
                {label}: {(stats[index] || 0).toString()}
              </div>
            )
          )}
        </div>

        <div className="">
          <div className="bg-black rounded-xl p-10 w-[70%] m-auto mt-14">
            <h1 className="text-center font-bold text-3xl py-5 mb-4 text-white">
              List Of Voters
            </h1>
            {!voters?.length && (
               <h2 className="text-white text-center text-[1.2rem]">No data yet</h2>
            ) }
           
            <div className="flex flex-col">
              {!voters?.length ? (
                <>
                  <div className="flex justify-center  h-60">
                    <img className="w-60" src="/image/illus.webp" alt="sdk" />
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
      </main>
    </div>
  );
};

export default Home;
