// useActiveStep.js

import { useState, useEffect } from "react";

function useActiveStep(initialStep, storageKey) {
    let storedStep = localStorage.getItem(storageKey);


    const initial = storedStep ? parseInt(storedStep, 10) : initialStep;
    const [activeStep, setActiveStep] = useState(initial);

    const updateActiveStep = (nextStep) => {
        setActiveStep(nextStep);
    };

    useEffect(() => {
        localStorage.setItem(storageKey, activeStep.toString());
    }, [activeStep, storageKey]);

    return [updateActiveStep, activeStep];
}

export default useActiveStep;
