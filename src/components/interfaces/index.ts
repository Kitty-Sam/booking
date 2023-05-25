import { IOrder } from '@store/redux/reducers/userReducer';
import { AddNewOrderPayload } from '@store/redux/reducers/types';

export interface ICustomDatePickerProps {
    startDate: Date | null;
    setStartDate: (value: Date | null) => void;
    isTime: boolean;
}

export interface IProgressStepsProps {
    activeStep: number;
    setActiveStep: (value: number) => void;
}

export interface ISliderProps {
    orders: IOrder[];
    date: Date;
}

export interface IControlBar {
    activeStep: number;
    setActiveStep: (value: number) => void;
    compareValue: number;
    prevLabel: string;
    nextLabel: string;
    filters: AddNewOrderPayload;
}
