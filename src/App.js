import { Typography } from '@mui/material';
import './App.css';
import TabsComponent from "./utils/TabsComponent"
function App() {
  return (
    <div className='main-container'>
      <head>

        <link rel='manifest' href="manifest.json"></link>
      </head>
      <div className='banner'>
        <img src='teamwork02_221005.svg' alt='teamwork' width={108} height={108} />
        <Typography className='header' variant='h1 ' sx={{ maxWidth: 190, fontSize: 30, fontWeight: "bold" }}>MONITORING <span>SKP HARIAN</span> </Typography>
      </div>
      <div className='tabsCompo'>
        <TabsComponent />
      </div>

    </div>
  )
}

export default App;
