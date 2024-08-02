"use client";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

import React, { useEffect, useState } from "react";
import { IFood, IFoodReduced, IMacronutrientData } from "@/app/types";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 100 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Food({ params }: { params: { name: string } }) {
  const [food, setFood] = useState<IFood[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [macro, setMacro] = useState<IMacronutrientData[]>([]);
  const route = useRouter();
  const foodFetch = async () => {
    try {
      const response = await fetch(`/api/foods/${params.name}`);
      console.log(response);
      const data = await response.json();

      console.log(data);
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

  useEffect(() => {
    foodFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.name]);

  return (
    <div className="h-screen flex justify-center items-center">
      <>
        {!isLoading && food && macro ? (
          <>
            <div className="p-8">
              {" "}
              <Undo2
                className="text-white mb-4 cursor-pointer bg-black w-10 h-10 p-2 rounded-xl"
                onClick={() => {route.back()}}
              />{" "}
            </div>
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
          </>
        ) : (
          <div className="h-screen flex items-center justify-center">
            <h1 className="text-white text-3xl">Loading....</h1>
          </div>
        )}
      </>
    </div>
  );
}
