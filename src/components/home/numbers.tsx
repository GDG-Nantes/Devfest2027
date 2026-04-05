import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { MyComponent } from '@/types';
import { getTranslation } from '@/i18n/i18n';

export const DevfestNumbers: MyComponent = async ({ params }) => {
  const t = await getTranslation(params, 'pages.home.numbers');
  return (
    <Stack justifyContent={'center'}>
      <Grid
        container
        columnSpacing={1}
        rowSpacing={2}
        justifyContent='center'
        margin='20px 0'
      >
        <Number label={t('attendees')} value={3500} />
        <Number label={t('days')} value={2} />
        <Number label={t('sessions')} value={71} />
        <Number label={t('tracks')} value={4} />
        <Number label={t('speakers')} value={'90+'} />
      </Grid>
    </Stack>
  );
};

const Number: React.FC<{ label: string; value: number | string }> = ({
  label,
  value,
}) => {
  return (
    <Grid
      minWidth={100}
      size={{
        xs: 6,
        sm: 6,
        md: 4,
        lg: 2,
      }}
    >
      <Stack textAlign='center'>
        <Typography variant='h2' className={'no-leaf'} margin='10px 0'>
          {value}
        </Typography>
        <p>{label}</p>
      </Stack>
    </Grid>
  );
};
