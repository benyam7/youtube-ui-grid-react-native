import * as React from 'react';
import ThumbnailCard, {ThumbnailCardProps} from "../components/ThumbnailCard";
import {ScrollView, View} from "react-native";

const test: ThumbnailCardProps[] = new Array(10)
const populateArray = () => {
    for (let i = 0; i < 10; i++) {
        test.push({
            views: 999,
            isLive: i % 2 === 0,
            relativeTime: "2 hours ago",
            channelName: "Fox News",
            title: "$60,000 in a weekend!",
            timeLength: "5: 10 : 10",
            channelImageUri: "",
            thumbnailUri: "",
            checkMarkUri: "",
            watching: 994,
        })
    }
}
populateArray()
const Home = () => {
    return (
        <ScrollView>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'cent   er',
                justifyContent: 'center',
                backgroundColor: '#f8f8f9',
            }}>
                {
                    test
                        .map((videoProps, i) => {
                            console.log(videoProps)
                            return <ThumbnailCard key={i} videoProps={videoProps}/>
                        })
                }
            </View>
        </ScrollView>

    );
};

export default Home;
