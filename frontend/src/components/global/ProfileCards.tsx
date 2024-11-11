
const ProfileCards = () => {
  return (
    <div className="flex flex-col items-center h-full justify-center  text-gray-300">
          <h1 className="text-3xl mb-8">
            I would Like To Continue AS a ?
          </h1>
          <div className="flex space-x-8">
            <div className="bg-card p-6 rounded-xl shadow-2xl  items-center hover:shadow-[#5b4bae19] flex flex-col ">
              <h2 className="text-xl font-semibold text-[#5b4baeea] mb-4">
                Organizer
              </h2>
              <ul className="space-y-2">
                <li>✔ Can organize an auction</li>
                <li>✔ Can create a post</li>
                <li>✔ Can place a bid</li>
              </ul>
              <button className="mt-4 border py-2 px-4 rounded hover:bg-[#5b4bae]">
                Proceed
              </button>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-2xl hover:shadow-[#5b4bae19]  items-center flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-[#5b4baeec] ">
                Buyer
              </h2>
              <ul className="space-y-2">
                <li>✖ Can't organize an auction</li>
                <li>✖ Can't create a post</li>
                <li>✔ Can only place a bid</li>
              </ul>
              <button className="mt-4 border py-2 px-4 rounded hover:bg-[#5b4bae] ">
                Proceed
              </button>
            </div>
          </div>
        </div>
  )
}

export default ProfileCards
