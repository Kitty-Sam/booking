import { Button, TextField, Typography } from '@mui/material';
import { ProgressSteps } from '@components/ProgressSteps';
import { CustomDatePicker } from '@components/DatePicker';
import stylesButton from '@styles/ProgressSteps.module.css';
import { ControlBar } from '@components/ControlBar';
import { tables } from '@constants/tables';
import stylesTable from '@styles/Tables.module.css';
import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentRestaurant, getIsLogged } from '@store/redux/selectors';
import { themeColors } from '@constants/themeColors';

import styles from '@styles/Main.module.css';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@components/MainLayout';
import { ISeat, seat, SeatType } from '@constants/seats';
import { toast } from 'react-toastify';
import { successOptions } from '@constants/toastOptions';

export const Booking = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [table, setTable] = useState<string>('1');
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [seatPressed, setSeatPressed] = useState<Array<string>>([]);

    const isLoggedIn = useSelector(getIsLogged);
    const currentRestaurant = useSelector(getCurrentRestaurant);

    const payload = {
        id: Date.now().toString(),
        quests: seatPressed.length,
        tableNumber: Number(table),
        dateAndTime: startDate?.toString(),
    };

    const navigate = useNavigate();

    const onChooseRestaurantPress = () => {
        navigate('/');
    };

    const onSeatClick = (id: string, type: SeatType) => () => {
        if (type === SeatType.RESERVED) {
            // @ts-ignore
            toast.info('Please, choose another one, this place is reserved', successOptions);
            return;
        }
        setSeatPressed((prev) => (prev.includes(id) ? prev.filter((el) => el !== id) : prev.concat(id)));
    };

    return (
        <MainLayout>
            <div className={styles.wrapper}>
                {!isLoggedIn || !currentRestaurant ? (
                    <>
                        <Typography variant="h4" className={styles.typographyGap}>
                            Register or Login first and Choose Restaurant
                        </Typography>
                        <Button variant="contained" onClick={onChooseRestaurantPress}>
                            Choose Restaurant
                        </Button>
                    </>
                ) : (
                    <>
                        <ProgressSteps activeStep={activeStep} setActiveStep={setActiveStep} />
                        <div className={styles.mainBlock}>
                            {activeStep === 1 && (
                                <>
                                    <Typography variant="h4">Choose the Date</Typography>
                                    <CustomDatePicker
                                        startDate={startDate}
                                        setStartDate={setStartDate}
                                        isTime={false}
                                    />
                                    <div className={`${stylesButton.buttonsContainer} ${styles.controlBarGap}`}>
                                        <ControlBar
                                            setActiveStep={setActiveStep}
                                            activeStep={activeStep}
                                            compareValue={1}
                                            prevLabel={'Previous'}
                                            nextLabel={'Next'}
                                            filters={payload}
                                        />
                                    </div>
                                </>
                            )}
                            {activeStep === 2 && (
                                <>
                                    <Typography variant="h4">Choose the Time</Typography>
                                    <CustomDatePicker startDate={startDate} setStartDate={setStartDate} isTime={true} />
                                    <div className={`${stylesButton.buttonsContainer} ${styles.controlBarGap}`}>
                                        <ControlBar
                                            setActiveStep={setActiveStep}
                                            activeStep={activeStep}
                                            compareValue={2}
                                            prevLabel={'Previous'}
                                            nextLabel={'Next'}
                                            filters={payload}
                                        />
                                    </div>
                                </>
                            )}

                            {activeStep === 3 && (
                                <>
                                    <Typography variant="h4">Enter Guests number</Typography>
                                    <div className={styles.tablesWrapper}>
                                        {tables.map((table) => {
                                            // @ts-ignore
                                            const seats = new Array(table.capacity).fill(seat).map((el: ISeat, i) => {
                                                return {
                                                    el: i > 3 ? SeatType.RESERVED : SeatType.AVAILABLE,
                                                    id: (table.id + i).toString(),
                                                };
                                            });

                                            return (
                                                <div key={table.id}>
                                                    <div>№ {table.id}</div>
                                                    <div className={stylesTable.table}>
                                                        {seats.map((seat, index) => (
                                                            <button
                                                                onClick={onSeatClick(seat.id, seat.el)}
                                                                key={index}
                                                                className={styles.placeWrapper}
                                                                style={{
                                                                    backgroundColor: seatPressed.includes(seat.id)
                                                                        ? themeColors.yellow
                                                                        : seat.el === SeatType.RESERVED
                                                                        ? themeColors.grey
                                                                        : 'inherit',
                                                                }}
                                                            >
                                                                {index + 1}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className={styles.historyWrapper}>
                                        <div className={styles.history} />
                                        <Typography variant="h6">Reserved</Typography>

                                        <div className={styles.historyYellow} />
                                        <Typography variant="h6">Selected</Typography>

                                        <div className={styles.historyWhite} />
                                        <Typography variant="h6">Available</Typography>
                                    </div>

                                    <TextField
                                        id="outlined-controlled"
                                        label="Table number"
                                        value={table}
                                        style={{ marginBottom: 30 }}
                                        className={styles.inputGap}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            setTable(event.target.value);
                                        }}
                                    />
                                    <div className={styles.bookBlock}>
                                        <ControlBar
                                            setActiveStep={setActiveStep}
                                            activeStep={activeStep}
                                            compareValue={3}
                                            prevLabel={'Previous'}
                                            nextLabel={'Book'}
                                            filters={payload}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </MainLayout>
    );
};
