import type { NextPage } from 'next'
import { useState } from 'react'
import styled from 'styled-components'

const IMAGE = 'images/img.png'

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

const Face = styled.div<{ faceState: number }>`
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
  background-image: url(${IMAGE});
  background-repeat: no-repeat;
  background-size: 140vh 10vh;
  background-position: ${(props) => String(props.faceState * -10) + 'vh'} 0;
  background-origin: border-box;
`

const GameBoard = styled.div`
  width: 54vh;
  height: 54vh;
`

const GameBlock = styled.div<{ isOpen: boolean; num: number }>`
  display: inline-block;
  vertical-align: bottom;
  width: 6vh;
  height: 6vh;
  border: 1px solid black;
  background: ${(props) => (props.isOpen ? 'white' : 'gray')};
  background-image: url(${IMAGE});
  background-repeat: no-repeat;
  background-size: 84vh 6vh;
  background-position: ${(props) =>
      1 <= props.num && props.num <= 8 ? String(-6 * (props.num - 1)) + 'vh' : '100vh'}
    0;
`

const BombBlock = styled.div`
  display: inline-block;
  vertical-align: bottom;
  font-size: 6vh;
  background: white;
  background-image: url(${IMAGE});
  background-repeat: no-repeat;
  background-size: 84vh 6vh;
  background-position: -60vh 0;
  width: 6vh;
  height: 6vh;
  border: 1px solid black;
`

const FlagBlock = styled.div`
  display: inline-block;
  vertical-align: bottom;
  background-color: gray;
  background-image: url(${IMAGE});
  background-repeat: no-repeat;
  background-size: 84vh 6vh;
  background-position: -54vh 0;
  width: 6vh;
  height: 6vh;
  border: 1px solid black;
`

const Home: NextPage = () => {
  // prettier-ignore
  const startBoard = [
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9]
  ]
  const createBomb = () => {
    const tmpBombs: { x: number; y: number }[] = []
    while (tmpBombs.length < 10) {
      const randomX = Math.floor(Math.random() * 9) //0～9までの整数を出力
      const randomY = Math.floor(Math.random() * 9)
      if (!tmpBombs.some((b) => b.x === randomX && b.y === randomY)) {
        tmpBombs.push({ x: randomX, y: randomY })
      }
    }
    return tmpBombs
  }

  const [board, setBoard] = useState(startBoard)
  const [bombs, setBombs] = useState(createBomb())
  const [state, setState] = useState({ isGameclear: false, isGameover: false })

  const onClick = (x: number, y: number) => {
    // 引数座標の周りのブロックの座標を返す
    const getBlockAround = (x: number, y: number) => {
      const result = []
      for (let xi = x - 1; xi < x + 2; xi++) {
        for (let yi = y - 1; yi < y + 2; yi++) {
          if (0 <= xi && xi < 9 && 0 <= yi && yi < 9 && { x: x, y: y } !== { x: xi, y: yi }) {
            result.push({ x: xi, y: yi })
          }
        }
      }
      return result
    }
    //引数座標周りの爆弾の数を返す
    const countBombsAround = (x: number, y: number) => {
      let countBombs = 0
      for (let xi = x - 1; xi < x + 2; xi++) {
        for (let yi = y - 1; yi < y + 2; yi++) {
          if (bombs.some((b) => b.x === xi && b.y === yi)) {
            countBombs++
          }
        }
      }
      return countBombs
    }

    if (state.isGameclear || state.isGameover) {
      return
    }
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    let newNum = 0
    let existsBomb = false
    // クリックした座標に爆弾があるか判定
    for (let i = 0; i < bombs.length; i++) {
      if (bombs[i].x === x && bombs[i].y === y) {
        existsBomb = true
      }
    }
    if (!existsBomb) {
      newNum = countBombsAround(x, y)
    }
    newBoard[y][x] = existsBomb ? 10 : newNum // 爆弾があれば10 なければ数字を入れる

    if (existsBomb) {
      //敗北処理
      setState({ ...state, isGameover: true })
      for (const bom of bombs) {
        newBoard[bom.y][bom.x] = 10
      }
    }

    if (newNum === 0) {
      let FollowNewNum = 0
      // クリックした場所の周囲の座標をリストに格納
      const wipBlock = getBlockAround(x, y)
      //wipBlockに入っている座標を順番に処理
      for (const wip of wipBlock) {
        FollowNewNum = countBombsAround(wip.x, wip.y)
        newBoard[wip.y][wip.x] = FollowNewNum

        //処理したブロックの値が0かつwipBlockに未格納なら、その周囲の座標をリストに格納
        if (FollowNewNum === 0) {
          for (const block of getBlockAround(wip.x, wip.y)) {
            if (!wipBlock.some((w) => w.x === block.x && w.y === block.y)) {
              wipBlock.push({ x: block.x, y: block.y })
            }
          }
        }
      }
    }

    let notOpenBlockCount = 0
    for (const row of newBoard) {
      notOpenBlockCount += row.filter((num) => num === 9 || num === 11).length
    }
    //勝利判定
    if (notOpenBlockCount === bombs.length) {
      setState({ ...state, isGameclear: true })
      for (const bom of bombs) {
        newBoard[bom.y][bom.x] = 11
      }
    }
    setBoard(newBoard)
  }

  const rightClick = (x: number, y: number, e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (state.isGameclear || state.isGameover) {
      return
    }
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    if (newBoard[y][x] === 11) {
      newBoard[y][x] = 9
    } else if (newBoard[y][x] === 9) {
      newBoard[y][x] = 11
    }
    setBoard(newBoard)
  }

  const reset = () => {
    setBoard(startBoard)
    setBombs(createBomb())
    setState({ isGameclear: false, isGameover: false })
  }

  const cheat = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (!bombs.some((b) => b.x === x && b.y === y)) {
          newBoard[y][x] = 0
        }
      }
    }
    setBoard(newBoard)
  }
  return (
    <Container>
      <Board>
        <Face
          faceState={state.isGameover ? 13 : state.isGameclear ? 12 : 11}
          onClick={() => reset()}
          onContextMenu={(e) => cheat(e)}
        ></Face>
        <GameBoard>
          {board.map((row, y) =>
            row.map((num, x) =>
              num === 10 ? (
                <BombBlock key={`${x}-${y}`}></BombBlock>
              ) : num === 11 ? (
                <FlagBlock
                  key={`${x}-${y}`}
                  onContextMenu={(e) => {
                    rightClick(x, y, e)
                  }}
                ></FlagBlock>
              ) : (
                <GameBlock
                  key={`${x}-${y}`}
                  isOpen={num < 9}
                  num={num}
                  onClick={() => onClick(x, y)}
                  onContextMenu={(e) => rightClick(x, y, e)}
                ></GameBlock>
              )
            )
          )}
        </GameBoard>
      </Board>
    </Container>
  )
}

export default Home
