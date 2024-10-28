import { Home, ArrowLeft } from "lucide-react";
const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center max-w-2xl mx-auto relative">
        {/* Background decorative circle with glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#5b4bAE] rounded-full opacity-[0.15] blur-3xl"></div>
        
        <div className="relative">
          {/* Large 404 text with glow effect */}
          <h1 className="text-[12rem] font-extrabold text-white tracking-widest relative">
            <span className="absolute inset-0 text-[#5b4bAE] blur-lg">404</span>
            <span className="relative">404</span>
          </h1>

          <h2 className="mt-8 text-3xl font-bold text-white">
            Page Not Found
          </h2>
          
          <p className="mt-4 text-lg text-gray-400">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 w-40 px-4 py-2 rounded-md border border-[#5b4bAE] text-[#5b4bAE] hover:bg-[#5b4bAE] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#5b4bAE] focus:ring-opacity-50"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>

            <button 
              onClick={() => window.location.href = '/'}
              className="flex items-center justify-center gap-2 w-40 px-4 py-2 rounded-md bg-[#5b4bAE] text-white hover:bg-[#4a3d8f] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5b4bAE] focus:ring-opacity-50"
            >
              <Home size={20} />
              Back to Home
            </button>
          </div>

          {/* Optional contact support link */}
          <p className="mt-8 text-gray-500">
            Need help? <button className="text-[#5b4bAE] hover:text-[#4a3d8f] hover:underline focus:outline-none">Contact support</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;