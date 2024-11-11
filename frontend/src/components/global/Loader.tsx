
const Loader = () => {
  return (
   <>
   <div className="flex-1 flex items-center justify-center ">
          <div className="flex space-x-2">
            <div
              className="w-4 h-4 bg-[#5b4bae4e] rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-4 h-4 bg-[#5b4bae6f] rounded-full animate-bounce"
              style={{ animationDelay: "100ms" }}
            ></div>
            <div
              className="w-4 h-4 bg-[#5b4bae] rounded-full animate-bounce"
              style={{ animationDelay: "200ms" }}
            ></div>
          </div>
        </div>
   </>
  )
}

export default Loader
