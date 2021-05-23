import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
    switch (action.type) {
        case "get_blogposts":
            return action.payload; // json serverdan gelen veri
        case "delete_blogpost":
            return state.filter(
                (blogPost) => blogPost.id !== action.payload
            );

        case "edit_blogpost":
            return state.map((blogPost) => {
                // ternary operator kullanılabilr
                if (blogPost.id === action.payload.id) {
                    return action.payload;
                } else {
                    return blogPost;
                }
            });
        default:
            return state;
    }
};

const getBlogPosts = (dispatch) => {
    return async () => {
        const response = await jsonServer.get("/blogposts");
        // response === [{},{},{}]
        dispatch({ type: "get_blogposts", payload: response.data });
    };
};

const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        await jsonServer.post("/blogposts", { title, content });

        callback();
    };
};

const editBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, { title, content });

        dispatch({
            type: "edit_blogpost",
            payload: { id: id, title: title, content: content },
        });
        callback();
    };
};

const deleteBlogPost = (dispatch) => {
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`);

        dispatch({ type: "delete_blogpost", payload: id }); // tekrar json dan veri çekmeden react içindeki elemanı silmek daha mantıklı
    };
};

export const { Context, Provider } = createDataContext(
    blogReducer,
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
    []
);
