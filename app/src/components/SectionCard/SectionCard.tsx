import { Button, Typography, Box, Chip, Card, CardContent, CardMedia, CardActionArea, CardActions } from '@mui/material';
import useNav from '@/hooks/useNav'

function SectionCard({ title, description, section_name }) {
  const { goTo } = useNav();

  const handle = () => {
    goTo(`/quiz?section_name=${section_name}&page=1`);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            { title }
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.main' }}>
            { description }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="contained" color="success" onClick={handle}>
          Take Exam
        </Button>
      </CardActions>
    </Card>
  );
}

export default SectionCard;
