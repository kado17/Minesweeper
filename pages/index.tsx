import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const IMAGE = 'images/img.png'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #008080;
`
const Board = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 60vh;
  height: 80vh;
  background-color: #ccc;
  border: 0.8vh solid;
  border-color: #ddd #666 #666 #ddd;
`
const StateBoard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 54vh;
  height: 12vh;
  border: 0.7vh solid;
  border-color: #666 #ddd #ddd #666;
`

const CounterTemplate = styled.div`
  display: inline;
  width: 16vh;
  height: 10vh;
  font-size: 9vh;
  line-height: 8.5vh;
  color: red;
  text-align: center;
  background-color: black;
  border: 0.5vh solid black;
  border-color: #666 #ddd #ddd #666;
`
const Flagcouner = styled(CounterTemplate)``

const CountUpTimer = styled(CounterTemplate)``

const Face = styled.div<{ faceState: string }>`
  width: 10vh;
  height: 10vh;
  background-image: url(${IMAGE});
  background-repeat: no-repeat;
  background-position: ${(props) => props.faceState} 0;
  background-origin: border-box;
  background-size: 140vh 10vh;
  border: 0.6vh solid;
  border-color: #ddd #666 #666 #ddd;
`

const GameBoard = styled.div`
  width: 56vh;
  height: 56vh;
  border: 1vh solid;
  border-color: #666 #ddd #ddd #666;
`

const BlockTemplate = styled.div`
  display: inline-block;
  width: 6vh;
  height: 6vh;
  vertical-align: bottom;
`

const GameBlock = styled(BlockTemplate)<{ isOpen: boolean; imagePosition: string }>`
  background-color: ${(props) => (props.isOpen ? 'white' : 'gray')};
  background-image: url(${IMAGE});
  background-repeat: no-repeat;
  background-position: ${(props) => props.imagePosition} 0;
  background-size: 84vh 6vh;
  ${(props) =>
    props.isOpen
      ? 'border: 0.1vh solid #666;'
      : 'border: 0.4vh solid;' + 'border-color: #bbb #666 #666 #bbb;'}
`

const BombBlock = styled(BlockTemplate)`
  background-color: white;
  background-image: url(${IMAGE});
  background-repeat: no-repeat;
  background-position: -60vh 0;
  background-size: 84vh 6vh;
  border: 0.1vh solid #666;
`

const FlagBlock = styled(BlockTemplate)<{ imagePosition: string }>`
  background: gray;
  background-image: url(${IMAGE});
  background-repeat: no-repeat;
  background-position: ${(props) => props.imagePosition} -0.3vh;
  background-origin: padding-box;
  background-size: 84vh 6vh;
  border: 0.3vh solid;
  border-color: #bbb #666 #666 #bbb;
