import { Typography } from '@mui/material';
import { Slider } from '@components/Slider';
import { useSelector } from 'react-redux';
import { getOrders } from '@store/redux/selectors';
import { usePageRefresh } from '@/hooks/usePageRefresh';

import styles from '@styles/Main.module.css';
import { MainLayout } from '@components/MainLayout';

export const Profile = () => {
    const orders = useSelector(getOrders);
    const date = usePageRefresh();

    return (
        <MainLayout>
            <div className={styles.wrapper}>
                {!orders.length ? (
                    <Typography variant="h4">Hear is going to be your booked tables</Typography>
                ) : (
                    <>
                        <Typography variant="h4">Current booking</Typography>
                        <Slider orders={orders} date={date} />
                    </>
                )}
            </div>
        </MainLayout>
    );
};
