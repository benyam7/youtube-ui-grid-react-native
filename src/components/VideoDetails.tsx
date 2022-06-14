import React, {FunctionComponent, MutableRefObject} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Entypo} from "@expo/vector-icons";
import PostedVideoDetails from "./PostedVideo";
import LiveVideoDetails from "./LiveBroadcastDetails";
import ChannelNameAndCheckMarkIndicator from "./ChannelNameAndCheckMarkIndicator";

interface VideoDetailsProps {
    title: string,
    channelName: string,
    checkMarkUri?: string,
    views?: number,
    relativeTime: string,
    isLive: boolean,
    watching?: number,
    hoverDetails: {
        titleRef: boolean | MutableRefObject<null>,
        channelNameRef: boolean | MutableRefObject<null>,
        checkMarkRef?: boolean | MutableRefObject<null>,
        isHoveringOnThumbnailCard: boolean | MutableRefObject<null>,
    }
}

const VideoDetails: FunctionComponent<VideoDetailsProps> = (props) => {
    const {
        title,
        channelName,
        checkMarkUri,
        views,
        relativeTime,
        isLive,
        watching,
        hoverDetails: {titleRef, checkMarkRef, channelNameRef, isHoveringOnThumbnailCard}
    } = props

    return (
        <View style={styles.videoDetails}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text ref={titleRef} numberOfLines={2} style={styles.title}>{title}</Text>
                {isHoveringOnThumbnailCard && <Entypo name="dots-three-vertical" size={24} color="black"/>}
            </View>

            <ChannelNameAndCheckMarkIndicator channelAndCheckMarkRef={{channelNameRef, checkMarkRef}}
                                              channelName={channelName} checkMarkUri={checkMarkUri}/>

            {/*TODO: think how u cna improve this*/}
            {
                isLive ? <LiveVideoDetails watching={watching!!}/> :
                    <PostedVideoDetails views={views} relativeTime={relativeTime}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    videoDetails: {
        flex: 1,
    },
    title: {fontWeight: "bold", marginRight: 20},
})

export default VideoDetails
