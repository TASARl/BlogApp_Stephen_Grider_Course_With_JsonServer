import React, { useContext, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Button,
    TouchableOpacity,
} from "react-native";
import { Context as Context } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
    const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

    useEffect(() => {
        getBlogPosts();

        const listener = navigation.addListener("focus", () => {
            getBlogPosts();
        }); // asyfaya tekrar dönüldüğünde çalışır ve json verilerini yeniler

        return () => {
            listener.remove();
        }; // component did unmount olayı. belleği rahatlatmak için listener ı siler.
    }, []); // sadece ilk başta çalışır. json verileiei getirir

    // üst menu artı dugmesi
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate("Create Screen")}>
                    <AntDesign name="plus" size={30} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <View>
            <FlatList
                data={state}
                keyExtractor={(blogPost) => blogPost.title + blogPost.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("Show Screen", {
                                    id: item.id,
                                })
                            }>
                            <View style={styles.row}>
                                <Text style={styles.title}>
                                    {item.title} - {item.id}
                                </Text>
                                <TouchableOpacity
                                    onPress={() =>
                                        deleteBlogPost(item.id)
                                    }>
                                    <Feather
                                        style={styles.icon}
                                        name="trash"
                                    />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: "gray",
    },
    title: {
        fontSize: 18,
    },
    icon: {
        fontSize: 24,
        padding: 5,
    },
});

export default IndexScreen;
