import React, { useState, useRef, useEffect } from 'react';
import { View, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView, Text, Modal } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import HeaderWithLine from './HeaderWithLine';
import QuickAccess from './QuickAccess';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: viewportWidth } = Dimensions.get('window');

const images1 = [
  { id: '1', uri: require('../assets/ilkokul.jpg'), description: 'İlkokul öğrencilerimize atölye eğitimi ve planeteryum içeriklerini sunmaktayız. Atölye eğitimleri Astronomi-Teknolo- ji-Tasarım-Matematik-Doğa Bilimleri olarak farklılık gösterir.Planetaryumda çeşitli film seçeneklerimizle size ve öğrencilerimize ufkunuzu açmayı amaçlıyoruz.'},
  { id: '2', uri: require('../assets/ortaokul.jpg'), description: 'Ortaokul öğrencilerimize atölye eğitimi, tematik sergi alanları ve Planeteryum içeriklerini sunuyoruz. Atölye eğitiminden sonra sınıf farketmeksizin 20 dakika planetaryumda 3 boyutlu film izlemektedir. ' },
  { id: '3', uri: require('../assets/lise.jpg'), description: 'Lise öğrencilerimize tematik sergi alanları ve planetaryum sunuyoruz planetaryum için ayrıca randevu almanız gerekmektedir. İlkokul-Anaokul-Ortaokul-Lise farketmeksizin.' },
  { id: '4', uri: require('../assets/anaokul.jpg'), description: 'Anaokul öğrencilerimize tematik sergi alanları ve planetaryum hizmetlerini sunuyoruz.' },
  { id: '5', uri: require('../assets/üniversite.jpg'), description: 'Üniversite öğrencilerimize tematik sergi alanları ve planetaryum planetaryum için randevu ile bilgi vermeniz gerekmektedir.Ayrıca Üniversite öğrencilerine staj imkanı sunulabiliyor.' },
];
const images2 = [
  { id: '1', uri: require('../assets/perihanA.jpeg'), description: 'Lisans Tıp Muhendisligi eğitimim, yazılım ve elektroniğe olan ilgim ile çeşitli projelerde görev aldım ve tamamladım. 4,5 ay süre ile aldığım kurumsal kaynak planlama ve veri analizi eğitimim ile çeşitli otomasyon sistemi geliştirdim. Yuksek lisans eğitimim ile birlikte insan fizyolojisinin modellemesi ve simülasyonu üzerine çalışmalarima başladım.Medikal alan ile ilgili eğitim simülatörleri geliştirmekteyim.Görüntü işleme ile yaptığım projelerin devamı niteliğinde ve yeni çalışmalarla yapay zeka alanında çalışmaktayım.' },
  { id: '2', uri: require('../assets/izeddinS.jpeg'), description: 'Merhabalar, ben Sultan İzzeddin Selimoğlu. Üsküdar Üniversitesi Uluslararası İlişkiler alanında Yüksek Lisans yapmaktayım . Bununla birlikte Üsküdar Belediyesi Strateji Geliştirme Müdürlüğü ve Üsküdar Üniversitesi Stratejik Araştırmalar Merkezinde Stajyer olarak çalıştım. Ek olarak Uluslararası Sempozyum, Konferans ve Bilimsel organizasyonlara katılarak bilgi ve deneyim edinmeye çalışmaktayım. ' },
  { id: '3', uri: require('../assets/yakisiklilikabidesi.jpg'), description: 'Merhabalar, ben Ahmet Fırat Eren. Doğ- uş Üniversitesi Bilgisayar Mühendisliği ingilizce eğitim mezunuyum.Şuanda Üsküdar Belediyesinde Strateji Geliştirme Bölümünde Ünalan Bilim Merkezinde zorunlu stajımı yapmaktayım.' },
];

