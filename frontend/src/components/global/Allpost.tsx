import { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { Button } from "../ui/Button";
import { useRQ } from "@/hooks/userRQ";
import { viewAllAuctions } from "@/service/Api/auctionApi";
import Skeleton from "../ux/Skelton";
import { Tauction, Tproduct } from "@/types/types";
import Pagination from "../ux/Pagination";

interface FilterState {
  search: string;
  category: string;
  types: string;
  page: number;
  limit: number;
}

export default function PostGrid() {

  const [filters, setFilters] = useState<any>({
    search: "",
    category: "All",
    types: "All",
    page: 0,
    limit: 8
  });

  const query = new URLSearchParams({
    ...filters,
    skip: (filters.page * filters.limit).toString()
  }).toString();
  const { isLoading, data ,refetch} = useRQ(
    () => viewAllAuctions(query),
    "viewAll"
  );
 

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev:FilterState) => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? value : 0
    }));  
    
  };  
  const handlePageChange = (newPage: number) => {
    handleFilterChange('page', newPage - 1); 
  };
 
  const totalPages = Math.ceil((data?.total || 0) / filters.limit);
  console.log(data);
  return (
    <div className="container mx-auto p-10 space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            className="pl-8"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        <Select 
          value={filters.category} 
          onValueChange={(value) => handleFilterChange('category', value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {data?.category?.map((item: string) => (
              <SelectItem key={item} value={item}>{item}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={filters.types} 
          onValueChange={(value) => handleFilterChange('types', value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Live">Live</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>
      </div>
  
      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(filters.limit)].map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : ( 
        <> 
        {data?.data?.length==0&&<p className="text-center">0 Matching result</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 pt-5 lg:grid-cols-3 min-h-[360px]  xl:grid-cols-4 gap-4">
          {(data?.data as Tauction[])?.map((post) => (
            <Card key={post._id} className="overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src={(post?.post as Tproduct).images[0]}
                  alt={post?.title}
                  className="object-cover w-full h-full"
                />
                {post?.auctionType === 'Live' && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                    LIVE
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold line-clamp-2 mb-2">{post.title}</h3>
                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground line-clamp-2 flex gap-2">
                    <div>
                      {post.description.slice(0, 50)}
                      <span className="text-white">...more</span>
                    </div>
                  </p>
                  <Button>Join</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div> 
        
        </>
      )}

      {/* Pagination */}
      <Pagination 
        currentPage={filters.page + 1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
