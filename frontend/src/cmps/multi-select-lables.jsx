import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const labels = ['New', 'Beachfront', 'Cabins', 'National parks', 'Campers', 'Castles', 'Islands', 'Boats', 'Home', 'Tropical', 'Towers', 'Windmills', 'Farms']

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