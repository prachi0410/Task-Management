import React, { useEffect, useState } from 'react';
import './SameepKeepNote.css';
import styled from 'styled-components';

const ListItem = (props) => {
    const [listData, setListData] = useState({ title: props.currNoteObj.title, description: props.currNoteObj.description, status: props.currNoteObj.status });
    const [statusUpdating, setStatusUpdating] = useState(false);
    const { index } = props;

    const editStatus = (rowNum) => {
        const rowTake = document.querySelectorAll('.show-input-div');
        const save_btn = rowTake[rowNum].children[3].querySelector('.save-btn');
        const go_back_btn = rowTake[rowNum].children[3].querySelector('.go-back-btn');
        save_btn.style.display = 'block';
        go_back_btn.style.display = 'block';
    };
    const getRightColor = () => {
        const statusRightNow = document.querySelectorAll('.status-part');

        statusRightNow.forEach(element => {
            const curStatus = element.querySelector('.status-span').querySelector('.status-now');
            // console.log(curStatus.innerHTML);
            if (curStatus.innerHTML === "Not Started") {
                curStatus.style.color = 'red';
            }
            else if (curStatus.innerHTML === "In Progress") {
                curStatus.style.color = 'rgb(179 116 9)';
            }
            else {
                curStatus.style.color = 'green';
            }
        });
    };
    const updateStatus = () => {
        const rowTake = document.querySelectorAll('.show-input-div');
        const selectedStatus = rowTake[index].children[3].querySelector('.status-span').querySelector('.status-selected').value;
        setListData((oldList) => {
            return {
                ...oldList,
                status: selectedStatus
            };
        });
        rowTake[index].children[3].querySelector('.save-btn').style.display = 'none';
        rowTake[index].children[3].querySelector('.go-back-btn').style.display = 'none';
        setStatusUpdating(false);
    };
    const doNothingBtn = () => {
        setStatusUpdating(false);
        const rowTake = document.querySelectorAll('.show-input-div');
        rowTake[index].children[3].querySelector('.save-btn').style.display = 'none';
        rowTake[index].children[3].querySelector('.go-back-btn').style.display = 'none';
        setListData((oldList) => {
            return { ...oldList };
        });
    };



    useEffect(() => {
        getRightColor();
    }, [listData]);
    return (
        <>
            <ListDiv key={index} className='show-input-div' onLoadedData={getRightColor}>
                <td>{index + 1}</td>
                <td>{listData.title}</td>
                <td className='description-span'>{listData.description}</td>
                <td className='status-part'>
                    <span className='status-span'>
                        {
                            !statusUpdating ?
                                <span className='status-now' >{listData.status}</span>
                                :
                                <select className='status-selected'>
                                    <option>Not Started</option>
                                    <option>In Progress</option>
                                    <option>Completed</option>
                                </select>
                        }
                    </span>
                    {
                        !statusUpdating ?
                            <span>
                                <i className="fa-regular fa-pen-to-square" onClick={() => {
                                    editStatus(index);
                                    setStatusUpdating(true);
                                }}>
                                </i>
                            </span> : null
                    }
                    <span className='go-back-btn' onClick={doNothingBtn}>
                        <i className="fa-regular fa-circle-xmark"></i>
                    </span>
                    <span className='save-btn' onClick={async () => {
                        updateStatus();
                        const selectedStatus = document.querySelectorAll('.show-input-div')[index].children[3].querySelector('.status-span').querySelector('.status-selected').value;
                        console.log(selectedStatus);
                        await props.updteNodeObj(props.currNoteObj._id, selectedStatus);
                    }}>
                        <i className="fa-regular fa-floppy-disk"></i>
                    </span>
                </td>
                <td onClick={async () => {
                    console.log(props.currNoteObj._id);
                    getRightColor();
                    await props.deleteNodeObj(props.currNoteObj._id);
                }}>
                    <i className="fa-solid fa-trash-can"></i>
                </td>
            </ListDiv>
        </>
    );
};


const ListDiv = styled.tr`
    align-items: center;
    td{
      text-align: center;
      padding: 10px;
      margin: 3px 10px;
    }
    .description-span{
        box-sizing: border-box;
        max-width: 200px;
        padding: 10px 15px;
    }
    .status-part{
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      height: 100%;
      i{
        font-size: 20px;
      }
      .status-span{
        .status-selected{
            background-color: unset;
            border: none;
            &:focus{
                outline: none;
            }
        }
      }
      .go-back-btn{
        display: none;
      }
      .save-btn{
        display: none;
      }
    }
`;

export default ListItem;
