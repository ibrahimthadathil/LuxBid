import { useRQ } from "@/hooks/userRQ";
import {
  createPost,
  fetchCategory,
  updatePost,
} from "@/service/Api/productApi";
import { Tcategory } from "@/types/user";
import { TZpost, TZpostEditing, ZPost, ZPostEditing } from "@/utils/validation/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, Loader2, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "@/components/global/Loader";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { DialogClose } from "@radix-ui/react-dialog";
import { AxiosError } from "axios";

interface Props<T> {
  post?: T;
}

const Modal = <T extends Record<string, any>>({ post }: Props<T>) => {
  const [images, setImages] = useState<string[]>(() =>post ? post.images : []);
  const [imagefiles, setFiles] = useState<File[]>([]);
  const ref = useRef<HTMLButtonElement>(null);
  const [spin, setSpin] = useState<boolean>(false);
  const { isLoading, data } = useRQ(fetchCategory, "category");
  const queryClient = useQueryClient();
  console.log(imagefiles);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TZpost | TZpostEditing>({
    resolver: zodResolver(ZPostEditing),
    defaultValues: post
      ? {
          title: post.title || "",
          price: post.price || 0,
          category: post.category.name || "",
          description: post.description || "",
          file:images,
        }
      : {},
  });
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      const newFiles = Array.from(files).map((file) => file);
      setFiles((pre) => [...pre, ...newFiles]);
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };
  useEffect(()=>{
    setValue("file",images)
  },[images])

  const onSubmit: SubmitHandler<TZpost | TZpostEditing> = async (datas: TZpost | TZpostEditing) => {
    try {
      const formData = new FormData();
      formData.append("title", datas.title);
      formData.append("price", datas.price.toString());
      formData.append("category", datas.category);
      formData.append("description", datas.description);
      let newImages=images.filter(e=>!e.includes("blob"));
      if(post)formData.append('preImg',newImages.join(','))
      imagefiles.forEach((file) => {
        formData.append(`images`, file);
      });
      setSpin(true);
      const { data } = post ? await updatePost(post._id, formData): await createPost(formData);      
      setSpin((pre) => !pre);
      reset();
      ref.current?.click();
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["post"] });
        toast.success(data.message);
      }else toast.warning(data.message);
    } catch (error) {
      setSpin((pre) => !pre);
      toast.error(((error as AxiosError).response?.data as Record<string,any>).message)
    }
  };


  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="sm:max-w-[400px] w-full bg-black border border-zinc-800 rounded-lg p-6 relative">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <DialogClose asChild>
                <button
                  ref={ref}
                  className="absolute right-4 top-4 text-zinc-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </DialogClose>

              <h2 className="text-zinc-400 font-normal text-xs mb-4">
                Create Post
              </h2>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-3 py-3"
              >
                <div className="flex items-center justify-center">
                  <label
                    className={`flex flex-col items-center ${
                      errors.file ? "border-red-900" : "border-zinc-800"
                    } justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-zinc-900 hover:bg-zinc-800`}
                  >
                    {images[images.length - 1] ? (
                      <img
                        src={images[images.length - 1]}
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
                      {...register("file", {
                        onChange: handleImageUpload,
                        value: images as unknown as any,
                      })}
                      accept="image/*"
                      multiple
                    />
                  </label>
                </div>
                {images.length > 0 && (
                  <div className="flex h-24 gap-2 mb-3 overflow-x-auto py-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative flex-shrink-0 ">
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
                )}
                {errors.file && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.file.message}
                  </p>
                )}

                {/* Rest of the form remains the same */}
                <input
                  type="text"
                  {...register("title")}
                  placeholder="Title Of the Post"
                  className={`w-full p-2 bg-zinc-900 border ${
                    errors.title ? "border-red-500" : "border-zinc-800"
                  } rounded text-sm text-white`}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
                <input
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="Price of the product"
                  className={`w-full p-2 bg-zinc-900 border ${
                    errors.price ? "border-red-500" : "border-zinc-800"
                  } rounded text-sm text-white`}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}

                <select
                  {...register("category")}
                  className={`w-full p-2 bg-zinc-900 border ${
                    errors.category ? "border-red-500" : "border-zinc-800"
                  } rounded text-sm text-white`}
                  defaultValue={post?.category || ""}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {(data as Tcategory[]).map((item) => {
                    return <option key={item._id}>{item.name}</option>;
                  })}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.category.message}
                  </p>
                )}

                <textarea
                  {...register("description")}
                  placeholder="Description"
                  className={`w-full p-2 bg-zinc-900 border ${
                    errors.description ? "border-red-500" : "border-zinc-800"
                  } rounded text-sm text-white h-24`}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}

                <button
                  disabled={spin}
                  type="submit"
                  className={`w-full p-2 bg-[#5b4bae] hover:bg-[#5b4bae75] text-white rounded text-sm ${
                    spin ? "opacity-70" : ""
                  }`}
                >
                  {spin ? (
                    <div className="flex gap-2 justify-center ">
                      <Loader2 />
                      <p>{post ? 'Updating...':'Creating...'}</p>
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-center">
                      <CloudUpload />
                      <p>{post ? "Update" : "Create"}</p>
                    </div>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(Modal);
