import GeoMap from "./components/GeoMap/GeoMap.tsx";
import ChosePanel from "./components/chosePanel/ChosePanel.tsx";
import './App.css'
import Counter from "./components/Counter/Counter.tsx";
import {useEffect, useState} from "react";
import StartModal from "./components/StartModal/StartModal.tsx";
import {useUser} from "./store/store.tsx";

const App = () => {

    const [isOpen, setIsOpen] = useState(true);
    const userSet = useUser(state => state.onChange);
    const user = useUser(state => state.value);
    const addUser = (user: string) => {
        if (!user) {
            return 0;
        }
        localStorage.setItem(user, JSON.stringify({point: 0}));
        userSet(user);


        return 1;
    }
    useEffect(() => {

    })

    return (
        <div className="App">
            <div className='title'>Guess by voice</div>
            <GeoMap />
            <ChosePanel/>
            <Counter />
            <StartModal isOpen={isOpen}  >
                <div>Введите свое имя</div>
                <input onChange={(e) => userSet(e.target.value)} className='modal-input' type="text"/>
                <button className='modal-button' onClick={() => {
                    const check = addUser(user)
                    if(check) {
                        setIsOpen(false);
                    }else {
                         alert('Введите имя')
                    }
                }}>Ввод</button>

            </StartModal>
        </div>
    );
};

export default App;
