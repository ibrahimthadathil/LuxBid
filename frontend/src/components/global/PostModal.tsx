"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "../ui/scroll-area";

interface modalProps<T> {
  data: T;
  images?: string[];
  sideContent: {
    header: string;
    render?: (item: T, i: number) => React.ReactNode;
  }[];
}
export function PostModal<T extends Record<string, any>>({
  data,
  sideContent,
  images,
}: modalProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [postImages] = useState<string[]>(() =>
    images ? images : data.images
  );
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === postImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? postImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">view</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div className="relative">
            <div className="overflow-hidden rounded-lg aspect-w-3 aspect-h-4">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {postImages.map((item: string, i: number) => (
                  <div
                    key={i}
                    className="w-full max-h-[30rem] overflow-hidden flex-shrink-0"
                  >
                    <img className="w-full  object-cover" src={item} alt="" />
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-2 transform -translate-y-1/2"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-2 transform -translate-y-1/2"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
          {/* {right side of the imgae view div} */}
          <ScrollArea className="h-[450px] w-full rounded-md  p-6">
            <div className="flex flex-col space-y-4 pr-4">
              {sideContent.map((item, index) => (
                <div key={index} className="space-y-2">
                  <h2 className="text-lg  text-primary">
                    {item.header}
                  </h2>
                  <Separator className="my-2" />
                  <div className="text-sm ">
                    {item.render ? item.render(data, index) : null}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
