import { View, Image, ScrollView, Text, StyleSheet } from "react-native";
import { MEALS } from "../data/dummy-data";
import List from "../components/List";
import { useContext, useLayoutEffect } from "react";

import MealDetails from "../components/MealDetails";
import SubTitle from "../components/SubTitle";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favorites-context";

function MealDetailScreen({ route, navigation }) {
  const favoriteMealsCtx = useContext(FavoritesContext);

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const isMealsFavorite = favoriteMealsCtx.ids.includes(mealId);

  function changeFavoriteStatusHandler() {
    console.log(isMealsFavorite);
    if (isMealsFavorite) {
      favoriteMealsCtx.removeFavorite(mealId);
    } else {
      favoriteMealsCtx.addFavorite(mealId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            color="white"
            icon={isMealsFavorite ? "star" : "star-outline"}
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.outContainer}>
        <View style={styles.listContainer}>
          <SubTitle>Ingredients</SubTitle>
          <List data={selectedMeal.ingredients} />
          <SubTitle>Steps</SubTitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  listContainer: {
    textAlign: "center",
    width: "85%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 4,
    color: "white",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 350,
  },
  detailText: {
    color: "white",
  },
});

export default MealDetailScreen;