`

const Home: NextPage = () => {
  //フィールドの大きさと爆弾の数の定義
  const gameField = { firldSize: 9, numberOfBombs: 10 }
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
  const startBombs: { x: number; y: number }[] = []
  const startState = { isGameclear: false, isGameover: false }
  const [board, setBoard] = useState(startBoard)
  const [bombs, setBombs] = useState(startBombs)
  const [gameState, setGameState] = useState(startState)
  const [flagCount, setFlagCount] = useState(gameField.numberOfBombs)
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    //爆弾が生成されている(ゲームが始まっている)かつゲームが終わっていないときにTimer稼働
    if (bombs.length !== 0 && !gameState.isGameclear && !gameState.isGameover) {
      const id = setInterval(() => {
        setTimer((t) => t + 1)
      }, 1000)
      return () => {
        clearInterval(id)
      }
    }
  }, [bombs, gameState])

  const onClick = (x: number, y: number) => {
    //爆弾の生成関数
    const createBomb = (x: number, y: number) => {
      const tmpBombs: { x: number; y: number }[] = []
      while (tmpBombs.length < gameField.numberOfBombs) {
        const randomX = Math.floor(Math.random() * gameField.firldSize)
        const randomY = Math.floor(Math.random() * gameField.firldSize)
        if (
          !tmpBombs.some((b) => b.x === randomX && b.y === randomY) &&
          x !== randomX &&
          y !== randomY
        ) {
          tmpBombs.push({ x: randomX, y: randomY })
        }
      }
      return tmpBombs
    }
    // 引数座標の周りのブロックの座標を返す関数
    const getBlockAround = (x: number, y: number) => {
      const result = []
      for (let xi = x - 1; xi < x + 2; xi++) {
        for (let yi = y - 1; yi < y + 2; yi++) {
          if (
            0 <= xi &&
            xi < gameField.firldSize &&
            0 <= yi &&
            yi < gameField.firldSize &&
            { x: x, y: y } !== { x: xi, y: yi }
          ) {
            result.push({ x: xi, y: yi })
          }
        }
      }
      return result
    }
    //引数座標周りの爆弾の数を返す関数
    const countBombsAround = (x: number, y: number, newBombs: { x: number; y: number }[]) => {
      let countBombs = 0
      for (let xi = x - 1; xi < x + 2; xi++) {
        for (let yi = y - 1; yi < y + 2; yi++) {
          if (newBombs.some((b) => b.x === xi && b.y === yi)) {
            countBombs++
          }
        }
      }
      return countBombs
    }
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    if (gameState.isGameclear || gameState.isGameover || newBoard[y][x] !== 9) {
      return
    }
    let newBombs: { x: number; y: number }[] = bombs
    if (newBombs.length === 0) {
      newBombs = createBomb(x, y)
      setBombs(newBombs)
    }
    let newNum = 0
    let existsBomb = false
    // クリックした座標に爆弾があるか判定
    for (let i = 0; i < newBombs.length; i++) {
      if (newBombs[i].x === x && newBombs[i].y === y) {
        existsBomb = true
      }
    }
    if (existsBomb) {
      //敗北処理
      setGameState({ ...gameState, isGameover: true })
      for (const bom of newBombs) {
        newBoard[bom.y][bom.x] = 10
      }
    } else {
      newNum = countBombsAround(x, y, newBombs)
      newBoard[y][x] = newNum
      if (newNum === 0) {
        let followNewNum = 0
        let newFlagCount = flagCount
        // クリックした場所の周囲の座標をリストに格納
        const wipBlock = getBlockAround(x, y)
        for (const wip of wipBlock) {
          if (newBoard[wip.y][wip.x] === 12) {
            newFlagCount++
          }
          followNewNum = countBombsAround(wip.x, wip.y, newBombs)
          newBoard[wip.y][wip.x] = followNewNum

          //処理したブロックの値が0かつwipBlockに未格納なら、その周囲の座標をリストに格納
          if (followNewNum === 0) {
            for (const block of getBlockAround(wip.x, wip.y)) {
              if (!wipBlock.some((w) => w.x === block.x && w.y === block.y)) {
                wipBlock.push({ x: block.x, y: block.y })
              }
            }
          }
        }
        setFlagCount(newFlagCount)
      }
      //残り未公開ブロックの数をカウント
      let notOpenBlockCount = 0
      for (const row of newBoard) {
        notOpenBlockCount += row.filter((num) => num === 9 || 11 <= num).length
      }
      //勝利判定
      if (notOpenBlockCount === gameField.numberOfBombs) {
        setGameState({ ...gameState, isGameclear: true })
        for (const bom of newBombs) {
          newBoard[bom.y][bom.x] = 12
        }
      }
    }
    setBoard(newBoard)
  }

  const rightClick = (x: number, y: number, e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (gameState.isGameclear || gameState.isGameover) {
      return
    }
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    // 11:? 12:旗
    if (newBoard[y][x] === 9) {
      if (0 < flagCount) {
        newBoard[y][x] = 12
        setFlagCount(flagCount - 1)
      } else {
        newBoard[y][x] = 11
      }
    } else if (newBoard[y][x] === 12) {
      newBoard[y][x] = 11
      setFlagCount(flagCount + 1)
    } else if (newBoard[y][x] === 11) {
      newBoard[y][x] = 9
    }
    setBoard(newBoard)
  }

  const reset = () => {
    setBoard(startBoard)
    setBombs(startBombs)
    setGameState(startState)
    setFlagCount(gameField.numberOfBombs)
    setTimer(0)
  }

  const cheat = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    for (let x = 0; x < gameField.firldSize; x++) {
      for (let y = 0; y < gameField.firldSize; y++) {
        if (!bombs.some((b) => b.x === x && b.y === y)) {
          newBoard[y][x] = 0
        }
      }
    }
    setBoard(newBoard)
    //残り未公開ブロックの数をカウント
    let notOpenBlockCount = 0
    for (const row of newBoard) {
      notOpenBlockCount += row.filter((num) => num === 9 || 11 <= num).length
    }
    //勝利判定
    if (notOpenBlockCount === gameField.numberOfBombs) {
      setGameState({ ...gameState, isGameclear: true })
      for (const bom of bombs) {
        newBoard[bom.y][bom.x] = 12
      }
    }
  }
  return (
    <Container>
      <Board>
        <StateBoard>
          <Flagcouner>{('000' + flagCount).slice(-3)}</Flagcouner>
          <Face
            faceState={
              ((gameState.isGameover ? 13 : gameState.isGameclear ? 12 : 11) * -10).toString() +
              'vh'
            }
            onClick={() => reset()}
            onContextMenu={(e) => cheat(e)}
          ></Face>
          <CountUpTimer>{timer > 999 ? 999 : ('000' + timer).slice(-3)}</CountUpTimer>
        </StateBoard>

        <GameBoard>
          {board.map((row, y) =>
            row.map((num, x) =>
              num === 10 ? (
                <BombBlock key={`${x}-${y}`}></BombBlock>
              ) : 11 <= num ? (
                <FlagBlock
                  key={`${x}-${y}`}
                  imagePosition={(-6 * (num - 3) - 0.1).toString() + 'vh'}
                  onContextMenu={(e) => rightClick(x, y, e)}
                ></FlagBlock>
              ) : (
                <GameBlock
                  key={`${x}-${y}`}
                  isOpen={num < 9}
                  imagePosition={
                    1 <= num && num <= 8 ? (-6 * (num - 1) - 0.1).toString() + 'vh' : '100vh'
                    //100vhは適当な値
                  }
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
