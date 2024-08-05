"use client";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

import React, { useEffect, useState } from "react";
import { IFood, IMacronutrientData } from "@/app/types";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { log } from "console";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 100 },
];
const COLORS = ["#FFBB28", "#00C49F", "#FF8042"];

export default function Food({ params }: { params: { name: string } }) {
  const [food, setFood] = useState<IFood | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [macro, setMacro] = useState<IMacronutrientData[]>([]);
  const route = useRouter();
  const foodFetch = async () => {
    try {
      const response = await fetch(`/api/foods/${params.name}`);
      const data = await response.json();
      setFood(data);
      console.log(data);
      const Macronutri: IMacronutrientData[] = [
        {
          name: "protein",
          value: data.protein,
        },
        {
          name: "carbohydrates",
          value: data.carbohydrates,
        },
        {
          name: "fat",
          value: data.fat,
        },
      ];
      setMacro(Macronutri);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };
  const pourcentage = (item: number) => {
    const total = food!.carbohydrates + food!.fat + food!.protein;
    return parseFloat(((item / total) * 100).toFixed(2));
  };

  useEffect(() => {
    console.log(food?.vitamins);
    
    foodFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.name]);

  return (
    <div className="h-screen flex flex-col w-screen">
      <>
        {!isLoading && food && macro ? (
          <div className="flex flex-col h-full w-full">
            <div className="p-8">
              <Undo2
                className="text-white mb-4 cursor-pointer bg-black w-10 h-10 p-2 rounded-xl"
                onClick={() => {
                  route.back();
                }}
              />
              <h1 className="text-white sm:text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                {food.name}
              </h1>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start w-full">
              <div className="w-full  md:w-1/2 lg:w-1/3 mb-8 md:mb-0">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={macro}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {macro.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-center mt-4 ">
                  <span className="inline-block w-3 h-3 mr-2 bg-[#00C49F] "></span>
                  carbohydrates
                  <span className="inline-block w-3 h-3 mr-2 ml-4 bg-[#FFBB28] "></span>
                  proteins
                  <span className="inline-block w-3 h-3 ml-4  mr-2 bg-[#FF8042] "></span>
                  fat
                </div>
              </div>
              <div className="w-full md:w-1/2 md:ml-10 lg:w-2/3 ml-3">
                <div className="text-lg font-semibold">
                  Information nutritionel par 100 gramme:
                </div>
                <div className="mb-4 w-[90%] p-4 mr-2 text-white bg-[#22412b] rounded-lg shadow-inner border border-gray-400">
                  <div className="flex items-center gap-2 ">
                    <div className="h-4 w-4 bg-[#00C49F] rounded-sm"></div>
                    carbohydrates: {food.carbohydrates} g (
                    {pourcentage(food.carbohydrates)}%)
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="h-4 w-4 bg-[#FFBB28] rounded-sm"></div>
                    protein: {food.protein}g ({pourcentage(food.protein)}%)
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="h-4 w-4 bg-[#FF8042] rounded-sm"></div>
                    fat: {food.fat} g ({pourcentage(food.fat)}%)
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/vitamins.png" width={30} height={30} alt="Vitamins" />
                  Vitamins: {food.vitamins?.join(', ')}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Image src="/minerals.png" width={30} height={30} alt="Vitamins" />
                  Minerlas: {food.minerals?.join(', ')}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-screen flex items-center w-screen justify-center">
            <h1 className="text-white text-3xl">Loading....</h1>
          </div>
        )}
      </>
    </div>
  );
}
