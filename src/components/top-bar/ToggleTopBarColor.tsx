import { PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';

interface ToggleColorModeProps {
   mode: PaletteMode;
   toggleColorMode: () => void;
}

export default function ToggleTopBarColor({ mode, toggleColorMode }: ToggleColorModeProps) {
   return (
      <Box sx={{ maxWidth: '32px' }}>
         <Button
            variant='text'
            onClick={toggleColorMode}
            size='small'
            aria-label='button to toggle theme'
            sx={{ minWidth: '32px', height: '32px', p: '4px' }}
         >
            {mode === 'dark' ? <WbSunnyRoundedIcon fontSize='small' /> : <ModeNightRoundedIcon fontSize='small' />}
         </Button>
      </Box>
   );
}
