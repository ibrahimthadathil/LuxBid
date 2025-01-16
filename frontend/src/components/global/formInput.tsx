import React from "react";
import { FieldError, useForm,  } from "react-hook-form";
import { useTheme } from "../theme/theme-provider";

interface props{
    // value:string;
    type:string;
    holder:string
    validation : string
    FormState : ReturnType<typeof useForm<any>>["register"];
    error?: string | undefined | FieldError;
}
const FormInput = ({type ,holder ,validation , FormState,error }:props) => {
const {theme}= useTheme()
  return (
    <>
    <input
            // value={value}
            type={type}
            placeholder={holder}
            {...FormState(validation)}
            className={` p-2 w-[55%] ${error&&"errInput"} sm:w-[65%] mb-3  ${theme=='dark'?'bg-zinc-900 text-gray-50':'bg-gray-100 text-black'} border-white rounded-md placeholder-zinc-500  focus:outline-none focus:ring-1 focus:ring-neutral-700`}
          />
    </>
  )
}

export default React.memo(FormInput)

