import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const IMAGE = 'images/img.png'
//Blocksize >> 5vh

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #008080;
`
const Board = styled.div<{ numberOfBlocks: { width: number; height: number } }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: ${(props) => props.numberOfBlocks.width * 5 + 5}vh;
  height: ${(props) => props.numberOfBlocks.height * 5 + 19}vh;
  background-color: #ccc;
  border: 0.8vh solid;
  border-color: #ddd #666 #666 #ddd;
`
const StateBoard = styled.div<{ widthNumberOfBlocks: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${(props) => props.widthNumberOfBlocks * 5 + 2}vh;
  height: 11vh;
  border: 0.7vh solid;
  border-color: #666 #ddd #ddd #666;
`

const Flagcouner = styled.div`
  display: inline;
  width: 13vh;
  height: 8vh;
  margin-left: 1vh;
  font-size: 7vh;
  line-height: 6.5vh;
  color: red;
  text-align: center;
  background-color: black;
  border: 0.5vh solid black;
  border-color: #666 #ddd #ddd #666;
`

const CountUpTimer = styled(Flagcouner)`
  margin-right: 1vh;
`

const Face = styled.div<{ faceState: number }>`
  width: 8vh;
  height: 8vh;
  background-image: url(${IMAGE});
  background-repeat: no-repeat;
  background-position: ${(props) => props.faceState * -8}vh 0;
  background-origin: border-box;
  background-size: 112vh 8vh;
  border: 0.6vh solid;
  border-color: #ddd #666 #666 #ddd;
`

const GameBoard = styled.div<{ numberOfBlocks: { width: number; height: number } }>`
  width: ${(props) => props.numberOfBlocks.width * 5 + 2}vh;
  height: ${(props) => props.numberOfBlocks.height * 5 + 2}vh;
  border: 1vh solid;
  border-color: #666 #ddd #ddd #666;
`

const BombBlock = styled.div`
  display: inline-block;
  width: 5vh;
  height: 5vh;
  vertical-align: bottom;
  background-color: white;
  background-image: url(${IMAGE});
  background-repeat: no-repeat;
  background-position: -50vh 0;
  background-size: 70vh 5vh;
  border: 0.1vh solid #666;
`

const GameBlock = styled(BombBlock)<{ isOpen: boolean; num: number }>`
  background-color: ${(props) => (props.isOpen ? 'white' : 'gray')};
  background-position: ${(props) => -5 * (props.num - 1) - 0.1}vh 0;
  ${(props) =>
    props.isOpen
      ? 'border: 0.1vh solid #666;'
      : 'border: 0.4vh solid;' + 'border-color: #bbb #666 #666 #bbb;'}
`
const FlagBlock = styled(BombBlock)<{ num: number }>`
  background-color: gray;
  background-position: ${(props) => -5 * (props.num - 3) - 0.1}vh -0.3vh;
  border: 0.3vh solid;
  border-color: #bbb #666 #666 #bbb;
`

const Home: NextPage = () => {
  //フィールドの大きさと爆弾の数の定義

  const startBombs: { x: number; y: number }[] = []
  const startState = { isGameclear: false, isGameover: false }
  const [gameConfig, setGameConfig] = useState({
    widthBlocks: 30,
    heightBlocks: 16,
    numberOfBombs: 10,
  })
  const startBoard = Array.from(new Array(gameConfig.heightBlocks), () =>
    new Array(gameConfig.widthBlocks).fill(9)
  )
  console.log(startBoard)
  const [board, setBoard] = useState(startBoard)
  const [bombs, setBombs] = useState(startBombs)
  const [gameState, setGameState] = useState(startState)
  const [flagCount, setFlagCount] = useState(gameConfig.numberOfBombs)
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
      while (tmpBombs.length < gameConfig.numberOfBombs) {
        const randomX = Math.floor(Math.random() * gameConfig.widthBlocks)
        const randomY = Math.floor(Math.random() * gameConfig.heightBlocks)
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
            xi < gameConfig.widthBlocks &&
            0 <= yi &&
            yi < gameConfig.heightBlocks &&
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
      if (notOpenBlockCount === gameConfig.numberOfBombs) {
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
    setFlagCount(gameConfig.numberOfBombs)
    setTimer(0)
  }

  const cheat = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    for (let x = 0; x < gameConfig.widthBlocks; x++) {
      for (let y = 0; y < gameConfig.heightBlocks; y++) {
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
    if (notOpenBlockCount === gameConfig.numberOfBombs) {
      setGameState({ ...gameState, isGameclear: true })
      for (const bom of bombs) {
        newBoard[bom.y][bom.x] = 12
      }
    }
  }
  return (
    <Container>
      <Board numberOfBlocks={{ width: gameConfig.widthBlocks, height: gameConfig.heightBlocks }}>
        <StateBoard widthNumberOfBlocks={gameConfig.widthBlocks}>
          <Flagcouner>{('000' + flagCount).slice(-3)}</Flagcouner>
          <Face
            faceState={gameState.isGameover ? 13 : gameState.isGameclear ? 12 : 11}
            onClick={() => reset()}
            onContextMenu={(e) => cheat(e)}
          ></Face>
          <CountUpTimer>{timer > 999 ? 999 : ('000' + timer).slice(-3)}</CountUpTimer>
        </StateBoard>

        <GameBoard
          numberOfBlocks={{ width: gameConfig.widthBlocks, height: gameConfig.heightBlocks }}
        >
          {board.map((row, y) =>
            row.map((num, x) =>
              num === 10 ? (
                <BombBlock key={`${x}-${y}`}></BombBlock>
              ) : 11 <= num ? (
                <FlagBlock
                  key={`${x}-${y}`}
                  num={num}
                  onContextMenu={(e) => rightClick(x, y, e)}
                ></FlagBlock>
              ) : (
                <GameBlock
                  key={`${x}-${y}`}
                  isOpen={num < 9}
                  num={1 <= num && num <= 8 ? num : 100} //100は適当な値
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
