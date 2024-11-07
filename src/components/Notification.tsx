import React from "react";

const Notification = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center w-full ">
      <div className="bg-black rounded-xl h-[30rem] w-[50%]  flex items-center justify-center">
        <div className="flex flex-col items-center w-[86%]">
          <div className=" my-7">
            <img src="/image/drm.png " className="h-[11rem]" alt="sdk" />
          </div>
          <p className="text-white  text-[1.6rem] py-3 w-[90%]">
            New to MetaMask? Please install the MetaMask extension on your
            browser and set up a wallet.{" "}
          </p>
          <p className="text-white  text-[1.6rem] pb-4 w-[90%]">
            Already have MetaMask? Just connect your wallet to proceed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
