import React, {useEffect, useRef} from 'react'
import {View, StyleSheet, TextInput, Animated} from 'react-native'
import Svg, {G, Circle} from 'react-native-svg';

const AnimatedInput = Animated.createAnimatedComponent(TextInput);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function DonutChart({
    percentage = 0,
    radius = 40,
    strokeWidth = 10,
    duration = 500,
    color = 'white',
    delay = 0,
    textColor
}) {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const circleRef = useRef(null);
    const inputRef = useRef(null);
    
    const halfCircle = radius + strokeWidth;
    const circleCircumference = (2 * Math.PI * radius).toString();
    const animation = (toValue) => {
        return Animated.timing(animatedValue,{
            toValue,
            duration,
            delay,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        animation(percentage);
        animatedValue.addListener(v => {
            if(circleRef?.current) {
                const strokeDashoffset = circleCircumference - (circleCircumference * v.value) / 100;
                circleRef.current.setNativeProps({
                    strokeDashoffset
                })
            }

            if(inputRef?.current) {
                inputRef.current.setNativeProps({
                    text: `${Math.round(v.value)} %`
                })
            }
        });
        
        return () => {
            animatedValue.removeAllListeners();
        };
    }, [percentage]);

    return (
        <View>
            <Svg 
                width={radius * 2} 
                height={radius * 2}
                viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
            >
                <G rotation='-90' originX={halfCircle} originY={halfCircle}>
                    <Circle
                        cx='50%'
                        cy='50%'
                        stroke={'white'}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill='transparent'
                        strokeOpacity={0.2}
                    />
                    <AnimatedCircle
                        ref={circleRef}
                        cx='50%'
                        cy='50%'
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill='transparent'
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={circleCircumference}
                        strokeLinecap='round'
                    />
                </G>
            </Svg>
            <AnimatedInput
                ref={inputRef}
                underlineColorAndroid="transparent"
                editable={false}
                defaultValue='0'
                style={[
                    StyleSheet.absoluteFillObject,
                    {fontSize: radius / 3, color: textColor ?? color, fontWeight: '900', textAlign: 'center'}
                ]}
            />
        </View>
    )
}