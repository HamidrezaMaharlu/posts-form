import React from 'react';
import Input from "../Input/Input";
import Button from "../Button/Button";
import classes from "./Form.module.css";

function Form({post,setPost,isEdit,handleSubmiteEdit,handleAdd,isLoading,clickedBtn}) {
    return (
        <div className={classes.form}>
            <h3 className={classes.blue}>Edit/Add</h3>
            <form>
                <div className={classes.gray}>
                    <Input name="title" type="text" label="Title" value={post.title} onChange={(e)=>setPost(prevSate=>({...prevSate,title:e.target.value}))}/>
                    <Input name="description" type="text" label="Description" value={post.description} onChange={(e)=>setPost(prevSate=>({...prevSate,description:e.target.value}))}/>
                </div>
                <div className={classes.buttons}>
                    <Button disabled={!isEdit} onClick={()=>handleSubmiteEdit(post)}>{isLoading && isEdit?"Editing...":"Edit item"}</Button>
                    <Button id="addBtn" disabled={isEdit} onClick={handleAdd}>{isLoading && clickedBtn==="addBtn"?"Adding...":"Add"}</Button>
                </div>
            </form>
        </div>

    );
}

export default Form;