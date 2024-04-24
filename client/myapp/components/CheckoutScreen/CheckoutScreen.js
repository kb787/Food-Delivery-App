import React, {useEffect} from 'react';
import {useStripe} from '@stripe/stripe-react-native';
import {useState} from 'react';
import {
  Button,
  SafeAreaView,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

const CheckoutScreen = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch('http://192.168.79.116:3500/payment-sheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const {paymentIntent, ephemeralKey, customer} = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} =
      await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.buttonWrapping}>
        <TouchableOpacity
          style={styles.buttonOuterStyling}
          onPress={openPaymentSheet}>
          <Text style={styles.buttonInnerStyling}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
const styles = StyleSheet.create({
  CheckoutButto: {
    padding: '2%',
  },
  buttonWrapping: {
    padding: 0,
    margin: 0,
  },
  buttonOuterStyling: {
    backgroundColor: 'rgb(59 130 246)',
    padding: '3%',
  },
  buttonInnerStyling: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
