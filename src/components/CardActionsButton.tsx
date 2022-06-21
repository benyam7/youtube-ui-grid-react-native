import React from 'react';
import {Pressable, Text, View} from "react-native";
import {Entypo} from "@expo/vector-icons";


const CardActionsButton = () => {
    return (
        <Pressable>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1,
                backgroundColor: 'gray',
                paddingLeft: 27,
                paddingRight: 27,
                paddingTop: 10,
                paddingBottom: 10
            }}>
                <Entypo name="dots-three-vertical" size={12} color="black" style={{marginRight: 10}}/>
                <Text>Watch Latter</Text>
            </View>
        </Pressable>
    )
}

export default CardActionsButton;
