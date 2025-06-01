import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

const LandingPage = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center py-10 sm:py-16 md:py-32">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm text-gray-400">
            Our Capital, Your <span className="text-[#5135d1ea]">Success</span>
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-white">No Time Limit Prop </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#3b3365ea] to-[#2e2361ea]">Firm</span>
          </h1>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-white">Conquer The </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#3b3365ea] to-[#2e2361ea]">market</span>
          </h2>
        </div>

        <Button className="mt-6 sm:mt-8 bg-white hover:bg-purple-700 hover:text-white">
          Let's start <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </main>
  );
};

export default LandingPage;