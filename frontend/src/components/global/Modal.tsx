import { createPost } from "@/service/Api/productApi";
import { Tcategory } from "@/types/user";
import { TZpost, ZPost } from "@/utils/validation/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { Files, X } from "lucide-react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const Modal = ({ open, category }: { open: Function, category: Tcategory[] }) => {
  const [images, setImages] = useState<string[]>([]);
  const [imagefiles,setFiles]=useState<any[]>([])
  const {
    register, 
    handleSubmit, 
    reset, 
    formState: { errors }
  } = useForm<TZpost>({
    resolver: zodResolver(ZPost)
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => 
        
        URL.createObjectURL(file)
      );
      const newFiles = Array.from(files).map(file=>file)
      setFiles(pre=>[...pre,...newFiles])
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove)); 

  };

  const onSubmit: SubmitHandler<TZpost> = async(datas:TZpost) => {
    try {
      const formData = new FormData();
      console.log(imagefiles);
      formData.append('title', datas.title);
      formData.append('price', datas.price.toString());
      formData.append('category', datas.category);
      formData.append('description', datas.description);
      imagefiles.forEach((file) => {
        formData.append(`images`,file);
      });
      await createPost(formData)
    reset();
    open(false);
    } catch (error) {
      
    }
    
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
            <label 
              className={`flex flex-col items-center ${errors.file ? "border-red-900" : "border-zinc-800"} justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-zinc-900 hover:bg-zinc-800`}
            >
             {images[images.length-1] ? (
                  <img
                    src={images[images.length-1] }
                    alt="Uploaded preview"
                    className="max-h-32 object-contain"
                  />
                ) : (
                  <div className="text-zinc-500 text-center">
                    <svg
                      className="w-4 h-4 mb-2 mx-auto"
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
              <input
                type="file"
                className="hidden"
                {...register('file', {
                  onChange: handleImageUpload
                })}
                accept="image/*"
                multiple
              />
            </label>
          </div>
          {
            images.length> 0 && (
              <div className="flex h-24 gap-2 mb-3 overflow-x-auto py-2">
                {images.map((image, index) => (
        <div 
          key={index} 
          className="relative flex-shrink-0 "
        >
          <div className="relative">
            <img
              src={image}
              alt={`Uploaded preview ${index + 1}`}
              className="w-20 h-20 rounded-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              X
            </button>
          </div>
        </div>
      ))}
              </div>
            )
            
            
          }
          {errors.file && (
            <p className="text-red-500 text-xs mt-1">{errors.file.message}</p>
          )}

          {/* Rest of the form remains the same */}
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
            {
              category.map((item)=>{
               return <option key={item._id}>
                  {item.name}
                </option>
              })
            }
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
            className="w-full p-2 bg-[#5b4bae] hover:bg-[#5b4bae75] text-white rounded text-sm"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default React.memo(Modal);