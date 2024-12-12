import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tproduct } from "@/types/types";
import moment from "moment-timezone";
import { ArrowDownRight, ArrowRight, CalendarClock, Radio, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";


type Testimonial = {
  _id: string;
  title: string;
  name: string;
  startTime: string;
  posts: Tproduct[];
  description: string;
  biddersCount?: number;
  baseAmount?: number;
  auctionType?: "Scheduled" | "Live";
};

export const AnimatedTestimonials = React.memo(
  ({
    testimonials,
    autoplay = false,
    isLoading = false,
  }: {
    testimonials: Testimonial[];
    autoplay?: boolean;
    isLoading?: boolean;
  }) => {
    const [active, setActive] = useState<number>(() => 0);

    const handleNext = useCallback(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const isActiveMemo = useCallback(
      (index: number) => index === active,
      [active]
    );

    const randomRotateY = useCallback(() => {
      return Math.floor(Math.random() * 21) - 10;
    }, []);

    useEffect(() => {
      if (autoplay) {
        const interval = setInterval(handleNext, 5000);
        return () => clearInterval(interval);
      }
    }, [autoplay, handleNext]);

    const loadingRender = useMemo(() => {
      if (isLoading) {
        return (
          <div className="max-w-sm md:max-w-4xl mx-auto animate-pulse">
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
              <div className="h-80 w-full bg-gray-300 rounded-3xl"></div>
              <div className="flex justify-between flex-col py-4">
                <div>
                  <div className="h-6 bg-gray-300 mb-2 w-1/2"></div>
                  <div className="h-4 bg-gray-300 mb-4 w-1/3"></div>
                  <div className="h-20 bg-gray-300"></div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      return null;
    }, [isLoading]);

    if (loadingRender) return loadingRender;

    return (
      <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <div className="relative w-80 h-80 ">
              <AnimatePresence>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial._id}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActiveMemo(index) ? 1 : 0.7,
                      scale: isActiveMemo(index) ? 1 : 0.95,
                      z: isActiveMemo(index) ? 0 : -100,
                      rotate: isActiveMemo(index) ? 0 : randomRotateY(),
                      zIndex: isActiveMemo(index)
                        ? 999
                        : testimonials.length + 2 - index,
                      y: isActiveMemo(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <img
                      src={testimonial.posts[0].images[0]}
                      alt={testimonial.name}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-fit object-center"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex justify-between flex-col py-4">
            <motion.div
              key={active}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <h3 className="text-2xl font-bold dark:text-white text-black">
                {testimonials[active].title[0].toUpperCase() +
                  testimonials[active].title.slice(1)}
              </h3>
              <p className="text-sm text-gray-500 mt-3  dark:text-neutral-500">
                {moment(testimonials[active].startTime).format("LLL")}
              </p>
              <h3 className="mt-1 font-bold text-xl text-gray-300 ">₹ {testimonials[active].baseAmount}</h3>
              <div className="flex gap-10 mt-3">
               <div className="flex gap-2 ">
                 <Users />
                {testimonials[active].biddersCount}
                </div>
                <p>
                  {testimonials[active].auctionType == "Live" ? (
                    <div className="flex gap-2">
                      <Radio size={20} color="green" className="mt-1" />
                      Live
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <CalendarClock size={20} className="mt-1"/>
                      Scheduled
                    </div>
                  )}
                </p>
              </div>
              <motion.p className="text-md text-gray-500 mt-4 dark:text-neutral-300">
                {testimonials[active].description
                  ?.split(" ")
                  .map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{
                        filter: "blur(10px)",
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.02 * index,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
              </motion.p>
              <Button className="mt-5 self-center bg-indigo-900 text-white hover:text-indigo-900">Explore <ArrowRight className="mt-1"/></Button>

            </motion.div>
          </div>
        </div>
      </div>
    );
  }
);

// Add display name for better debugging
AnimatedTestimonials.displayName = "AnimatedTestimonials";
