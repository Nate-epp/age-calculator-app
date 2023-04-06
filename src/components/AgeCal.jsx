import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './AgeCal.css'

function AgeCal() {

    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [age, setAge] = useState({
        yearResult: '- -',
        monthResult: '- -',
        dayResult: '- -'
    })
    const [errorEmpty, setErrorEmpty] = useState(false)
    const [errorValid, setErrorValid] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorDate, setErrorDate] = useState(false)
    const [isShownResult, setIsShownResult] = useState(false)
    const thirtyDayMonth = [4,6,9,11]

    function submitHandler(e){
        
        e.preventDefault()
        // if there is a blank input
        if (!day && !month && !year){
            setErrorEmpty(true)
            setErrorMessage('This field is required')
            setIsShownResult(false)
            setAge({...age, yearResult: '- -', monthResult: '- -', dayResult: '- -'})
        // if the date doesn't exist
        } else if (day > 31 || month > 12 || year > new Date().getFullYear()) {
            setErrorValid(true)
            setErrorMessage('Must be ')
            setIsShownResult(false)
            setAge({...age, yearResult: '- -', monthResult: '- -', dayResult: '- -'})
        // if the date doesn't exist in a certain month
        } else if ((thirtyDayMonth.includes(parseInt(month)) && day > 30) || (parseInt(month) === 2 && day > 29)){
            setErrorDate(true)
            setErrorMessage('Must be')
            setIsShownResult(false)
            setAge({...age, yearResult: '- -', monthResult: '- -', dayResult: '- -'})
        }
        else {
            // 365.25 is the average number of days per year taking leap years into account
            // 30.4375 is the result of 365.25/12 
            const years = Math.floor(diff/(1000 * 60 * 60 * 24 * 365.25))
            const months = Math.floor(((diff/(1000 * 60 * 60 * 24 * 365.25)) - Math.floor(diff/(1000 * 60 * 60 * 24 * 365.25))) * 12)
            const days = Math.floor(((((diff/(1000 * 60 * 60 * 24 * 365.25)) - Math.floor(diff/(1000 * 60 * 60 * 24 * 365.25))) * 12) - Math.floor((((diff/(1000 * 60 * 60 * 24 * 365.25)) - Math.floor(diff/(1000 * 60 * 60 * 24 * 365.25))) * 12))) * 30.4375)
            setAge({...age, yearResult: years, monthResult: months, dayResult: days})
            setErrorEmpty(false)
            setErrorValid(false)
            setErrorDate(false)
            setIsShownResult(true)
        }
        
    }

    const dayOfBirth = new Date(`${year}-${month}-${day}`)
    const today = new Date()
    const ageInMis = dayOfBirth.getTime()
    const diff = today.getTime() - dayOfBirth.getTime()

  return (
    <div className='container'>
        <form onSubmit={submitHandler} className="container__upper">
            <div className={(errorDate||errorEmpty||errorDate)? 'label__class-error' :'label__class'}>
                <label htmlFor='day'>DAY </label>
                <input id='day' className='input__date' placeholder='DD' type='number' value={day} onChange={(e) => setDay(e.target.value)} min={1}  />
               {errorEmpty ? <i className='error-message'>{errorMessage}</i> : null}
               {(errorValid || errorDate)? <i className='error-message'>{errorMessage} a valid day</i> : null}
            </div>
            <div className={(errorDate||errorValid||errorEmpty)? 'label__class-error' :'label__class'}>
                <label htmlFor='month'>MONTH </label>
                <input id='month' className='input__date' placeholder='MM' type='number' value={month} onChange={(e) => setMonth(e.target.value)} min={1}  />
               {errorEmpty ? <i className='error-message'>{errorMessage}</i> : null}
               {errorValid ? <i className='error-message'>{errorMessage} a valid month</i> : null}
            </div>
            <div className={(errorDate||errorValid||errorEmpty)? 'label__class-error' :'label__class'}>
                <label htmlFor='year'>YEAR </label>
                <input id='year' className='input__date' placeholder='YYYY' type='number' value={year} onChange={(e) => setYear(e.target.value)} min={1900} />
                {errorEmpty ? <i className='error-message'>{errorMessage}</i> : null}
                {errorValid ? <i className={errorEmpty? 'error-message-on' :'error-message'}>{errorMessage} in the past</i> : null}
            </div>
            <button className='btn__submit' type='submit'></button>
        </form>
        <hr />
        <div className="container__lower">
            <h1><span className={isShownResult?'age__result-fancy':'age__result'}>{age.yearResult}</span> years</h1>
            <h1><span className={isShownResult?'age__result-fancy':'age__result'}>{age.monthResult}</span> months</h1>
            <h1><span className={isShownResult?'age__result-fancy':'age__result'}>{age.dayResult}</span> days</h1>
        </div>
    </div>
  )
}

export default AgeCal