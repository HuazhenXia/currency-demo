import { useEffect, useState } from 'react'

import './styles.css'


export const Conventer = () => {
  const [currencies, setCurrencies] = useState<String[][]>([])
  const [amount, setAmount] = useState<number>(0)
  const [activeCurrency, setActiveCurrency] = useState<string>('')

  const currenciesHandler = (data: string[]): void => {
    setCurrencies(data.map((items: string) => (items.split('|'))))
  }

  useEffect(() => {
    fetch("/apis/daily.txt")
      .then(res => (res.text()))
      .then(text => {
        const lines = text.split('\n')
        currenciesHandler(lines.slice(2))
      })
  }, [])

  const getConvention = () => {
    const [, , mt, code, rate] = currencies[Number(activeCurrency)]
    const result = Math.floor(100 * amount * Number(mt) / Number(rate)) / 100
    return `${result} ${code}`
  }

  return <div className="currency-conventer">
    <h4 className="title" >Conventor (CZK to others)</h4>
    <div className='row'>
      <label htmlFor="amount">Please enter a number : </label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
    </div>
    <div className="row">
      <label htmlFor="currency">Please select currency: </label>
      <select
        value={activeCurrency}
        onChange={(e) => setActiveCurrency(e.target.value)}
      >
        <option value="">Please Select one</option>
        {currencies?.map((currency, idx) => (
          <option value={idx} key={idx}>{currency[3]}</option>
        ))}
      </select>
    </div>
    <div className="row">
      <h4>{activeCurrency === '' || !amount ?
        'Enter and select to see the result' :
        `${getConvention()}`}
      </h4>
    </div>
  </div>
}