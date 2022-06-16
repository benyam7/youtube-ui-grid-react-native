import React, {FunctionComponent} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import useHover from "../util/useHover";
import ThumbnailImage from "./ThubnailImage";
import HoverAndTooltips from "./HoverAndTooltips";
import VideoDetails from "./VideoDetails";
import ChannelImage from "./ChannelImage";
import TimeLengthIndicator from "./TimeLengthIndicator";

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
const ThumbnailCard: FunctionComponent<{ videoProps: ThumbnailCardProps }> = (props) => {
        const [thumbImageRef, isHoveringOnThumbImage] = Platform.OS === 'web' ? useHover() : [null, false]
        const [channelImageRef, isHoveringOnChannelImage] = Platform.OS === 'web' ? useHover() : [null, false]
        const [titleRef, isHoveringOnTittle] = Platform.OS === 'web' ? useHover() : [null, false]
        const [channelNameRef, isHoveringOnChannelName] = Platform.OS === 'web' ? useHover() : [null, false]
        const [checkMarkRef, isHoveringOnCheckMark] = Platform.OS === 'web' ? useHover() : [null, false]
        const [thumbnailCardRef, isHoveringOnThumbnailCard] = Platform.OS === 'web' ? useHover() : [null, false]

        const {
            thumbnailUri,
            title,
            channelName,
            views,
            relativeTime,
            isLive,
            watching,
            timeLength
        } = props.videoProps

        return (
            <View style={styles.wrapper} ref={thumbnailCardRef}>
                <ThumbnailImage thumbImageRef={thumbImageRef} uri={thumbnailUri}/>
                {(Platform.OS === 'web') && (
                    < HoverAndTooltips hoverFlags={
                        {
                            isHoveringOnThumbImage,
                            isHoveringOnChannelImage,
                            isHoveringOnTittle,
                            isHoveringOnChannelName,
                            isHoveringOnCheckMark,
                        }} data={{channelName, title}}/>)}

                {(timeLength && !isHoveringOnThumbImage) && <TimeLengthIndicator timeLength={timeLength}/>}

                <View style={styles.videoDetailsContainer}>
                    <ChannelImage channelImageRef={channelImageRef}/>
                    <VideoDetails title={title} channelName={channelName} relativeTime={relativeTime}
                                  isLive={isLive}
                                  views={views} watching={watching} hoverDetails={{
                        channelNameRef: channelNameRef,
                        titleRef: titleRef,
                        checkMarkRef: checkMarkRef,
                        isHoveringOnThumbnailCard: isHoveringOnThumbnailCard
                    }}/>
                </View>
            </View>
        )
            ;
    }
;

const mobileStylesForVideoDetailsContainer = Platform.OS === 'android' || Platform.OS === 'ios' ? {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
} : {}
const styles = StyleSheet.create
({
    wrapper:
        {
            width: Platform.OS === 'android' || Platform.OS === 'ios' ? "100%" : 320,
            backgroundColor: '#f8f8f9',
            margin: Platform.OS === 'web' ? 10 : 0,
        }
    ,
    videoDetailsContainer:
        {
            flex: 1,
            flexDirection: "row",
            ...mobileStylesForVideoDetailsContainer
        },

})
export default ThumbnailCard;
