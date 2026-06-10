
import {useCounter, useNewOption, useSelectOption, useTrueValue, useUser} from "../../store/store.tsx";
import './chosePanel.css'
import {calculateDistance} from "../../utils/distance.ts";
import {dataSound} from "../../utils/data.ts";
import { useState} from "react";
import StartModal from "../StartModal/StartModal.tsx";


const ChosePanel = () => {

    const changeTrueValue = useTrueValue(state => state.onChange)
    const trueValue = useTrueValue(state => state.value)
    const newOption = useNewOption(state => state.value)
    const changeSound = useNewOption(state => state.onChange)
    const currentOption = useSelectOption(state => state.value)
    const addPoints = useCounter(state => state.onChange)
    const changeCurrentOption = useSelectOption(state => state.onSelect)
    const iterationCount = useNewOption(state => state.index)
    const user = useUser(state => state.value)
    const points = useCounter(state => state.value)
    const clearPoints = useCounter(state => state.onClear)
    const [openModal, setOpenModal] = useState<boolean>(false)


    const onHandleArea = () => {

        if(!currentOption) {
            alert('Выберите область')
            return
        }

        if(newOption.name === currentOption?.name ) {
            alert('Правильно')
        }else {
            alert('Неправильно')
        }

        const points = calculateDistance(newOption.coordinate, currentOption.coordinate)
        addPoints(points)

        changeTrueValue()

    }

    const onNextArea = () => {
        if(iterationCount === dataSound.length - 1) {
            setOpenModal(true)
            return;
        }
        changeTrueValue()
        changeSound()
        changeCurrentOption(null)

    }


    return (
        <>
        <div className="chose-panel">
            <div className='hear'>Слушай</div>
            <audio src={newOption.sound} controls controlsList="nodownload noplaybackrate"></audio>
            <button className='panel-button' onClick={onHandleArea} disabled={trueValue}>Выбрать</button>
            <button className='panel-button' onClick={onNextArea} disabled={!trueValue}>Next</button>
        </div>
            <StartModal isOpen={openModal}>
                <div>Поздравляю: {user}</div>
                <div>Ваш счет: {points}</div>
                <button className='modal-button' onClick={() => {
                    setOpenModal(false)
                    changeSound()
                    changeCurrentOption(null)
                    changeTrueValue()
                    clearPoints()
                }}>Завершить</button>
            </StartModal>
            </>
    );
};

export default ChosePanel;