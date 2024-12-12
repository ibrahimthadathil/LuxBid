import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { useRQ } from "@/hooks/userRQ";

import { topAuctions } from "@/service/Api/auctionApi";
const Deals = () => {
  const skeletonTestimonials = [
    {
      title: "Loading testimonial...",
      name: "Loading Name",
      startTime: "Loading Position",
      posts: [
        {
          images: [
            "https://www.shutterstock.com/shutterstock/photos/2475730327/display_1500/stock-photo-a-sheet-of-white-watercolor-paper-texture-as-background-2475730327.jpg",
          ],
        },
      ], // Use a placeholder image or a gray background image
    },
  ];
  const { isLoading, data } = useRQ(topAuctions, "auction");

  return (
    <>
      <div className="w-[90%] h-[30rem]">
        <div className="text-center font- font-extrabold text-5xl">
          <h1 className="animate-pulse t">Hot Deals</h1>
        </div>
        <HeroHighlight color="dark:bg-dot-thick-gray-500">
          <div>
            <AnimatedTestimonials
              testimonials={isLoading ? skeletonTestimonials : data}
              isLoading={false}
              autoplay={!isLoading}
            />
          </div>
        </HeroHighlight>
      </div>

      <div className="w-[80%] lg:w-[70%] my-10 h-auto lg:h-[15rem] flex flex-col lg:flex-row">
        {/* Left Section */}
        <div className="h-full  w-full lg:w-[100%] flex items-center justify-center">
          <div className="w-[80%] lg:w-[50%] font-light tracking-widest">
            <h1 className="text-start text-4xl lg:text-5xl">Upcoming</h1>
            <h1 className="text-end text-4xl lg:text-5xl">Auctions</h1>
          </div>
          <div className="ms-0 lg:ms-5 mt-5 lg:mt-0 bord">
            <h1 className="text-6xl lg:text-9xl font-extralight">/</h1>
          </div>
          <p className="leading-relaxed ms-10 mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur maxime quob br quidem, pariatur ipsum suscipit
            officiis! Necessitatibus nihil unde tempore, voluptate laborum nisi
            odio placeat, in aliquam atque  temporibus obcaecati? Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Officiis deleniti
            nesciunt repudiandae
          </p>
        </div>

        {/* Right Section */}
      </div>
    </>
  );
};

export default Deals;
