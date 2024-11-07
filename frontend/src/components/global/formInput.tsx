import { error } from "console";
import React from "react";
import { FieldError, FieldValues, useForm, UseFormRegister } from "react-hook-form";

interface props{
    // value:string;
    type:string;
    holder:string
    validation : string
    FormState : ReturnType<typeof useForm<any>>["register"];
    error?: string | undefined | FieldError;
}
const FormInput = ({type ,holder ,validation , FormState,error }:props) => {

  return (
    <>
    <input
            // value={value}
            type={type}
            placeholder={holder}
            {...FormState(validation)}
            className={` p-2 w-[55%] ${error&&"errInput"} sm:w-[65%] mb-3 text-gray-50 bg-zinc-900 border-white rounded-md placeholder-zinc-500  focus:outline-none focus:ring-1 focus:ring-neutral-700`}
          />
    </>
  )
}

export default React.memo(FormInput)

