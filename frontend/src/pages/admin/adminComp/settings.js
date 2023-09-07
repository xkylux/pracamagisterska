export const changeCategory = (e, categories, setMongoDbAttributes, setSelectedCategory) => {
  const highLevelCategory = e.target.value.split("/")[0];
  const highLevelCategoryAllData = categories.find((cat) => cat.name === highLevelCategory);
  if (highLevelCategoryAllData && highLevelCategoryAllData.attributes) {
    setMongoDbAttributes(highLevelCategoryAllData.attributes);
  } else {
    setMongoDbAttributes([]);
  }
  setSelectedCategory(e.target.value);
}

export const setMongoDbAttributesDetailsValue = (e, attributeDetails, mongoDbAttributes) => {
  if (e.target.value !== "Wybierz atrybut") {
    var chosenAttribute = mongoDbAttributes.find((item) => item.key === e.target.value);
    let attributeDetailKey = attributeDetails.current;
    if (chosenAttribute && chosenAttribute.value.length > 0) {
      while (attributeDetailKey.options.length) {
        attributeDetailKey.remove(0);
      }
      attributeDetailKey.options.add(new Option("Wybierz wartość"));
      chosenAttribute.value.map(item => {
        attributeDetailKey.add(new Option(item));
        return "";
      })
    }
  }
}

export const setSpecificAttributeValue = (key, value, setProductAtrributesFromMongoDb) => {
  setProductAtrributesFromMongoDb((attributes) => {
    if (attributes.length !== 0) {
      var oldKeyList = false;
      let editedList = attributes.map(item => {
        if (item.key === key) {
          oldKeyList = true;
          item.value = value;
          return item;
        } else {
          return item;
        }
      })
      if (oldKeyList) return [...editedList];
      else return [...editedList, { key: key, value: value }]
    } else {
      return [{ key: key, value: value }];
    }
  })
}

