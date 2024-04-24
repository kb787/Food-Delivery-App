import React from 'react'
import { StripeProvider } from '@stripe/stripe-react-native';
import CheckoutScreen from './CheckoutScreen';
const Stripepaymentgateway = () => {
  return (
    <StripeProvider
      publishableKey="pk_test_51P4kp7SFBQGHHDjpGBS7WDXJBjHJemvx3KBrMwHoU8oZ1gehjcaSo4kzYyljMSEgwtRtWomWgZcWnDRyvTrBeejo00zLeCloYG"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
    <CheckoutScreen />
    </StripeProvider>
  );
}
  

export default Stripepaymentgateway