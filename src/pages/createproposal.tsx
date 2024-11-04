import React from "react";

const createproposal = () => {
  return (
    <div>
      <h1 className="text-3xl text-center text-white my-10 font-bold">
        Create proposal
      </h1>
      <div className="flex justify-center items-center ">
        <textarea
          name="proposal"
          id="text"
          className="bg-white border-0  p-4 rounded h-64 shadow-sm w-full max-w-xl resize-none"
          placeholder="Enter your proposal here..."
        ></textarea>

      </div>
      <div className="flex justify-center items-center ">
  <button 
    className="bg-blue-500 text-white font-semibold my-8 rounded p-2 w-1/3 max-w-2xl"
  >
    Create Proposal
  </button>
</div>

    </div>
  );
};

export default createproposal;
