import React from 'react'
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import steps from '../data/stepsData';
import ModalComponent from "../utils/ModalComponent"
import uploadFormData from '../interaction/upload';
import { useDataContext } from '../hooks/useDataContext';


export default function Card({ onButtonClick, updateContext }) {
    const { dispatch } = useDataContext();

    const [eventValue, setEventValue] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        namaKaryawan: "",
        tanggal: {},
        kehadiran: "",
        jamMulai: {},
        jamSelesai: {},
        namaPjk: "",
        target: null,
        satuanTarget: "",
        capaianTarget: null,
        satuanCapaian: "",
        buktiKegiatan: "",
        deskripsiKegiatan: ""
    });

    // Load formDataHistory from localStorage on component mount
    useEffect(() => {
        const formDataHistoryString = localStorage.getItem('formDataHistory');
        if (formDataHistoryString) {
            const formDataHistory = JSON.parse(formDataHistoryString);
            // Assuming formDataHistory is an array
            if (Array.isArray(formDataHistory) && formDataHistory.length > 0) {
                // Set the latest formData from history
                setFormData(formDataHistory[formDataHistory.length - 1]);
            }
        }
    }, []);

    const objectKey = ["namaKaryawan", "tanggal", "kehadiran", "jamMulai", "jamSelesai",
        "namaPjk", "target", "satuanTarget", "capaianTarget", "satuanCapaian", "buktiKegiatan", "deskripsiKegiatan"
    ];

    const updateEventValue = (newEventValue) => {
        setEventValue(newEventValue);
    };

    const renderStepContent = (step) => {
        return React.cloneElement(step.description, { updateEventValue, currentContext: formData });
    };

    const handleNext = async () => {
        const keyIteration = objectKey[activeStep];
        const newFormData = {
            ...formData,
            [keyIteration]: eventValue
        };
        setFormData(newFormData);

        // Save the new formData to localStorage
        const formDataHistoryString = localStorage.getItem('formDataHistory');
        let formDataHistory = formDataHistoryString ? JSON.parse(formDataHistoryString) : [];
        formDataHistory.push(newFormData);
        localStorage.setItem('formDataHistory', JSON.stringify(formDataHistory));

        const nextStep = activeStep + 1;
        setActiveStep(nextStep);

        if (nextStep === steps.length || eventValue === "cuti") {
            let uploadingData = uploadFormData(newFormData);
            setIsModalOpen(true);
            if (uploadingData.status !== 200) {
                setError(true);
            }
            setError(false);
        }

        setEventValue(null);

        if (eventValue === "ya") {
            dispatch({
                type: 'UPLOADING',
                payload: newFormData
            });
            onButtonClick();
        }
    };

    function isEmpty(value) {
        if (typeof value === 'string') {
            return !value || value.trim().length === 0;
        } else if (typeof value === 'number') {
            return !value || value <= 0;
        } else {
            return !value;
        }
    }

    const handleBack = () => {
        // Remove the latest formData from history
        const formDataHistoryString = localStorage.getItem('formDataHistory');
        let formDataHistory = formDataHistoryString ? JSON.parse(formDataHistoryString) : [];
        formDataHistory.pop();
        localStorage.setItem('formDataHistory', JSON.stringify(formDataHistory));

        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setIsModalOpen(false);
    };

    var testing = activeStep === steps.length || eventValue === "cuti";

    return (
        <Box className="form-container" elevation={10} sx={{ maxWidth: 400, position: "relative", right: 5 }}>
            <Stepper elevation={10} activeStep={activeStep} orientation="vertical" >
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel sx={{}}>
                            {step.label}
                        </StepLabel>
                        <StepContent TransitionProps={{ unmountOnExit: false }} >
                            {renderStepContent(step)}
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        disabled={isEmpty(eventValue)}
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 || testing ? 'Selesai' : 'Selanjutnya'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Kembali
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {isModalOpen && (
                <div>
                    <ModalComponent handleError={error} handleReset={handleReset} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                </div>
            )}
        </Box>
    );
}

