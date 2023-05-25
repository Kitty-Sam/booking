import { FC } from 'react';
import { addNewOrder } from '@store/redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IControlBar } from '@components/interfaces';
import { themeColors } from '@constants/themeColors';
import { Button } from '@mui/material';

export const ControlBar: FC<IControlBar> = ({
    activeStep,
    setActiveStep,
    compareValue,
    prevLabel,
    nextLabel,
    filters,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const nextStep = () => {
        setActiveStep(activeStep + 1);
    };

    const prevStep = () => {
        setActiveStep(activeStep - 1);
    };

    const onBookPress = () => {
        dispatch(addNewOrder(filters));
        navigate('/profile');
    };

    return (
        <>
            <Button
                onClick={prevStep}
                disabled={activeStep === 1}
                style={{
                    backgroundColor: themeColors.lightWhite,
                    color: activeStep >= compareValue ? themeColors.black : themeColors.white,
                }}
            >
                {prevLabel}
            </Button>
            <Button
                onClick={nextLabel === 'Book' ? onBookPress : nextStep}
                style={{
                    backgroundColor: activeStep >= compareValue ? themeColors.violet : themeColors.white,
                    color: themeColors.white,
                }}
            >
                {nextLabel}
            </Button>
        </>
    );
};
