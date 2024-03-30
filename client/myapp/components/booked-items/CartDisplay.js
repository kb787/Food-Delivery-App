import React from 'react';
import {useCart} from './CartCreation';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const CartDisplay = () => {
  const {cart} = useCart();
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text style={styles.contentHeading}>Cart Items</Text>
          {cart.length === 0 ? (
            <Text>Your cart is empty.</Text>
          ) : (
            cart?.map(item => (
              <View key={item.id}>
                <View style={styles.cardStyling}>
                  <View>
                    <View>
                      <View style={styles.imageWrapping}>
                        <Image
                          source={{uri: item.productImageUrl}}
                          style={styles.imageStyling}
                        />
                      </View>
                      <Text style={styles.headingStyling}>
                        {item.productName}
                      </Text>
                      <Text style={styles.paragraphStyling}>
                        Delivery Time :- {item.productDeliveryTime}
                      </Text>
                      <Text style={styles.paragraphStyling}>
                        Delivery Charge :- ₹{item.productDeliveryFee}
                      </Text>
                      <Text style={styles.paragraphStyling}>
                        ₹{item.productRate}
                      </Text>
                      <Text
                        style={
                          item.productType === 'veg'
                            ? {
                                display: 'flex',
                                color: 'green',
                                fontSize: 15,
                                fontWeight: '400',
                                padding: 1,
                                width: 'auto',
                              }
                            : {
                                color: 'red',
                                fontSize: 15,
                                fontWeight: '400',
                                padding: 1,
                              }
                        }>
                        {item.productType}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartDisplay;

const styles = StyleSheet.create({
  cardStyling: {
    padding: '3%',
    borderColor: 'black',
    borderWidth: 1,
  },
  imageStyling: {
    width: 260,
    height: 160,
    borderRadius: 15,
    borderColor: 'darkgrey',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapping: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3%',
  },
  headingStyling: {
    fontSize: 19,
    fontWeight: '600',
  },
  paragraphStyling: {
    fontSize: 15,
    fontWeight: '400',
  },
  buttonWrapping: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2%',
  },
  buttonStyling: {
    backgroundColor: 'rgb(59 130 246)',
    padding: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '85%',
  },
  buttonTextStyling: {
    color: 'white',
    fontSize: 16,
  },
  contentHeading: {
    fontSize: 25,
    padding: '4%',
    textAlign: 'center',
  },
});
