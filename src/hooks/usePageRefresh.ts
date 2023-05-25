import { useEffect, useState } from 'react';
import { getHoursAndMinutesNow } from '@utils/getHoursAndMinutesNow';

export const usePageRefresh = () => {
    const { format } = getHoursAndMinutesNow();

    const [date, setDate] = useState<Date>(format);
    const [refreshCount, setRefreshCount] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRefreshCount(refreshCount + 1);
            const { format: dateTime } = getHoursAndMinutesNow();
            setDate(dateTime);
        }, 60000);

        return () => clearInterval(intervalId);
    }, [refreshCount]);

    return date;
};
