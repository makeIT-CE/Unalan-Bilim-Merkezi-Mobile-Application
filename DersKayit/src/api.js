import { Alert } from "react-native";

const API_URL = 'http://192.168.1.31:3000'; // Node.js sunucunuzun IP adresi ve portu

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      // HTTP hatalarını yakala
      throw new Error(`HTTP hata kodu: ${response.status}`);
    }

    const data = await response.text(); // Yanıtı metin olarak al
    return data;
  } catch (error) {
    console.error('API isteği hatası:', error);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      // HTTP hatalarını yakala
      throw new Error(`HTTP hata kodu: ${response.status}`);
    }

    const data = await response.json(); // Yanıtı JSON formatında al
    return data;
  } catch (error) {
    console.error('API isteği hatası:', error);
    throw error;
  }
};

export const reserveSlot = async (email, day, timeSlot) => {
  try {
    const response = await fetch(`${API_URL}/api/reservation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        selectedDay: day,
        selectedTimeSlot: timeSlot
      }),
    });

    if (!response.ok) {
      // Yanıtın başarısız olup olmadığını kontrol edin
      const responseData = await response.text(); // Yanıt metin olarak al
      throw new Error(`HTTP hata kodu: ${response.status}, Mesaj: ${responseData}`);
    }

    // Başarıyla yanıt döndür
    return { message: 'Rezervasyonunuz başarıyla oluşturuldu.' };
  } catch (error) {
    // Hata mesajını genişletin ve konsola yazdırın
    console.error('API isteği hatası:', error);
    throw new Error(error.message || 'Rezervasyon sırasında bir hata oluştu.');
  }
};
export const fetchReservations = async () => {
  try {
    const response = await fetch(`${API_URL}/api/reservations`, {
      method: 'GET',
    });

    if (!response.ok) {
      const responseData = await response.text();
      throw new Error(`HTTP hata kodu: ${response.status}, Mesaj: ${responseData}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API isteği hatası:', error);
    throw new Error(error.message || 'Rezervasyon verileri alınırken bir hata oluştu.');
  }
};

export const handleSubmit = async ({ firstName, lastName, country, address, resume }) => {
  if (!firstName || !lastName || !country || !address || !resume || !resume.uri) {
    Alert.alert('Hata', 'Lütfen tüm alanları doldurun ve özgeçmiş dosyasını seçin.');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/internship`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        country,
        address,
        resumeUri: resume.uri,
      }),
    });

    if (response.ok) {
      Alert.alert('Başarılı', 'Başvurunuz başarıyla gönderildi.');
    } else {
      const errorData = await response.json();
      console.error('Hata Detayı:', errorData);
      Alert.alert('Hata', `Başvuru gönderimi sırasında bir hata oluştu: ${errorData.message || response.status}`);
    }
  } catch (error) {
    console.error('Fetch hatası:', error);
    Alert.alert('Hata', `Başvuru gönderimi sırasında bir hata oluştu: ${error.message}`);
  }
};
