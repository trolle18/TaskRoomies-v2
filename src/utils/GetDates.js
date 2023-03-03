
export function getTaskDate(task) {
    const date = task.date;
    const setDate = new Date(date).toLocaleDateString('en-GB', { month: 'short', day: '2-digit' } )
    return setDate
};


export function getTaskYear(task) {
    const year = new Date().toLocaleDateString('en-GB', { year: '2-digit' } ) 
    const taskDate = task.date;
    const taskYear = new Date(taskDate).toLocaleDateString('en-GB', { year: '2-digit' } )
    if(year > taskYear) return (taskYear)
};

export function isOverdue(task) {
    const today = new Date().toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' } );
    const taskDate = task.date;
    if(taskDate < today) return ("Overdue")
};


export const getTodaysDate = new Date().toLocaleDateString('en-GB', { weekday: 'long',  month: 'short', day: '2-digit' } );


