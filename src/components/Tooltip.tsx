import React, {FunctionComponent} from 'react'
import {StyleSheet, Text, View} from "react-native";

export const Tooltip: FunctionComponent<{ message: string, hasBorders?: boolean, position: { top: number, left: number } }> = (props) => {
    const {hasBorders, message, position: {top, left}} = props
    const borderStyles = hasBorders ? {
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#858485',
        borderRadius: 0.5,
        padding: 2,
    } : {}

    return (
        <View
            style={{
                backgroundColor: 'black',
                position: 'absolute',
                top: top,
                left: left,
                padding: 1,
                zIndex: 20,
                ...borderStyles
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>{message}</Text>
        </View>
    )

}
