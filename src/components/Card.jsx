import React from 'react'
import { useState, useEffect, useReducer, useRef } from 'react';
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

var slicedSteps = steps.slice(3, 13)

export default function Card({ onButtonClick, updateContext }) {

    console.log("the component is re render")
    const { dispatch } = useDataContext();
    const { nextTab, setNextTab } = useDataContext()

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
    var freeVar = null
    if (nextTab) {
        freeVar = slicedSteps
    } else {
        freeVar = steps
    }
    useEffect(() => {
        if (nextTab) {
            console.log('This is my Next Tab value after change:', nextTab)
        }
    }, [nextTab])

    const objectKey = ["namaKaryawan", "tanggal", "kehadiran", "jamMulai", "jamSelesai",
        "namaPjk", "target", "satuanTarget", "capaianTarget", "satuanCapaian", "buktiKegiatan", "deskripsiKegiatan"
    ];

    const updateEventValue = (newEventValue) => {
        setEventValue(newEventValue);
    };

    const renderStepContent = (step) => {
        return React.cloneElement(step.description, { updateEventValue, currentContext: formData });
    };


    const handleNext = () => {
        const keyIteration = objectKey[activeStep];
        const newFormData = {
            ...formData,
            [keyIteration]: eventValue
        };
        setFormData(newFormData);
        let nextStep = activeStep + 1;

        setActiveStep(nextStep);
        if (eventValue === "ya") {
            setNextTab(true)
            onButtonClick()
            nextStep = 0
        }


        if (nextStep === freeVar.length || eventValue === "cuti") {
            console.log(newFormData)
            let uploadingData = uploadFormData(newFormData);
            setIsModalOpen(true);
            setEventValue(null);
            if (uploadingData.status !== 200) {
                setError(true);
            }
            setError(false);
        }

        setEventValue(null);
        console.log("this is my nextTab value after handleNext: ", nextTab)
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
        setEventValue(null)
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setIsModalOpen(false);
    };

    var testing = activeStep === steps.length || eventValue === "cuti";

   
    return (
        <Box className="form-container" elevation={100} sx={{ maxWidth: { xs: 370, sm: 475 }, overflowX: "hidden" }}>
            <Stepper elevation={10} activeStep={activeStep} orientation="vertical" >
                {freeVar.map((step, index) => (
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
                                        {index === (nextTab ? freeVar.length - 1 : freeVar.length - 1) || testing ? 'Selesai' : 'Selanjutnya'}
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

