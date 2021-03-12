import { useState } from 'react'
import axiosInstance from '../utils/fetch'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import styled from 'styled-components'
import { Input } from '../styles/Input'
import { Wrapper } from '../styles/Wrapper'

const Inputbar = () => {
  const [add, setAdd] = useState({})

  const handleCreate = () => {
    axiosInstance.post('/', add)
      .then(window.location.reload())
      .catch(e => console.log(e))
  }

  return (
    <InputWrapper>
      <Input value={add.list} onChange={e => setAdd({ list: e.target.value })} />
      <AddButton icon={faPlusCircle} className='add' onClick={handleCreate} />
    </InputWrapper>
  )
}

export default Inputbar

const AddButton = styled(FontAwesomeIcon)`
  font-size: 1rem;
  margin-left: 10px;
`
const InputWrapper = styled(Wrapper)`
  display: block;
  margin: 0 auto;
  padding-left: 10%;
  padding-top: 5%;
  width: 95%;
`
