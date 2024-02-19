import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '../components/Card';

export default function ScrollableTabsButtonForce() {
    const [value, setValue] = React.useState(0);
    const [contextData, setContextData] = React.useState()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleTabChange = (newValue) => {
        setValue(newValue);
    };

    const handleUpdateContext = (newContext) => {
        setContextData(newContext)
    }
    console.log("Ini adalah data dari tabsComponent", contextData)
    const tabsData = [
        {
            label: "Kegiatan 1",
            content: <Card onButtonClick={() => handleTabChange(1)} updateContext={handleUpdateContext} />,
        },
        {
            label: "Kegiatan 2",
            content: <Card onButtonClick={() => handleTabChange(2)} updateContext={handleUpdateContext} />,
            disabled: value !== 1
        },
        {
            label: "Kegiatan 3",
            content: <Card onButtonClick={() => handleTabChange(3)} />,
            disabled: value !== 2
        },
        {
            label: "Kegiatan 4",
            content: <Card onButtonClick={() => handleTabChange(4)} />,
            disabled: value !== 3
        },
        {
            label: "Kegiatan 5",
            content: <Card onButtonClick={() => handleTabChange(5)} />,
            disabled: value !== 4
        },
        {
            label: "Kegiatan 6",
            content: <Card onButtonClick={() => handleTabChange(0)} updateContext={handleUpdateContext} />,
            disabled: value !== 5
        },
    ];

    return (
        <Box sx={{justifyContent:"center", maxWidth: { xs: 350, sm: 400 }, bgcolor: 'background.paper' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
            >
                {tabsData.map((tab, index) => (
                    <Tab key={index} label={tab.label} disabled={tab.disabled} />
                ))}
            </Tabs>

            {tabsData.map((tab, index) => (
                <Box key={index} role="tabpanel" hidden={value !== index}>
                    {value === index && tab.content}
                </Box>
            ))}
        </Box>
    );
}


