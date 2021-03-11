import { React, useState, useEffect } from 'react'
import axiosInstance from './utils/fetch'

import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash, faCheckCircle, faPlusCircle, faTrashAlt, faUndo} from '@fortawesome/free-solid-svg-icons'

import './App.css'

import { ReactSortable } from "react-sortablejs";

const App = () => {
  const [list, setList] = useState([])
  const [selected, setSelected] = useState([])
  const [completed, setCompleted] = useState()
  const [add, setAdd] = useState({})

  useEffect(() => {
    axiosInstance.get('/')
      .then(res => setList(res.data))
      .catch(err => console.log(err))
  }, [])
  
  const handleDeleteSelected = (e) => {
    for( let i = 0; i < selected.length; i++){
      axiosInstance.delete(`${selected[i]}/`)
    }
    window.location.reload()
  }

  const handleCompleteSelected = (e) => {
    for( let i = 0; i < selected.length; i++){
      let data = {'completed': !completed}
      axiosInstance.patch(`${selected[i]}/`, data)
    }
    window.location.reload()
  }

  const handleDelete= (id, e) => {
    axiosInstance.delete(`${id}/`)
      .then(window.location.reload())
  }

  const handleSelect = (id, e) => {
    e.preventDefault()
    return selected.includes(id) ?  setSelected(selected.filter((e)=>(e !== id))) : setSelected([...selected, id])
  }

  const handleCompleted = (id, completed, e) => {
    let data = {'completed': !completed}
    axiosInstance.patch(`${id}/`, data)
      .then(window.location.reload())
  }

  const handleCreate =  () => {
    axiosInstance.post('/', add)
      .then(window.location.reload())
      .catch(e => console.log(e))
  }
  return (
    <>
      <Wrapper>
        <img src="https://i.ibb.co/xJB8CnB/logo.png" alt="logo" className="logo"/>
        <Title>ToDo</Title>
        <div className={selected.length === 0 ? 'navbar-hide' : 'navbar'}>
          <FontAwesomeIcon icon={faTrashAlt} className="delete-alt" onClick={e=> handleDeleteSelected(e)}/>
          <FontAwesomeIcon icon={faCheck} className="delete-alt" onClick={e=> handleCompleteSelected(e)}/>
        </div>


      <ReactSortable list={list} setList={setList}>
            {list.map( list => {
            return(
            <>
              <div className="border">
                <FontAwesomeIcon 
                  icon={faCheckCircle} 
                  className={selected.includes(list.id) ? 'left-found' : 'left'} 
                  onClick={e=> handleSelect(list.id, e)}
                />
                <H key={list.id} className='' completed={list.completed}>{list.list}</H>
                <FontAwesomeIcon icon={list.completed ? faUndo : faCheck} className="test" onClick={e => handleCompleted(list.id, list.completed, e)}/>
                <FontAwesomeIcon icon={faTrash} className="test-2" onClick={e=> handleDelete(list.id, e)}/>
              </div>
            </>
              )
          })}
      </ReactSortable>


        
        <br></br>
        <input value={add.list} onChange={e => setAdd({list: e.target.value})}></input>
        <FontAwesomeIcon icon={faPlusCircle} className="delete" onClick={handleCreate}/>


      </Wrapper>
    </>
  )
}

export default App

const Wrapper = styled.div`
  max-width: 700px;
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 16px;
  font-size: 15px;
  overflow: hidden;
  color: #455963;
  box-shadow: 0 20px 80px rgb(0 0 0 / 30%);
  padding: 30px;
`

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: #455963;
`

const H = styled.p`
  font-size: 2rem;
  text-align: left;
  display: inline;
  color: ${props => props.completed ? 'grey' : '455963'};
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  
`

const ListItem = styled.p`
  font-size: 1.5em;
  text-align: left;
  padding-left: 15px;
  margin: 15px auto;
`

const Input = styled.input`
  outline :none;
  box-shadow: 0 20px 80px rgb(0 0 0 / 30%);
  height: 25px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 15px;
  margin-left: 15px;
  border: 2px solid #455963;
  width: 60%;
`

const Button = styled.button`
  color: red;
  background: yelow;
  border-radius: 10px;
  outline: none;
  border: none;
  margin-left: 15px;
  height: 25px;
`

const DoneButton = styled.button`
  color: red;
  background: yellow;
  border-radius: 10px;
  outline: none;
  border: none;
  margin-left: 15px;
  height: 25px;
  width: 60px;
`

const DeleteButton = styled.button`
  color: blue;
  border-radius: 10px;
  outline: none;
  border: none;
  margin-left: 15px;
  height: 25px;
  width: 60px;
`


