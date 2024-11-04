import React from 'react'

const listofproposal = () => {
  return (
    <div className="max-w-4xl mx-auto px-4">
    <h1 className='text-3xl text-white my-20 text-center font-bold'>List of Proposals</h1>
  
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-white uppercase dark:text-neutral-500">Description</th>
                  <th scope="col" className="px-6 py-3  text-start text-xs font-medium text-white uppercase dark:text-neutral-500">Vote Count</th>
                  <th scope="col" className="px-6 py-3  text-start text-xs font-medium text-white uppercase dark:text-neutral-500">Creator</th>
                  <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-white uppercase dark:text-neutral-500">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-neutral-800 dark:even:bg-neutral-700 dark:hover:bg-neutral-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">Hello World</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">0</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">0x67d0e2E540BFdf4c882703006B26E36b88960e5D</td>
                  <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">Delete</button>
                  </td>
                </tr>   
                </tbody>           
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  



  )
}

export default listofproposal
