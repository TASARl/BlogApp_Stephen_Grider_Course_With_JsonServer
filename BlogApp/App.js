import * as React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import IndexScreen from "./src/screens/IndexScreen";
import { Provider } from "./src/context/BlogContext";
import ShowScreen from "./src/screens/ShowScreen";
import CreateScreen from "./src/screens/CreateScreen";
import EditScreen from "./src/screens/EditScreen";

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Blogs">
                <Stack.Screen name="Blogs" component={IndexScreen} />
                <Stack.Screen name="Show Screen" component={ShowScreen} />
                <Stack.Screen
                    name="Create Screen"
                    component={CreateScreen}
                />
                <Stack.Screen name="Edit Screen" component={EditScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default () => {
    return (
        <Provider>
            <App />
        </Provider>
    );
};
