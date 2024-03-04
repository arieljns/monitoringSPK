/* DISCLAIMER TO FELLOW DEVELOPER or RECRUITER

    if you see  monitoringSPK of this version, i'm so sorry u see this mess.
    i know this is messed up, but i will refactor the code and make a patch update to optimize the performance
    and following the KISS paradigm. see ya 😍

*/
import React from 'react'
import { useState, useEffect, useRef } from 'react';
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
import { Typography } from "@mui/material";
import gsap from "gsap"
import { Link, Element, Events, animateScroll as scroll, scroller, scrollSpy } from 'react-scroll';


var slicedSteps = steps.slice(3, 14)

export default function Card({ onButtonClick, updateContext, current }) {

    const { data, dispatch } = useDataContext();
    const { nextTab, setNextTab } = useDataContext(0);
    const [addingObj, setAddingObj] = useState(false)
    const [updatedEventValue, setUpdateEventValue] = useState()
    const [contentClicked, setContentClicked] = useState(false)
    const [eventValue, setEventValue] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(false);
    const [edited, setEdited] = useState(false)
    const [filledSteps, setFilledSteps] = useState([])
    const [activity, setActivity] = useState(1)
    const [currentTabClicked, setCurrentTabClicked] = useState()
    const [updatedsKey, setUpdatedsKey] = useState([])
    const [formData, setFormData] = useState({
        namaKaryawan: "",
        tanggal: "",
        cuti: "",
        jamMulai: "",
        jamSelesai: "",
        namaPjk: "",
        target: null,
        satuanTarget: "",
        capaianTarget: null,
        satuanCapaian: "",
        deskripsiKegiatan: "",
        jenisKegiatan: "",
        buktiKegiatan: "",
        jamMulai_2: "",
        jamSelesai_2: "",
        namaPjk_2: "",
        target_2: null,
        satuanTarget_2: "",
        capaianTarget_2: null,
        satuanCapaian_2: "",
        deskripsiKegiatan_2: "",
        jenisKegiatan_2: "",
        buktiKegiatan_2: "",
        jamMulai_3: "",
        jamSelesai_3: "",
        namaPjk_3: "",
        target_3: null,
        satuanTarget_3: "",
        capaianTarget_3: null,
        satuanCapaian_3: "",
        deskripsiKegiatan_3: "",
        jenisKegiatan_3: "",
        buktiKegiatan_3: "",
        jamMulai_4: "",
        jamSelesai_4: "",
        namaPjk_4: "",
        target_4: null,
        satuanTarget_4: "",
        capaianTarget_4: null,
        satuanCapaian_4: "",
        deskripsiKegiatan_4: "",
        jenisKegiatan_4: "",
        buktiKegiatan_4: "",
        jamMulai_5: "",
        jamSelesai_5: "",
        namaPjk_5: "",
        target_5: null,
        satuanTarget_5: "",
        capaianTarget_5: null,
        satuanCapaian_5: "",
        deskripsiKegiatan_5: "",
        jenisKegiatan_5: "",
        buktiKegiatan_5: "",
        jamMulai_6: "",
        jamSelesai_6: "",
        namaPjk_6: "",
        target_6: null,
        satuanTarget_6: "",
        capaianTarget_6: null,
        satuanCapaian_6: "",
        deskripsiKegiatan_6: "",
        jenisKegiatan_6: "",
        buktiKegiatan_6: "",
    });
    const [activeStep, setActiveStep] = useState(0);
    const [lastActiveStep, setLastActiveStep] = useState(0);


    var freeVar = nextTab > 0 ? slicedSteps : steps

    const objectKey = ['namaKaryawan', 'tanggal', 'cuti', 'jamMulai', 'jamSelesai', 'namaPjk', 'target', 'satuanTarget', 'capaianTarget', 'satuanCapaian', 'deskripsiKegiatan', 'jenisKegiatan', 'buktiKegiatan',
        'jamMulai_2', 'jamSelesai_2', 'namaPjk_2', 'target_2', 'satuanTarget_2', 'capaianTarget_2', 'satuanCapaian_2', 'deskripsiKegiatan_2', 'jenisKegiatan_2', 'buktiKegiatan_2',
        'jamMulai_3', 'jamSelesai_3', 'namaPjk_3', 'target_3', 'satuanTarget_3', 'capaianTarget_3', 'satuanCapaian_3', 'deskripsiKegiatan_3', 'jenisKegiatan_3', 'buktiKegiatan_3',
        'jamMulai_4', 'jamSelesai_4', 'namaPjk_4', 'target_4', 'satuanTarget_4', 'capaianTarget_4', 'satuanCapaian_4', 'deskripsiKegiatan_4', 'jenisKegiatan_4', 'buktiKegiatan_4',
        'jamMulai_5', 'jamSelesai_5', 'namaPjk_5', 'target_5', 'satuanTarget_5', 'capaianTarget_5', 'satuanCapaian_5', 'deskripsiKegiatan_5', 'jenisKegiatan_5', 'buktiKegiatan_5',
        'jamMulai_6', 'jamSelesai_6', 'namaPjk_6', 'target_6', 'satuanTarget_6', 'capaianTarget_6', 'satuanCapaian_6', 'deskripsiKegiatan_6', 'jenisKegiatan_6', 'buktiKegiatan_6',
    ];



    const stepperRef = useRef(null);

    useEffect(() => {
        Events.scrollEvent.register(activeStep, () => {

        })
    }, [activeStep]);

    const handleContentClick = (index) => {
        setContentClicked(index)
    };
    const updateEventValue = (newEventValue) => {
        setEventValue(newEventValue);
    };

    const renderStepContent = (step) => {
        return React.cloneElement(step.description, { updateEventValue, currentContext: formData });
    };

    useEffect(() => {
        setCurrentTabClicked(current)
    }, [current])
    useEffect(() => {
        console.log("currentTab Clicked:", currentTabClicked)
    }, [currentTabClicked])
    useEffect(() => {
        setUpdateEventValue(eventValue)
        console.log(eventValue)
    }, [eventValue])

    useEffect(() => {
        console.log("this is formData:", formData)
    }, [formData])
    useEffect(() => {
        console.log("Ini data yang udah digabungin :", data)
    }, [data])
    const handleNext = async () => {
        scroller.scrollTo(activeStep + 1, {
            duration: 1500,
            delay: 100,
            smooth: true,
            containerId: 'ContainerElementID',
            offset: 50,
        });
        let freeStep = null
        if (nextTab === 1) {
            freeStep = activeStep + 13
        } else if (nextTab > 1) {
            let counterVar = 13
            counterVar += 10 * (nextTab - 1)
            freeStep = activeStep + counterVar
        } else {
            freeStep = activeStep
        }
        let freeForm = nextTab ? data : formData

        console.log("this is the freeStep:", freeStep)
        console.log(nextTab)
        const keyIteration = objectKey[freeStep];
        console.log("ini adalah kunci yang sedang diedit:", keyIteration)
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
            console.log("harusnya ke dispacth")
            let counter = 0
            counter++
            setNextTab(nextTab + 1);
            dispatch({
                type: "UPLOADING",
                payload: newFormData
            });
            if (nextTab >= 1) {
                const formCombined = { ...formData };

                for (const key in formData) {
                    for (const key in data) {
                        if (data[key] !== null && data[key] !== "") {
                            formCombined[key] = data[key];
                        }
                    }
                }

                dispatch({
                    type: "UPLOADING",
                    payload: formCombined
                })
            }

            onButtonClick();
            nextStep = 0;
            setLastActiveStep(activeStep)
            setAddingObj(true)

        }

        if (nextStep === freeVar.length || eventValue === "cuti") {
            const combinedForm = {};
            if (nextTab >= 1) {
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
            console.log("ini adalah combined form", combinedForm)
            let uploadMana = nextTab > 0 ? combinedForm : formData
            let uploadingData = uploadFormData(uploadMana)
            setIsModalOpen(true);
            setEventValue(null);

            if (uploadingData.status !== 200) {
                setError(true);
            }
            setError(false);
            dispatch({
                type: "UPLOADING",
                payload: null
            })

        }

        if (stepperRef.current) {
            gsap.to(window, { scrollTo: stepperRef.current, duration: 0.5, ease: 'power2.inOut' });
        }

        setEventValue(null);
    };

    const handleEdit = (index) => {
        setEdited(true)
        let indexChange = null

        if (currentTabClicked === 0 || nextTab === 0) {
            indexChange = index
        } else if (currentTabClicked === 1 || nextTab === 1) {
            indexChange = index + 13
        } else if (currentTabClicked === 2 || nextTab === 2) {
            indexChange = index + 23
        } else if (currentTabClicked === 3 || nextTab === 3) {
            indexChange = index + 33
        } else if (currentTabClicked === 4 || nextTab === 4) {
            indexChange = index + 43
        } else if (currentTabClicked === 5 || nextTab === 5) {
            indexChange = index + 53
        }

        console.log("ini adalah index cange=", indexChange)

        let editKey = Object.keys(formData)[indexChange]
        console.log("ini adalah key yang mau diedit: ", editKey)
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

    const handleReset = () => {
        setContentClicked(null);
        setEventValue(null);
        setIsModalOpen(false);
        setError(false);
        setFormData({
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
            deskripsiKegiatan: "",
            jenisKegiatan: "",
            buktiKegiatan: "",
            jamMulai_2: "",
            jamSelesai_2: "",
            namaPjk_2: "",
            target_2: null,
            satuanTarget_2: "",
            capaianTarget_2: null,
            satuanCapaian_2: "",
            deskripsiKegiatan_2: "",
            jenisKegiatan_2: "",
            buktiKegiatan_2: "",
            jamMulai_3: "",
            jamSelesai_3: "",
            namaPjk_3: "",
            target_3: null,
            satuanTarget_3: "",
            capaianTarget_3: null,
            satuanCapaian_3: "",
            deskripsiKegiatan_3: "",
            jenisKegiatan_3: "",
            buktiKegiatan_3: "",
            jamMulai_4: "",
            jamSelesai_4: "",
            namaPjk_4: "",
            target_4: null,
            satuanTarget_4: "",
            capaianTarget_4: null,
            satuanCapaian_4: "",
            deskripsiKegiatan_4: "",
            jenisKegiatan_4: "",
            buktiKegiatan_4: "",
            jamMulai_5: "",
            jamSelesai_5: "",
            namaPjk_5: "",
            target_5: null,
            satuanTarget_5: "",
            capaianTarget_5: null,
            satuanCapaian_5: "",
            deskripsiKegiatan_5: "",
            jenisKegiatan_5: "",
            buktiKegiatan_5: "",
            jamMulai_6: "",
            jamSelesai_6: "",
            namaPjk_6: "",
            target_6: null,
            satuanTarget_6: "",
            capaianTarget_6: null,
            satuanCapaian_6: "",
            deskripsiKegiatan_6: "",
            jenisKegiatan_6: "",
            buktiKegiatan_6: "",
        });
        setActiveStep(0);
        setLastActiveStep(0);
        setFilledSteps([]);
        setNextTab(0);
    };

    var testing = activeStep === freeVar.length || eventValue === "cuti";

    return (
        <Box className="form-container" elevation={100}
            sx={{ maxWidth: { xs: 370, sm: 475, lg: 970, }, overflowX: "hidden" }}>
            <Stepper elevation={10} activeStep={activeStep} active={true}
                orientation="vertical" sx={{ maxWidth: { xs: 360, sm: 475, lg: 1000 } }}>
                {freeVar.map((step, index) => (

                    <Step key={step.label} expanded={filledSteps.includes(index)}>
                        <StepLabel sx={{}}>
                            {step.label}
                        </StepLabel>
                        <StepContent onClick={() => handleContentClick(index)}
                            TransitionProps={{ unmountOnExit: false }}>
                            {edited && index === contentClicked ?
                                <Typography sx={{ color: "#d20c0c", mb: 2 }}>*Data telah di
                                    edit </Typography> : ""}
                            {renderStepContent(step)}
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    {
                                        filledSteps.includes(index) ? <Button
                                            disabled={index !== contentClicked || !Object.values(slicedSteps)[index]}
                                            variant="contained"
                                            onClick={() => handleEdit(index)}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            EDIT
                                        </Button> : <Button
                                            disabled={isEmpty(eventValue)}
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === freeVar.length - 1 || testing ? 'Selesai' : 'Selanjutnya'}

                                        </Button>

                                    }


                                </div>
                            </Box>
                        </StepContent>
                    </Step>

                ))}
            </Stepper>

            {isModalOpen && (
                <div>
                    <ModalComponent handleError={error} handleReset={handleReset} isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen} />
                </div>
            )}
        </Box>
    );
}

