import { Header } from '@components/Header';
import { Typography } from '@mui/material';
import { Slider } from '@components/Slider';
import { useSelector } from 'react-redux';
import { getOrders } from '@store/redux/selectors';
import { usePageRefresh } from '@/hooks/usePageRefresh';

import styles from '@styles/Main.module.css';

export const Profile = () => {
    const orders = useSelector(getOrders);
    const date = usePageRefresh();

    return (
        <>
            <Header />
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
        </>
    );
};
