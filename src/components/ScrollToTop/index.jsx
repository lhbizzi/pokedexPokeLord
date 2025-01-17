import { Box, Fab } from '@mui/material';
import { SlArrowUp } from "react-icons/sl";

const ScrollToTop = () => {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', alignContent: 'center', bottom: 20, right: 20, zIndex: 9999 }}>
      <Fab color="primary" aria-label="add" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ backgroundColor: '#0e70b7' }}>
        <SlArrowUp />
      </Fab>
    </Box>
  );
}

export default ScrollToTop
