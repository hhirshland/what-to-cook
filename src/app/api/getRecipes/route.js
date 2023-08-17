import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
const openAIKey = process.env.OPEN_AI_KEY;

export async function POST(request) {
  const req = await request.json();
  console.log(req.ingredients);

  const configuration = new Configuration({
    apiKey: openAIKey,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `Please list 3 recipe ideas with the following ingredients: ${req.ingredients}.  It should be structured as a JSON object with the following format:
        [
            {
              "title": "Chicken and Rice Casserole:",
              "ingredients": [
                "1 pound chicken breasts, cooked and shredded",
                "2 cups cooked rice",
                "1 cup frozen peas"
              ],
              "instructions": [
                "Preheat the oven to 375 degrees Fahrenheit.",
                "In a large bowl, mix together the shredded chicken, cooked rice, and frozen peas.",
                "Transfer the mixture to a greased casserole dish.",
                "Bake for 25-30 minutes, or until heated through and the top is golden brown."
              ]
            },
            {
              "title": "Lemon Garlic Chicken with Rice:",
              "ingredients": [
                "4 chicken thighs",
                "1 cup uncooked rice",
                "2 cloves garlic, minced"
              ],
              "instructions": [
                "Preheat the oven to 400 degrees Fahrenheit.",
                "In a large skillet, heat some oil over medium-high heat. Add the chicken thighs and cook until browned on both sides.",
                "Remove the chicken from the skillet and set aside.",
                "Add the minced garlic to the skillet and cook until fragrant.",
                "Add the uncooked rice and stir to coat in the garlic oil.",
                "Place the chicken thighs on top of the rice.",
                "Pour in enough water or chicken broth to cover the rice and chicken.",
                "Cover the skillet with a lid and transfer to the oven.",
                "Bake for 25-30 minutes, or until the chicken is cooked through and the rice is tender."
              ]
            },
            {
              "title": "Chicken Fried Rice:",
              "ingredients": [
                "2 cups cooked rice",
                "1 cup cooked chicken breast, diced",
                "1 cup frozen mixed vegetables"
              ],
              "instructions": [
                "In a large skillet, heat some oil over medium-high heat.",
                "Add the cooked rice and stir-fry for a few minutes until heated through.",
                "Add the diced chicken and frozen mixed vegetables, stirring constantly.",
                "Cook until the vegetables are thawed and heated through.",
                "Push everything to one side of the skillet and crack an egg onto the other side.",
                "Scramble the egg and then mix it in with the rice and chicken mixture.",
                "Season with soy sauce or any preferred seasonings."
              ]
            }
          ]
          `,
      },
    ],
  });
  console.log(completion.data.choices[0].message);

  //const data = request.body;
  return NextResponse.json({
    message: completion.data.choices[0].message,
  });
}

//OPENAI API KEY: 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
