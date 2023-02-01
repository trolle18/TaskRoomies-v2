
// const WeekdayOption = ( " weekday: 'long' " )
// const DayOption = ( '2-digit' )
// const MonthOption = ( 'short')
// const YearOption = { year: '2-digit' }


export function getTaskDate(task) {
    const date = task.date;
    const setDate = new Date(date).toLocaleDateString('en-GB', { month: 'short', day: '2-digit' } )
    return setDate
}

export function getTaskYear(task) {
    const year = new Date().toLocaleDateString('en-GB', { year: '2-digit' } ) 
    const taskDate = task.date;
    const taskYear = new Date(taskDate).toLocaleDateString('en-GB', { year: '2-digit' } )

    if(year > taskYear) return (taskYear)
    
}


// export const getTaskWeekday = (task) => {
//     const date = task.date;
//     const setDate = new Date(date).toLocaleDateString('en-GB', { weekday: 'long' } )
//     return setDate
// }


export const getTodaysDate = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'short' } ) 




