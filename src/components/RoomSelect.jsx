import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function RoomSelect({options, setSelected}) {
  const handleSelectionChange = (event, value) => {
    setSelected(value)
  };
  return (
    <Autocomplete
    multiple
      id="checkboxes-tags-demo"
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      onChange={handleSelectionChange} 
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            <span className='font-bold'>{option.title}</span>
            <span className='m-2'>
               Price:
            {option.price}
            </span>
            <span className='m-2'>
               Total room:
            {option.totalRoom}
            </span>
            <span className='m-2'>
               Available room:
            {option.availableRoom}
            </span>
          </li>
        );
      }}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Rooms" placeholder="Favorites" />
      )}
    />
  );
}