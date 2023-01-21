import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const labels = ['National-parks', 'Campers', 'Surfing', 'Amazing-views', 'Beach', 'Castles', 'Islands', 'Caves', 'Beach', 'Lake', 'Cavins']

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