import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Button } from "@/components/ui/Button";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import  Skeleton  from "@/components/ux/Skelton";
import { FlexibleCard } from "@/components/ux/FlexibleCard";
import { useRQ } from "@/hooks/userRQ";
const cardData = [
  {
    title: "Mountain Retreat",
    description: "Escape to the serene mountains for a peaceful getaway.",
    imageUrl:
      "https://app.requestly.io/delay/5000/https://nextui.org/images/hero-card-complete.jpeg",
  },
  {
    title: "Beach Paradise",
    description: "Relax on pristine beaches with crystal clear waters.",
    imageUrl:
      "https://app.requestly.io/delay/5000/https://nextui.org/images/hero-card-complete.jpeg",
  },
  {
    title: "City Adventure",
    description: "Explore vibrant city life and cultural attractions.",
    imageUrl:
      "https://app.requestly.io/delay/5000/https://nextui.org/images/hero-card-complete.jpeg",
  },
];
import { topAuctions } from "@/service/Api/auctionApi";
import { Tauction } from "@/types/types";
import { ChevronRight } from "lucide-react";
const Deals = () => {
  const { isLoading, data } = useRQ(topAuctions, "topauction");
 console.log(!isLoading && data.Live);
 
  
  return (
    <>
      <div className="w-[90%] h-[30rem] mt-10 ">
        <div className="text-center font- font-extrabold text-5xl">
          <h1 className="  mb-6 bg-[linear-gradient(310deg,#5B4BAE,5%,#0000,95%,#000103)] bg-[length:150%_20%] bg-clip-text text-transparent animate-shimmer">
            Hot Deals
          </h1>
        </div>
        <HeroHighlight color="dark:bg-dot-thick-gray-500">
          <div>
            {isLoading ? (
              <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between space-y-8 lg:space-y-0 lg:space-x-8">
                <div className="flex flex-col m-4 lg:m-8 rounded-2xl shadow-md w-60 sm:w-80 animate-pulse h-96">
                  <div className="h-72 rounded-xl dark:bg-gray-800"></div>
                </div>

                <div className="flex flex-col py-4 w-full sm:w-[400px]  mt-6 lg:mt-10 space-y-">
                  <div className="mt-5">
                    <div className="h-6 rounded-md bg-gray-800 animate-pulse mb-2 w-1/2"></div>
                    <div className="h-4 rounded-md bg-gray-800 animate-pulse mb-4 w-1/3"></div>
                    <div className="h-20 rounded-md bg-gray-800 animate-pulse flex flex-col gap-2 px-4 justify-center">
                      <div className="w-[90%] h-3 bg-gray-700"></div>
                      <div className="w-[90%] h-3 bg-gray-700"></div>
                      <div className="w-[60%] h-3 bg-gray-700"></div>
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
      {/* Upcoming section */}
      <div className="w-[80%] lg:w-[70%] my-10 h-auto lg:h-[15rem] flex flex-col lg:flex-row">
        {/* Left Section */}
        <div className="h-full  w-full lg:w-[100%] flex items-center justify-center">
          <div className="w-[80%] lg:w-[80%] font-light tracking-widest">
            <h1 className="text-start text-4xl lg:text-5xl bg-text-gradient bg-clip-text text-transparent">
              Upcoming
            </h1>
            <h1 className="text-end text-4xl lg:text-5xl bg-text-gradient bg-clip-text text-transparent">
              Auctions
            </h1>
          </div>
          <div className="ms-0 lg:ms-5 mt-5 lg:mt-0 bord">
            <h1
              className="text-6xl lg:text-9xl font-extralight text-gray-600"
              style={{ transform: "skewX(-15deg) scaleX(0.4)" }}
            >
              /
            </h1>
          </div>
          <p className="leading-relaxed ms-10 font-extralight mt-6 text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur maxime quob br quidem, pariatur ipsum suscipit
            officiis! Necessitatibus nihil unde tempore, voluptate laborum nisi
            odio placeat, in aliquam atque temporibus obcaecati? Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Officiis deleniti
            nesciunt repudiandae
          </p>
        </div>

        {/* Right Section */}
      </div>

      {/* {scheduled section} */}
      <div className="w-[80%]  h-32 flex rounded-full  overflow-hidden">
        <HeroHighlight color="dark:bg-dot-thick-gray-500">
          <h1 className="text-5xl font-bold mb-6 text-gray-400 ">
            Scheduled Auctions{" "}
          </h1>
        </HeroHighlight>
      </div>
      <div>
        <div className="container mx-auto px-4 py-8 relative mb-10 ">
          <h2 className="text-2xl mb-6 text-gray-400">Scheduled Aucions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ">
            {isLoading ?<Skeleton/>:(data.Scheduled as any[]).map((card, index) => (
              <FlexibleCard
                key={index}
                {...card}
                imageUrl={card?.posts[0]?.images[0]}
                size="small"
                onButtonClick={() => console.log(`Clicked on ${card.title}`)}
              />
            ))}
          </div>

          <div className="absolute bottom-4 right-4">
            <Button className="flex items-center bg-black text-white hover:text-black">
              Explore
              <ChevronRight className="" />
            </Button>
          </div>
        </div>
      </div>

      {/* {live Auction} */}
      <div className="w-[80%]  h-32 flex rounded-full  overflow-hidden">
        <HeroHighlight color="dark:bg-dot-thick-gray-500">
          <h1 className="text-5xl font-bold mb-6 text-gray-400 ">
            Live Auctions{" "}
          </h1>
        </HeroHighlight>
      </div>

      <div>
        <div className="container mx-auto px-4 py-8 relative mb-10 ">
          {/* <h2 className="text-2xl mb-6 text-gray-400">Live Aucions</h2> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ">
            {isLoading ?<Skeleton/>:(data.Live as any[]).map((card, index) => (
              <FlexibleCard
                key={index}
                {...card}
                imageUrl={card?.posts[0]?.images[0]}
                size="small"
                onButtonClick={() => console.log(`Clicked on ${card.title}`)}
              />
            ))}
          </div>

          <div className="absolute bottom-4 right-4">
            <Button className="flex items-center bg-black text-white hover:text-black">
              Explore
              <ChevronRight className="" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deals;
