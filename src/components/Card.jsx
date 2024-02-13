import React from 'react'
import { useState } from 'react';
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
import Modal from "react-modal"


export default function Card({ onButtonClick, updateContext }) {
    const { state, dispatch } = useDataContext();
    const [eventValue, setEventValue] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Separate state to store form data
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

    const objectKey = ["namaKaryawan", "tanggal", "kehadiran", "jamMulai", "jamSelesai",
        "namaPjk", "target", "satuanTarget", "capaianTarget", "satuanCapaian", "deskripsiKegiatan"
    ];

    const updateEventValue = (newEventValue) => {
        setEventValue(newEventValue);
    };

    const renderStepContent = (step) => {
        return React.cloneElement(step.description, { updateEventValue, currentContext: formData });
    };

    console.log("Ini adalah eventValuenya:", eventValue);

    const handleNext = async () => {
        const keyIteration = objectKey[activeStep];
        const newFormData = {
            ...formData,
            [keyIteration]: eventValue
        };
        setFormData(newFormData);

        const nextStep = activeStep + 1;
        setActiveStep(nextStep);

        if (nextStep === steps.length || eventValue === "cuti") {
            uploadFormData(newFormData);
            setIsModalOpen(true);
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
                        <StepContent>
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
                    <ModalComponent handleReset={handleReset} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                </div>
            )}
        </Box>
    );
}

