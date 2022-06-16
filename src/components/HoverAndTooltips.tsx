import {Tooltip} from "./Tooltip";
import React, {FunctionComponent, MutableRefObject} from "react";
import {Platform} from "react-native";

const HoverAndTooltips: FunctionComponent<{
    hoverFlags: {
        isHoveringOnThumbImage: boolean | MutableRefObject<null>,
        isHoveringOnChannelImage: boolean | MutableRefObject<null>,
        isHoveringOnTittle: boolean | MutableRefObject<null>,
        isHoveringOnChannelName: boolean | MutableRefObject<null>,
        isHoveringOnCheckMark?: boolean | MutableRefObject<null>
    }, data: { channelName: string, title: string }
}> = (props) => {
    const {
        hoverFlags: {
            isHoveringOnChannelName,
            isHoveringOnChannelImage,
            isHoveringOnTittle,
            isHoveringOnThumbImage,
            isHoveringOnCheckMark
        }, data: {channelName, title}
    } = props
    return (
        <>
            {
                isHoveringOnThumbImage && <Tooltip message={"Keep hovering to play"} position={{top: 155, left: 177}}/>
            }
            {
                isHoveringOnChannelImage &&
                <Tooltip hasBorders={true} message={channelName} position={{top: 255, left: 40}} overriddenStyles={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 2,
                    paddingRight: 2
                }}/>
            }
            {
                isHoveringOnTittle && <Tooltip hasBorders={true} message={title} position={{top: 255, left: 100}}/>
            }

            {
                isHoveringOnChannelName && <Tooltip overriddenStyles={{
                    width: 'gray',
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 3,
                    paddingRight: 3,
                    borderRadius: 2,
                }} message={channelName} position={{top: 210, left: 75}}/>
            }
            {
                isHoveringOnCheckMark && <Tooltip overriddenStyles={{
                    width: 'gray',
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 3,
                    paddingRight: 3,
                    borderRadius: 2,
                }} message={"Verified"} position={{top: 210, left: 150}}/>
            }
        </>
    )
}

export default HoverAndTooltips
