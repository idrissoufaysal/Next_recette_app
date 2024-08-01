import { ContentType } from "./../../../node_modules/recharts/types/component/DefaultLegendContent.d";
import { foods } from "@/app/data";
import { log } from "console";
import { stringify } from "querystring";

async function GET(request: Request, { param }: { param: { name: string } }) {
  try {
    const foodIndex = foods.findIndex(
      (food) => food.name.toLowerCase().replace(/ /g, "-") === param.name
    );

    if (foodIndex !== -1) {
      return new Response(JSON.stringify(foods[foodIndex]), {
        headers: {
          ContentType: "application/json",
        },
        status: 200,
      });
    } else {
      return new Response("food not found", {
        headers: {
          ContentType: "application/json",
        },
        status: 404,
      });
    }
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

export default GET;
