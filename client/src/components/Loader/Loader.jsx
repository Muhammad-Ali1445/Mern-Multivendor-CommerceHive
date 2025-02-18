import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <ClipLoader
        size={80} 
        color="#3498db" 
        loading={true}
      />
      <p className="text-gray-500 mt-4">Fetching data, please wait...</p>
    </div>
  );
};

export default Loader;