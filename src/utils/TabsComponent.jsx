import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '../components/Card';
import {useEffect} from 'react';

export default function ScrollableTabsButtonForce() {
    const [value, setValue] = React.useState( 0)
    const [contextData, setContextData] = React.useState()
    const [allow, setAllow] = React.useState([0])
    const [currentTab, setCurrentTab]=React.useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const newValue = localStorage.getItem('tabValue');
        if (newValue && newValue !== value) {
            setValue(Number(newValue));
        }
    }, []);



    const handleTabChange = (newValue) => {
        setValue(newValue);
        setAllow([...allow, newValue])
    };

    const handleUpdateContext = (newContext) => {
        setContextData(newContext)
    }

    console.log(currentTab)

    const tabsData = [
        {
            label: "Kegiatan 1",
            content: <Card current={currentTab} onButtonClick={() => handleTabChange(1)} updateContext={handleUpdateContext}/>,
        },
        {
            label: "Kegiatan 2",
            content: <Card current={currentTab} onButtonClick={() => handleTabChange(2)} updateContext={handleUpdateContext}/>,

        },
        {
            label: "Kegiatan 3",
            content: <Card current={currentTab} onButtonClick={() => handleTabChange(3)} updateContext={handleUpdateContext}/>,

        },
        {
            label: "Kegiatan 4",
            content: <Card current={currentTab} onButtonClick={() => handleTabChange(4)} updateContext={handleUpdateContext}/>,

        },
        {
            label: "Kegiatan 5",
            content: <Card current={currentTab} onButtonClick={() => handleTabChange(5)} updateContext={handleUpdateContext}/>,

        },
        {
            label: "Kegiatan 6",
            content: <Card current={currentTab} onButtonClick={() => handleTabChange(0)} updateContext={handleUpdateContext}/>,

        },
    ];

    return (
        <Box sx={{justifyContent: "center", maxWidth: {xs: 350, sm: 400, lg:900,}, bgcolor: 'background.paper'}}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"

            >
                {tabsData.map((tab, index) => (
                    <Tab key={index} label={tab.label} disabled={!allow.includes(index)}/>
                ))}
            </Tabs>

            {tabsData.map((tab, index) => (
                <Box key={index} role="tabpanel" hidden={value !== index}>
                    {tab.content}
                </Box>
            ))}
        </Box>
    );
}
