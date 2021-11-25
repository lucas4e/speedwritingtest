import * as React from 'react'
import Results from './components/Results'
import useWords from './hooks/useWords'
import useTimer from './hooks/useTimer'
import './App.css'

function App() {
  const [fetchData, setFetchData] = React.useState(true)
  const [isActive, setIsActive] = React.useState(false)
  const [isFinished, setIsFinished] = React.useState(false)
  const [correctAnswers, setCorrectAnswers] = React.useState(0)
  const [answer, setAnswer] = React.useState('')
  const { timeElapsed, setTimeElapsed } = useTimer(isActive) || null
  const words = useWords(fetchData) || null
  const index = 0

  React.useEffect(() => {
    if (answer === words[index]) {
      handleCorrectAnswer()
    }
  }, [answer])

  function handleTimer(e) {
    setIsActive(!isActive)
    if (e.target.id === 'startBtn') {
      setCorrectAnswers(0)
      setTimeElapsed(0)
      handleCorrectAnswer()
    }
    if (e.target.id === 'stopBtn') {
      setIsFinished(true)
    }
  }

  function handleCorrectAnswer() {
    setAnswer('')
    setCorrectAnswers(correctAnswers + 1)
    words.splice(index, 1)
    setFetchData(words.length <= 1)
  }

  function getColor(i) {
    if (!answer[i]) return
    return words[index][i] === answer[i] ? 'green' : 'red'
  }

  return (
    <div
      className='App'
      style={{
        color: 'white',
      }}
    >
      <h1 className='title' style={{ marginBottom: '100px' }}>
        Speed Writing Test
      </h1>
      {isActive ? (
        <div>
          <p>{`Time elapsed: ${timeElapsed || 0}`}</p>
          <p>{`Score: ${correctAnswers}`}</p>
          <p style={{ opacity: '0.2', fontSize: '1rem' }}>{words[1] || ''}</p>
          {words[index] ? (
            words[index]
              .split('')
              .map((letter, index) => (
                <span style={{ color: getColor(index), fontSize: '3rem' }}>
                  {letter}
                </span>
              ))
          ) : (
            <p>...</p>
          )}
          <form>
            <input
              type='text'
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              style={{ margin: '10px' }}
            ></input>
          </form>
          <button
            className='myBtn'
            id='stopBtn'
            type='button'
            onClick={handleTimer}
          >
            stop
          </button>
        </div>
      ) : (
        <div>
          {isFinished ? (
            <Results
              timeElapsed={timeElapsed}
              correctAnswers={correctAnswers}
            />
          ) : (
            ''
          )}
          <button
            className='myBtn'
            id='startBtn'
            type='button'
            onClick={handleTimer}
          >
            start
          </button>
        </div>
      )}
      <a
        href='https://github.com/lucasersson/challenges/tree/main/speedwritingtest'
        target='_blank'
        rel='noreferrer'
        style={{ textDecoration: 'none', position: 'fixed', bottom: '5px' }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='white'
          class='bi bi-github'
          viewBox='0 0 16 16'
        >
          <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
        </svg>
      </a>
    </div>
  )
}

export default App
