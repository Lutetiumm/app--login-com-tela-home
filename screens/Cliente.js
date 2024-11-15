import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, FlatList, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Imagem do Cliente no Menu
const imagemCliente = require('../assets/iconusuario.webp');

export default function Cliente() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [clientes, setClientes] = useState([]);
  const [nomeBusca, setNomeBusca] = useState('');

  // Função para salvar um cliente
  const salvarCliente = async () => {
    if (!nome || !email || !telefone || !endereco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      let clientesList = await AsyncStorage.getItem('clientes');
      clientesList = clientesList ? JSON.parse(clientesList) : [];

      // Adiciona o novo cliente à lista
      clientesList.push({ nome, email, telefone, endereco });

      // Salva a lista de clientes no AsyncStorage
      await AsyncStorage.setItem('clientes', JSON.stringify(clientesList));

      // Limpa os campos de entrada
      setNome('');
      setEmail('');
      setTelefone('');
      setEndereco('');

      // Exibe uma mensagem de sucesso
      Alert.alert('Cliente Cadastrado', 'Cliente cadastrado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar cliente.');
    }
  };

  // Função para buscar clientes pelo nome
  const buscarClientes = async (nomeBusca) => {
    try {
      let clientesList = await AsyncStorage.getItem('clientes');
      clientesList = clientesList ? JSON.parse(clientesList) : [];
      
      // Filtra os clientes pelo nome informado
      const clientesFiltrados = clientesList.filter(cliente =>
        cliente.nome.toLowerCase().includes(nomeBusca.toLowerCase())
      );

      setClientes(clientesFiltrados);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar clientes.');
    }
  };

  // Função para lidar com a mudança na busca
  const handleBuscaChange = (texto) => {
    setNomeBusca(texto);
    buscarClientes(texto);  // Chama a função de busca sempre que o texto mudar
  };

  return (
    <View style={styles.container}>
      {/* Imagem do Cliente no Menu */}
      <View style={styles.imagemContainer}>
        <Image source={imagemCliente} style={styles.imagem} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        keyboardType="phone-pad"
        value={telefone}
        onChangeText={setTelefone}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
      <Button title="Salvar Cliente" onPress={salvarCliente} />

      {/* Campo de busca */}
      <TextInput
        style={styles.input}
        placeholder="Buscar Cliente"
        value={nomeBusca}
        onChangeText={handleBuscaChange}
      />

      {/* Exibe os clientes encontrados */}
      {clientes.length > 0 ? (
        <FlatList
          data={clientes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.clientItem}>
              <Text style={styles.clientText}>Nome: {item.nome}</Text>
              <Text style={styles.clientText}>Email: {item.email}</Text>
              <Text style={styles.clientText}>Telefone: {item.telefone}</Text>
              <Text style={styles.clientText}>Endereço: {item.endereco}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noResultsText}>Nenhum cliente encontrado</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  imagemContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  clientItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  clientText: {
    fontSize: 16,
    color: '#333',
  },
  noResultsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});
