import React, {FunctionComponent} from "react";
import {Text, View} from "react-native";

const LiveVideoDetails: FunctionComponent<{ watching: number }> = (props) => {
    const {watching} = props
    return (
        <>
            <Text style={{color: '#bcbdbd'}}>{watching} watching</Text>
            <LiveIndicator/>
        </>
    )
}

const LiveIndicator = () => {
    return (
        <View style={{
            width: 75,
            flexDirection: "row",
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: '#d32e2d',
            borderRadius: 5,
            marginTop: 10
        }}>
            <Text style={{flex: 1, color: '#d32e2d', textTransform: 'uppercase', textAlign: 'center'}}>
                Live Now</Text>
        </View>
    )
}

export default LiveVideoDetails
