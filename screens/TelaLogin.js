import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importe a imagem PNG para o fundo
import backgroundImage from '../assets/backgroud.webp'; // Substitua pelo caminho correto da imagem PNG

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha ambos os campos.');
      return;
    }
  
    setIsLoading(true); // Exibe o indicador de loading
  
    try {
      // Recupera os dados armazenados no AsyncStorage
      const emailArmazenado = await AsyncStorage.getItem('email');
      const senhaArmazenada = await AsyncStorage.getItem('senha');
  
      // Verifica se os dados de login correspondem
      if (email === emailArmazenado && senha === senhaArmazenada) {
        const usuarioLogado = await AsyncStorage.getItem('usuario');
        await AsyncStorage.setItem('usuarioLogado', usuarioLogado); // Salva as informações do usuário logado
        navigation.navigate('Home'); // Navega para a tela Home
      } else {
        Alert.alert('Erro', 'Usuário ou senha incorretos');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao tentar fazer login');
    } finally {
      setIsLoading(false); // Oculta o indicador de loading após a tentativa
    }
  };
  



  const handleRecuperarSenha = () => {
    // Navega para a tela de recuperação de senha
    navigation.navigate('RecSenha');
  };

  return (
    // Use o ImageBackground para definir a imagem de fundo
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      resizeMode="cover" // Faz a imagem cobrir toda a tela
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
          <ActivityIndicator size="small" color="#fff" /> // Exibe o loading enquanto o login está sendo processado
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
    color: 'white', // Cor do texto para visibilidade no fundo
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fundo transparente para os campos
  },
  button: {
    backgroundColor: '#007BFF', // Cor do botão
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center', // Centraliza o texto no botão
  },
  buttonText: {
    fontSize: 18,
    color: '#fff', // Cor do texto do botão
  },
  footer: {
    flexDirection: 'row', // Alinha os itens na horizontal
    justifyContent: 'space-between', // Espaço entre os itens
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
