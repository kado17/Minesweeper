import type { NextPage } from 'next'
import { useState } from 'react'
import styled from 'styled-components'

const FONT_COLORS = ['blue', 'green', 'red', 'purple', 'brown', 'cyan', 'orange', 'pink']

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
  background: #ccc;
`

const Face = styled.div`
  width: 10vh;
  height: 10vh;
  background: yellow;
  border-radius: 50%;
`

const GameBoard = styled.div`
  width: 54vh;
  height: 54vh;
`

const GameBlock = styled.div<{ isOpen: boolean; num: number }>`
  display: inline-block;
  vertical-align: bottom;
  text-align: center;
  font-weight: bold;
  line-height: 5.5vh;
  font-size: 3vh;
  color: ${(props) => (1 <= props.num && props.num <= 8 ? FONT_COLORS[props.num - 1] : 'black')};
  width: 6vh;
  height: 6vh;
  border: 1px solid black;
  background: ${(props) => (props.isOpen ? 'white' : 'gray')};
`

const BombBlock = styled.div`
  display: inline-block;
  vertical-align: bottom;
  text-align: center;
  font-weight: bold;
  line-height: 4.25vh;
  font-size: 6vh;
  background: white;
  color: red;
  width: 6vh;
  height: 6vh;
  border: 1px solid black;
`

const Home: NextPage = () => {
  // prettier-ignore
  const [board, setBoard] = useState([
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9]
  ])

  const tmpBombs: { x: number; y: number }[] = []
  while (tmpBombs.length < 10) {
    const random_x = Math.floor(Math.random() * 9) //0～9までの整数を出力
    const random_y = Math.floor(Math.random() * 9)
    if (!tmpBombs.some((b) => b.x === random_x && b.y === random_y)) {
      tmpBombs.push({ x: random_x, y: random_y })
    }
  }
  const [bombs, setBombs] = useState(tmpBombs)
  const onClick = (x: number, y: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))

    let newNum = 0

    let existsBomb = false
    // 爆弾があるか判定
    for (let i = 0; i < bombs.length; i++) {
      if (bombs[i].x === x && bombs[i].y === y) {
        existsBomb = true
      }
    }
    if (!existsBomb) {
      for (let xi = -1; xi < 2; xi++) {
        for (let yi = -1; yi < 2; yi++) {
          if (bombs.some((b) => b.x === x + xi && b.y === y + yi)) {
            newNum++
          }
        }
      }
    }

    newBoard[y][x] = existsBomb ? 10 : newNum // = newNum 爆弾があれば10 なければ数字を返す
  }
  return (
    <Container>
      <Board>
        <Face></Face>
        <GameBoard>
          {board.map((row, y) =>
            row.map((num, x) =>
              num === 10 ? (
                <BombBlock key={`${x}-${y}`}>●</BombBlock>
              ) : (
                <GameBlock
                  key={`${x}-${y}`}
                  isOpen={num < 9}
                  num={num}
                  onClick={() => onClick(x, y)}
                >
                  {0 < num && num < 9 && num}
                </GameBlock>
              )
            )
          )}
        </GameBoard>
      </Board>
    </Container>
  )
}

export default Home
