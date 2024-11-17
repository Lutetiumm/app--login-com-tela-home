import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import backgroundImage from '../assets/backgroud.webp';

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha ambos os campos.');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const emailArmazenado = await AsyncStorage.getItem('email');
      const senhaArmazenada = await AsyncStorage.getItem('senha');
  
      if (email === emailArmazenado && senha === senhaArmazenada) {
        const usuarioLogado = await AsyncStorage.getItem('usuario');
        await AsyncStorage.setItem('usuarioLogado', usuarioLogado);
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'Usuário ou senha incorretos');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao tentar fazer login');
    } finally {
      setIsLoading(false);
    }
  };
  



  const handleRecuperarSenha = () => {
    navigation.navigate('RecSenha');
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      resizeMode="cover" 
    >
      <Text style={styles.title}>Login</Text>

      {/* Campo de Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Campo de Senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {/* Botão Entrar */}
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      {/* Links de recuperação de senha e cadastro */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleRecuperarSenha}>
          <Text style={styles.recoveryLink}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TelaCadastro')}>
          <Text style={styles.registerLink}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff', 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  recoveryLink: {
    fontSize: 15,
    color: 'white',
  },
  registerLink: {
    fontSize: 15,
    color: 'white',
  },
});
