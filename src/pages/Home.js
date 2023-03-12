import { Container } from "react-bootstrap";

const Home = () => {
    console.log('Home');
    return(
        <Container>
            <div>
                <h1>Home</h1>
            </div>
        </Container>
    )
};

export default Home;

// import logo from '../logo.svg';
// import Button from 'react-bootstrap/Button';

// function SimpleButton(props) {
//     return (
//       <Button variant="primary">{props.value}</Button>
//     );
//   }
  
//   function SimpleInput(props) {
//     return (
//       <input className='form-control' type="text" placeholder={props.value} />
//     );
//   }

// const Home = () => {
//     return(
//         <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn It by Anjana!
//         </a>
//       </header>
//       <div className="container">
//         <div className='row mx-3'>
//           <div className='col-md-4'>
//           </div>
//           <div className='col-md-3 ml-3'>
//             <div className='pl-6'>
//               <SimpleInput value='Enter your Name' />
//             </div>
//           </div>
//         </div>
//         <div className='row'>
//           <div className='col-md-3'>
//             <SimpleButton value='Click Me!' />
//           </div>
//         </div>
//       </div>
//     </div>
//     )
// };

// export default Home;

// // import React, { useState } from 'react';

// // import Toast from 'react-bootstrap/Toast';
// // import Container from 'react-bootstrap/Container';
// // import Button from 'react-bootstrap/Button';

// // import './App.css';

// // const ExampleToast = ({ children }) => {
// //   const [show, toggleShow] = useState(true);

// //   return (
// //     <>
// //       {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
// //       <Toast show={show} onClose={() => toggleShow(false)}>
// //         <Toast.Header>
// //           <strong className="mr-auto">React-Bootstrap</strong>
// //         </Toast.Header>
// //         <Toast.Body>{children}</Toast.Body>
// //       </Toast>
// //     </>
// //   );
// // };

// // const App = () => (
// //   <Container className="p-3">
// //     <h1 className="header">Welcome To React-Bootstrap</h1>
// //       <ExampleToast>
// //         We now have Toasts
// //         <span role="img" aria-label="tada">
// //           🎉
// //         </span>
// //       </ExampleToast>
// //   </Container>
// // );

// // export default App;
