import React from 'react'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import BasicTextFieldComponent from "../utils/BasicTextFieldComponent"
import TextFieldComponent from "../utils/TextFieldComponent"
import DatePickerComponent from "../utils/DatePickerComponent"
import TimePickerComponent from "../utils/TimePickerComponent"
import CheckBoxComponent from "../utils/CheckBoxComponent"
import ModalComponent from "../utils/ModalComponent"
import uploadFormData from '../interaction/upload';

const steps = [
    {
        label: 'Nama Karyawan:',
        description: <TextFieldComponent props="karyawan"/>,
    },
    {
        label: 'Pilih Tanggal',
        description:
            <DatePickerComponent />,
    },
    {
        label: 'Kehadiran',
        description:
            <CheckBoxComponent props="kehadiran" />,
    },
    {
        label: 'Jam Mulai',
        description: <TimePickerComponent />,
    },
    {
        label: 'Jam Selesai',
        description: <TimePickerComponent />,
    },
    {
        label: 'Nama PJK',
        description: <TextFieldComponent />,
    },
    {
        label: 'Target',
        description: <BasicTextFieldComponent />,
    },
    {
        label: 'Satuan Target',
        description: <CheckBoxComponent props="satuanTarget" />,
    },
    {
        label: 'Capaian Target',
        description: <BasicTextFieldComponent />,
    },
    {
        label: 'Satuan Capaian',
        description: <CheckBoxComponent props="satuanTarget" />,
    },
    {
        label: 'Deskripsi Kegiatan',
        description: <BasicTextFieldComponent props="text" />,
    },
    {
        label: 'Apakah Ada Kegiatan Lain?',
        description: <CheckBoxComponent />,
    },
];



export default function Card({ onButtonClick }) {
    const [eventValue, setEventValue] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [context, setContext] = useState({
        namaKaryawan: "",
        tanggal: {},
        kehadiran: "",
        jamMulai: {},
        jamSelesai: {},
        namaPjk: "",
        target: 0,
        satuanTarget: "",
        capaianTarget: 0,
        satuanCapaian: "",
        deskripsiKegiatan: ""
    })

    const objectKey = ["namaKaryawan", "tanggal", "kehadiran", "jamMulai", "jamSelesai",
        "namaPjk", "target", "satuanTarget", "capaianTarget", "satuanCapaian", "deskripsiKegiatan"
    ]

    const updateEventValue = (newEventValue) => {
        setEventValue(newEventValue);
    };

    const renderStepContent = (step) => {

        return React.cloneElement(step.description, { updateEventValue, currentContext: context });
    };
    console.log("Ini adalah eventValuenya:", eventValue)
    const handleNext = () => {
        const keyIteration = objectKey[activeStep]
        setContext((prevContext) => ({
            ...prevContext,
            [keyIteration]: eventValue,
        }))
        setActiveStep((prevActiveStep) => {
            const nextStep = prevActiveStep + 1;
            if (nextStep === steps.length || eventValue === "cuti") {
                uploadFormData(context)
                setIsModalOpen(true);
            }
            return nextStep;
        });
        if (eventValue === "ya") {
            onButtonClick()
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setIsModalOpen(false);
    };

    var testing = activeStep === steps.length || eventValue === "cuti"
    return (
        <Box className="form-container" elevation={10} sx={{ maxWidth: 400, position: "relative", right: 5 }}>
            <Stepper elevation={10} activeStep={activeStep} orientation="vertical" >
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            sx={{}}
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            {renderStepContent(step)}
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        disabled={eventValue === null || eventValue.length === 0}
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
    )
}

