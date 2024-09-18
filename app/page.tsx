"use client";
import { useState, useEffect } from "react";
import { IFood, IFoodReduced } from "./types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { CommandList } from "cmdk";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [foods, setFoods] = useState<IFoodReduced[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const route = useRouter();

  const fetchFood = async () => {
    const response = await fetch("/api/foods/all");
    const data = await response.json();
    setIsloading(false);

    const foodReduce = data.map((food: IFood) => ({
      value: food?.name.toLowerCase().replace(/ /g, "-"),
      label: food?.name,
    }));
    setFoods(foodReduce);
  };

  useEffect(() => {
    fetchFood();
  }, []);

  // useEffect(() => {
  //   if (value.length > 0) {
  //     route.push(`/foods/${value}`);
  //   }
  // }, [value]);

  return (
    <div className="">
      {!isLoading ? (
        <div className="w-screen h-screen justify-center flex flex-col gap-3 items-center ">
          <h1 className="text-green-300 text-5xl">Welcome to my recetes app</h1>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="default"
                role="combobox"
                aria-expanded={open}
                className="w-[300px] p-3 justify-between"
              >
                {value
                  ? foods.find((food) => food.value === value)?.label
                  : "Select food..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0 ">
              <Command className=" text-black">
                <CommandInput placeholder="Search food..." />
                <CommandEmpty>No food found.</CommandEmpty>
                <CommandList>
                  {foods.map((food) => (
                    <CommandItem
                      key={food.value}
                      value={food.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                        route.push(`food/${food.value}`);
                      }}
                      onClick={() => {}}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === food.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div
                        onClick={() => {
                          route.push(`f/${food.value}`);
                        }}
                      >
                        {food.label}
                      </div>
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-white text-3xl">Loading....</h1>
        </div>
      )}
    </div>
  );
}
