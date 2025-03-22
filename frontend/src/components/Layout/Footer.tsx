import Icon from "@/assets/images/BrandIcon.png";
import FooterLinks from "./FooterLink";
import { useTheme } from "../theme/theme-provider";

const Footer = () => {
  const {theme} = useTheme()
  return (
    <footer className={`${theme=='dark'?"text-white bg-black":'text-black bg-white'} pt-12 pb-8`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:ms-0">
          {/* Newsletter Section - Takes 12 columns on small screens, 4 on medium */}
          <div className="md:col-span-4 flex items-center space-x-4 sm:space-x-8">
            <div className="rounded-lg flex items-center justify-center">
              <img
                src={Icon}
                alt="Newsletter Icon"
                className="w-[8rem] md:w-[10rem]"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg md:text-xl font-semibold leading-tight">
                <span className="bg-gradient-to-r from-gray-500 to-[#362d66] bg-clip-text text-transparent">
                  Join The Exclusive Auction &
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#362d66] to-gray-500 bg-clip-text text-transparent">
                  Get The Finest
                </span>
              </h2>
              <p className="text-gray-400 font-thin max-w-sm text-sm md:text-base leading-snug">
                Explore on the world's best & largest Bidding marketplace with
                our beautiful Bidding products.
              </p>
            </div>
          </div>

          {/* Footer Links Section - Adjusts across breakpoints */}
          <FooterLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
