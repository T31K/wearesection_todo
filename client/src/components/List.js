import axiosInstance from '../utils/fetch'
import { React, useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash, faCheckCircle, faPlusCircle, faTrashAlt, faUndo} from '@fortawesome/free-solid-svg-icons'
import { ReactSortable } from "react-sortablejs"

import styled from 'styled-components'
import { Wrapper } from '../styles/Wrapper'


const List = () => {

  const [list, setList] = useState([])
  const [selected, setSelected] = useState([])
  const [completed, setCompleted] = useState()
  console.log(selected)
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
    <ReactSortable list={list} setList={setList}>
    {list.map( list => {
      return(
        <ListWrapper>
        <FontAwesomeIcon 
        icon={faCheckCircle} 
        className={selected.includes(list.id) ? 'left-found' : 'left'} 
        onClick={e=> handleSelect(list.id, e)}
      />
      <ListText key={list.id} className='' completed={list.completed}>{list.list}</ListText>
      <FontAwesomeIcon icon={list.completed ? faUndo : faCheck} className="test" onClick={e => handleCompleted(list.id, list.completed, e)}/>
      <FontAwesomeIcon icon={faTrash} className="test-2" onClick={e=> handleDelete(list.id, e)}/>
      </ListWrapper>
        )
    })}
    </ReactSortable>
  )
}

export default List

const ListText = styled.h1`
 padding-left: 25px;
`

const ListWrapper = styled(Wrapper)`
  display: block;
  background: none;
`