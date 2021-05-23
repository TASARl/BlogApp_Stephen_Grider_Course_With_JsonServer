import React, { useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Context } from "../context/BlogContext";
import { AntDesign } from "@expo/vector-icons";

export default function ShowScreen({ navigation, route }) {
    const { state } = useContext(Context);

    const blogPost = state.find(
        (blogPost) => blogPost.id === route.params.id
    );

    const id = route.params.id;

    // üst menu artı dugmesi
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Edit Screen", {
                            id: route.params.id,
                        })
                    }>
                    <AntDesign name="edit" size={30} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <View>
            <Text>Navigation Route ile alınan id: {id}</Text>
            <Text>{blogPost.title}</Text>
            <Text>{blogPost.content}</Text>
        </View>
    );
}
