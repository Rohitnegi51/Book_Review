import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuthStore } from '../../store/authStore'
import { useRouter } from 'expo-router';


export default function Home() {

    const {logout} = useAuthStore();
    const router = useRouter();
    const handle = async()=>{
        const res = await logout();
        if(res) router.replace("/(auth)")
    }

  return (
    <View>
      <TouchableOpacity
              onPress={handle}
            >
              <Text>click</Text>
            </TouchableOpacity>
    </View>
  )
}