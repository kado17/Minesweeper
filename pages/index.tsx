import type { NextPage } from 'next'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #008080;
`
const Board = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 60vh;
  height: 80vh;
  background: #aaa;
`

const Face = styled.div`
  width: 10vh;
  height: 10vh;
  background: #ff0;
  border-radius: 50%;
`

const Game_Board = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: space-around;
  width: 58vh;
  height: 58vh;
  background: #ccc;
`

const Game_Block = styled.div`
  width: 6vh;
  height: 6vh;
  background: #999;
`

const Home: NextPage = () => {
  return (
    <Container>
      <Board>
        <Face></Face>
        <Game_Board>
          <Game_Block></Game_Block>
          <Game_Block></Game_Block>
          <Game_Block></Game_Block>
          <Game_Block></Game_Block>
          <Game_Block></Game_Block>
          <Game_Block></Game_Block>
          <Game_Block></Game_Block>
          <Game_Block></Game_Block>
          <Game_Block></Game_Block>
          <Game_Block></Game_Block>
          <Game_Block></Game_Block>
        </Game_Board>
      </Board>
    </Container>
  )
}

export default Home
