import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const QuickAccess = () => {
  const navigation = useNavigation();

  // Animasyonlar için referanslar
  const loginAnim = useRef(new Animated.Value(0)).current;
  const registerAnim = useRef(new Animated.Value(0)).current;
  const feedbackAnim = useRef(new Animated.Value(0)).current;

  // Animasyonu başlatan fonksiyonlar
  const animateButton = (anim) => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      // Animasyon tamamlandığında geri eski durumuna döndür
      Animated.timing(anim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  };

  const handleLogin = () => {
    animateButton(loginAnim);
    navigation.navigate('Staj'); // Giriş yapma sayfasına yönlendirme
  };

  const handleRegister = () => {
    animateButton(registerAnim);
    navigation.navigate('LessonRegister'); // Ders kayıt yapma sayfasına yönlendirme
  };

  const handleFeedback = () => {
    animateButton(feedbackAnim);
    navigation.navigate('Çağrı/Öneri'); // Çağrı/Öneri sayfasına yönlendirme
  };

  // Butonların arka plan rengindeki animasyon
  const buttonBackgroundColor = (anim) => {
    return anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['#fff', 'tomato'] // Arka plan rengini değiştirir
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hızlı Erişim</Text>
      <View style={styles.buttonsContainer}>
        <Animated.View style={[styles.buttonContainer, { backgroundColor: buttonBackgroundColor(loginAnim) }]}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Staj Başvuru</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.buttonContainer, { backgroundColor: buttonBackgroundColor(registerAnim) }]}>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Rezervasyon</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.buttonContainer, { backgroundColor: buttonBackgroundColor(feedbackAnim) }]}>
          <TouchableOpacity style={styles.button} onPress={handleFeedback}>
            <Text style={styles.buttonText}>Çağrı/Öneri</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'tomato',
    marginLeft: 5,
    marginVertical: 10,
    textAlign: 'left',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonContainer: {
    borderRadius: 5,
    width: 100,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: 'tomato',
  },
  button: {
    padding: 5,
    borderRadius: 5,
    width: '150%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'tomato',
    fontWeight: 'bold',
  },
});

export default QuickAccess;
