import { themeColors } from '@constants/themeColors';

export enum SeatType {
    AVAILABLE = 'available',
    RESERVED = 'reserved',
    SELECTED = 'selected',
}

export interface ISeat {
    id: string;
    type: SeatType;
}

export const seatsSorts = [SeatType.AVAILABLE, SeatType.RESERVED, SeatType.SELECTED];

export const seat: ISeat = { id: '', type: SeatType.AVAILABLE };

export const findBackgroundColor = (type: SeatType) => {
    if (type === SeatType.AVAILABLE) {
        return themeColors.white;
    }

    if (type === SeatType.RESERVED) {
        return themeColors.grey;
    }

    return themeColors.yellow;
};
