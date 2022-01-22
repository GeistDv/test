import {Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DoneIcon from "@mui/icons-material/Done";
import StarIcon from "@mui/icons-material/Star";
import DiamondIcon from "@mui/icons-material/Diamond";


function StepSix({ update,goBackPage }) {
    return (
      <Grid sx={{ flexGrow: 3 }} container spacing={2} p={2.5}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={2}>
                <h2>Please select your membership :</h2>
              </Grid>
            </Grid>
            <Grid key={12} item>
              <Card sx={{ maxWidth: 345 }} onClick={() => update("Service", "Basic ")}>
                <DoneIcon sx={{ minWidth: 200, fontSize: 80 }} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Basic
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid key={13} item>
              <Card sx={{ maxWidth: 345 }} onClick={() => update("Service", "Standard ")}>
                <StarIcon sx={{ minWidth: 200, fontSize: 80 }} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Standard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                      You can make combinations between genres and teachers.
                      You can extend the expiration date of your course.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid key={14} item>
              <Card sx={{ maxWidth: 345 }} onClick={() => update("Service", "Premium ")}>
                <DiamondIcon sx={{ minWidth: 200, fontSize: 80 }} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Premium
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    You have the standard benefits, additionally you have online accompaniment for your activities outside the classes and doubts that you can present about the area in which you are and finally you have invitations to events.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} item container justifyContent="center" >
            <Button
                  variant="contained"
                  onClick={()=> goBackPage()}
                  >                  
                    back
                  </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }


  export default StepSix;  