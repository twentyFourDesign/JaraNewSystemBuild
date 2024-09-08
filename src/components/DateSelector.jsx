import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';

const options = [
  { title: 'Option 1' },
  { title: 'Option 2' },
  { title: 'Option 3' },
];

const CombinedComponent = () => {
  const [value, setValue] = useState(null);  // DatePicker state
  const [selectedOption, setSelectedOption] = useState(null);  // Autocomplete state

  return (
    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', width: '300px' }}>
      {/* Autocomplete Component */}
      <Autocomplete
        value={selectedOption}
        onChange={(event, newValue) => setSelectedOption(newValue)}
        options={options}
        getOptionLabel={(option) => option.title || ''}
        renderInput={(params) => <TextField {...params} label="Select Option" />}
      />

      {/* DatePicker Component */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select Date"
          value={value}
          onChange={(newDate) => setValue(newDate)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CombinedComponent;
