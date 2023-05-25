import { Header } from '@components/Header';
import { Typography } from '@mui/material';
import { restaurants } from '@constants/restaurants';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentRestaurant } from '@store/redux/actions/actions';
import { useNavigate } from 'react-router-dom';

import styles from '@styles/Main.module.css';
import { getCurrentUser } from '@store/redux/selectors';

export const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onRestaurantPress = (title: string) => () => {
        dispatch(addCurrentRestaurant({ currentRestaurant: title }));
        navigate('/booking');
    };

    const currentUser = useSelector(getCurrentUser);
    console.log('currentUser', currentUser);

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
