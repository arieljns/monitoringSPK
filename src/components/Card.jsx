import React from 'react'
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import steps from '../data/stepsData';
import ModalComponent from "../utils/ModalComponent"
import uploadFormData from '../interaction/upload';
import {useDataContext} from '../hooks/useDataContext';
import {Typography} from "@mui/material";



var slicedSteps = steps.slice(3, 13)

export default function Card({onButtonClick, updateContext, currentTab}) {

    const {data, dispatch} = useDataContext();
    const {nextTab, setNextTab} = useDataContext();
    const [addingObj, setAddingObj] = useState(false)
    const [updatedEventValue, setUpdateEventValue] = useState()
    const [contentClicked, setContentClicked] = useState(false)
    const [eventValue, setEventValue] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(false);
    const [edited, setEdited] = useState(false)
    const [filledSteps, setFilledSteps] = useState([])
    const [activity, setActivity] = useState(1)
    const [updatedsKey, setUpdatedsKey] = useState([])
    const [formData, setFormData] = useState({
        namaKaryawan: "",
        tanggal: "",
        kehadiran: "",
        jamMulai: "",
        jamSelesai: "",
        namaPjk: "",
        target: null,
        satuanTarget: "",
        capaianTarget: null,
        satuanCapaian: "",
        buktiKegiatan: "",
        deskripsiKegiatan: "",
        jamMulai_2: "",
        jamSelesai_2: "",
        namaPjk_2: "",
        target_2: null,
        satuanTarget_2: "",
        capaianTarget_2: null,
        satuanCapaian_2: "",
        buktiKegiatan_2: "",
        deskripsiKegiatan_2: ""
    });
    const [activeStep, setActiveStep] = useState(0);
    const [lastActiveStep, setLastActiveStep] = useState(0);



    var freeVar = nextTab > 0 ? slicedSteps : steps

    const objectKey = ["namaKaryawan", "tanggal", "kehadiran", "jamMulai", "jamSelesai",
        "namaPjk", "target", "satuanTarget", "capaianTarget", "satuanCapaian", "buktiKegiatan", "deskripsiKegiatan"
    ];

    useEffect(() => {
            const updatedKey = [...objectKey]
            let counters = 0;
            for (let key in formData) {
                counters = counters + 1;
                if (counters > 12) {
                    updatedKey.push(key)
                    setUpdatedsKey(updatedKey)
                }
            }

        },
        [addingObj]
    )
    ;

    const handleContentClick = (index) => {
        setContentClicked(index)
    };
    const updateEventValue = (newEventValue) => {
        setEventValue(newEventValue);
    };

    const renderStepContent = (step) => {
        return React.cloneElement(step.description, {updateEventValue, currentContext: formData});
    };
    

    useEffect(() => {
        setUpdateEventValue(eventValue)
    }, [eventValue])

    const handleNext = async () => {
        let freeStep = nextTab ? activeStep + 12 : activeStep
        let freeForm = nextTab ? data : formData
        let objForm = nextTab ? updatedsKey : objectKey
        console.log("this is the freeStep:", freeStep)
        const keyIteration = objForm[freeStep];

        const newFormData = {
            ...formData,
            [keyIteration]: eventValue
        };

        setFormData(newFormData);

        let nextStep = activeStep + 1;

        if (nextTab > 0) {
            let modifiedSteps = activeStep + 12
            setFilledSteps([...filledSteps, modifiedSteps])
            setActivity(prevActivity => prevActivity + 1)
        }
        setFilledSteps([...filledSteps, activeStep])
        setActiveStep(nextStep);
        setEdited(false)

        if (eventValue === "ya") {
            let counter = 0
            counter++
            setNextTab(counter);
            await dispatch({
                type: "UPLOADING",
                payload: newFormData
            });
            onButtonClick();
            nextStep = 0;
            setLastActiveStep(activeStep)
            setAddingObj(true)

        }

        if (nextStep === freeVar.length || eventValue === "cuti") {
            const combinedForm = {};
            if (nextTab > 0) {
                for (const key in formData) {
                    if (formData[key] !== null && formData[key] !== "") {
                        combinedForm[key] = formData[key];
                    } else if (data[key] !== null && data[key] !== "") {
                        combinedForm[key] = data[key];
                    }
                }
            }
            console.log("ini adalah formData: ", formData)
            console.log("ini adalah data: ", data)
            console.log("ini adalah combined form",combinedForm)
            let uploadMana = nextTab? combinedForm: formData
            let uploadingData = uploadFormData(uploadMana)
            setIsModalOpen(true);
            setEventValue(null);
            dispatch({
                type: "UPLOADING",
                payload: null
            })

            if (uploadingData.status !== 200) {
                setError(true);
            }
            setError(false);
        }

        setEventValue(null);
    };

    const handleEdit = (index) => {
        setEdited(true)
        let editKey = Object.keys(formData)[index]
        let editedValue = updatedEventValue

        setFormData(prevFormData => ({
            ...prevFormData,
            [editKey]: editedValue
        }))

    }

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
        setEventValue(null);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setContentClicked(null);
        setEventValue(null);
        setIsModalOpen(false);
        setError(false);
        setFormData({
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
        setActiveStep(0);
        setLastActiveStep(0);
        setFilledSteps([]);
        setNextTab(0);
    };

    var testing = activeStep === freeVar.length || eventValue === "cuti";

    return (
        <Box className="form-container" elevation={100}
             sx={{maxWidth: {xs: 370, sm: 475}, overflowX: "hidden"}}>
            <Stepper elevation={10} activeStep={activeStep} active={true}
                     orientation="vertical">
                {freeVar.map((step, index) => (
                    <Step key={step.label} expanded={filledSteps.includes(index)}>
                        <StepLabel sx={{}}>
                            {step.label}
                        </StepLabel>
                        <StepContent onClick={() => handleContentClick(index)}
                                     TransitionProps={{unmountOnExit: false}}>
                            {edited && index === contentClicked ?
                                <Typography sx={{color: "#d20c0c", mb: 2}}>*Data telah di
                                    edit </Typography> : ""}
                            {renderStepContent(step)}
                            <Box sx={{mb: 2}}>
                                <div>
                                    {filledSteps.includes(index) ? <Button
                                        disabled={index !== contentClicked}
                                        variant="contained"
                                        onClick={() => handleEdit(index)}
                                        sx={{mt: 1, mr: 1}}
                                    >
                                        EDIT
                                    </Button> : <Button
                                        disabled={isEmpty(eventValue)}
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{mt: 1, mr: 1}}
                                    >
                                        {index === freeVar.length - 1 || testing ? 'Selesai' : 'Selanjutnya'}
                                    </Button>}

                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{mt: 1, mr: 1}}
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
                    <ModalComponent handleError={error} handleReset={handleReset} isModalOpen={isModalOpen}
                                    setIsModalOpen={setIsModalOpen}/>
                </div>
            )}
        </Box>
    );
}

