import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {MaterialIcons as Icon} from '@expo/vector-icons';

const NavbarProductPage = () => {
  const foodType = [
    {name: 'Veg', id: 1},
    {name: 'Non-Veg', id: 2},
  ];
  const deliveryTime = [
    {name: '35-40', id: 1},
    {name: '40-50', id: 2},
    {name: '50-60', id: 3},
  ];
  const ratingType = [
    {name: '50-150', id: 1},
    {name: '150-300', id: 2},
    {name: '300-500', id: 3},
    {name: '500-600', id: 4},
  ];
  const [selectedFoodType, setSelectedFoodType] = useState('');
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState('');
  const [selectedRatingType, setSelectedRatingType] = useState('');
  return (
    <View>
      <View style={styles.itemCollection}>
        <SectionedMultiSelect
          items={foodType}
          IconRenderer={Icon}
          uniqueKey="id"
          onSelectedItemsChange={setSelectedFoodType}
          selectedItems={selectedFoodType}
        />
        <SectionedMultiSelect
          items={deliveryTime}
          IconRenderer={Icon}
          uniqueKey="id"
          onSelectedItemsChange={setSelectedDeliveryTime}
          selectedItems={selectedDeliveryTime}
        />
        <SectionedMultiSelect
          items={ratingType}
          IconRenderer={Icon}
          uniqueKey="id"
          onSelectedItemsChange={setSelectedRatingType}
          selectedItems={selectedRatingType}
        />
        <TouchableOpacity>
          <Text>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavbarProductPage;

const styles = StyleSheet.create({
  itemCollection: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
});
