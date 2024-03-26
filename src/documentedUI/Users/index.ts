import getUsers from "./getUsers";
import addUser from "./registerUser";
import loginUser from "./login";
import getSingleUser from "./gettUserById";
import deleteUser from "./deleteUser";
import updateUser from "./updateUser";
import getBlogs from "../Blogs/getBlogs";
import addBlog from "../Blogs/createBlog";
import getOneBlog from "../Blogs/getOneBlogById";
import deleteBlog from "../Blogs/deleteBlog";
import addComment from "../Comments/addComment";
import allComments from "../Comments/getCommentsByBlogId"
import addLike from "../Like/addLike";

export default {

    paths: {

        '/api/v1/users': {
            ...getUsers,

        },
        '/api/v1/users/{id}': {
            ...getSingleUser,
            ...deleteUser,
            ...updateUser
        },
        '/api/v1/users/register': {
            ...addUser,
        },
        '/api/v1/user/login': {
            ...loginUser,
        },
        '/api/v1/blog': {
            ...getBlogs,
            ...addBlog
        },
        '/api/v1/blog/{id}': {
            ...getOneBlog,
            ...deleteBlog
        },
        '/api/v1/blog/{id}/comments': {
            ...addComment,
            ...allComments
        },
        '/api/v1/blog/{id}/likes': {
            ...addLike,
        },
    
      
    },
};