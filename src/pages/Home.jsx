import { useEffect } from "react";

const Home = ({ allEvas }) => {
 
    console.log(allEvas);

  return (
    <main className="">
        <div className="w-full h-screen bg-teal-700 flex justify-center items-center text-5xl font-bold font-title">
          EVAS DEL EDEN
        </div>
        <div className="w-full h-screen bg-rose-700"></div>
        <div className="w-full h-screen bg-indigo-700"></div>
    </main>
  );
};

export default Home;
