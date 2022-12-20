import { useEffect, useState } from 'react'

import './styles.css'

export const CurrencyTable = () => {
  const [header, setHeader] = useState<string[]>([])
  const [data, setData] = useState<string[][]>([])

  const tableHeaderHandler = (headLine: string) => {
    setHeader(headLine.split('|'))
  }

  const tableBodyHandler = (bodyLines: string[]) => {
    const bodyData: string[][] = bodyLines.map((item: string) => (item.split('|')))
    setData(bodyData)
  }

  useEffect(() => {
    fetch("/apis/daily.txt")
      .then(res => (res.text()))
      .then(text => {
        console.log(text.split('\n'))
        const lines = text.split('\n')
        tableHeaderHandler(lines[1])
        tableBodyHandler(lines.slice(2))
      })
  }, [])

  return (<>
    <table className='currency-table' border={0} cellSpacing="0" cellPadding="0">
      <thead>
        <tr>{header?.map(col => (
          <th key={col}>{col}</th>
        ))}</tr>
      </thead>
      <tbody>
        {data?.map((items, idx) => (
          <tr key={idx}>
            {items.map(item => (<td key={idx + item}>{item}</td>))}
          </tr>
        ))}
      </tbody>
    </table>
  </>)
}


