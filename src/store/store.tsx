import {create} from "zustand/react";
import {dataSound, type dataType} from "../utils/data.ts";

interface AreaState {
    value: string;
    onAdd: (area: string) => void;
}
interface trueValueState {
    value: boolean;
    onChange: () => void
}

interface NewOptionState {
    value: dataType;  // храним весь объект, а не просто значение
    index: number;
    onChange: () => void;
}
interface SelectOptionState {
    value: dataType | null;     // может быть null (ничего не выбрано)
    onSelect: (option: dataType | null) => void;  // выбираем опцию
}

interface CounterState {
    value: number;
    onChange: (point:number) => void;
    onClear: () => void;
}

interface UserState {
    value: string;
    onChange: (user:string) => void;
}

export const useArea = create<AreaState>((set) => ({
    value: '',
    onAdd: (area: string) => set(() => ({value: area})),
}))

export const useTrueValue = create<trueValueState>((set) => ({
    value: false,
    onChange: () => set((state) => ({value: !state.value})),
}))

export const useNewOption = create<NewOptionState>((set) => ({
    value: dataSound[0],
    index: 0,
    onChange: () => set((state) => {
        const nextIndex = (state.index + 1) % dataSound.length; // циклический переход
        return {
            index: nextIndex,
            value: dataSound[nextIndex]
        };
    }),
}));


export const useSelectOption = create<SelectOptionState>((set) => ({
    value: null,
    onSelect: (option: dataType | null) => set({ value: option }),
}));


export const useCounter = create<CounterState>((set) => ({
    value: 0,
    onChange: (point:number) => set((state) => ({value: state.value + point})),
    onClear: () => set(() => ({value: 0}))
}))

export const useUser = create<UserState>((set) => ({
    value: '',
    onChange: (user:string) => set(() => ({value: user}))
}))

