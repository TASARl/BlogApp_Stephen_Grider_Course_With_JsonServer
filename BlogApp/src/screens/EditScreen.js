import React, { useContext, useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import { Context } from "../context/BlogContext";

export default function EditScreen({ navigation, route }) {
    const { state, editBlogPost } = useContext(Context);

    const blogPost = state.find(
        (blogPost) => blogPost.id === route.params.id
    );

    const [title, setTitle] = useState(blogPost.title);
    const [content, setContent] = useState(blogPost.content);
    const id = route.params.id;

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
                title="Edit Blog Post"
                onPress={() =>
                    editBlogPost(id, title, content, () => {
                        // navigation.navigate("Show Screen", {
                        //     id: id,
                        // });
                        navigation.pop(); // bir önceki ekrana
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
