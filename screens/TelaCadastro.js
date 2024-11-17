import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import backgroundImage from '../assets/backgroud.webp';

export default function TelaCadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const gerarMatricula = () => {
    const numero = Math.floor(10000 + Math.random() * 90000);
    const letra = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return `${numero}-${letra}`;
  };

  const handleCadastro = async () => {
    if (!nome || !telefone || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos!');
      return;
    }
  
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
  
    try {
      const emailExistente = await AsyncStorage.getItem('email');
      if (emailExistente === email) {
        Alert.alert('Erro', 'Já existe um usuário com esse email!');
        return;
      }
  
      const matricula = gerarMatricula();
  
      const usuario = {
        nome,
        telefone,
        email,
        senha,
        matricula
      };
  
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('senha', senha);
      await AsyncStorage.setItem('usuario', JSON.stringify(usuario)); 
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso');
      navigation.navigate('TelaLogin');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao tentar salvar os dados');
    }
  };
  
  
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>Cadastro</Text>
      
      {/* Campo de Nome */}
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      
      {/* Campo de Telefone */}
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />
      
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
      
      {/* Campo de Confirmar Senha */}
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />
      
      {/* Botão de Cadastro */}
      <Button title="Cadastrar" onPress={handleCadastro} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
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
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});
