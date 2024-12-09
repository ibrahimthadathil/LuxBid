import React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRQ } from "@/hooks/userRQ";
import { fetchApprovedPost } from "@/service/Api/productApi";
import Loader from "./Loader";
import { Tproduct } from "@/types/types";
import { useForm, Controller } from "react-hook-form";
import { TZauction, Zauction } from "@/utils/validation/auction";
import { zodResolver } from "@hookform/resolvers/zod";
import  TimeSelect  from "@/components/ui/TimeInput";
import { errorFn } from "@/utils/validation/user";
import useActionHook from "@/hooks/actionHook";
import { createAuction } from "@/service/Api/auctionApi";
import { useQueryClient } from "@tanstack/react-query";

const AuctionForm = () => {
  const { isLoading, data } = useRQ(fetchApprovedPost, "post"); // Fetching posts
  const {handler} = useActionHook()
  const queryclient = useQueryClient()
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<TZauction>({
    resolver: zodResolver(Zauction),
    defaultValues: { auctionType: "Live", post: "" },
  });
  const auctionStatus = watch("auctionType");

  const onSubmit = async (formData: TZauction) => {
    try {
      alert('data submitt')
      const response = await handler(createAuction,formData)
      if(response) {
        queryclient.invalidateQueries({queryKey:['auction']})
        reset();
      }
    } catch (error) {
      console.error("Auction creation failed:", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Left side - Post selection */}
      <div className="w-full sm:w-2/5">
        <h3 className="text-base font-semibold mb-2">Choose Post Type</h3>
        {isLoading ? (
          <Loader />
        ) : (
          <ScrollArea className="min-h-[100px] h-auto overflow-auto px-2">
            <div className="space-y-2 pr-2 p-6 ">
              {data?.length ? (
                (data as Tproduct[]).map((post) => (
                  <Card
                    key={post._id}
                    className={`cursor-pointer ${
                      watch("post") === post._id ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <CardContent
                      className="p-2 flex items-center space-x-3"
                      onClick={() => {
                        setValue("post", post._id);
                        clearErrors("post");
                      }}
                    >
                      <input
                        type="radio"
                        {...register("post")}
                        value={post._id}
                        className="sr-only "
                      />
                      <img
                        src={post.images[0]}
                        alt={post.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <Label
                        htmlFor={`post-${post._id}`}
                        className="font-medium text-sm"
                      >
                        {post.title}
                      </Label>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-red-500">No Approved Posts Available</p>
              )}
            </div>
          </ScrollArea>
        )}
      
      </div>

      {/* Right side - Auction details */}
      <div className="w-full sm:w-3/5">
        <h3 className="text-base font-semibold mb-2">Auction Details</h3>
        <form onSubmit={handleSubmit(onSubmit,errorFn)} className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} />
        
          </div>

          {/* Base Amount */}
          <div>
            <Label htmlFor="baseAmount">Base Amount</Label>
            <Input
              id="baseAmount"
              type="number"
              {...register("baseAmount", { valueAsNumber: true })}
            />
          </div>

          {/* Auction Type */}
          <div>
            <Label>Status</Label>
            <Controller
              name="auctionType"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex space-x-4"
                >
                  <div>
                    <RadioGroupItem value="Live" id="live" className="t"/>
                    <Label htmlFor="live">Live</Label>
                  </div>
                  <div>
                    <RadioGroupItem value="Scheduled" id="scheduled" />
                    <Label htmlFor="scheduled">Scheduled</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

           {/* Scheduled Date and Time Options */}
          {auctionStatus === "Scheduled" && (
            <>
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <TimeSelect
                    id="startTime"
                    label="Start Date and Time"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors?.startTime?.message || 'Invalid option of Starting'}
                  />
                )}
              />

              <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                  <TimeSelect
                    id="endTime"
                    label="End Date and Time"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.endTime?.message || 'Invalid option of Starting'}
                  />
                )}
              />
            </>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Create Auction
          </Button>
        </form>
      </div>
    </div>
  );
};

export default React.memo(AuctionForm);
