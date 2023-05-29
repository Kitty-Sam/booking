import { FC, PropsWithChildren } from 'react';
import { Header } from '@components/Header';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};
