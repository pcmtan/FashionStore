import AsyncStorage from '@react-native-community/async-storage';

  const setItemStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('Save data error');
    }
  };

  const getItemStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value != null) {
        return value;
      } else {
        console.log('Read data error');
      }
    } catch (error) {
      console.log('Read data error');
    }
  };

  const removeItemStored = async (key) => {
    try{
        await AsyncStorage.removeItem(key)
    }catch(error){
        console.log("Remove data error");
        
    }
  }

export {
    setItemStorage,
    getItemStorage,
    removeItemStored
}
