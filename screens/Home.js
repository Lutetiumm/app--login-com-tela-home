import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
  const [usuario, setUsuario] = useState(null);

  const carregarUsuario = async () => {
    try {
      const usuarioLogado = await AsyncStorage.getItem('usuarioLogado');
      if (usuarioLogado) {
        setUsuario(JSON.parse(usuarioLogado));
      }
    } catch (error) {
      console.log('Erro ao carregar usuário', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('usuarioLogado');
      Alert.alert('Sucesso', 'Você foi desconectado!');
      navigation.navigate('TelaLogin'); 
    } catch (error) {
      Alert.alert('Erro', 'Falha ao tentar fazer logout');
    }
  };

  useEffect(() => {
    carregarUsuario();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo ao Sistema</Text>

      {/* Exibe as informações do usuário, se disponíveis */}
      {usuario ? (
        <>
          <Text style={styles.userInfo}>Nome: {usuario.nome}</Text>
          <Text style={styles.userInfo}>Matrícula: {usuario.matricula}</Text>
          <Text style={styles.userInfo}>Email: {usuario.email}</Text>
        </>
      ) : (
        <Text style={styles.userInfo}>Nenhum usuário logado</Text>
      )}

      {/* Botão para sair */}
      {usuario && (
        <Button title="Sair" onPress={handleLogout} color="#FF6347" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
});
