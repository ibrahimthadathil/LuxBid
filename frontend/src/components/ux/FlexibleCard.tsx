import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface FlexibleCardProps {
  title: string;
  description: string;
  imageUrl:string,
  _id?:string ,
  baseAmount:number;
  size?: "small" | "medium" | "large";
  className?: string;
  onButtonClick: (id:string) => void;
}

export function FlexibleCard({
  title,
  description,
  imageUrl,
  _id,
  baseAmount,
  size = "medium",
  className,
  onButtonClick,
}: FlexibleCardProps) {
  const sizeClasses = {
    small: "max-w-xs",
    medium: "w-full",
    large: "max-w-md",
  }
  
  return (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-lg shadow-md overflow-hidden flex flex-col",
        "transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:-translate-y-1 shadow border",
        sizeClasses[size],
        className
      )}
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-56 object-fit transition-transform duration-300 ease-in-out hover:scale-105"
      />
      <div className="p-4 flex-grow">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description.slice(0,100)}<span className="text-white"> ...more</span></p>
      </div>
      <div className="p-4 flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={()=>onButtonClick(_id as string)}
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"        >
          ₹ {baseAmount}
        </Button>
      </div>
    </div>
  );
}
