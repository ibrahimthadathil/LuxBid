
const Skelton = () => {
  return (
    <div className="flex flex-col m-8 rounded-2xl shadow-md w-60 sm:w-80 animate-pulse h-96">
      <div className="h-48 rounded-t-xl  dark:bg-gray-900"></div>
      <div className="flex-1 px-4 py-8 rounded-b-xl space-y-4 sm:p-8 dark:bg-gray-800 ">
        <div className="w-full h-6 rounded-md dark:bg-gray-700"></div>
        <div className="w-full h-6 rounded-md dark:bg-gray-700"></div>
        <div className="w-3/4 h-6 rounded-md dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default Skelton;
