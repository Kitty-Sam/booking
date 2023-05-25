import styles from '@styles/Main.module.css';
import stylesButton from '@styles/ProgressSteps.module.css';
import stylesTable from '@styles/Tables.module.css';
import { ProgressSteps } from '@components/ProgressSteps';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { CustomDatePicker } from '@components/DatePicker';
import { TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLogged, getOrders } from '@store/redux/selectors';
import { Slider } from '@components/Slider';
import { ControlBar } from '@components/ControlBar';
import { tables } from '@constants/tables';
import { restaurants } from '@constants/restaurants';
import { addCurrentRestaurant } from '@store/redux/actions/actions';
import { usePageRefresh } from '@/hooks/usePageRefresh';

export const MainPanel = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [quests, setGuests] = useState<string>('1');
    const [table, setTable] = useState<string>('1');
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const location = useLocation();
    const navigate = useNavigate();
    const date = usePageRefresh();

    const orders = useSelector(getOrders);
    const isLoggedIn = useSelector(getIsLogged);

    const payload = {
        id: Date.now().toString(),
        quests: Number(quests),
        tableNumber: Number(table),
        dateAndTime: startDate?.toString(),
    };

    const dispatch = useDispatch();
    const onRestaurantPress = (title: string) => () => {
        dispatch(addCurrentRestaurant({ currentRestaurant: title }));
        navigate('/booking');
    };

    if (location.pathname === '/booking') {
        return (
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
                                                                        seat === 'reserved' ? 'grey' : 'inherit',
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
                                        <div> Reserved</div>

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
    }

    if (location.pathname === '/profile') {
        return (
            <div className={styles.wrapper}>
                {!orders.length ? (
                    <Typography variant="h4">Hear is going to be your booked tables</Typography>
                ) : (
                    <>
                        <div>{orders.length}</div>
                        <Typography variant="h4">Current booking</Typography>
                        <Slider orders={orders} date={date} />
                    </>
                )}
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <Typography variant="h4">Choose your restaurant</Typography>
            {restaurants.map((restaurant) => (
                <div
                    key={restaurant.title}
                    onClick={onRestaurantPress(restaurant.title)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 50 }}
                >
                    <div>{restaurant.title}</div>
                    <img src={restaurant.img} alt="place" style={{ width: 100, height: 100, borderRadius: 25 }} />
                </div>
            ))}
        </div>
    );
};
