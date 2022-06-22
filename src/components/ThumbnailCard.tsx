import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import useHover from "../util/useHover";
import ThumbnailImage from "./ThubnailImage";
import HoverAndTooltips from "./HoverAndTooltips";
import VideoDetails from "./VideoDetails";
import ChannelImage from "./ChannelImage";
import TimeLengthIndicator from "./TimeLengthIndicator";
import CardActionsButton from "./CardActionsButton";
import * as Animatable from "react-native-animatable";
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';

export interface ThumbnailCardProps {
    thumbnailUri: string,
    channelImageUri: string,
    title: string,
    channelName: string,
    checkMarkUri?: string,
    views?: number,
    relativeTime: string,
    isLive: boolean,
    watching?: number,
    timeLength?: string
}

//not sure watching for live is the same up views. double check that on api response
const ThumbnailCard: FunctionComponent<{ videoProps: ThumbnailCardProps, thumbImageHover?: { thumbImageRef?: React.MutableRefObject<null> | boolean, isHoveringOnThumbImage?: boolean }, cardHover?: { isHoveringOnThumbnailCard?: React.MutableRefObject<null> | boolean, thumbnailCardRef?: boolean }, isZoomedIn?: boolean }>
    = ({
           videoProps,
           thumbImageHover: {isHoveringOnThumbImage, thumbImageRef},
           cardHover: {isHovering, thumbnailCardRef},
           isZoomedIn
       }) => {

    const [channelImageRef, isHoveringOnChannelImage] = Platform.OS === 'web' ? useHover() : [null, false]
    const [titleRef, isHoveringOn] = Platform.OS === 'web' ? useHover() : [null, false]
    const [channelNameRef, isHoveringOnChannelName] = Platform.OS === 'web' ? useHover() : [null, false]
    const [checkMarkRef, isHoveringOnCheckMark] = Platform.OS === 'web' ? useHover() : [null, false]

    const {
        thumbnailUri,
        title,
        channelName,
        views,
        relativeTime,
        isLive,
        watching,
        timeLength

    } = videoProps

    const paddings = applyPaddings(isZoomedIn)

    const viewAnimation = useRef<Animatable.View & View>(null);
    const [showCardActions, setShowCardActions] = useState(false)

    useEffect(() => {
        const Animation = async () => {
                if (isZoomedIn) {
                        setShowCardActions(true)
                        if (viewAnimation.current)
                            await viewAnimation.current.fadeIn();
                } else {
                    if (viewAnimation.current)
                        await viewAnimation.current.fadeOut();
                }

        }

        Animation();
    }, [isZoomedIn, viewAnimation]);

    return (
        <View style={styles.wrapper}>
            <ThumbnailImage thumbImageRef={thumbImageRef} uri={thumbnailUri}/>

            {(Platform.OS === 'web') && (
                < HoverAndTooltips hoverFlags={
                    {
                        isHoveringOnThumbImage: isHoveringOnThumbImage,
                        isHoveringOnChannelImage,
                        isHoveringOnTittle: isHoveringOn,
                        isHoveringOnChannelName,
                        isHoveringOnCheckMark,

                    }} data={{channelName, title}}  isZoomedIn = {isZoomedIn} />)}

            {(timeLength && !isHoveringOnThumbImage) && <TimeLengthIndicator timeLength={timeLength}/>}

            <Animatable.View easing={"ease"} duration={10} delay={1000} transition={["paddingLeft"]}
                             style={{...styles.videoDetailsContainer, flexDirection: "row", ...paddings}}>

                <ChannelImage channelImageRef={channelImageRef}/>
                <VideoDetails title={title} channelName={channelName} relativeTime={relativeTime}
                              isLive={isLive}
                              views={views} watching={watching} hoverDetails={{
                    channelNameRef: channelNameRef,
                    titleRef: titleRef,
                    checkMarkRef: checkMarkRef,
                    isHoveringOnThumbnailCard: isHovering,
                    isHoveringChannelName: isHoveringOnChannelName
                }}/>
            </Animatable.View>
            <Animatable.View duration = {1000} ref={viewAnimation} delay={1000} >
                {showCardActions && <CardActionsContainer/>}
            </Animatable.View>

        </View>
    );
};

const CardActionsContainer = () => {
    return (
        <View style={styles.cardActionsContainer}>
            <CardActionsButton title={"WATCH LATTER"}
                               children={<MaterialCommunityIcons name="clock-time-two-outline" size={18}
                                                                 color="gray"/>}/>
            <View style={{marginLeft: 5, marginRight: 5}}></View>
            <CardActionsButton title={"ADD TO QUEUE"}
                               children={<MaterialIcons name="playlist-play" size={18} color="gray"/>}/>
        </View>
    )
}

const applyPaddings = (isZoomedIn?: boolean) => {
    if (isZoomedIn) {
        return {
            paddingLeft: 10,
        }
    }
    return {paddingLeft: 0}
}

const mobileStylesForVideoDetailsContainer = Platform.OS === 'android' || Platform.OS === 'ios' ? {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15
} : {}


const styles = StyleSheet.create({
    wrapper:
        {
            width: Platform.OS === 'android' || Platform.OS === 'ios' ? "100%" : 320,
            backgroundColor: '#f8f8f9',
        }
    ,
    videoDetailsContainer:
        {
            flex: 1,
            flexDirection: "row",
            ...mobileStylesForVideoDetailsContainer,

        },
    cardActionsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    }


})
export default ThumbnailCard;
