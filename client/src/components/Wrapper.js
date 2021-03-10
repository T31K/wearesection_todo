import styled from 'styled-components'

const Wrapper = () => {
  return(
    <AppWrapper/>
  )
}

export default Wrapper

const AppWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  margin: auto;
  background-color: #fff;
  border-radius: 16px;
  font-size: 15px;
  overflow: hidden;
  color: #455963;
  box-shadow: 0 20px 80px rgb(0 0 0 / 30%);
  padding: 30px;
`