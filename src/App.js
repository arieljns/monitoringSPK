import Card from './components/Card';
import { Typography } from '@mui/material';
import './App.css';

function App() {
  return (
    <div className='main-container'>
      <head>
       
        <link rel='manifest' href="manifest.json"></link>
      </head>
      <div className='banner'>
        <img src='teamwork02_221005.svg' alt='teamwork' width={108} height={108} />
        <Typography className='header' variant='h1 ' sx={{ fontSize: 30, fontWeight: "bold" }}>MONITORING SKP HARIAN</Typography>
      </div>
      <Card />
    </div>
  )
}

export default App;
