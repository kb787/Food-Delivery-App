import React from 'react';
import {StripeProvider} from '@stripe/stripe-react-native';
import CheckoutScreen from './CheckoutScreen';
const Stripepaymentgateway = () => {
  return (
    <StripeProvider
      publishableKey="pk_test_51P4kp7SFBQGHHDjpGBS7WDXJBjHJemvx3KBrMwHoU8oZ1gehjcaSo4kzYyljMSEgwtRtWomWgZcWnDRyvTrBeejo00zLeCloYG"
      urlScheme="your-url-scheme"
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}">
      <CheckoutScreen />
    </StripeProvider>
  );
};

export default Stripepaymentgateway;
