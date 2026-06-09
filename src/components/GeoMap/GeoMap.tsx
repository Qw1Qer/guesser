import {ComposableMap, Geographies, Geography, Line, Marker} from "react-simple-maps";
import {useArea, useNewOption, useSelectOption, useTrueValue} from "../../store/store.tsx";
import './geoMap.css'


// GeoJSON/TopoJSON файл с данными карты
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";


const GeoMap = () =>  {

    const marker = useSelectOption(state => state.value);
    const onAddArea = useArea(state => state.onAdd)
    const trueValue = useTrueValue(state => state.value)
    const newOption = useNewOption(state => state.value)
    const currentOption = useSelectOption(state => state.value);
    const setCurrentOption = useSelectOption(state => state.onSelect);


    const getCenterFromGeometry = (geo: any): [number, number] => {
        const getCenter = (coords: number[][]): [number, number] => {
            const lngs = coords.map(c => c[0]);
            const lats = coords.map(c => c[1]);
            return [(Math.min(...lngs) + Math.max(...lngs)) / 2, (Math.min(...lats) + Math.max(...lats)) / 2];
        };

        try {
            const geometry = geo.geometry;
            let coords: [number, number] = [0, 0];  // 👈 меняем тип на кортеж

            if (geometry.type === "Polygon") {
                coords = getCenter(geometry.coordinates[0]);
            } else if (geometry.type === "MultiPolygon") {
                coords = getCenter(geometry.coordinates[0][0]);
            }

            // 👇 Смещения для проблемных стран
            const name = geo.properties?.name || "";
            const offsets: Record<string, [number, number]> = {
                "Russia": [5, -20],
                "China": [-5, 15],
                "France": [55, 42],
                "Australia": [-10, 15],
                "New Zealand": [-8, -5],
            };

            if (offsets[name]) {
                coords = [coords[0] + offsets[name][0], coords[1] + offsets[name][1]];
            }

            return coords;

        } catch (e) {
            console.error("Ошибка получения координат для", geo.properties?.name, e);
        }
        return [0, 0];
    };



    return (
        <ComposableMap projection="geoEqualEarth" className={trueValue ? 'map-disabled' : ''} projectionConfig={{
            scale: 200,
            center: [15, -5],
        }}
        >
            <Geographies geography={geoUrl}>
                {({ geographies }: {geographies: any[]}) =>
                    geographies.map((geo) => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            style={{
                                default: { fill: "#ECEFF1", stroke: "#607D8B", strokeWidth: 0.5 },
                                hover: { fill: "#FF7043", cursor: "pointer" },
                                pressed: { fill: "#E64A19" },
                            }}
                            onClick={() => {
                                const centerCoordinates = getCenterFromGeometry(geo);
                                onAddArea(geo.properties.name);
                                setCurrentOption({
                                    name: geo.properties.name,
                                    coordinate: centerCoordinates,
                                });
                            }}
                        />
                    ))
                }
            </Geographies>
            {marker ? <Marker coordinates={marker.coordinate} >
                <circle r={5} fill="red" stroke="#fff" strokeWidth={2} />
                <text
                    x={marker.name === "New Zealand" || marker.name === "Papua New Guinea" ? -40 : 0 }  // 👈 смещаем текст вправо
                    y={marker.name === "New Zealand" || marker.name === "Papua New Guinea"  ? -10 : -10}  // 👈 чуть выше
                    fontSize="12"
                    textAnchor="middle"
                    fill="red"
                >
                    {marker.name}
                </text>

            </Marker> : null }
            {trueValue ?
                <>
                    <Line
                        from={newOption.coordinate}
                        to={currentOption?.coordinate}
                        stroke="red"        // Цвет линии
                        strokeWidth={1}         // Толщина линии

                    />
                    <Marker coordinates={newOption.coordinate}>
                        <circle r={5} fill="green" stroke="#fff" strokeWidth={2} />
                        <text y={-10} fontSize="12" textAnchor="middle">{newOption.name}</text>
                    </Marker>
                </> : null}

        </ComposableMap>
    );
}

export default GeoMap;