import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

let labels = ['Trending', 'New', 'Beachfront', 'Cabins', 'Parks', 'Campers', 'Castles', 'Islands',
    'Boats', 'Home', 'Tropical', 'Towers', 'Windmills', 'Farms', 'Cave', 'Ski']

const options = labels.map((label) => ({ value: label, label }))

export function MultiLabelsSelect({ handleSelectChange }) {
    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            onChange={handleSelectChange}
        />
    );
}