import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from 'react-native';

const NavbarProductPage = ({onDataUpdate}) => {
  const [productRate, setProductRate] = useState('');
  const [productType, setProductType] = useState('');
  const [productName, setProductName] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const filters = {};
  const rate = productRate;
  const type = productType;
  const name = productName;

  if (rate) {
    filters.rate = rate;
  }
  if (type) {
    filters.type = type;
  }
  if (name) {
    filters.name = name;
  }
  const queryString = Object.keys(filters)
    .map(key => key + '=' + filters[key])
    .join('&');
  const handleFilterButtonClick = async () => {
    setButtonClicked(true);
    if (!productName && !productType && !productRate) {
      Alert.alert(
        `Entering any of the fields is mandatory for filter to be working`,
      );
      return;
    }
    try {
      filters.productName = productName;
      filters.productType = productType;
      filters.productRate = productRate;
      let apiUrl = '';
      if (buttonClicked === true) {
        apiUrl = `http://192.168.79.116:3500/v1/api/product/search-product?${filters}`;
      } else {
        apiUrl = 'http://192.168.79.116:3500/v1/api/product/show-product';
      }
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse)) {
        setCategoryData(jsonResponse);
        setButtonClicked(true);
      } else {
        const convertedArray = await JSON.parse(jsonResponse);
        setCategoryData(convertedArray);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  useEffect(() => {
    onDataUpdate({categoryData, buttonClicked});
  }, [categoryData, buttonClicked]);
  return (
    <View style={styles.navbarWrapping}>
      <View style={styles.itemCollection}>
        <View>
          <Text style={styles.outerTextStyling}>Rate</Text>
          <TextInput
            keyboardType="numeric"
            value={productRate}
            onChangeText={text => setProductRate(text)}
            placeholder="100-300"
            style={styles.textInputStyling}
          />
        </View>
        <View>
          <Text style={styles.outerTextStyling}>Category</Text>
          <TextInput
            type="text"
            value={productType}
            onChangeText={text => setProductType(text)}
            placeholder="Veg/Non-Veg"
            style={styles.textInputStyling}
          />
        </View>
        <View>
          <Text style={styles.outerTextStyling}>Name</Text>
          <TextInput
            type="text"
            value={productName}
            onChangeText={text => setProductName(text)}
            placeholder="Enter name"
            style={styles.textInputStyling}
          />
        </View>
        <TouchableOpacity style={styles.buttonOuterStyling}>
          <Text
            style={styles.buttonInnerStyling}
            onPress={handleFilterButtonClick}>
            Apply
          </Text>
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
    gap: 15,
  },
  outerTextStyling: {
    textAlign: 'center',
    color: 'white',
    padding: 2,
  },
  textInputStyling: {
    borderColor: 'white',
    borderWidth: 1,
    padding: 3,
    borderRadius: 7,
    color: 'white',
  },
  navbarWrapping: {
    backgroundColor: 'rgb(194 65 12)',
    color: 'white',
    padding: '2%',
  },
  buttonOuterStyling: {
    backgroundColor: 'rgb(59 130 246)',
    color: 'white',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInnerStyling: {
    color: 'white',
    padding: 2,
    fontSize: 15,
  },
});
