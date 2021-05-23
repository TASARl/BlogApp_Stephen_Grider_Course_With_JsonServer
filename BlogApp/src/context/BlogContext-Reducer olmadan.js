import React, { useState } from "react";

const BlogContext = React.createContext();

export const BlogProvider = ({ children }) => {
    const [blogPosts, setBlogPosts] = useState([]);

    const addBlogPost = () => {
        setBlogPosts([
            ...blogPosts,
            { title: `My Blog Post ${blogPosts.length}` },
        ]);
    };

    return (
        <BlogContext.Provider value={{ data: blogPosts, addBlogPost }}>
            {children}
        </BlogContext.Provider>
    );
};

export default BlogContext;
