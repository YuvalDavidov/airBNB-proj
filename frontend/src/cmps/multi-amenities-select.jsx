import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const labels = ['Heating', 'Bath Essentials', 'Kitchen', 'WIFI', 'Washer', 'Dryer', 'Dishwasher', 'Self Check In', 'TV', 'GYM', 'First Aid Kit', 'Coffee Maker', 'Lockbox']

const options = labels.map((label) => ({ value: label, label }))


export function MultiAmenitiesSelect({ handleSelectChange }) {
    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            // defaultValue={[options[4], options[5]]}
            isMulti
            options={options}
            onChange={handleSelectChange}
        />
    );
}