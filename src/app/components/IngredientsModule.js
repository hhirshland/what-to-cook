"use client";

import { useState } from "react";
import styles from "./IngredientsModule.module.css"; // Import your CSS module

const IngredientsModule = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleInputChange = (event) => {
    setNewIngredient(event.target.value);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    if (newIngredient.trim() !== "") {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient("");
    }
  };

  const removeIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleSubmit = async (event) => {
    setRecipes(["Loading..."]);
    console.log(ingredients);
    try {
      console.log("test");
      const requestBody = {
        ingredients: ingredients,
      };
      //console.log("request body: ");
      //console.log(requestBody);
      //console.log(JSON.stringify(requestBody));
      const response = await fetch("/api/getRecipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      console.log("test2");
      console.log(response);
      console.log(data.message.content);
      console.log(data.message.content[0].title);
      setRecipes(JSON.parse(data.message.content));
      //console.log(recipes);
      //console.log(recipes)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleInputSubmit} className={styles.form}>
        <input
          type="text"
          value={newIngredient}
          onChange={handleInputChange}
          placeholder="Enter ingredient"
          className={styles.input}
        />
        <button type="submit" className={styles.addButton}>
          Add
        </button>
      </form>
      <div className={styles.ingredientsList}>
        {ingredients.map((ingredient, index) => (
          <div key={index} className={styles.ingredientBubble}>
            {ingredient}
            <button
              onClick={() => removeIngredient(index)}
              className={styles.removeButton}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className={styles.findRecipesButton}>
        Find recipes
      </button>
      <br />
      <br />
      <h1 className={styles.recipesTitle}>Recipes:</h1>
      <div className={styles.recipesContent}>
        {recipes.length > 1 ? (
          recipes.map((recipe, index) => (
            <div key={index}>
              <h2>{recipe.title}</h2>
              <div>
                <b>Ingredients:</b>
                <ul>
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div>
                <b>Instructions:</b>
                <ol>
                  {recipe.instructions.map((instruction, i) => (
                    <li key={i}>{instruction}</li>
                  ))}
                </ol>
              </div>
            </div>
          ))
        ) : (
          <p>loading</p>
        )}
      </div>
    </div>
  );
};

export default IngredientsModule;
