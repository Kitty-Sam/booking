import { FC } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@styles/DatePicker.css';

import { ICustomDatePickerProps } from '@components/interfaces';

export const CustomDatePicker: FC<ICustomDatePickerProps> = ({ startDate, setStartDate, isTime }) => {
    return (
        <DatePicker
            autoFocus
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showIcon
            showTimeSelect={isTime}
            minTime={isTime ? new Date(0, 0, 0, 12, 0) : undefined}
            maxTime={isTime ? new Date(0, 0, 0, 22, 0) : undefined}
            dateFormat={isTime ? 'Pp' : undefined}
        />
    );
};
