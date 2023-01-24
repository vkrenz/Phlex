import { Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "state"
import PostWidget from "./PostWidget"

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch()
    // const [reversedPostsArr, setReversedPostsArr] = useState([])
    const [userPosts, setUserPosts] = useState(null)
    const posts = useSelector((state) => state.posts)
    const token = useSelector((state) => state.token)

    /** Get ALL USER'S posts */
    const getPosts = async () => {
        const response = await fetch("http://localhost:3001/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        dispatch(setPosts({ posts: data.reverse() }))

        /** Create a shallow copy of posts and reverse it */
        // const reversedPosts = posts.slice().reverse()
        // setReversedPostsArr(reversedPosts)
    }

    /** Get ONLY THE SPECIFIC USER'S posts */
    const getUserPosts = async () => {
        const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        dispatch(setPosts({ posts: data }))
    }

    useEffect(() => {
        if (isProfile) {
            getUserPosts()
        } else {
            getPosts()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(!posts) {
        /** TODO: Add <LoadingSpinner /> */
        return (
            <Typography
                mt="1rem"
                textAlign="center"
            >
                Loading Posts...
            </Typography>
        )
    }

    // console.log(reversedPostsArr.userId)

    return (
        <>
            {posts.filter(post => post.userId === userId).slice(0, 3).map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    occupation,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        occupation={occupation}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
            {posts.filter(post => post.userId !== userId).map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    occupation,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        occupation={occupation}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    )
}


export default PostsWidget