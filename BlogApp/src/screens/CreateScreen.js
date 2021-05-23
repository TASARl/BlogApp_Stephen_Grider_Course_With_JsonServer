import React, { useContext, useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import { Context } from "../context/BlogContext";

export default function CreareScreen({ navigation }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { addBlogPost } = useContext(Context);

    return (
        <View>
            <Text style={styles.label}>Title:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <Text style={styles.label}>Content:</Text>
            <TextInput
                style={styles.input}
                value={content}
                onChangeText={(text) => setContent(text)}
            />
            <Button
                title="Add Blog Post"
                onPress={() =>
                    addBlogPost(title, content, () => {
                        navigation.navigate("Blogs");
                    })
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderColor: "black",
        borderWidth: 1,
        fontSize: 18,
        marginBottom: 15,
        margin: 10,
        padding: 5,
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        padding: 5,
    },
});
