import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'

const IMAGE = 'images/img.png'
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('images/background.png');
`
const Board = styled.div<{ numberOfBlocks: { width: number; height: number } }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: ${(props) => props.numberOfBlocks.width * 40 + 50}px;
  height: ${(props) => props.numberOfBlocks.height * 40 + 150}px;
  background-color: #ccc;
  border: 2px solid;
  border-color: #ddd #666 #666 #ddd;
`
const StateBoard = styled.div<{ numberOfBlocksWidth: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${(props) => props.numberOfBlocksWidth * 40 + 2}px;
  height: 86px;
  border: 4px solid;
  border-color: #666 #ddd #ddd #666;
`
const Flagcouner = styled.div`
  display: inline;
  width: 120px;
  height: 68px;
  margin-left: 10px;
  font-size: 60px;
  line-height: 55px;
  color: red;
  text-align: center;
  cursor: default;
  background-color: black;
  border: 0.5vh solid black;
  border-color: #666 #ddd #ddd #666;
`
const CountUpTimer = styled(Flagcouner)`
  margin-right: 10px;
  margin-left: 0;
`
const Face = styled.div<{ faceState: number }>`
  width: 70px;
  height: 70px;
  cursor: pointer;
  background-image: url(${IMAGE});
  background-repeat: no-repeat;
  background-position: ${(props) => props.faceState * -58.6}px;
  background-origin: border-box;
  background-size: 826px;
  border: 3px solid;
  border-color: #ddd #666 #666 #ddd;

  &:hover {
    opacity: 0.8;
    transition: 0.1s;
  }
`
const GameBoard = styled.div<{ numberOfBlocks: { width: number; height: number } }>`
  width: ${(props) => props.numberOfBlocks.width * 40 + 2}px;
  height: ${(props) => props.numberOfBlocks.height * 40 + 2}px;
  border: 1px solid;
  border-color: #666 #ddd #ddd #666;
`
const BombBlock = styled.div<{ num: number }>`
  display: inline-block;
  width: 40px;
  height: 40px;
  vertical-align: bottom;
  background-color: ${(props) => (props.num === 99 ? 'red' : '#bbb')};
  background-image: url(${IMAGE});
  background-repeat: no-repeat;
  background-position: -367px;
  background-size: 516px;
  border: 1px solid #666;
`
const GameBlock = styled(BombBlock)<{ isOpen: boolean; num: number }>`
  cursor: pointer;
  background-color: ${(props) => (props.isOpen ? '#bbb' : 'gray')};
  background-position: ${(props) => -36 * (props.num - 1)}px;
  background-size: 505px;
  ${(props) =>
    props.isOpen
      ? 'border: 0.2px solid #666;'
      : 'border: 0.4px solid;' + 'border-color: #bbb #666 #666 #bbb;'}
`
const FlagBlock = styled(BombBlock)<{ num: number }>`
  cursor: pointer;
  background-color: gray;
  background-position: ${(props) => -36 * (props.num - 3)}px 0;
  background-size: 507px;
  border: 0.1vh solid;
  border-color: #bbb #666 #666 #bbb;
`
const SideMenu = styled.div`
  position: fixed;
  bottom: 15px;
  left: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 170px;
  height: 220px;
  padding: 10px;
  text-align: center;
  background-color: #ccc;
  border: 5px solid #666;
`
const LevelButton = styled.div<{ isSelect: boolean }>`
  position: relative;
  display: inline-block;
  width: 90%;
  height: 25%;
  padding: 10px;
  font-family: bold;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  background-color: #f2545b;
  border-radius: 2px;
  box-shadow: 0 6px 0 #a4243b;
  transition: none;

  ${(props) =>
    props.isSelect
      ? `background-color: #33ccff; 
    top: 6px;
    box-shadow: none;
    color: #fff;`
      : ''}

  &:hover {
    top: 6px;
    color: #fff;
    box-shadow: none;
  }
`
const OpenModalButton = styled.div`
  position: fixed;
  top: 15px;
  right: 15px;
  padding: 15px 20px;
  font-family: bold;
  color: #fff;
  cursor: pointer;
  background-color: black;
  border-radius: 20%;

  &:hover {
    opacity: 0.8;
    transition: 0.1s;
  }
`
const Manual = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  border: 2px solid black;
  transform: translateY(-50%) translateX(-50%);
`
const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 3;
  font-size: 200%;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transition: 0.1s;
  }
