import { FC, useState } from 'react';
import styles from '@styles/Slider.module.css';
import moment from 'moment';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { errorOptions, successOptions } from '@constants/toastOptions';
import { removeOrder } from '@store/redux/actions/actions';
import { useDispatch } from 'react-redux';
import { ISliderProps } from '@components/interfaces';
import { themeColors } from '@constants/themeColors';

export const Slider: FC<ISliderProps> = ({ orders, date }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPressed, setIsPressed] = useState(false);

    const onPressNext = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + 1;
            return newIndex < orders.length ? newIndex : 0;
        });
    };

    const onPressPrev = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex - 1;
            return newIndex >= 0 ? newIndex : orders.length - 1;
        });
    };

    const onEditPress = () => {
        setIsPressed(true);
    };
    const dispatch = useDispatch();

    const onCancelBookPress = (id: string, time: string) => () => {
        const timeNow = moment(new Date(date), 'h:mm A');
        const bookingTime = moment(new Date(time), 'h:mm A');

        const diffInMinutes = bookingTime.diff(timeNow, 'minutes');

        if (diffInMinutes >= 60) {
            dispatch(removeOrder({ id }));
            // @ts-ignore
            toast.info('Order is successfully removed', successOptions);
            setIsPressed(false);
            onPressNext();
            return;
        }
        // @ts-ignore
        toast.info('You cant cancel your booking already', errorOptions);
        setIsPressed(false);
    };

    const filteredOrders = orders.slice(currentIndex, currentIndex + 1);

    return (
        <div className={styles.slider}>
            <Button variant="contained" onClick={onPressPrev} style={{ backgroundColor: themeColors.violet }}>
                &lt;
            </Button>
            <div className={styles.itemsContainer}>
                {filteredOrders.map(({ quests, dateAndTime, id }, index) => (
                    <div className={styles.item} key={index}>
                        <div>{moment(dateAndTime).format('DD.MM.YYYY, h:mm A')}</div>
                        <div>{quests} people</div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                marginTop: 20,
                                width: '100%',
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={!isPressed ? onEditPress : onCancelBookPress(id, dateAndTime)}
                                style={{ backgroundColor: themeColors.violet }}
                            >
                                {isPressed ? 'Cancel book' : 'Edit'}
                            </Button>
                            {isPressed && (
                                <Button variant="outlined" onClick={() => setIsPressed(false)} color="error">
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <Button variant="contained" onClick={onPressNext} style={{ backgroundColor: themeColors.violet }}>
                &gt;
            </Button>
        </div>
    );
};
