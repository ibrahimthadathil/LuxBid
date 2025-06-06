import { Award, Gavel, Shield, Users } from "lucide-react"
import { Link } from "react-router-dom"
import Team from "../../../../public/Team.png"
import { useTheme } from "@/components/theme/theme-provider"
import { HeroHighlight } from "@/components/ui/hero-highlight"
export default function AboutPage() {
  const {theme} = useTheme()
  return (
    <div className={`${theme=='dark'?'bg-black':'bg-white'} text-white w-full`}>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full ">
        <HeroHighlight bg={`${theme=='dark'?"bg-black":"bg-white"}`}>

        <div className={`absolute inset-0 z-0 `}>
        
          <div className="absolute inset-0 " />
        </div>
        <div className="container relative z-10 flex bg-transparent h-full flex-col items-center justify-center px-4 text-center">
          <h1 className={`mb-4 text-4xl font-bold tracking-tight ${theme=='dark'? 'text-white':'text-zinc-300'} sm:text-5xl md:text-6xl font-medium`}>
            About <span className="text-indigo-800">LuxBid</span>
          </h1>
          <p className={`max-w-2xl text-lg ${theme=='dark'?'text-gray-300':'text-zinc-600'} sm:text-xl`}>
            The premier online auction platform connecting buyers and sellers worldwide
          </p>
        </div>
          </HeroHighlight>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <h2 className={`mb-6 text-3xl font-bold tracking-tight sm:text-4xl ${theme=='dark'?'text-gray-300':'text-indigo-900'}`}>Our Story</h2>
                <div className={`space-y-4 ${theme=='dark'?'text-gray-300':'text-zinc-600'}`}>
                  <p>
                    Founded in 2024, LuxBid emerged from a vision to revolutionize the traditional auction
                    experience. Our founders, seasoned experts in e-commerce and digital marketplaces, recognized the
                    need for a transparent, secure, and accessible auction platform.
                  </p>
                  <p>
                    What began as a small startup has quickly grown into a trusted marketplace where collectors,
                    enthusiasts, and everyday shoppers can discover unique items and secure great deals through a fair
                    bidding process.
                  </p>
                  <p>
                    Today, LuxBid hosts thousands of auctions monthly, connecting buyers and sellers from over 50
                    countries, while maintaining our core values of transparency, security, and exceptional user
                    experience.
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-xl">
                <img src={Team} alt="Our team"  className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-indigo-700 py-16 md:py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Our Mission & Vision</h2>
              <p className="mx-auto max-w-2xl text-lg text-indigo-100">
                We're committed to creating the most trusted auction environment online
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-xl bg-indigo-800 p-8">
                <h3 className="mb-4 text-2xl font-bold">Our Mission</h3>
                <p className="text-indigo-100">
                  To provide a secure, transparent, and user-friendly auction platform that connects buyers with unique
                  items and helps sellers maximize their returns, while ensuring a fair and enjoyable bidding experience
                  for all participants.
                </p>
              </div>
              <div className="rounded-xl bg-indigo-800 p-8">
                <h3 className="mb-4 text-2xl font-bold">Our Vision</h3>
                <p className="text-indigo-100">
                  To become the world's most trusted online auction marketplace, known for our integrity, innovation,
                  and commitment to customer satisfaction, while continuously expanding our offerings to serve diverse
                  markets and communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className={`container px-4 `}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className={`mb-4 text-3xl font-bold tracking-tight sm:text-4xl ${theme=='dark'?'text-gray-300':'text-indigo-800'}`}>How LuxBid Works</h2>
              <p className={`mx-auto max-w-2xl text-lg ${theme=='dark'?'text-gray-300':'text-zinc-600'} `}>
                Our platform makes buying and selling through auctions simple and secure
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-gray-800 p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-700">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className={`${theme=='dark'?'text-gray-200':'text-zinc-600'} mb-2 text-xl font-bold`}>Register</h3>
                <p className="text-gray-400">Create your free account to start bidding or selling on our platform</p>
              </div>
              <div className="rounded-xl border border-gray-800 p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-700">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className={`${theme=='dark'?'text-gray-200':'text-zinc-600'} mb-2 text-xl font-bold`}>Verify</h3>
                <p className="text-gray-400">Complete our simple verification process to ensure platform security</p>
              </div>
              <div className="rounded-xl border border-gray-800 p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-700">
                  <Gavel className="h-8 w-8" />
                </div>
                <h3 className={`${theme=='dark'?'text-gray-200':'text-zinc-600'} mb-2 text-xl font-bold`}>Bid or Sell</h3>
                <p className="text-gray-400">Browse auctions to place bids or list your items for sale</p>
              </div>
              <div className="rounded-xl border border-gray-800 p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-700">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className={`${theme=='dark'?'text-gray-200':'text-zinc-600'} mb-2 text-xl font-bold`}>Win & Deliver</h3>
                <p className="text-gray-400">Secure payment processing and reliable delivery tracking</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={` ${theme=='dark'?'from-black to-indigo-950 bg-gradient-to-b':'bg-indigo-700'}  py-16 md:py-24`}>
        <div className="container px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Our Leadership Team</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-300">Meet the experts behind LuxBid's success</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
              {[
                {
                  name: "Alex Johnson",
                  role: "CEO & Co-Founder",
                  bio: "15+ years in e-commerce and digital marketplaces",
                },
                {
                  name: "Sarah Chen",
                  role: "CTO",
                  bio: "Former tech lead at major online marketplace platforms",
                },
                {
                  name: "Michael Rodriguez",
                  role: "Head of Operations",
                  bio: "Expert in logistics and supply chain management",
                },
              ].map((member, index) => (
                <div key={index} className={`rounded-xl ${theme=='dark'?'bg-black/50':'bg-white'}  p-6`}>
                  <div className="mb-4 aspect-square overflow-hidden rounded-full border">
                    <img
                      src={`https://eu.ui-avatars.com/api/?name=${member.name}&size=250`}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="h-full opacity-50 w-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className={`text-xl font-bold ${theme=='dark'?'text-white':'text-indigo-950'}`}>{member.name}</h3>
                    <p className="mb-2 text-indigo-400">{member.role}</p>
                    <p className="text-gray-400">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl rounded-2xl bg-indigo-700 p-8 text-center sm:p-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Ready to Start Bidding?</h2>
            <p className="mb-8 text-lg text-indigo-100">
              Join thousands of satisfied users on LuxBid and discover unique items at great prices
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/signup"
                className="rounded-lg bg-white px-6 py-3 text-lg font-medium text-indigo-700 shadow-lg hover:bg-gray-100"
              >
                Create Account
              </Link>
              <Link
                to="/AllDeals"
                className="rounded-lg border border-white px-6 py-3 text-lg font-medium text-white hover:bg-indigo-600"
              >
                Browse Auctions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
