import { Header } from '@components/Header';
import { Typography } from '@mui/material';
import { restaurants } from '@constants/restaurants';
import { useDispatch } from 'react-redux';
import { addCurrentRestaurant } from '@store/redux/actions/actions';
import { useNavigate } from 'react-router-dom';

import styles from '@styles/Main.module.css';

export const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onRestaurantPress = (title: string) => () => {
        dispatch(addCurrentRestaurant({ currentRestaurant: title }));
        navigate('/booking');
    };

    return (
        <>
            <Header />
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
        </>
    );
};
