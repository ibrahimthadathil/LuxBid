import  { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { TZAddress, ZAddress } from "@/utils/validation/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAddress, deleteAddress, fetchAddress } from "@/service/Api/addressApi";
import { toast } from "sonner";
import { useRQ } from "@/hooks/userRQ";
import { TAddress } from "@/types/types";
import Loader from "@/components/global/Loader";
import { useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "@/redux/store/store";
import { selectedAddress } from "@/redux/slice/authSlice";
import useActionHook from "@/hooks/actionHook";


const Address = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isLoading } = useRQ(fetchAddress, "address");
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>()
  const selectedAddressId = useSelector((state: Rootstate) => state.user.address);
  const {handler} = useActionHook()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TZAddress>({
    resolver: zodResolver(ZAddress),
  });
  const handleAddAddress = async (datas: TZAddress) => {
    const { data } = await createAddress(datas);
    if (data.success) {
      reset();
      queryClient.invalidateQueries({ queryKey: ["address"] });
      toast.success(data.message);
    }
  };


    const handleCheckboxChange = (choosenAddressId: string) => {
      if (selectedAddressId === choosenAddressId) {
        dispatch(selectedAddress(null)); 
      } else {
        dispatch(selectedAddress(choosenAddressId));
      }
    };
  const handleDeleteAddress = async (_id: string) => {
    await handler(deleteAddress,_id,'address')
    // const {data} = await deleteAddress(_id)
    // if(data.s)
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Addresses</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(handleAddAddress)}
              className="grid gap-4 py-4"
            >
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="propertyName" className="text-right">
                  Property Name
                </Label>
                <Input
                  id="propertyName"
                  {...register("propertyName")}
                  className="col-span-3"
                />
                {errors.propertyName && (
                  <p className="text-red-500">{errors.propertyName.message}</p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="street" className="text-right">
                  Street
                </Label>
                <Input
                  id="street"
                  {...register("street")}
                  className="col-span-3"
                />
                {errors.street && (
                  <p className="text-red-500">{errors.street.message}</p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right">
                  City
                </Label>
                <Input id="city" {...register("city")} className="col-span-3" />
                {errors.city && (
                  <p className="text-red-500">{errors.city.message}</p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="state" className="text-right">
                  State
                </Label>
                <Input
                  id="state"
                  {...register("state")}
                  className="col-span-3"
                />
                {errors.state && (
                  <p className="text-red-500">{errors.state.message}</p>
                )}
              </div>
              <div className="grid grid-cols-4  items-center gap-4">
                <Label htmlFor="pincode" className="text-right">
                  Pincode
                </Label>
                <Input
                  id="pincode"
                  {...register("pincode")}
                  className="col-span-3"
                />
                {errors.pincode && (
                  <p className="text-red-500 text-xs w-ful">
                    {errors.pincode.message}
                  </p>
                )}
              </div>
              <Button type="submit">Add Address</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4">
          {isLoading ? (
            <Loader />
          ) : (data as TAddress[]).length === 0 ? (
            <p className="text-indigo-900">No addresses added yet.</p>
          ) : (
            (data as TAddress[]).map((address) => (
              <div
                key={address._id}
                className={`flex-shrink-0 w-64 p-4 border rounded-lg shadow-sm ${
                  selectedAddressId === address._id ? "border-blue-500" : ""
                }`}
              >
  <div className="flex justify-between items-start mb-2">
    <div className="flex items-start gap-3">
    <Checkbox checked={selectedAddressId === address._id}
                      onCheckedChange={() => handleCheckboxChange(address._id as string)} />
    <div>
        <p className="font-semibold">{address.propertyName}</p>
        <p>{address.street}</p>
        <p>{address.pincode}</p>
      </div>
    </div>
    <Button
      variant="ghost"
      size="icon"
      onClick={() => handleDeleteAddress(address._id as string)}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  </div>
</div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Address;
