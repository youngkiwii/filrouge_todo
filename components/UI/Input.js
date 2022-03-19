import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

export default function Input (props) {
    
    return (
        <View style={[style.container, props.style]}>
            <TextInput
                text={props.text}
                onChangeText={props.onChangeText}
                style={style.input}
                placeholder={props.placeholder}
            />
            <TouchableOpacity style={{position: 'absolute', right: 5}} onPress={props.onPress}>
                <Image 
                    style={style.plus}
                    source={require('../../assets/plus.png')}
                />
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        width: '70%',
        position: 'relative'
    },
    input: {
        width: '85%',
        padding: 10
    },
    plus: {
        width: 25,
        height: 25
    }
});