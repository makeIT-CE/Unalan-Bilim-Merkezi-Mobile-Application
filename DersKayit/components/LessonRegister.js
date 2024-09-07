import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';  // Yönlendirme için eklenen import
import { reserveSlot, fetchReservations } from '../src/api';  // fetchReservations'ı da import edin

const ReservationScreen = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [email, setEmail] = useState('');
  const [unavailableSlots, setUnavailableSlots] = useState([]);
  const navigation = useNavigation();  // Yönlendirme için navigation nesnesini kullan

  useEffect(() => {
    const getUnavailableSlots = async () => {
      try {
        const result = await fetchReservations();
        const reservedSlots = result.map(item => ({ day: item.selectedDay, timeSlot: item.selectedTimeSlot }));
        setUnavailableSlots(reservedSlots);
      } catch (error) {
        console.error('Rezervasyon verileri alınırken bir hata oluştu:', error);
      }
    };

    getUnavailableSlots();
  }, []);

  const isSlotAvailable = (day, timeSlot) => {
    return !unavailableSlots.some(slot => slot.day === day && slot.timeSlot === timeSlot);
  };

  const sendReservation = async () => {
    if (!selectedTimeSlot || !selectedDay || !email) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }
    if (!isSlotAvailable(selectedDay, selectedTimeSlot)) {
      Alert.alert(
        'Hata', 
        'Bu zaman dilimi ve gün için rezervasyon zaten mevcut.', 
        [{ text: 'Ok' }]
      );
      return;
    }
    try {
      const result = await reserveSlot(email, selectedDay, selectedTimeSlot);
      Alert.alert(
        'Başarılı', 
        result.message || 'Rezervasyon başarıyla oluşturuldu', 
        [{ text: 'Ok', onPress: () => navigation.navigate('HomeScreen') }]
      );
    } catch (error) {
      Alert.alert('Hata', error.message || 'Rezervasyon sırasında bir hata oluştu.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Girişimcilik Rezervasyon</Text>
      <Image source={require('../assets/bilim_üsküdar.png')} style={styles.logo} />
      <Text style={styles.label}>E-posta Adresinizi Girin:</Text>
      <TextInput
        style={styles.input}
        placeholder="E-posta Adresiniz"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Gün Seçin:</Text>
      <Picker
        selectedValue={selectedDay}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedDay(itemValue)}
      >
        <Picker.Item style={styles.pickerContain} label="Pazartesi" value="Pazartesi" />
        <Picker.Item style={styles.pickerContain} label="Salı" value="Salı" />
        <Picker.Item style={styles.pickerContain} label="Çarşamba" value="Çarşamba" />
        <Picker.Item style={styles.pickerContain} label="Perşembe" value="Perşembe" />
        <Picker.Item style={styles.pickerContain} label="Cuma" value="Cuma" />
        <Picker.Item style={styles.pickerContain} label="Cumartesi" value="Cumartesi" />
        <Picker.Item style={styles.pickerContain} label="Pazar" value="Pazar" />
      </Picker>
      <Text style={styles.selectedText}>Seçilen Gün: {selectedDay || 'Henüz Seçilmedi'}</Text>

      <Text style={styles.label}>Saat Aralığı Seçin:</Text>
      <Picker
        selectedValue={selectedTimeSlot}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedTimeSlot(itemValue)}
      >
        <Picker.Item style={styles.pickerContain} label="09:00 - 10:00" value="09:00 - 10:00" />
        <Picker.Item style={styles.pickerContain} label="10:00 - 11:00" value="10:00 - 11:00" />
        <Picker.Item style={styles.pickerContain} label="11:00 - 12:00" value="11:00 - 12:00" />
        <Picker.Item style={styles.pickerContain} label="12:00 - 13:00" value="12:00 - 13:00" />
        <Picker.Item style={styles.pickerContain} label="13:00 - 14:00" value="13:00 - 14:00" />
        <Picker.Item style={styles.pickerContain} label="14:00 - 15:00" value="14:00 - 15:00" />
        <Picker.Item style={styles.pickerContain} label="15:00 - 16:00" value="15:00 - 16:00" />
        <Picker.Item style={styles.pickerContain} label="16:00 - 17:00" value="16:00 - 17:00" />
      </Picker>
      <Text style={styles.selectedText}>Seçilen Saat: {selectedTimeSlot || 'Henüz Seçilmedi'}</Text>

      <Button title="Rezervasyonu Gönder" onPress={sendReservation} color="tomato" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize:20,
    textAlign:'center',
    margin:20,
    color:'tomato',
    fontWeight:'bold',

  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'tomato',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  pickerContain: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'tomato',
    marginBottom: 10,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'tomato',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  logo: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 30,
  },
});

export default ReservationScreen;