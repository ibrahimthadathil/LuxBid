import React, { useState, useRef, useCallback } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Users2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useRQ } from "@/hooks/userRQ";
import { viewAuction } from "@/service/Api/auctionApi";
import { toast } from "sonner";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import moment from "moment";
const AuctionPage = React.memo(() => {
  console.log("rendering post");
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || "";
  if (!id) {
    navigate("/deals");
    toast.warning("Choose an Auction");
  }
  const { isLoading, data } = useRQ(() => viewAuction(id), "detailed");
  console.log(data);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const toggleSection = useCallback((section: string) => {
    setOpenSection((prevSection) => (prevSection === section ? null : section));
  }, []);

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % data.post.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + data.post.images.length) % data.post.images.length
    );
  };

  return (
    !isLoading && (
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-10">
        {/* Back Button */}
        <button
          className="mb-6 rounded-full w-12 h-12 flex items-center justify-center border border-white text-indigo-400"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="flex flex-col lg:flex-row gap-8 items-start px-10">
          {/* Left Column */}
          <div className="lg:w-1/4 space-y-6">
            {/* Title with gradient */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif bg-gradient-to-b from-[#426D9F] via-[#426D9F] to-[#A7534E] bg-clip-text text-transparent leading-tight pt-1">
              {data.title.split(" ")[0]}
              <br />
              {data.title.split(" ")[1]}
              <br />
              {data.title.split(" ")[2] || "By"}
              <br />
              {data.title.split(" ")[3] || data.seller.firstName}
            </h1>

            {/* Stats */}
            <div className="flex items-center gap-4 text-gray-300">
              <div className="flex items-center gap-2">
                <Users2 className="w-4 h-4" />
                <span>{data.bidders.length}</span>
              </div>
              {data.auctionType == "Live" ? (
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span>Live</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                  <Calendar size={16} />
                  <span>Scheduled</span>
                </div>
              )}
            </div>

            {/* Timer */}
            <div className="text-gray-300 flex gap-2">
              <Clock />
              {moment(Date.now()).format("LLL") >
              moment(data.strtTime).format("LLL")
                ? `close on ${moment(data.endTime).format("LLL")}`
                : `Starts on $`}
            </div>

            {/* Current Bid */}
            <div className="inline-block">
              <div className="border border-[#5b5bae] rounded-full px-4 py-3">
                <span className="text-gray-100 ">Current Bid </span>
                <span className="text-white font-thin">
                  {" "}
                  ₹ {data.baseAmount}
                </span>
              </div>
            </div>
          </div>

          {/* Center Column (Image) */}
          <div className="lg:w-1/2 flex justify-center items-center relative">
            <button
              onClick={prevImage}
              className="absolute left-0 z-10 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <Zoom>
              <div className="w-full max-w-[290px] aspect-[3/4] rounded-t-full overflow-hidden border relative cursor-zoom-in">
                <img
                  ref={imageRef}
                  src={data.post.images[currentImageIndex]}
                  alt={`Pearl Necklace ${currentImageIndex + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </Zoom>
            <button
              onClick={nextImage}
              className="absolute right-0 z-10 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/4  space-y-6 pt-14  flex flex-col justify-center">
            {/* Accordion Sections */}
            {/* Accordion Sections */}
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-between text-lg font-normal border-b border-purple-500/20"
                onClick={() => toggleSection("description")}
              >
                Description
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openSection === "description" ? "rotate-180" : ""
                  }`}
                />
              </Button>
              {openSection === "description" && (
                <div className="p-4 text-sm text-gray-300">
                  {data.description}
                </div>
              )}

              <Button
                variant="ghost"
                className="w-full justify-between text-lg font-normal border-b border-purple-500/20"
                onClick={() => toggleSection("status")}
              >
                Current status
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openSection === "status" ? "rotate-180" : ""
                  }`}
                />
              </Button>
              {openSection === "status" && (
                <div className="p-4 text-sm text-gray-300">
                  The auction is currently <span className="text-indigo-500">{data.auctionType}</span> with {data.bidders.length} active bidders. The
                  bidding has been intense, with the price steadily climbing.
                  There's still time left for interested parties to place their
                  bids and potentially win this stunning piece of {data.post.title}.
                </div>
              )}

              <Button
                variant="ghost"
                className="w-full justify-between text-lg font-normal border-b border-purple-500/20"
                onClick={() => toggleSection("organizer")}
              >
                Organizer
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openSection === "organizer" ? "rotate-180" : ""
                  }`}
                />
              </Button>
              {openSection === "organizer" && (
                <div className="p-4 text-sm text-gray-300">
                  <p>
                    This Auction is Organized by {data.seller.firstName}.
                    <br />
                    contact : {data.seller.email}
                  </p>
                </div>
              )}
            </div>

            {/* Join Button */}
            <Button className="w-full bg-indigo-900 hover:bg-indigo-700 text-white py-6 text-lg">
              Join Now ₹ {data.entryAmt}
            </Button>
          </div>
        </div>
      </div>
    )
  );
});

export default AuctionPage;
