import styles from '@styles/ProgressSteps.module.css';
import { steps } from '@constants/progressSteps';
import { FC } from 'react';
import { IProgressStepsProps } from '@components/interfaces';
import { themeColors } from '@constants/themeColors';

export const ProgressSteps: FC<IProgressStepsProps> = ({ activeStep }) => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.stepContainer}>
                {steps.map(({ step, label }) => (
                    <div className={styles.wrapper} key={step}>
                        <div
                            className={styles.step}
                            style={{
                                background: activeStep >= step ? themeColors.violet : themeColors.lightWhite,
                            }}
                        >
                            {activeStep >= step ? (
                                <div className={styles.checkMark}>L</div>
                            ) : (
                                <span
                                    className={styles.count}
                                    style={{
                                        color: activeStep >= step ? themeColors.white : themeColors.black,
                                    }}
                                >
                                    {step}
                                </span>
                            )}
                        </div>
                        <div className={styles.labelContainer}>
                            <div className={styles.label}>{label}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
