import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderWithLine = ({ title, onViewAllPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.header}>{title}</Text>
        <View style={styles.line} />
      </View>
      <TouchableOpacity onPress={onViewAllPress} style={styles.viewAllContainer}>
      <Icon name="eye-outline" size={24} fontWeight="bold" color="tomato" style={styles.icon} />
        <Text style={styles.viewAllText}>Tümü</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
      marginLeft: 30,
      marginRight: 30,
      marginBottom: 10,
    },
    titleContainer: {
      flex: 1,  // Başlık ve çizgi için kalan tüm alanı kaplar
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'tomato',
      marginBottom: 3,
    },
    line: {
      width: '10%',
      height: 3,
      backgroundColor: 'tomato',
      marginTop: 5,
    },
    viewAllContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon: {
        marginRight: 5,
      },
    viewAllText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'tomato',
    },
  });
  

export default HeaderWithLine;