import type { NextPage } from 'next'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  background: #008080;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Board = styled.div`
  height: 80vh;
  width: 60vh;
  background: #aaaaaa;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const Face = styled.div`
  height: 10vh;
  width: 10vh;
  background: yellow;
  border-radius: 50%;
`

const Game_Board = styled.div`
  height: 58vh;
  width: 58vh;
  background: #cccccc;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
`

const Game_Block = styled.div`
  height: 6vh;
  width: 6vh;
  background: #999999;
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
