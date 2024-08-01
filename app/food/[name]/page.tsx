"use client";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

import React, { useEffect, useState } from "react";
import { IFood, IFoodReduced, IMacronutrientData } from "@/app/types";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 100 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Food({ params }: { params: { name: string } }) {
  const [food, setFood] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [macro, setMacro] = useState<IMacronutrientData[]>([]);

  const foodFetch = async () => {
    try {
      const response = await fetch(`/api/${params.name}`);
      console.log(response);
      const data = await response.json();
      
      console.log(data);
      //setFood(data);
      console.log(data);
      const Macronutri: IMacronutrientData[] = [
        {
          name: "protein",
          value: data.protein,
        },
        {
          name: "carbohydrates",
          value: data.carbohydrates,
        },{
          name: "fat",
          value: data.fat,
        },
      ];
      setMacro(Macronutri);
    } catch (error) {
      if(error instanceof Error){
        console.log(error);
        
      }
    }
  };

  useEffect(() => {
    foodFetch();
  }, [params.name]);

  return (
    <div>
      <h1>Food: {params.name}</h1>
      <PieChart width={800} height={400}>
        <Pie
          data={macro}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {macro.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
