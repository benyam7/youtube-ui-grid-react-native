import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';
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
        const [thumbImageRef, isHoveringOnThumbImage] = useHover()
        const [channelImageRef, isHoveringOnChannelImage] = useHover()
        const [titleRef, isHoveringOnTittle] = useHover()
        const [channelNameRef, isHoveringOnChannelName] = useHover()
        const [checkMarkRef, isHoveringOnCheckMark] = useHover()
        const [thumbnailCardRef, isHoveringOnThumbnailCard] = useHover()

        const {
            thumbnailUri,
            channelImageUri,
            title,
            channelName,
            checkMarkUri,
            views,
            relativeTime,
            isLive,
            watching,
            timeLength
        } = props.videoProps

        return (
            <View style={styles.wrapper} ref={thumbnailCardRef}>
                <ThumbnailImage thumbImageRef={thumbImageRef} uri={thumbnailUri}/>

                <HoverAndTooltips hoverFlags={
                    {
                        isHoveringOnThumbImage,
                        isHoveringOnChannelImage,
                        isHoveringOnTittle,
                        isHoveringOnChannelName,
                        isHoveringOnCheckMark,
                    }} data={{channelName, title}}/>

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


const styles = StyleSheet.create
({
    wrapper:
        {
            width: 400,
            height: 400,
            backgroundColor: '#f8f8f9',
            margin: 10,
        }
    ,
    videoDetailsContainer:
        {
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start"
        },

})
export default ThumbnailCard;
