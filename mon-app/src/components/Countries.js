import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Countries = () => {

    const [data, setData] = useState([]);
    const [rangeValue, setRangeValue] = useState(30000000);
    const [selectedRadio, setSelectedRadio] = useState('');
    const radios = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
    const [searchInput, setSearchInput] = useState("");
    const [isCrescent, setIsCrescent] = useState(false);

    useEffect(() => {

        axios.get("https://restcountries.com/v2/all?fields=name,population,flag,region,capital")
            .then((res) => setData(res.data));
    }, []);

    const numberFormat = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };


    return (
        <div className="countries">
            <div className='sort-container'>
                <input type="range" min="0" max="1377482166" defaultvalue={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)} />
                <p style={{ marginBottom: "20px" }}>
                    {numberFormat(rangeValue)} habitants
                </p>

                <ul className='radio-container'>
                    {radios.map((radio) => {
                        return (
                            <li key={radio}>
                                <input type="radio" value={radio} id={radio} checked={radio == selectedRadio}
                                    onChange={(e) => setSelectedRadio(e.target.value)} />
                                <label htmlFor={radio}>{radio}</label>
                            </li>
                        )
                    })}
                    <div className='cancel'>
                        {selectedRadio && <h5 onClick={() => setSelectedRadio("")}>
                            Annuler la recherche
                        </h5>}
                    </div>
                </ul>
            </div>

            <div className='filter'>
                {isCrescent ? (
                    <button onClick={() => setIsCrescent(false)}>Tri décroissant <br/><strong>par population</strong></button>
                ) : (
                    <button onClick={() => setIsCrescent(true)}>Tri croissant<br/><strong>par population</strong></button>
                )}

                <input
                    type="text"
                    placeholder="Entrez le nom d'un pays (en anglais)"
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>

            <ul className='countries-list'>
                {data
                    .filter((country) => country.region.includes(selectedRadio))
                    .filter((country) => country.population > rangeValue)
                    .filter((country) => country.name.toLowerCase().includes(searchInput.toLowerCase()))
                    .sort((a, b) => {
                        if (isCrescent) {
                            return a.population - b.population;
                        } else {
                            return b.population - a.population;
                        }
                    })
                    .map((country) => (
                        <Card country={country} key={country.name} />
                    ))}
            </ul>
        </div>
    );
};

export default Countries;