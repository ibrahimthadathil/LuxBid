import React from "react";

interface props{
    value:string;
    type:string;
    holder:string
    setter : (valu:string)=>void
}
const FormInput = ({value ,type ,holder , setter }:props) => {
  return (
    <>
    <input
            value={value}
            type={type}
            placeholder={holder}
            onChange={(e) => setter(e.target.value)}
            className=" p-2 w-[55%] sm:w-[65%] mb-3 text-gray-50 bg-zinc-900 border-white rounded-md placeholder-zinc-500  focus:outline-none focus:ring-1 focus:ring-neutral-700"
          />
    </>
  )
}

export default React.memo(FormInput)

