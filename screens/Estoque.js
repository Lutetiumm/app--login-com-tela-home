import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Estoque({ navigation }) {
  const [produtos, setProdutos] = useState([]);

  const carregarProdutos = async () => {
    try {
      const produtosSalvos = await AsyncStorage.getItem('produtos');
      if (produtosSalvos) {
        setProdutos(JSON.parse(produtosSalvos));
      } else {
        setProdutos([]);
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar produtos.');
    }
  };

  const excluirProduto = async (index) => {
    try {
      let produtosSalvos = await AsyncStorage.getItem('produtos');
      produtosSalvos = JSON.parse(produtosSalvos);

      produtosSalvos.splice(index, 1);

      await AsyncStorage.setItem('produtos', JSON.stringify(produtosSalvos));

      setProdutos(produtosSalvos);
      Alert.alert('Produto Excluído', 'Produto excluído com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao excluir o produto.');
    }
  };

  const editarProduto = (produto, index) => {
    navigation.navigate('EditarProduto', { produto, index });
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.produto}>
      <Text>Produto: {item.nome}</Text>
      <Text>Preço: R${item.preco}</Text>
      <TouchableOpacity onPress={() => editarProduto(item, index)}>
        <Text style={styles.editDeleteText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => excluirProduto(index)}>
        <Text style={styles.editDeleteText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    carregarProdutos();

    const unsubscribe = navigation.addListener('focus', () => {
      carregarProdutos();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={produtos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Nenhum produto cadastrado</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  produto: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  editDeleteText: {
    color: 'blue',
    marginTop: 5,
  },
});
