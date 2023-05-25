import { Header } from '@components/Header';
import { TextField, Typography } from '@mui/material';
import { ProgressSteps } from '@components/ProgressSteps';
import { CustomDatePicker } from '@components/DatePicker';
import stylesButton from '@styles/ProgressSteps.module.css';
import { ControlBar } from '@components/ControlBar';
import { tables } from '@constants/tables';
import stylesTable from '@styles/Tables.module.css';
import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { getIsLogged } from '@store/redux/selectors';
import { themeColors } from '@constants/themeColors';

import styles from '@styles/Main.module.css';

export const Booking = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [quests, setGuests] = useState<string>('1');
    const [table, setTable] = useState<string>('1');
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const isLoggedIn = useSelector(getIsLogged);

    const payload = {
        id: Date.now().toString(),
        quests: Number(quests),
        tableNumber: Number(table),
        dateAndTime: startDate?.toString(),
    };

    return (
        <>
            <Header />
            <div className={styles.wrapper}>
                {!isLoggedIn ? (
                    <Typography variant="h4" className={styles.typographyGap}>
                        Register or Login first
                    </Typography>
                ) : (
                    <>
                        <ProgressSteps activeStep={activeStep} setActiveStep={setActiveStep} />
                        <div className={styles.mainBlock}>
                            {activeStep === 1 && (
                                <>
                                    <Typography variant="h4" className={styles.typographyGap}>
                                        Choose the Date
                                    </Typography>
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
                                    <Typography variant="h4" className={styles.typographyGap}>
                                        Choose the Time
                                    </Typography>
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
                                    <Typography variant="h4" className={styles.typographyGap}>
                                        Enter Guests number
                                    </Typography>
                                    <div className={styles.tablesWrapper}>
                                        {tables.map((table) => {
                                            const array = new Array(table.capacity).fill('available');
                                            const seats = array.fill('reserved', 3);

                                            return (
                                                <div key={table.id}>
                                                    <div>№ {table.id}</div>
                                                    <div className={stylesTable.table}>
                                                        {seats.map((seat, index) => (
                                                            <div
                                                                key={index}
                                                                className={styles.placeWrapper}
                                                                style={{
                                                                    backgroundColor:
                                                                        seat === 'reserved'
                                                                            ? themeColors.grey
                                                                            : 'inherit',
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className={styles.historyWrapper}>
                                        <div className={styles.history} />
                                        <div>Reserved</div>

                                        <div className={styles.historyWhite} />
                                        <div>Available</div>
                                    </div>

                                    <TextField
                                        id="outlined-controlled"
                                        label="Guests number"
                                        value={quests}
                                        style={{ marginBottom: 30 }}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            setGuests(event.target.value);
                                        }}
                                    />

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
            );
        </>
    );
};