const HomeScreen = ({ navigation, route }) => {
  const [activeSlide1, setActiveSlide1] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);
  const [username, setUsername] = useState('Oturum Aç');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const carouselRef1 = useRef(null);
  const carouselRef2 = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AsyncStorage.getItem('currentUser');
        const parsedUser = JSON.parse(user);
        if (parsedUser) {
          setUsername(parsedUser.username);
        } else {
          setUsername('Oturum Aç');
        }
      } catch (error) {
        console.error('Kullanıcı verisi alınamadı:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (route.params?.username) {
      setUsername(route.params.username);
    }
  }, [route.params?.username]);

  useEffect(() => {
    const interval1 = setInterval(() => {
      if (carouselRef1.current) {
        carouselRef1.current.snapToNext();
      }
    }, 3000);

    const interval2 = setInterval(() => {
      if (carouselRef2.current) {
        carouselRef2.current.snapToNext();
      }
    }, 3000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      setUsername('Oturum Aç');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Oturum kapatma hatası:', error);
    }
  };

  const handleLessonRecords = () => {
    navigation.navigate('LessonRegister');
    setIsModalVisible(false);
  };

  const handleLogin = () => {
    navigation.navigate('LoginScreen', {
      onLoginSuccess: (user) => {
        setUsername(user.username);
      }
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', { imageUri: item.uri })}>
      <View style={styles.imageContainer}>
        <Image
          source={typeof item.uri === 'number' ? item.uri : { uri: item.uri }}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="person-circle-outline" size={24} color="tomato" style={styles.usernameIcon} />
        <TouchableOpacity onPress={() => username === 'Oturum Aç' ? handleLogin() : setIsModalVisible(true)}>
          <Text style={styles.usernameText}>
            {username}
          </Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../assets/bilim_üsküdar.png')}
        style={styles.logo}
      />
      <View style={styles.quickAccessContainer}>
        <QuickAccess
          onPressDers={() => alert('Ders Tıklandı')}
          onPressDersKayit={() => alert('Ders Kayıt Tıklandı')}
        />
      </View>
      <View style={styles.sliderContainer}>
        <HeaderWithLine style={styles.Text1} title="Ders" onViewAllPress={() => navigation.navigate('Detaylı Açıklama', { images: images1 })}/>
        <Carousel
          ref={carouselRef1}
          data={images1}
          renderItem={renderItem}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth - 60}
          onSnapToItem={(index) => setActiveSlide1(index)}
          loop={true}  // Loop özelliği eklendi
          autoplay={true}  // Otomatik oynatma
          autoplayInterval={3000}  // Otomatik oynatma süresi
        />
        <Pagination
          dotsLength={images1.length}
          activeDotIndex={activeSlide1}
          dotStyle={styles.activeDot}
          inactiveDotStyle={styles.inactiveDot}
          inactiveDotOpacity={0.6}
          inactiveDotScale={0.8}
        />
        <HeaderWithLine style={styles.Text2} title="Hocalarımız" onViewAllPress={() => navigation.navigate('Detaylı Açıklama', { images: images2 })} />
        <Carousel
          ref={carouselRef2}
          data={images2}
          renderItem={renderItem}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth - 60}
          containerCustomStyle={{ marginTop: 30 }}
          onSnapToItem={(index) => setActiveSlide2(index)}
          loop={true}  // Loop özelliği eklendi
          autoplay={true}  // Otomatik oynatma
          autoplayInterval={3000}  // Otomatik oynatma süresi
        />
        <Pagination
          dotsLength={images2.length}
          activeDotIndex={activeSlide2}
          dotStyle={styles.activeDot}
          inactiveDotStyle={styles.inactiveDot}
          inactiveDotOpacity={0.6}
          inactiveDotScale={0.8}
        />
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={handleLessonRecords}>
              <Text style={styles.modalOptionText}>Rezervasyon</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={handleLogout}>
              <Text style={styles.modalOptionText}>Oturumu Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sliderContainer: {
    marginTop: 10,
    width: '100%',
  },
  imageContainer: {
    width: viewportWidth - 70,
    height: 200,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'tomato',
  },
  inactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
  Text1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'tomato',
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginVertical: 10,
  },
  Text2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'tomato',
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  usernameIcon: {
    marginRight: 10,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'tomato',
  },
  logo: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  quickAccessContainer: {
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'tomato',
    fontWeight: 'bold',
  },
  modalOption: {
    paddingVertical: 15,
  },
  modalOptionText: {
    fontSize: 18,
    color: 'tomato',
    fontWeight: 'bold',
  },
});

export default HomeScreen;

