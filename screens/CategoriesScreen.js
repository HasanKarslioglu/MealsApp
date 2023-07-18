import { CATEGORIES } from "../data/dummy-data";
import { FlatList } from "react-native";

import CategoryGridTile from "../components/CategoryGridTile";
import { useNavigation } from "@react-navigation/native";

function CategoriesScreen({}) {
  const navigation = useNavigation();

  function pressHandler(itemData) {
    navigation.navigate("MealsOverview", {
      categoryId: itemData.item.id,
    });
  }

  function renderCategoryItem(itemData) {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={() => pressHandler(itemData)}
      />
    );
  }

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}

export default CategoriesScreen;
