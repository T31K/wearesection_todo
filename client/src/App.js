import { React, useState, useEffect } from 'react'
import axiosInstance from './utils/fetch'

import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash, faCheckCircle, faPlusCircle, faTrashAlt, faUndo} from '@fortawesome/free-solid-svg-icons'

import './App.css'

import { ReactSortable } from "react-sortablejs"
import { Wrapper } from './styles/Wrapper'

import Navbar from './components/Navbar'
import Inputbar from './components/Inputbar'

const App = () => {
  const [list, setList] = useState([])
  const [selected, setSelected] = useState([])
  const [completed, setCompleted] = useState()

  useEffect(() => {
    axiosInstance.get('/')
      .then(res => setList(res.data))
      .catch(err => console.log(err))
  }, [])

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



  return (
    <>
      <MainWrapper>
        <Navbar selected={selected} completed={completed} />
        <ReactSortable list={list} setList={setList}>
          {list.map((list, i) => {
            return (
              <ListWrapper key={i}>
                <CheckButton
                  icon={faCheckCircle}
                  onClick={e => handleSelect(list.id, e)}
                  selected={selected}
                  list={list}
                />
                <ListText key={list.id} completed={list.completed}>{list.list}</ListText>
                <ControlButton icon={list.completed ? faUndo : faCheck} onClick={e => handleCompleted(list.id, list.completed, e)} />
                <ControlButton icon={faTrash} onClick={e => handleDelete(list.id, e)} />
              </ListWrapper>
            )
          })}
        </ReactSortable>
        <Inputbar />
      </MainWrapper>
    </>
  )
}

export default App

const ListText = styled.p`
  font-size: 2rem;
  text-align: left;
  display: inline;
  color: ${props => props.completed ? 'grey' : '#455963'};
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`

const ListWrapper = styled(Wrapper)`
  display: block;
  background: none;
  margin: 0 auto;
`

const MainWrapper = styled(Wrapper)`
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

const CheckButton = styled(FontAwesomeIcon)`
  float:left;
  margin-top: 15px;
  margin-right: 15px;
  color: ${props => props.selected.includes(props.list.id) ? '#A3E3E9' : '#A5A5A5'} 
`

const ControlButton = styled(FontAwesomeIcon)`
  margin-left: 2%;
  float: right;
  margin-top: 15px;
  color: #455963;
  :hover{
    color: #A3E3E9;
  }
`
