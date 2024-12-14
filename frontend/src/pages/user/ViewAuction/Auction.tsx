'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ArrowLeft, ChevronDown, Users2, ChevronLeft, ChevronRight, ZoomIn, Clock } from 'lucide-react'
import { Button } from "@/components/ui/Button"

const AuctionPage = React.memo(() => {
    console.log('rendering post');
    
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [openSection, setOpenSection] = useState<string | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const zoomRef = useRef<HTMLDivElement>(null)

  const images = [
    "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVhcmwlMjBuZWNrbGFjZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVhcmwlMjBuZWNrbGFjZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlYXJsJTIwbmVja2xhY2V8ZW58MHx8MHx8fDA%3D"
  ]
  const toggleSection = useCallback((section: string) => {
    setOpenSection(prevSection => prevSection === section ? null : section)
  },[])

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !zoomRef.current) return

    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomPosition({ x, y })
  }, [])

  const handleMouseEnter = useCallback(() => setIsZoomed(true), [])
  const handleMouseLeave = useCallback(() => setIsZoomed(false), [])

  useEffect(() => {
    const zoomElement = zoomRef.current
    if (zoomElement && isZoomed) {
      zoomElement.style.backgroundImage = `url(${images[currentImageIndex]})`
      zoomElement.style.backgroundPosition = `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`
    }
  }, [currentImageIndex, zoomPosition, isZoomed, images])

  return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-10">
        {/* Back Button */}
        <button className="mb-6 rounded-full w-12 h-12 flex items-center justify-center border border-white text-indigo-400">
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="flex flex-col lg:flex-row gap-8 items-start px-10">
          {/* Left Column */}
          <div className="lg:w-1/4 space-y-6">
            {/* Title with gradient */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif bg-gradient-to-b from-[#426D9F] via-[#426D9F] to-[#A7534E] bg-clip-text text-transparent leading-tight pt-1">
              Pearl
              <br />
              Necklace
              <br />
              By
              <br />
              Elizabeth
            </h1>

            {/* Stats */}
            <div className="flex items-center gap-4 text-gray-300">
              <div className="flex items-center gap-2">
                <Users2 className="w-4 h-4" />
                <span>6.5k</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span>Live</span>
              </div>
            </div>

            {/* Timer */}
            <div className="text-gray-300 flex gap-2">
             <Clock/> 1 hr 20 minutes
            </div>

            {/* Current Bid */}
            <div className="inline-block">
              <div className="border border-[#5b5bae] rounded-full px-4 py-3">
                <span className="text-gray-100 ">Current Bid </span>
                <span className="text-white font-thin"> ₹ 76567</span>
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
            <div 
              className="w-full max-w-[290px] aspect-[3/4] rounded-t-full overflow-hidden border relative cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                ref={imageRef}
                src={images[currentImageIndex]}
                alt={`Pearl Necklace ${currentImageIndex + 1}`}
                className="object-cover w-full h-full"
              />
              {isZoomed && (
                <div 
                  ref={zoomRef}
                  className="absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full shadow-lg pointer-events-none z-20"
                  style={{
                    backgroundSize: '1000%',
                    transform: `translate(${zoomPosition.x * 100}%, ${zoomPosition.y * 100}%)`,
                    transformOrigin: 'center',
                  }}
                />
              )}
              
            </div>
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
                onClick={() => toggleSection('description')}
              >
                Description
                <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'description' ? 'rotate-180' : ''}`} />
              </Button>
              {openSection === 'description' && (
                <div className="p-4 text-sm text-gray-300">
                  This exquisite pearl necklace features hand-selected, lustrous pearls carefully strung to create a timeless piece of elegance. Each pearl has been chosen for its perfect shape, size, and glow, resulting in a necklace that exudes sophistication and grace.
                </div>
              )}

              <Button 
                variant="ghost" 
                className="w-full justify-between text-lg font-normal border-b border-purple-500/20"
                onClick={() => toggleSection('status')}
              >
                Current status
                <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'status' ? 'rotate-180' : ''}`} />
              </Button>
              {openSection === 'status' && (
                <div className="p-4 text-sm text-gray-300">
                  The auction is currently live with 50 active bidders. The bidding has been intense, with the price steadily climbing. There's still time left for interested parties to place their bids and potentially win this stunning piece of jewelry.
                </div>
              )}

              <Button 
                variant="ghost" 
                className="w-full justify-between text-lg font-normal border-b border-purple-500/20"
                onClick={() => toggleSection('organizer')}
              >
                Organizer
                <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'organizer' ? 'rotate-180' : ''}`} />
              </Button>
              {openSection === 'organizer' && (
                <div className="p-4 text-sm text-gray-300">
                  <p>
                    This Auction is Organized by John peter.
                    <br />
                    contact : johnpeter@gmail.com
                  </p>
                </div>
              )}
            </div>

            {/* Join Button */}
            <Button 
              className="w-full bg-indigo-900 hover:bg-indigo-700 text-white py-6 text-lg"
            >
              Join Now
            </Button>
          </div>
        </div>
      </div>
  )
})

export default AuctionPage

