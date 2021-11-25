import * as React from 'react'

export default function useWords(fetchData) {
  const [words, setWords] = React.useState([])
  const url = 'https://random-word-api.herokuapp.com/word?number='
  const totalWords = 30

  React.useEffect(() => {
    if (fetchData) {
      fetch(url + totalWords + '&swear=0')
        .then(res => res.json())
        .then(data => {
          setWords(data)
        })
    }
  }, [fetchData])

  return words
}
