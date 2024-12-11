const BottomBar = () => {
  return (
    <div className="pt-3 border-t px-5 mb-3 border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 LUX BID. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-purple-500">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-purple-500">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-purple-500">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-purple-500">LinkedIn</a>
          </div>
        </div>
  )
}

export default BottomBar
