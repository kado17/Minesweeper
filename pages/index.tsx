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

const FlagBlock = styled.div`
  display: inline-block;
  vertical-align: bottom;
  text-align: center;
  font-weight: bold;
  line-height: 4.25vh;
  font-size: 6vh;
  background: gray;
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
    const randomX = Math.floor(Math.random() * 9) //0～9までの整数を出力
    const randomY = Math.floor(Math.random() * 9)
    if (!tmpBombs.some((b) => b.x === randomX && b.y === randomY)) {
      tmpBombs.push({ x: randomX, y: randomY })
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
      for (let xi = x - 1; xi < x + 2; xi++) {
        for (let yi = y - 1; yi < y + 2; yi++) {
          if (bombs.some((b) => b.x === xi && b.y === yi)) newNum++
        }
      }
    }

    newBoard[y][x] = existsBomb ? 10 : newNum // 爆弾があれば10 なければ数字を入れる
    setBoard(newBoard)

    const wipBlock = []
    // クリックした場所の周囲の座標をリストに格納
    if (newNum === 0 && !existsBomb) {
      for (let xi = x - 1; xi < x + 2; xi++) {
        for (let yi = y - 1; yi < y + 2; yi++) {
          if (0 <= xi && xi < 9 && 0 <= yi && yi < 9 && { x: x, y: y } !== { x: xi, y: yi }) {
            wipBlock.push({ x: xi, y: yi })
          }
        }
      }
      //リストに入っている座標を順番に処理
      for (const wip of wipBlock) {
        let FollowNewNum = 0
        for (let xi = wip.x - 1; xi < wip.x + 2; xi++) {
          for (let yi = wip.y - 1; yi < wip.y + 2; yi++) {
            if (bombs.some((b) => b.x === xi && b.y === yi)) {
              FollowNewNum++
            }
          }
        }
        newBoard[wip.y][wip.x] = FollowNewNum
        setBoard(newBoard)
        //処理したブロックの値が0ならば、その周囲の座標をリストに格納
        if (FollowNewNum === 0) {
          for (let xj = wip.x - 1; xj < wip.x + 2; xj++) {
            for (let yj = wip.y - 1; yj < wip.y + 2; yj++) {
              if (
                0 <= xj &&
                xj < 9 &&
                0 <= yj &&
                yj < 9 &&
                { x: wip.x, y: wip.y } !== { x: xj, y: yj }
              ) {
                if (!wipBlock.some((w) => w.x === xj && w.y === yj)) wipBlock.push({ x: xj, y: yj })
              }
            }
          }
        }
      }
    }
  }

  const rightClick = (x: number, y: number, e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    console.log('RIGHT', y, x, newBoard[y][x])
    if (newBoard[y][x] === 11) newBoard[y][x] = 9
    else if (newBoard[y][x] === 9) newBoard[y][x] = 11
    console.log(newBoard[y][x])
    setBoard(newBoard)
    return false
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
              ) : num === 11 ? (
                <FlagBlock
                  key={`${x}-${y}`}
                  onContextMenu={(e) => {
                    rightClick(x, y, e)
                  }}
                >
                  F
                </FlagBlock>
              ) : (
                <GameBlock
                  key={`${x}-${y}`}
                  isOpen={num < 9}
                  num={num}
                  onContextMenu={(e) => {
                    rightClick(x, y, e)
                  }}
                  onClick={(e) => {
                    console.log(e)
                    onClick(x, y)
                  }}
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
