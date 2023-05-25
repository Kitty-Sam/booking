import { Header } from '@components/Header';
import { Typography } from '@mui/material';
import { restaurants } from '@constants/restaurants';
import { useDispatch } from 'react-redux';
import { addCurrentRestaurant } from '@store/redux/actions/actions';
import { useNavigate } from 'react-router-dom';

import styles from '@styles/Main.module.css';
// import { persistor } from '@store/configureStore';
// import { useEffect } from 'react';

export const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     persistor.purge();
    // });

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
                        className={styles.restaurantItem}
                    >
                        <Typography variant="h6">{restaurant.title}</Typography>
                        <img src={restaurant.img} alt="place" className={styles.restaurantImg} />
                    </div>
                ))}
            </div>
        </>
    );
};
