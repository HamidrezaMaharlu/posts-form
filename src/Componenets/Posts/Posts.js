import React from 'react';
import Card from "../Card/Card";
import Button from "../Button/Button";
import classes from "./Posts.module.css";

function Posts({data,handleDelete,handleEditItem,isLoading,clickedBtn,isEdit,error}) {
    return (
        <div className={classes.post__wrapper}>
            {!error && data.length>0 &&
                data.map(post => {
                    return <Card key={post.id} className={classes.postsCard}>
                        <h2>{post.title}</h2>
                        <p>{post.title}</p>
                        <p className={classes.description}>{post.description}</p>
                        <Button onClick={()=>handleEditItem(post.id)}>Edit Item</Button>
                        <Button disabled={isEdit&&clickedBtn===post.id} id={post.id} onClick={handleDelete}>{!isEdit&&isLoading && clickedBtn===post.id?"Deleting...":"Delete"}</Button>
                    </Card>
                })
            }
            {error &&<p>{error}</p>}
            {!error && data.length===0 && <p>You dont have any post</p>}
        </div>

    );
}

export default Posts;