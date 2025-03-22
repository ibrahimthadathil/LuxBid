import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/components/theme/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Review {
  _id: string;
  clint: { firstName: string; profile: string };
  rate: string;
}

interface AverageRatingProps {
  rating: number;
  totalReviews: number;
  reviews: Review[];
}

const AverageRating = ({
  rating,
  totalReviews,
  reviews,
}: AverageRatingProps) => {
  const [showReviews, setShowReviews] = useState(false);
  const { theme } = useTheme();
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div
      className={`flex flex-col items-center justify-center shadow-inner p-6 ${
        theme == "dark" ? "bg-black" : "bg-gray-100"
      } rounded-lg  h-[300px]`}
    >
      {!showReviews ? (
        <>
          <h2 className="text-2xl font-semibold mb-2">Average Rating</h2>
          <div className="flex items-center mb-2">
            <span className="text-4xl font-bold mr-2">{rating.toFixed(1)}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < fullStars
                      ? "text-yellow-400 fill-yellow-400"
                      : i === fullStars && hasHalfStar
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Based on {totalReviews} reviews
          </p>
          <Button onClick={() => setShowReviews(true)}>View Reviews</Button>
        </>
      ) : (
        <>
          <div className="w-full flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">User Reviews</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowReviews(false)}
            >
              Back to Summary
            </Button>
          </div>
          <ScrollArea className="h-[200px] w-full rounded-md">
  {reviews.map((review) => (
    <div key={review._id} className="mb-4 pb-4 border-b last:border-b-0">
      <div className="flex items-center justify-between mb-2">
        {/* Profile and Name */}
        <div className="flex items-center gap-2">
          <Avatar className="border">
            {review?.clint?.profile ? (
              <AvatarImage
                src={review.clint.profile}
                alt={review.clint.firstName}
              />
            ) : (
              <AvatarFallback className="bg-indigo-700 text-white">
                {review?.clint?.firstName?.charAt(0).toUpperCase() || "?"}
              </AvatarFallback>
            )}
          </Avatar>
          <span className="font-semibold">{review?.clint?.firstName}</span>
        </div>
        {/* Rating at the End */}
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Number(review?.rate)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  ))}
</ScrollArea>

        </>
      )}
    </div>
  );
};

export default AverageRating;
