import axiosInstance from '../utils/fetch'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import styled from 'styled-components'
import { Wrapper } from '../styles/Wrapper'

const Navbar = (selected, completed) => {
  const handleDeleteSelected = (e) => {
    for (let i = 0; i < selected.selected.length; i++) {
      axiosInstance.delete(`${selected.selected[i]}/`)
    }
    window.location.reload()
  }

  const handleCompleteSelected = (e) => {
    for (let i = 0; i < selected.selected.length; i++) {
      let data = { completed: true }
      axiosInstance.patch(`${selected.selected[i]}/`, data)
    }
    window.location.reload()
  }

  return (
    <>
      <img src='https://i.ibb.co/xJB8CnB/logo.png' alt='logo' className='logo' />
      <Title>ToDo</Title>
      <NavWrapper selected={selected}>
        <ControlButton icon={faTrashAlt} onClick={e => handleDeleteSelected(e)} />
        <ControlButton icon={faCheckCircle} onClick={e => handleCompleteSelected(e)} />
      </NavWrapper>
    </>
  )
}

export default Navbar

const NavWrapper = styled(Wrapper)`
  display: block;
  margin: 0 auto;
  margin-top: 15px;
  text-align: center;
  width: 40%;
  background: rgba(77, 77, 77, 0.5);
  padding: 15px;
  border-radius: 2.5em;
  margin-bottom: 35px;
  opacity: ${props => props.selected.selected.length === 0 ? '0' : '1'};
`

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: #455963;
`

const ControlButton = styled(FontAwesomeIcon)`
  font-size: 20px;
  margin: 0 auto;
  margin-left: 15px;
  color: white;
  :hover{
    color: #A3E3E9;
  }
`
