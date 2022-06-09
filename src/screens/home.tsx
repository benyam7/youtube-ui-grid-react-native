import * as React from 'react';
import ThumbnailCard, {ThumbnailCardProps} from "../components/ThumbnailCard";
import {ScrollView, StyleSheet, View} from "react-native";

const testThumbnailCardData: ThumbnailCardProps[] = new Array(10)
const populateArray = () => {
    for (let i = 0; i < 10; i++) {
        testThumbnailCardData.push({
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
            <View style={styles.appContainer}>
                {
                    testThumbnailCardData.map((videoProps, i) => {
                        return <ThumbnailCard key={i} videoProps={videoProps}/>
                    })
                }
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f8f9',
    }
})
export default Home;
