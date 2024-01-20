import { Grid,Card,CardContent,Box ,Typography,Button} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddTaskIcon from '@mui/icons-material/AddTask';
const AddPeriodCard = (props) => {
    // const handleEditButton=()=>{

    // }
  return (
    <Grid>
      <Card sx={{ width: "100%", background: "white" }}>
        <CardContent>
          <Grid
            container
            fullWidth
            mb={1}
            style={{ justifyContent: "space-between" }}
          >
            <Grid item sx={2}>
              <Box
                sx={{
                  background: "#f1eeff",
                  textTransform: "capitalize",
                  border: "2px solid #6558d3",
                  borderRadius: 1,
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  padding: "0.5em 0.75em",
                  lineHeight: 1,
                }}
              >
                <Typography
                  variant="h7"
                  color="#6558d3"
                  style={{ cursor: "pointer" }}
                  >
                  ADD Period
                </Typography>
              </Box>
            </Grid>
            
          </Grid>
          <Grid container
            fullWidth
            mb={1}
            style={{ justifyContent: "space-between" ,height:'auto',alignItems:'center'}}
          >
            <Button fullWidth variant="outlined">
                <AddTaskIcon style={{color:'lightgreen',fontSize:'3rem'}}/>
            </Button>
          </Grid>
        
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AddPeriodCard;