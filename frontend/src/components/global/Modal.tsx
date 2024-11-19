import { TZpost, ZPost } from "@/utils/validation/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const Modal = ({ open }: { open: Function }) => {
  const [image, setImage] = useState("");
  const {
    register, 
    handleSubmit, 
    reset, 
    formState: { errors }
  } = useForm<TZpost>({
    resolver: zodResolver(ZPost)
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];
    if (files) {
      const newImages = URL.createObjectURL(files);
      setImage(newImages);
    }
  };

  const onSubmit: SubmitHandler<TZpost> = (data) => {
    // Handle form submission
    console.log(data);
    reset(); // Reset form after submission
    open(false); // Close modal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="sm:max-w-[400px] w-full bg-black border border-zinc-800 rounded-lg p-6 relative">
        <button
          onClick={() => open(false)}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-zinc-400 font-normal text-xs mb-4">Create Post</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 py-3">
          <div className="flex items-center justify-center">
            <label className={`flex flex-col items-center ${errors.file?"border-red-900":"border-zinc-800"} justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer  bg-zinc-900 hover:bg-zinc-800`}>
              <div className="flex flex-col items-center justify-center pt-3 pb-4">
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded preview"
                    className="max-h-32 object-contain"
                  />
                ) : (
                  <div className="text-zinc-500 text-center">
                    <svg
                      className="w-6 h-6 mb-2 mx-auto"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="text-xs">Click to upload</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                {...register('file',{
                    onChange:handleImageUpload
                })}
                // onChange={e=>{
                //     handleImageUpload(e)
                // }}
                accept="image/*"
                multiple
              />
            </label>
          </div>
          {errors.file && (
            <p className="text-red-500 text-xs mt-1">{errors.file.message}</p>
          )}

          <input
            type="text"
            {...register('title')}
            placeholder="Title Of the Post"
            className={`w-full p-2 bg-zinc-900 border ${errors.title ? 'border-red-500' : 'border-zinc-800'} rounded text-sm text-white`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}

          <input
            type="number"
            {...register('price', { valueAsNumber: true })}
            placeholder="Price of the product"
            className={`w-full p-2 bg-zinc-900 border ${errors.price ? 'border-red-500' : 'border-zinc-800'} rounded text-sm text-white`}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}

          <select 
            {...register('category')}
            className={`w-full p-2 bg-zinc-900 border ${errors.category ? 'border-red-500' : 'border-zinc-800'} rounded text-sm text-white`}
            defaultValue=""
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home & Garden</option>
            <option value="sports">Sports</option>
            <option value="other">Other</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
          )}

          <textarea 
            {...register('description')}
            placeholder="Description"
            className={`w-full p-2 bg-zinc-900 border ${errors.description ? 'border-red-500' : 'border-zinc-800'} rounded text-sm text-white h-24`}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
          )}

          <button 
            type="submit" 
            className="w-full p-2 bg-purple-700 hover:bg-purple-600 text-white rounded text-sm"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default React.memo(Modal);