import classes from './App.module.css';
import Form from "./Componenets/Form/Form";
import Posts from "./Componenets/Posts/Posts";
import {useEffect, useRef, useState} from "react";
import useFetch from "./Hooks/useFetch";

function App() {
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState({title: "", description: "", id: ""})
    const [isEdit, setIsEdit] = useState(false)
    const {isLoading, error, sendRequest} = useFetch()
    const clickedBtn = useRef()

    function handleDelete(e) {
        clickedBtn.current = e.target.id

        function updateState(data) {
            setPosts(prevState => {
                return prevState.filter(item => item.id !== data.id)
            })
        }

        sendRequest({
            url: `https://63d251f106556a0fdd3942bf.mockapi.io/posts/${e.target.id}`,
            method: "DELETE"
        }, updateState)
    }

    function handleEditItem(id) {
        const find = posts.find(item => item.id === id)
        setPost(find)
        setIsEdit(true)
        clickedBtn.current = id
    }


    function handleSubmitEdit(post) {
        function updateState(data) {
            setPosts(prevState => {
                const index = prevState.findIndex(item => item.id === data.id)
                prevState[index] = data
                return prevState
            })
            setPost({title: "", description: "", id: ""})
            setIsEdit(false)
        }

        sendRequest({
            url: `https://63d251f106556a0fdd3942bf.mockapi.io/posts/${post.id}`,
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: post
        }, updateState)
    }

    function handleAdd(e) {
        clickedBtn.current = e.target.id

        function updateState(data) {
            setPosts(prevState => {
                return [...prevState, data]
            })
            setPost({title: "", description: "", id: ""})
        }

        if (post.title.trim().length > 0 && post.description.trim().length > 0) {

            const obj = {title: post.title, description: post.description};
            sendRequest({
                url: "https://63d251f106556a0fdd3942bf.mockapi.io/posts",
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: obj
            }, updateState)
        }
    }

    useEffect(() => {
        sendRequest({url: "https://63d251f106556a0fdd3942bf.mockapi.io/posts"}, setPosts)
    }, [sendRequest])

    return (
        <div className={classes.app}>

            <Posts data={posts} handleDelete={handleDelete} isLoading={isLoading} clickedBtn={clickedBtn.current}
                   handleEditItem={handleEditItem} isEdit={isEdit} error={error}/>
            <Form post={post} setPost={setPost}
                  isEdit={isEdit} handleSubmiteEdit={handleSubmitEdit} isLoading={isLoading} handleAdd={handleAdd}
                  clickedBtn={clickedBtn.current}/>
        </div>
    );
}

export default App;
