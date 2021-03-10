import styled from 'styled-components'

const List = () => {
  return (
    <div>
      <ListItem>Item</ListItem>
      <ListItem>Item</ListItem>
      <ListItem>Item</ListItem>
    </div>
  )
}

export default List

const ListItem = styled.h1`
 padding-left: 25px;
`