`
const customStyles: ReactModal.Styles = {
  /* stylelint-disable */
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgb(0 0 0 / 85%)',
  },
  /* stylelint-enable */
  content: {
    position: 'absolute',
    top: '10%',
    right: '10%',
    bottom: '10%',
    left: '10%',
    backgroundColor: '#fff',
    borderRadius: '10px',
  },
}

const Home: NextPage = () => {
  const startBombs: { x: number; y: number }[] = []
  const startState = { isGameclear: false, isGameover: false }
  //フィールドの大きさと爆弾の数の定義
  const GameLevelParameter = [
    {
      widthBlocks: 9,
      heightBlocks: 9,
      numberOfBombs: 10,
    },
    {
      widthBlocks: 16,
      heightBlocks: 16,
      numberOfBombs: 40,
    },
    {
      widthBlocks: 30,
      heightBlocks: 16,
      numberOfBombs: 99,
    },
  ]
  const createBoard = (width: number, height: number): number[][] =>
    Array.from(new Array(height), () => new Array(width).fill(9))
  const [gameLevel, setGameLevel] = useState(0)
  const [gameConfig, setGameConfig] = useState(GameLevelParameter[gameLevel])
  const [board, setBoard] = useState(createBoard(gameConfig.widthBlocks, gameConfig.heightBlocks))
  const [bombs, setBombs] = useState(startBombs)
  const [gameState, setGameState] = useState(startState)
  const [flagCount, setFlagCount] = useState(gameConfig.numberOfBombs)
  const [timer, setTimer] = useState(0)
  const [isOpenModal, setIsOpenModal] = useState(false)

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
            JSON.stringify({ x: x, y: y }) !== JSON.stringify({ x: xi, y: yi })
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
      newBoard[y][x] = 99
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
      } else newBoard[y][x] = 11
    } else if (newBoard[y][x] === 12) {
      newBoard[y][x] = 11
      setFlagCount(flagCount + 1)
    } else if (newBoard[y][x] === 11) newBoard[y][x] = 9
    setBoard(newBoard)
  }

  const reset = (nextGameLevel: number) => {
    let nextGameConfig = gameConfig
    if (nextGameLevel !== gameLevel) {
      setGameLevel(nextGameLevel)
      setGameConfig(GameLevelParameter[nextGameLevel])
      nextGameConfig = GameLevelParameter[nextGameLevel]
    }
    setBoard(createBoard(nextGameConfig.widthBlocks, nextGameConfig.heightBlocks))
    setBombs(startBombs)
    setGameState(startState)
    setFlagCount(nextGameConfig.numberOfBombs)
    setTimer(0)
  }

  return (
    <>
      <Head>
        <title>Minesweeper</title>
      </Head>
      <Container>
        <OpenModalButton onClick={() => setIsOpenModal(true)}>Manual</OpenModalButton>
        <ReactModal
          isOpen={isOpenModal}
          onRequestClose={() => setIsOpenModal(false)}
          style={customStyles}
        >
          <CloseButton onClick={() => setIsOpenModal(false)}>×</CloseButton>
          <Manual src="/images/manual.png"></Manual>
        </ReactModal>
        <SideMenu>
          <LevelButton onClick={() => reset(0)} isSelect={gameLevel === 0}>
            Beginner
          </LevelButton>
          <LevelButton onClick={() => reset(1)} isSelect={gameLevel === 1}>
            Intermediate
          </LevelButton>
          <LevelButton onClick={() => reset(2)} isSelect={gameLevel === 2}>
            Expert
          </LevelButton>
        </SideMenu>
        <Board numberOfBlocks={{ width: gameConfig.widthBlocks, height: gameConfig.heightBlocks }}>
          <StateBoard numberOfBlocksWidth={gameConfig.widthBlocks}>
            <Flagcouner>{('000' + flagCount).slice(-3)}</Flagcouner>
            <Face
              faceState={gameState.isGameover ? 13 : gameState.isGameclear ? 12 : 11}
              onClick={() => reset(gameLevel)}
            ></Face>
            <CountUpTimer>{timer > 999 ? 999 : ('000' + timer).slice(-3)}</CountUpTimer>
          </StateBoard>
          <GameBoard
            numberOfBlocks={{ width: gameConfig.widthBlocks, height: gameConfig.heightBlocks }}
          >
            {board.map((row, y) =>
              row.map((num, x) =>
                num === 10 || num === 99 ? (
                  <BombBlock key={`${x}-${y}`} num={num}></BombBlock>
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
    </>
  )
}

export default Home
