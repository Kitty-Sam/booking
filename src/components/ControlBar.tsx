import stylesButton from '@styles/ProgressSteps.module.css';
import { FC } from 'react';
import { addNewOrder } from '@store/redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IControlBar } from '@components/interfaces';
import { themeColors } from '@constants/themeColors';

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
            <button
                onClick={prevStep}
                disabled={activeStep === 1}
                className={stylesButton.button}
                style={{
                    backgroundColor: activeStep >= compareValue ? themeColors.lightWhite : themeColors.white,
                    color: activeStep >= compareValue ? themeColors.black : themeColors.white,
                }}
            >
                {prevLabel}
            </button>
            <button onClick={nextLabel === 'Book' ? onBookPress : nextStep} className={stylesButton.button}>
                {nextLabel}
            </button>
        </>
    );
};
