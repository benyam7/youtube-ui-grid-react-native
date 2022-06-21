import React, {FunctionComponent} from 'react';
import {Pressable, Text, View} from "react-native";
import {Entypo} from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';

const CardActionsButton: FunctionComponent<{title: string, children: any}> = (props) => {
    const {title, children} = props

    return (
        <Pressable>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f1eeee',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
            }}>
                {children}
                <Text>{title}</Text>
            </View>
        </Pressable>
    )
}

export default CardActionsButton;
