import { useTheme } from "../theme/theme-provider"

const ProfileCards = ({buyer ,seller}:{buyer:Function,seller:Function}) => {
 const {theme}=useTheme()
  return (
   <>
    
         <div className="flex flex-col items-center h-full justify-center  text-gray-300">
         <h1 className={`text-3xl mb-8 ${theme=='dark'?"":"text-black"}`}>
           I would Like To Continue As a ?
         </h1>
         <div className="flex space-x-8">
           <div className="bg-background  p-6 rounded-xl shadow-2xl  items-center hover:shadow-[#5b4bae19] flex flex-col ">
             <h2 className="text-xl font-semibold text-[#5b4baeea] mb-4">
               Organizer
             </h2>
             <ul className={`space-y-2 ${theme=='dark'?'':'text-black'}`}>
               <li>✔ Can organize an auction</li>
               <li>✔ Can create a post</li>
               <li>✔ Can place a bid</li>
             </ul>
             <button className={`mt-4 border border-white py-2 px-4 ${theme=='light'?"bg-indigo-700 text-white ":"hover:border-none"} rounded hover:bg-[#5b4bae] `}  onClick={()=>seller()}>
               Proceed
             </button>
           </div>
           <div className="bg-background p-6 rounded-xl shadow-2xl hover:shadow-[#5b4bae19]  items-center flex flex-col">
             <h2 className="text-xl font-semibold mb-4 text-[#5b4baeec] " >
               Buyer
             </h2>
             <ul className={`space-y-2 ${theme=='dark'?'':'text-black'}`}>
               <li>✖ Can't organize an auction</li>
               <li>✖ Can't create a post</li>
               <li>✔ Can only place a bid</li>
             </ul>
             <button className={`mt-4 border border-white py-2 px-4 ${theme=='light'?"bg-indigo-700 text-white ":"hover:border-none"} rounded hover:bg-[#5b4bae] `} onClick={()=>buyer()}>
               Proceed
             </button>
           </div>
         </div>
       </div>
    
   </>
  )
}

export default ProfileCards
