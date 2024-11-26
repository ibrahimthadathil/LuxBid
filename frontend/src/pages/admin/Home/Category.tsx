import { useState } from "react";
import { Eye, EyeOff, Layers3, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, TCateForm } from "@/utils/validation/admin";
import DataTable from "@/components/global/dataTable";
import { Tcategory } from "@/types/user";
import { AlertModal } from "@/components/global/AlertModal";

const data = [
  {
    _id: "64afc8e29c1234abc567890d",
    name: "Electronics",
    isActive: true,
    createdAt: "12/45/2001",
  },
];

const columns = [
  {
    key: "NO",
    header: "ItemID",
    render: (e: Tcategory, i: number) => `#LBCY${i + 101}`,
  },
  { key: "name", header: "Name" },
  { key: "createdAt", header: "Created" },
  {
    key: "isActive",
    header: "Status",
    render: (item: Tcategory, i: number) => (
      <span
        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
          item.isActive ? "text-green-700" : "text-red-700"
        }`}
      >
        {item.isActive ? "Active" : "Blocked"}
      </span>
    ),
  },
  {header:'Delete',render:()=>(
    <div className="flex justify-center items-center">
        <AlertModal contents={[<Trash2 size={20} color='#9d1a1a'/>,'Are you sure to Delete This Category']}/>
    
  </div>  )},
  {
    header: "List / Un-list",
    render: (item: Tcategory, i: number) => (
      <AlertModal
        contents={[
          <>
          {!item.isActive?<Eye color="#32661c"/>:<EyeOff color="#9d1a1a"/>}
          </>,
          <>
            Are you sure to{" "}
            {item.isActive ? (
              <span className="text-red-500">Un-list</span>
            ) : (
              <span className="text-green-500">List</span>
            )}{" "}
            this category?
          </>,
        ]}
        
      />
    ),
  },
  
];
const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm<TCateForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      isActive: "true",
    },
  });

  function onSubmit(values: TCateForm) {
    console.log(values);
    setIsModalOpen(false);
    form.reset();
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Layers3 className="h-6 w-6" />
          Category
        </h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter category name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="true" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Listed
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="false" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Unlisted
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default Category;
