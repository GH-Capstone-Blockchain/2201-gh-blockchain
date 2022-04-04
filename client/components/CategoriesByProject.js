import React, { useState, useEffect } from "react";
import { categoriesArr, generateColor } from "./smallComponents/utilities";
import { Box, Grid, Button} from "@mui/material";

export default function CategoriesByProject(props) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (props.project.categories) {
      setCategories(props.project.categories.map(category=> category.category));
      setLoading(false);
    }
  },[props]);

  if (loading) return "Loading";
  if (!loading) {
    return (
      <Box sx={{margin:'5px'}}>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {categoriesArr.filter(category => categories.includes(category.name)).map((category) => (
            <Grid item key={category.name}>
              <Button
                variant="outlined"
                startIcon={category.icon}
                disabled
                style={{
                  color: generateColor(),
                  margin: "2px",
                }}
              >
                {category.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}
