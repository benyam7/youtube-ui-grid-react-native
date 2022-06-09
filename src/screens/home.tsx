import * as React from 'react';
import ThumbnailCard from "../components/ThumbnailCard";
import {ScrollView, View} from "react-native";

const test = new Array(10)
const populateArray = () => {
    for (let i = 0; i < 10; i++) {
        test.push("idk")
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
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f8f9',
            }}>
                {
                    test
                        .map((v, i) => {
                            console.log(i)
                            return <ThumbnailCard key={i}/>
                        })
                }
            </View>
        </ScrollView>

    );
};

export default Home;
