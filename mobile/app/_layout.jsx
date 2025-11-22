import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen"
import { StatusBar } from "expo-status-bar";
import {useAuthStore} from "../store/authStore"
import { useEffect } from "react";
import {useFonts} from "expo-font"

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const {checkAuth ,user ,token} = useAuthStore();

  const [fontsLoaded] = useFonts({
    "JetbrainMono-Medium":require("../assets/fonts/JetBrainsMono-Medium.ttf")
  })

  useEffect(()=>{
    if(fontsLoaded) SplashScreen.hideAsync();
  },[fontsLoaded])

  useEffect(()=>{
    checkAuth();
  },[])

  useEffect(()=>{
    if(!segments || segments.length === 0){return;}

    const inAuthScreen = segments[0] === "(auth)";
    const isSigned = user && token ;

    if(!isSigned && !inAuthScreen) router.replace("/(auth)");
    else if(isSigned && inAuthScreen ){
      router.replace("/(tabs)")
    }
  },[user,token ,segments,router]);

  

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }} > 
         <Stack.Screen name="(tabs)" />
         <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark"/>
    </SafeAreaProvider>
  );
  
}
