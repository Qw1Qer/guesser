import India from '../assets/india.mp3'
import Japan  from '../assets/japan.mp3'
import Egypt from '../assets/egypt.mp3'
import Peru from '../assets/peru.mp3'
import Slovenia from '../assets/slovenia.mp3'
import Norway from '../assets/norway.mp3'
import Uzbekistan from '../assets/uzbekistan.mp3'
import USA from '../assets/usa.mp3'
import Greece from '../assets/greece.mp3'
import Hungary from '../assets/hungary.mp3'

export interface dataType {
    name: string
    sound?: string
    coordinate: [number, number]
}


export const dataSound:dataType[]  = [
    {
        name: 'India',
        sound: India,
        coordinate:[78.96, 20.59]
    },
    {
        name: 'Japan',
        sound: Japan,
        coordinate:[138.0, 36.0]
    },
    {
        name: 'Egypt',
        sound: Egypt,
        coordinate: [30.0, 26.0]
    },
    {
        name: 'Peru',
        sound: Peru,
        coordinate: [-75.0, -9.0]
    },
    {
        name: 'Slovenia',
        sound: Slovenia,
        coordinate: [14.5, 46.0]
    },
    {
        name: 'Norway',
        sound: Norway,
        coordinate: [8.5, 62.0]
    },
    {
        name: 'Uzbekistan',
        sound: Uzbekistan,
        coordinate: [64.0, 41.0]
    },
    {
        name: 'United States of America',
        sound: USA,
        coordinate: [-98.0, 39.0],
    },
    {
        name: 'Greece',
        sound: Greece,
        coordinate: [23.0, 38.5]
    },
    {
        name: 'Hungary',
        sound: Hungary,
        coordinate: [19.0, 47.0]
    }
]