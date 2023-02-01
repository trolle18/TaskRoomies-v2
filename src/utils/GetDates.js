
const WeekdayOption = ( " weekday: 'long' " )
const DayOption = ( '2-digit' )
const MonthOption = ( 'short')
// const YearOption = { year: '2-digit' }


export const getTaskDates = (task) => {
    const date = task.date;
    const setDate = new Date(date).toLocaleDateString('en-GB', { month: 'short', day: '2-digit' } )
    return setDate
}

export const getTaskDay = (task) => {
    const date = task.date;
    const setDate = new Date(date).toLocaleDateString('en-GB', { day: '2-digit' })
    return setDate   
}

export const getTaskWeekday = (task) => {
    const date = task.date;
    const setDate = new Date(date).toLocaleDateString('en-GB', WeekdayOption )
    return setDate
}


// export function getTodaysDate() {
    export const getTodaysDate = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'short' } ) 
    export const getTodaysWeekday = new Date().toLocaleDateString('en-GB', { weekday: 'short' } ) 

    // return setDate
// }



