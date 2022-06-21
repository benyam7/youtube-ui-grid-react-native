import React, {FunctionComponent, MutableRefObject} from "react";
import {Image, StyleSheet, Text, View} from "react-native";

const ChannelNameAndCheckMarkIndicator: FunctionComponent<{ channelName: string, checkMarkUri?: string, channelAndCheckMarkRef: { channelNameRef: boolean | MutableRefObject<null>, checkMarkRef: boolean | MutableRefObject<null> }, isHoveringOnChannelName?: boolean }> = (props) => {
    const {
        channelName,
        checkMarkUri,
        channelAndCheckMarkRef: {channelNameRef, checkMarkRef},
        isHoveringOnChannelName
    } = props

    const applyBlackColor = (isHoveringOnChannelName?: boolean) => isHoveringOnChannelName ? {color: '#000'} : {}

    return (
        <View style={styles.channelNameAndCheckMarkContainer}>
            <Text transition = {["color"]} ref={channelNameRef}
                  style={{color: '#8c8d8c', ...applyBlackColor(isHoveringOnChannelName)}}>{channelName} </Text>
            <Image ref={checkMarkRef} source={require('./../../assets/ytcheckmark.webp')}
                   style={{height: 10, width: 10}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    channelNameAndCheckMarkContainer: {padding: 0, alignItems: "center", flexDirection: "row", marginTop: 10}

})

export default ChannelNameAndCheckMarkIndicator
