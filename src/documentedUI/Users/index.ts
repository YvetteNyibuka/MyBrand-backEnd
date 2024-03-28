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
import createQuerry from "../Querries/createQuerry";
import getQuerries from "../Querries/getQuerries";
import getOneQuerry from "../Querries/getOneQuery";
import deleteQuerry from "../Querries/deleteQuerry";

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
        '/api/v1/users/login': {
            ...loginUser,
        },
        '/api/v1/blogs': {
            ...getBlogs,
            ...addBlog
        },
        '/api/v1/blogs/{id}': {
            ...getOneBlog,
            ...deleteBlog
        },
        '/api/v1/blogs/{id}/comments': {
            ...addComment,
            ...allComments
        },
        '/api/v1/blogs/{id}/likes': {
            ...addLike,
        },
        '/api/v1/querries': {
            ...createQuerry,
            ...getQuerries
        },
        '/api/v1/querries/{id}': {
            ...getOneQuerry,
            ...deleteQuerry
        }
    },
};