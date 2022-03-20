import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

// Composant d'un TextInput avec un logo cliquable qui lance une fonction
export default function Input (props) {
    
    return (
        <View style={[style.container, props.style]}>
            <TextInput
                value={props.text}
                onChangeText={props.onChangeText}
                style={style.input}
                color={props.purple ? "#eee":""}
                placeholder={props.placeholder}
                placeholderTextColor={props.purple ? "#9097fc": ""}
                onSubmitEditing={props.onPress}
            />
            <TouchableOpacity style={{position: 'absolute', right: 15}} onPress={props.onPress}>
                <Image 
                    style={style.plus}
                    source={require('../../assets/plus.png')}
                />
            </TouchableOpacity>
        </View>
    )
}

// Style
const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "#d1dbed",
        width: '70%',
        position: 'relative',
        shadowColor: '#171717',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    input: {
        width: '90%',
        padding: 20
    },
    plus: {
        width: 25,
        height: 25
    }
});