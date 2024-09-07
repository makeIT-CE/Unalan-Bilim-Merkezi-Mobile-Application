import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { handleSubmit } from '../src/api';

const InternshipForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [resume, setResume] = useState(null);

  const pickResume = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/*', 'application/pdf'],
    });

    if (result.type === 'success') {
      setResume(result);
    }
  };

  const handleFormSubmit = () => {
    if (!firstName || !lastName || !country || !address || !resume) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun ve özgeçmiş dosyasını seçin.');
      return;
    }

    handleSubmit({ firstName, lastName, country, address, resume });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>İsim:</Text>
      <TextInput
        style={styles.input}
        placeholder="İsminiz"
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={styles.label}>Soyisim:</Text>
      <TextInput
        style={styles.input}
        placeholder="Soyisminiz"
        value={lastName}
        onChangeText={setLastName}
      />

      <Text style={styles.label}>Ülke:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ülkeniz"
        value={country}
        onChangeText={setCountry}
      />

      <Text style={styles.label}>Adres:</Text>
      <TextInput
        style={styles.input}
        placeholder="Adresiniz"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Özgeçmiş:</Text>
      <Button title="Özgeçmiş Dosyasını Seçin" onPress={pickResume} color="tomato" />
      {resume && (
        <View style={styles.resumeContainer}>
          <Text style={styles.textFile}>Seçilen Dosya: {resume.name}</Text>
          {resume.type === 'image' && (
            <Image source={{ uri: resume.uri }} style={styles.imagePreview} />
          )}
        </View>
      )}

      <Button title="Başvuruyu Gönder" onPress={handleFormSubmit} color="tomato" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'tomato',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  resumeContainer: {
    marginVertical: 20,
  },
  textFile: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'tomato',
    marginTop: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 10,
  },
});

export default InternshipForm;
