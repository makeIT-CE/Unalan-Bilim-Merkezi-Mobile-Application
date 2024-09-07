
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function FeedbackScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');

    const submitFeedback = async () => {
        if (!name || !email || !feedback) {
            Alert.alert('Error', 'All fields are required!');
            return;
        }

        try {
            const response = await fetch('http://172.20.66.20:3000/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, feedback }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Success', data.message);
                setName('');
                setEmail('');
                setFeedback('');
            } else {
                Alert.alert('Error', data.message || 'Something went wrong!');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to send feedback. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>İsim</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Konu Başlığı</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <Text style={styles.label}>Öneri</Text>
            <TextInput
                style={styles.input1}
                value={feedback}
                onChangeText={setFeedback}
                multiline
            />
            <Button
                title="Çağrı/Öneri Gönder"
                color="tomato"
                onPress={submitFeedback}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: 'tomato',
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
    },
    input1: {
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 35,
      padding: 10,
      borderRadius: 5,
      height: 250,
  },  
});
