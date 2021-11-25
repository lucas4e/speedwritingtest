import * as React from 'react'

export default function Results({ timeElapsed, correctAnswers }) {
  const WPM = (correctAnswers / timeElapsed) * 60
  const WPS = correctAnswers / timeElapsed

  return (
    <div className='resultsContainer' style={{ color: 'white' }}>
      <h3>Your score</h3>
      <p>{`${timeElapsed} seconds elapsed`}</p>
      <p>{`${correctAnswers} ${
        correctAnswers === 1 ? 'word' : 'words'
      } completed`}</p>
      <p>{`${Math.round(WPM * 100) / 100} words per minute`}</p>
      <p>{`${Math.round(WPS * 100) / 100} words per second`}</p>
    </div>
  )
}
