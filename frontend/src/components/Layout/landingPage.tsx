import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { useTheme } from "../theme/theme-provider";

const LandingPage = () => {
  const {theme} = useTheme()
  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center py-10 sm:py-16 md:py-32">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <p className={`text-xs sm:text-sm  ${theme=='dark'?"text-gray-600":"text-zinc-900"}`}>
            Our Capital, Your <span className="text-[#5135d1ea]">Success</span>
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <span className={`${theme=='dark'?"bg-clip-text text-transparent bg-gradient-to-bl from-zinc-300 via-[#e1d9eaea] to-[#130c31ea]":"bg-clip-text text-transparent bg-gradient-to-bl from-indigo-900 via-indigo-670 to-[#998fc5ea]"} `}>No Time Limit Prop Firm</span>
            
          </h1>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            {/* <span className="text-white"></span> */}
            <span className={`${theme=='dark'?"bg-clip-text text-transparent bg-gradient-to-tr from-zinc-300 via-[#504c54ea] to-[#130c31ea]":"bg-clip-text text-transparent bg-gradient-to-tr from-indigo-900 via-indigo-670 to-[#998fc5ea]"} `}>Conquer The market</span>
          </h2>
        </div>

        <Button className={`mt-6 sm:mt-8 ${ theme=='dark'?"bg-zinc-900  hover:bg-purple-950" :"bg-indigo-800 hover:bg-purple-950"} text-white  hover:text-gray-100`}>
          Let's start <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </main>
  );
};

export default LandingPage;