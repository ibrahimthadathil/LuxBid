import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Button } from "@/components/ui/Button";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import Skeleton from "@/components/ux/Skelton";
import { FlexibleCard } from "@/components/ux/FlexibleCard";
import { useRQ } from "@/hooks/userRQ";

import { topAuctions } from "@/service/Api/auctionApi";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Tauction, Tproduct } from "@/types/types";

interface TAuctionWithPosts extends Tauction {
  posts: Tproduct[]
}

const Deals = () => {
  const { isLoading, data } = useRQ(topAuctions, "topauction");  
  const navigate = useNavigate()
  
  const handleClick = (id: string) => {
    if(id) navigate('/deals/auction', {state: {id}})
    else toast.warning('Failed to load, Try Later')  
  }
  
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      {/* Hot Deals Section */}
      <div className="w-full mt-6 sm:mt-8 lg:mt-10">
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 bg-[linear-gradient(310deg,#5B4BAE,5%,#0000,95%,#000103)] bg-[length:150%_20%] bg-clip-text text-transparent animate-shimmer">
            Hot Deals
          </h1>
        </div>
        
        <div className="min-h-[300px] sm:min-h-[400px] sm:max-h-[600px]  lg:min-h-[30rem]">
          <HeroHighlight>
            <div className="w-full">
              {isLoading ? (
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between space-y-6 lg:space-y-0 lg:space-x-8 px-4">
                  {/* Mobile/Tablet skeleton */}
                  <div className="flex flex-col rounded-2xl shadow-md w-full max-w-sm sm:max-w-md lg:w-60 xl:w-80 animate-pulse h-72 sm:h-80 lg:h-96 mx-4 lg:mx-8">
                    <div className="h-full rounded-xl bg-gray-300 dark:bg-gray-800"></div>
                  </div>

                  <div className="flex flex-col py-4 w-full max-w-md sm:max-w-lg lg:max-w-[400px] mt-4 lg:mt-10 space-y-4 px-4">
                    <div className="space-y-3">
                      <div className="h-4 sm:h-6 rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse w-3/4 sm:w-1/2"></div>
                      <div className="h-3 sm:h-4 rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse w-1/2 sm:w-1/3"></div>
                      <div className="h-16 sm:h-20 rounded-md bg-gray-300 dark:bg-gray-800 animate-pulse flex flex-col gap-2 px-4 justify-center">
                        <div className="w-[90%] h-2 sm:h-3 bg-gray-400 dark:bg-gray-700 rounded"></div>
                        <div className="w-[90%] h-2 sm:h-3 bg-gray-400 dark:bg-gray-700 rounded"></div>
                        <div className="w-[60%] h-2 sm:h-3 bg-gray-400 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <AnimatedTestimonials
                  testimonials={data.TopAuction}
                  isLoading={isLoading}
                  autoplay={!isLoading}
                />
              )}
            </div>
          </HeroHighlight>
        </div>
      </div>

      

      {/* Scheduled Auctions Section */}
      <div className="w-full mb-8 sm:mb-12">
        <div className="rounded-2xl sm:rounded-full overflow-hidden mb-6 sm:mb-8 py-4 sm:py-8">
          <HeroHighlight color="dark:bg-dot-thick-gray-500">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-400 text-center">
              Scheduled Auctions
            </h1>
          </HeroHighlight>
        </div>
        
        <div className="relative">
          <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6 text-gray-400 px-2">
            Scheduled Auctions
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 px-2">
            {isLoading ? (
              <Skeleton />
            ) : (
              (data.Scheduled as TAuctionWithPosts[]).map((card, index) => (
                <div key={index} className="max-w-sm mx-auto sm:max-w-none">
                  <FlexibleCard
                    {...card}
                    imageUrl={(card?.posts)[0]?.images[0]}
                    size="small"
                    onButtonClick={handleClick}
                  />
                </div>
              ))
            )}
          </div>

          <div className="flex justify-center sm:justify-end px-2">
            <Button 
              className="flex items-center bg-black text-white hover:text-black w-full sm:w-auto justify-center sm:justify-start px-6 py-3" 
              onClick={() => navigate('/AllDeals')}
            >
              Explore
              <ChevronRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Live Auctions Section */}
      <div className="w-full mb-8 sm:mb-12">
        <div className="rounded-2xl sm:rounded-full overflow-hidden mb-6 sm:mb-8 py-4 sm:py-8">
          <HeroHighlight color="dark:bg-dot-thick-gray-500">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-400 text-center">
              Live Auctions
            </h1>
          </HeroHighlight>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 px-2">
            {isLoading ? (
              <Skeleton />
            ) : (
              (data.Live as TAuctionWithPosts[]).map((card, index) => (
                <div key={index} className="max-w-sm mx-auto sm:max-w-none">
                  <FlexibleCard
                    {...card}
                    imageUrl={card?.posts[0]?.images[0]}
                    size="small"
                    onButtonClick={handleClick}
                  />
                </div>
              ))
            )}
          </div>

          <div className="flex justify-center sm:justify-end px-2">
            <Button 
              className="flex items-center bg-black text-white hover:text-black w-full sm:w-auto justify-center sm:justify-start px-6 py-3" 
              onClick={() => navigate('/AllDeals')}
            >
              Explore
              <ChevronRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
