import React from 'react'
import { Select, MenuItem, Checkbox, ListItemText, OutlinedInput} from '@mui/material'
import { categoriesArr } from './utilities'


export default function CategoryDropDown (props) {

    return(
        <Select
        labelId="demo-multiple-checkbox-label"
        id="category"
        multiple
        value={props.category}
        onChange={props.handleChange}
        renderValue={(selected) => selected.join(', ')}
      >
        {categoriesArr.map((category) => (
          <MenuItem key={category.name} value={category.name}>
            <Checkbox checked={props.category.indexOf(category.name) > -1} />
            <ListItemText primary={category.name} />
          </MenuItem>
        ))}
      </Select>
    )
}