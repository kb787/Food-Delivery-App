// import React, {useEffect} from 'react';
// import {useStripe} from '@stripe/stripe-react-native';
// import {useState} from 'react';
// import {
//   Button,
//   SafeAreaView,
//   Alert,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   View,
// } from 'react-native';

// const CheckoutScreen = () => {
//   const {initPaymentSheet, presentPaymentSheet} = useStripe();
//   const [loading, setLoading] = useState(false);

//   const fetchPaymentSheetParams = async () => {
//     const response = await fetch('http://192.168.209.116:3500/payment-sheet', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const {paymentIntent, ephemeralKey, customer} = await response.json();

//     return {
//       paymentIntent,
//       ephemeralKey,
//       customer,
//     };
//   };

//   const initializePaymentSheet = async () => {
//     const {paymentIntent, ephemeralKey, customer} =
//       await fetchPaymentSheetParams();

//     const {error} = await initPaymentSheet({
//       merchantDisplayName: 'Example, Inc.',
//       customerId: customer,
//       customerEphemeralKeySecret: ephemeralKey,
//       paymentIntentClientSecret: paymentIntent,
//       allowsDelayedPaymentMethods: true,
//       defaultBillingDetails: {
//         name: 'Jane Doe',
//       },
//     });
//     if (!error) {
//       setLoading(true);
//     }
//   };

//   const openPaymentSheet = async () => {
//     const {error} = await presentPaymentSheet();

//     if (error) {
//       Alert.alert(`Error code: ${error.code}`, error.message);
//     } else {
//       Alert.alert('Success', 'Your order is confirmed!');
//     }
//   };

//   useEffect(() => {
//     initializePaymentSheet();
//   }, []);

//   return (
//     <SafeAreaView>
//       <View style={styles.buttonWrapping}>
//         <TouchableOpacity
//           style={styles.buttonOuterStyling}
//           onPress={openPaymentSheet}>
//           <Text style={styles.buttonInnerStyling}>Proceed for Payment</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default CheckoutScreen;
// const styles = StyleSheet.create({
//   CheckoutButto: {
//     padding: '2%',
//   },
//   buttonWrapping: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 0,
//     marginTop: '5%',
//     marginBottom: '5%',
//   },
//   buttonOuterStyling: {
//     backgroundColor: 'rgb(59 130 246)',
//     padding: '4%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 15,
//     width: '85%',
//   },
//   buttonInnerStyling: {
//     color: 'white',
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });
import React, {useEffect, useState} from 'react';
import {useStripe} from '@stripe/stripe-react-native';
import {
  SafeAreaView,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

const CheckoutScreen = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(true);
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch(
        'http://192.168.209.116:3500/payment-sheet',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const {paymentIntent, ephemeralKey, customer} = await response.json();
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    } catch (error) {
      console.error('Error fetching payment sheet params:', error);
      Alert.alert(
        'Error',
        'Unable to initialize payment. Please try again later.',
      );
      setLoading(false);
      return null;
    }
  };

  const initializePaymentSheet = async () => {
    try {
      setLoading(true);
      const params = await fetchPaymentSheetParams();

      if (!params) {
        return;
      }

      const {paymentIntent, ephemeralKey, customer} = params;

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

      if (error) {
        console.error('Error initializing payment sheet:', error);
        Alert.alert(
          'Error',
          'Unable to initialize payment. Please try again later.',
        );
      } else {
        setPaymentSheetEnabled(true);
      }
    } catch (error) {
      console.error('Error in initializePaymentSheet:', error);
      Alert.alert(
        'Error',
        'Unable to initialize payment. Please try again later.',
      );
    } finally {
      setLoading(false);
    }
  };

  const openPaymentSheet = async () => {
    if (!paymentSheetEnabled) {
      Alert.alert(
        'Error',
        'Payment sheet is not initialized yet. Please wait.',
      );
      return;
    }

    try {
      const {error} = await presentPaymentSheet();

      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        Alert.alert('Success', 'Your order is confirmed!');
        // Reset the payment sheet state after successful payment
        setPaymentSheetEnabled(false);
        setLoading(true);
        // Reinitialize for next payment
        await initializePaymentSheet();
      }
    } catch (error) {
      console.error('Error presenting payment sheet:', error);
      Alert.alert(
        'Error',
        'Unable to process payment. Please try again later.',
      );
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonWrapping}>
        {loading ? (
          <ActivityIndicator size="large" color="rgb(59 130 246)" />
        ) : (
          <TouchableOpacity
            style={[
              styles.buttonOuterStyling,
              !paymentSheetEnabled && styles.buttonDisabled,
            ]}
            onPress={openPaymentSheet}
            disabled={!paymentSheetEnabled}>
            <Text style={styles.buttonInnerStyling}>
              {paymentSheetEnabled
                ? 'Proceed for Payment'
                : 'Initializing Payment...'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonWrapping: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    marginTop: '5%',
    marginBottom: '5%',
  },
  buttonOuterStyling: {
    backgroundColor: 'rgb(59 130 246)',
    padding: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '85%',
  },
  buttonDisabled: {
    backgroundColor: 'rgba(59, 130, 246, 0.5)',
  },
  buttonInnerStyling: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CheckoutScreen;
