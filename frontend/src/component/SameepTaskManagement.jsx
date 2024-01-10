import React, { useEffect, useState } from 'react';
import './SameepKeepNote.css';
import CreateTask from './CreateTask';
import Navbar from './Navbar';
import ListItem from './ListItem';
import styled from 'styled-components';

const SameepKeepNote = () => {
  const [arrayOfNoteObj, setArrayOfNoteObj] = useState([]);


  const getData = async () => {
    const dbString = await fetch('https://sameeptaskmanagement.onrender.com/student', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const dbArray = await dbString.json();
    setArrayOfNoteObj(dbArray);

  };



  const StoreANote = async (NodeObj) => {
    try {
      const result = await fetch('https://sameeptaskmanagement.onrender.com/student', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: NodeObj.title,
          description: NodeObj.description,
          status: NodeObj.status
        })
      });
      console.log(`${NodeObj.title} Added To DB`);
      getData();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteNodeObj = async (_id) => {
    const result = await fetch(`https://sameeptaskmanagement.onrender.com/student/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const delObj = await result.json();
    alert(`Title: "${delObj.title}" is deleted`);
    setArrayOfNoteObj((oldArray) => {
      return oldArray.filter((curEle, index) => {
        return curEle.title !== delObj.title;
      });
    });
  };

  const updteNodeObj = async (_id, status) => {
    const result = await fetch(`https://sameeptaskmanagement.onrender.com/student/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify({
        status: status
      })
    });
    const updObj = await result.json();
    alert(`Status of Title: "${updObj.title}" is updates`);
    getData();
  };


  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      <Navbar />
      <SECTION>
        <div className='main-show-div'>
          <div className='main-show-left-div'>
            <h1>
              Task Management System
            </h1>
            <p>Keep Everuthing at the same place-even if your team isn't</p>
          </div>
          <div className='img-div'>
            <img src='https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=1140&fm=webp' />
          </div>
        </div>
        <DIV className='window-div' >
          <CreateTask onSelect={StoreANote} />
          <table className='input-show-div'>
            <thead>
              <tr>
                <th>S No.</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                arrayOfNoteObj.map((currNoteObj, index) => {
                  return <ListItem
                    currNoteObj={currNoteObj}
                    index={index}
                    deleteNodeObj={deleteNodeObj}
                    updteNodeObj={updteNodeObj}
                    getData={getData}
                    key={currNoteObj._id + index}
                  />;
                })
              }
            </tbody>
          </table>
        </DIV>
      </SECTION>
    </>
  );
};


const SECTION = styled.section`
  display: flex;
  flex-direction: column;
  /* padding-bottom: 100px; */
    .main-show-div{
      background: url(https://images.ctfassets.net/rz1oowkt5gyp/7lTGeXbBRNRLaVk2MdBjtJ/99c266ed4cb8cc63bd0c388071f01ff6/white-wave-bg.svg) center bottom -0.5px / 100% 14% no-repeat scroll padding-box border-box, linear-gradient(60deg, rgb(82, 67, 170), rgb(237, 80, 180)) 0% 0% / auto repeat scroll padding-box border-box rgb(82, 67, 170);
      background-blend-mode: normal, normal;
      padding: 70px 0px;
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-evenly;
      align-items: center;
      .main-show-left-div{
        color: white;
        height: fit-content;
        margin-bottom: 40px;
        h1{
          font-size: 55px;
        }
        p{
          font-size: 20px;
          margin: 9px;
        }
      }
      .img-div{
        height: 500px;
        img{
          height: 100%;
          /* inset: 1px; */
          /* overflow: hidden; */
        }
      }
      @media screen and (max-width: 970px) {
          flex-direction: column;
          .main-show-left-div{
            color: white;
            height: fit-content;
            margin-bottom: 40px;
            h1{
              font-size: 35px;
              text-align: center;
            }
            p{
              text-align: center;
              font-size: 15px;
            }
          }
          .img-div{
            height: 290px;
            img{
              height: 100%;
              /* inset: 1px; */
              /* overflow: hidden; */
            }
          }
      }
    }
`;

const DIV = styled.div`
  .input-show-div {
    width: 90%;
    height: 100%;
    margin: auto;
    margin-top: 40px;
    padding: 10px;    
    thead{
      background-color: #949494;
    }
    tbody{
      background-color: #ecebeb;
      /* background-color: antiquewhite; */
    }
    th{
      color: white;
      padding: 4px;
    }
    td{
      select{
        cursor: pointer;
      }
      i{
        cursor: pointer;
      }
    }
  }
  @media screen and (max-width: 786px) {
    width: 100vw;
    margin: 0;
    padding: 0;
    .input-show-div {
      width: 100%;
      height: 100%;
      margin-top: 40px;
      padding: 0px;
      thead{
        font-size: 12px;
      }
      tbody{
        font-size: 12px;
      }
      th{
        color: white;
        padding: 0px;
      }
      td{
        padding: 8px 0px;
        margin: 0;
        select{
          font-size: 12px;
          option{

          }
        }
        i{
          font-size: 15px;
        }
      }
    }
  }
`;

export default SameepKeepNote;