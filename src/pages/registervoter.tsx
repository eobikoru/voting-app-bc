import React from "react";

const registervoter = () => {
  return (
    <section>
      <div className=" pb-3  flex flex-col bg-gradient-to-b from-gray-200 to-pink-200">
        <h1 className="text-2xl text-purple-500 font-bold font- text-center mt-10 ">
          Register a Voter
        </h1>

        <div className="max-w-sm my-4">
          <label
            htmlFor="input-label"
            className="block text-sm font-medium mb-3  mx-3 dark:text-white"
          >
            Voter Address:
          </label>
          <input
            type="text"
            id="input-label"
            className="py-2 mx-3 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="voter address"
          />

          <label
            htmlFor="input-label"
            className="block text-sm mt-3 font-medium mb-2 mx-3 dark:text-white"
          >
            Voter Name:
          </label>
          <input
            type="text"
            id="input-label"
            className="py-2 mx-3 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="voter name"
          />

          <label
            htmlFor="input-label"
            className="block text-sm font-medium mb-2 mx-3 mt-3 dark:text-white"
          >
            Voter Age:
          </label>
          <input
            type="email"
            id="input-label"
            className="py-2 mx-3 px-3  block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="voter age"
          />
          <button className="bg-purple-600 text-white font-semibold py-2 px-3 mx-3 w-full my-6 rounded">
            Register Voter
          </button>
        </div>

        <h3 className="text-center mb-10 text-purple-500 font-bold text-2xl">
          List of voters
        </h3>

        <div className="flex justify-center">
          <div className="flex flex-col w-full max-w-5xl mx-2">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                        >
                          Voters Address
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                        >
                          Age
                        </th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                        0x67d0e2E540BFdf4c882703006B26E36b88960e5D
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          Taiwo
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          22
                        </td>
                        
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default registervoter;
