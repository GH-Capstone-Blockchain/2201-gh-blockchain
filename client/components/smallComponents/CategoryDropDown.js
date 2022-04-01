import React from 'react'
import { Select, MenuItem, Checkbox, ListItemText, OutlinedInput, InputLabel, FormControl} from '@mui/material'
import { categoriesArr } from './utilities'


export default function CategoryDropDown (props) {

    return(
      <FormControl required sx={{width:'100%'}}>
      <InputLabel id="category">Category</InputLabel>
        <Select
        labelId="category"
        id='category'
        multiple
        value={props.category}
        input={<OutlinedInput label="Category" />}
        onChange={props.handleChange}
        renderValue={(selected) => selected.join(', ')}
        sx={{width:'100%'}}
      >
        {categoriesArr.map((category) => (
          <MenuItem key={category.name} value={category.name}>
            <Checkbox checked={props.category.indexOf(category.name) > -1} />
            <ListItemText primary={category.name} />
          </MenuItem>
        ))}
      </Select>
      </FormControl>
    )
}