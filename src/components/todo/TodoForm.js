// import React, { useState } from 'react';

// export default function TodoForm(props) {
//     const [input, setInput] = useState('');

//     const handleChange = e=> {
//         setInput(e.target.value);
//     }

//     // Handle Submit - Prevent default to prevent page reload - Create random id for submitted text-input
//     const handleSubmit = e => {
//         e.preventDefault();

//         props.onSubmit({
//             id: Math.floor(Math.random() * 10000),
//             text: input
//         });

//         setInput('');
//     };


//     return (
//         <>
//             <form className='todo-form' onSubmit={handleSubmit}>
//                 <input type="text" placeholder='Add a to-do' className='todo-input'
//                        value={input} name='text'  onChange={handleChange}/>
//                 <button className='todo-btn'>Add to-do</button>

//             </form>
//         </>
//     );
// };