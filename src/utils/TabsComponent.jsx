import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '../components/Card';

export default function ScrollableTabsButtonForce() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleTabChange = (newValue) => {
        setValue(newValue);
    };
    console.log(value)
    const tabsData = [
        {
            label: "Kegiatan 1",
            content: <Card onButtonClick={() => handleTabChange(1)} />,
        },
        {
            label: "Kegiatan 2",
            content: <Card onButtonClick={() => handleTabChange(0)} />,
            disabled: true
        },
        {
            label: "Kegiatan 3",
            content: <Card onButtonClick={() => handleTabChange(1)} />,
            disabled:true
        },
        {
            label: "Kegiatan 4",
            content: <Card onButtonClick={() => handleTabChange(0)} />,
            disabled: true
        },
    ];

    return (
        <Box sx={{ maxWidth: { xs: 350, sm: 500 }, bgcolor: 'background.paper' }}>
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


