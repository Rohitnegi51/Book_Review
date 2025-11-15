import { View, Text, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, Platform, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import styles from "../../assets/styles/create.styles"
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system"
import { useAuthStore } from "../../store/authStore"
import { API_KEY } from '../../constants/api';
export default function Create() {
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("")
    const [rating, setRating] = useState(3);
    const [image, setImage] = useState(null);  
    const [imageBase64, setImageBase64] = useState(null); //to turn image into text to send over internet
    const [loading , setLoading] = useState(false);

    const router = useRouter();
    const { token } = useAuthStore();

    const pickImage =async ()=>{
        try {
            if(Platform.OS !=='web'){
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                console.log({status}) ;
                if(status!=="granted"){
                    Alert.alert("Permission Denied","We need camera roll permissions to upload an image");
                    return ;
                }
            }

            //launch image library
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:'images',
                allowsEditing:true,
                aspect:[4,3],
                quality:0.5,
                base64:true,
            })

            if(!result.canceled){
                //console.log("results:",result);
                setImage(result.assets[0].uri)

                if(result.assets[0].base64){
                    setImageBase64(result.assets[0].base64)
                } else {
                    const file = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                        encoding: "base64"
                    });
                    setImageBase64(file);
                }
            }
        } catch (error) {
            console.log("Error picking Image",error);
            Alert.alert("Error","Problem in selecting your image");
        }
    }
    const handleSubmit = async()=>{
        if(!title || !caption || !imageBase64 || rating<1){
            Alert.alert("Error","Please fill in all fields");
            return;
        }
        if (!image || !imageBase64) {
            Alert.alert("Error", "Image is missing");
            return;
          }
          
        try {
            setLoading(true);
            //image uri looks like file://data//user/.../photo.png
            const uriParts = image.split('.');
            const fileType = uriParts[uriParts.length-1];
            const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg" ;

            const imageDataUrl = `data:${imageType};base64,${imageBase64}` ;
            const response = await fetch(`${API_KEY}/books`,{
                method:"POST",
                headers:{
                    Authorization:`Bearer ${token}`,
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    title,
                    caption,
                    rating:rating.toString(),
                    image:imageDataUrl,
                })
            });

            const data = await response.json();
            console.log({data});
            if(!response.ok) throw new Error(data.message || "Something went wrong");

            Alert.alert("Success","Your Book Review has been posted");
            setTitle("");
            setCaption("");
            setRating(3);
            setImage(null);
            setImageBase64(null);
            router.push("/");
        } catch (error) {
            console.error("Error creating post:",error);
            Alert.alert("Error",error.message || "Something went wrong");
        }finally{
            setLoading(false);
        }
    }

    const renderRating = ()=>{
        const stars=[];
        for(let i=1;i<=5;i++){
            stars.push(
                <TouchableOpacity
                    key={i}
                    onPress={()=>setRating(i)}
                    style={styles.starButton}
                >
                   <Ionicons
                    name={i <=rating ? "star":"star-outline"}
                    size={32}   
                    color={i <=rating ? "#f4b400": COLORS.textSecondary}
                   />
                </TouchableOpacity>
            )
        }
        return <View style={styles.ratingContainer}>{stars}</View>;
    }

  return (
    <KeyboardAvoidingView
        style={{flex:1}}
        behavior={Platform.OS === "ios" ? "padding" :"height"}
    >
      <ScrollView
        contentContainerStyle={styles.container} 
        style={styles.scrollViewStyle}
      >
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Add Book Recommendation</Text>
                <Text style={styles.subtitle}>Share your favorite reads with others</Text>
            </View>

            <View style={styles.form}>
                {/* Book Title */}
                <View style={styles.formGroup} >
                    <Text style={styles.label}>Book Title</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name='book-outline'
                            size={20}
                            color={COLORS.textSecondary}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Enter Book Title'
                            placeholderTextColor={COLORS.placeholderText}
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>
                </View>

                {/* Rating */}
                <View style={styles.formGroup} >
                    <Text style={styles.label}>Your Rating</Text>
                      {renderRating()}
                </View>

                {/* Image */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Book Image</Text>
                    <TouchableOpacity
                      style={styles.imagePicker}
                      onPress={pickImage}
                    >
                        {image ?(
                            <Image source={{uri:image}} style={styles.previewImage}/>
                        ):(
                            <View style={styles.placeholderContainer}>
                            <Ionicons
                             name='image-outline'
                             size={40}
                             color={COLORS.textSecondary}
                            />
                            <Text style={styles.placeholderText}>Tap to select Image</Text>
                        </View>
                        )}
                        
                    </TouchableOpacity>
                </View>


                {/* Caption */}
                <View style={styles.formGroup} >
                    <Text style={styles.label}>Caption</Text>
                    
                        <TextInput
                            style={styles.textArea}
                            placeholder='Write your review or thoughts about this book ...'
                            placeholderTextColor={COLORS.placeholderText}
                            value={caption}
                            onChangeText={setCaption}
                            multiline
                        />
                    
                </View>

                {/* Submit */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading?(
                        <ActivityIndicator color={COLORS.white}/>
                    ):(
                        <>
                            <Ionicons
                                name='cloud-upload-outline'
                                size={20}
                                style={styles.buttonIcon}
                                color={COLORS.white}
                            />
                            <Text style={styles.buttonText}>Share</Text>
                        </>
                    )}
                </TouchableOpacity>


            </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    
  )
}