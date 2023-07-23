import { useContext } from "react";
import MealsList from "../components/MealsList";
import { FavoritesContext } from "../store/context/favorites-context";
import { MEALS } from "../data/dummy-data";

function FavoritesScreeen() {
  const favoriteMealsCtx = useContext(FavoritesContext);

  const favoriteMeal = MEALS.filter((meal) =>
    favoriteMealsCtx.ids.includes(meal.id)
  );

  return <MealsList items={favoriteMeal} />;
}

export default FavoritesScreeen;
