import React from 'react'
import { Card,CardActionArea,CardMedia, CardContent, Typography, Button , CardActions} from "@mui/material";

export default function ProjectCard(props){

    return(
        <Card sx={{ maxWidth: 345, height:350, }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://static01.nyt.com/images/2020/03/31/world/00virus-scientists1/00virus-scientists1-superJumbo-v2.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.project.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
    )
}