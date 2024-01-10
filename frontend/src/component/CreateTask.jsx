import React, { useState } from "react";
// import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';

const CreateTask = (props) => {
    const [noteObj, setNoteObj] = useState({
        title: "",
        description: "",
        status: "Not Started",
    });

    const MakeaNote = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        setNoteObj((oldNoteObj) => {
            return {
                ...oldNoteObj,
                [name]: value,
            };
        });
        // console.log(noteObj);
    };
    return (
        <CreateTaskDiv className='input-div' id="checkIfInside">
            <input placeholder='Title' type='text' onChange={MakeaNote} className='input-title' name="title" autoComplete='off' value={noteObj.title} />

            <textarea type="text" onChange={MakeaNote} placeholder='Enter the Description' className='input-description' name="description" rows='1' value={noteObj.description} />

            <div className="task-status-div">
                <span className="task-status-heading">Task Status:</span>
                <div className='input-status'>
                    <select type='text' className="task-status-select" name="status" onChange={MakeaNote} >
                        <option selected={true}>Not Started</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>
                </div>
            </div>
            <div className='btn-div'>
                <button className='add-btn' onClick={() => {
                    if (noteObj.title === '' || noteObj.name === '') {
                        alert('Please Fill Task Properly...');
                        return;
                    }
                    props.onSelect(noteObj);
                    setNoteObj({ title: "", description: "", status: "Not Started" });
                    const task_status_select = document.querySelector('.task-status-select');
                    task_status_select.children[0].selected = 'true';
                }} >
                    <i className="fa-solid fa-plus fa-2xl"></i>
                </button>
            </div>
        </CreateTaskDiv>
    );
};

const CreateTaskDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 500px;
    /* box-shadow: 6px 4px 6px 8px rgba(54, 50, 50, 0.12); */
    border: 2px solid rgba(54, 50, 50, 0.12);
    border-radius: 10px;
    margin: auto;
    /* padding: 5px; */
    height: 210px;
    margin-top: 10px;
    .input-title {
        border: none;
        /* padding: 4px; */
        font-family: Arial, Helvetica, sans-serif;
        font-size: 35px;
        background-color: transparent;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        background-color: #6e6ee2;
        padding: 10px 25px;
        margin-bottom: auto;
        &::placeholder{
            font-size: 35px;
            padding: 2px 0px;
            color: black;
        }
        &:focus {
            outline: none;
            border-bottom: 2px solid black;
        }
    }
    .input-description {
        border: none;
        margin: 5px;
        padding: 12px;
        font-size: 16px;
        background-color: transparent;
        /* text-overflow: clip; */
        /* word-wrap: normal; */
        &::placeholder{
            font-size: 17px;
            padding: 2px 0px;
        }
        &::-webkit-scrollbar{
            display: none;
        }
        &:focus {
            outline: none;
            border-bottom: 2px solid black;
        }
    }
    .btn-div {
        min-height: 20px;
        position: relative;
    }

    .add-btn {
        width: 60px;
        border-radius: 10px;
        padding: 10px 7px;
        border: none;
        background-color: rgba(35, 178, 239, 0.482);
        color: black;
        position: absolute;
        font-weight: bolder;
        font-size: 600;
        right: 10px;
        bottom: -25px;
        cursor: pointer;
        &:hover {
            background-color: rgb(35, 154, 239);
        }
    }


    .task-status-div{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: 5px;
        .task-status-heading{
            color: black;
            margin: 10px;
        }
        .input-status{
            border-radius: 10px;
            .task-status-select{
                border: none;
                margin: 2px 3px;
                padding-bottom: 4px;
                padding-top: 10px;
                width: 100%;
                height: 100%;
                background-color: transparent;
                border-radius: 0px;
                border-bottom: 2px solid black;
                &:focus{
                    outline: none;
                }
            }
        }
    }

    @media screen and (max-width: 786px) {
        width: 90%;
    }
`;



export default CreateTask;