  // 
  import React, { useEffect, useState, useCallback } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { Tproduct } from "@/types/types";
  import moment from "moment-timezone";
  import {
    ArrowRight,
    CalendarClock,
    Radio,
    Users,
  } from "lucide-react";
  import { Button } from "@/components/ui/Button";
  import { useNavigate } from "react-router-dom";

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
      }: {
      testimonials: Testimonial[];
      autoplay?: boolean;
      isLoading?: boolean;
    }) => {
      
      const [active, setActive] = useState<number>(() => 0);
      const navigate = useNavigate()
      
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

      return (
        <div className="w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto antialiased font-sans px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
          
          {/* Mobile Layout - Card on top, details below */}
          <div className="block md:hidden">
            <div className="flex flex-col items-center gap-8">
              {/* Card Image Section - Mobile */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex-shrink-0">
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
                        y: isActiveMemo(index) ? [0, -40, 0] : 0,
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
                        className="h-full w-full rounded-2xl sm:rounded-3xl object-cover object-center"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Details Section - Mobile */}
              <div className="w-full max-w-sm mx-auto">
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
                  className="text-center"
                >
                  <h3 className="text-xl sm:text-2xl font-bold dark:text-white text-black mb-2">
                    {testimonials[active].title[0].toUpperCase() +
                      testimonials[active].title.slice(1)}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-500 mb-2">
                    {moment(testimonials[active].startTime).format("LLL")}
                  </p>
                  
                  <h3 className="font-bold text-lg sm:text-xl text-gray-300 mb-3">
                    ₹ {testimonials[active].baseAmount}
                  </h3>
                  
                  <div className="flex justify-center gap-6 sm:gap-8 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Users size={18} />
                      <span className="text-sm">{testimonials[active].biddersCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {testimonials[active].auctionType === "Live" ? (
                        <>
                          <Radio size={18} color="green" />
                          <span className="text-sm">Live</span>
                        </>
                      ) : (
                        <>
                          <CalendarClock size={18} />
                          <span className="text-sm">Scheduled</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <motion.p className="text-sm text-gray-500 dark:text-neutral-300 mb-6 leading-relaxed px-2">
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
                  
                  <Button 
                    className="w-full sm:w-auto bg-indigo-900 text-white hover:text-indigo-900 flex items-center justify-center gap-2 px-6 py-3" 
                    onClick={() => navigate('/AllDeals')}
                  >
                    Explore 
                    <ArrowRight size={18} />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Desktop/Tablet Layout - Side by side */}
          <div className="hidden md:block">
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              {/* Card Image Section - Desktop */}
              <div className="flex justify-center md:justify-start">
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
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
                          className="h-full w-full rounded-3xl object-cover object-center"
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Details Section - Desktop */}
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
                  <h3 className="text-2xl lg:text-3xl font-bold dark:text-white text-black">
                    {testimonials[active].title[0].toUpperCase() +
                      testimonials[active].title.slice(1)}
                  </h3>
                  
                  <p className="text-sm lg:text-base text-gray-500 mt-3 dark:text-neutral-500">
                    {moment(testimonials[active].startTime).format("LLL")}
                  </p>
                  
                  <h3 className="mt-1 font-bold text-xl lg:text-2xl text-gray-300">
                    ₹ {testimonials[active].baseAmount}
                  </h3>
                  
                  <div className="flex gap-8 lg:gap-10 mt-3">
                    <div className="flex items-center gap-2">
                      <Users size={20} />
                      <span>{testimonials[active].biddersCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {testimonials[active].auctionType === "Live" ? (
                        <>
                          <Radio size={20} color="green" />
                          <span>Live</span>
                        </>
                      ) : (
                        <>
                          <CalendarClock size={20} />
                          <span>Scheduled</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <motion.p className="text-sm lg:text-base text-gray-500 mt-4 dark:text-neutral-300 leading-relaxed">
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
                  
                  <Button 
                    className="mt-6 bg-indigo-900 text-white hover:text-indigo-900 flex items-center gap-2" 
                    onClick={() => navigate('/AllDeals')}
                  >
                    Explore 
                    <ArrowRight size={18} />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  );

  // Add display name for better debugging
  AnimatedTestimonials.displayName = "AnimatedTestimonials";