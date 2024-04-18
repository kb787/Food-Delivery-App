import React, { useEffect } from 'react';
import { useStripe } from "@stripe/stripe-react-native";
import { useState } from "react";
import { Button, SafeAreaView, Alert } from "react-native";
import { calculateTotalPrice } from '../booked-items/CartDisplay';

const CheckoutScreen = () => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const fetchPaymentSheetParams = async () => {
        const response = await fetch('http://192.168.159.177:3500/payment-sheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const { paymentIntent, ephemeralKey, customer } = await response.json();

        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            }
        });
        if (!error) {
            setLoading(true);
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

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
            <Button
                disabled={!loading}
                variant="primary"
                title="Checkout"
                onPress={openPaymentSheet}
            />
        </SafeAreaView>
    );
};

export default CheckoutScreen;
