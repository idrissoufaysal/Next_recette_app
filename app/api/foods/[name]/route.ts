import { foods } from "@/app/data";

export const  GET=(request: Request, { params}: { params?: { name?: string } }) =>{
  try {
    const foodIndex = foods.findIndex(
      (food) => food.name.toLowerCase().replace(/ /g, "-") === params!.name
    );

    if (foodIndex !== -1) {
      return new Response(JSON.stringify(foods[foodIndex]), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify("Food not found"), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return new Response(JSON.stringify(error.message), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      });
    }
  }
}
