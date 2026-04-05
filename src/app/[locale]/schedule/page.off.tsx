import { CommonParams } from '@/types';
import { MyLink } from '@/components/commun/link';
import classNames from 'classnames';
import React from 'react';
import { Button, Stack } from '@mui/material';
import { getTranslation } from '@/i18n/i18n';
import Schedule from './component';
import { PrimarySection } from '@/components/commun/section/sectionType';

export async function generateMetadata({ params }: CommonParams) {
  const t = await getTranslation(params);
  return {
    title: t('pages.schedule.name'),
  };
}

export default async function SchedulePage({ params, day }: CommonParams<{ day?: 1 | 2 }>) {
  const t = await getTranslation(params, 'pages.schedule');

  day = day || 1;

  return (
    <>
    <Stack
        className="header-days"
        direction="row"
        spacing="20px"
        width="100%"
        marginTop={"20px"}
        justifyContent="center"
    >
        <MyLink href="/schedule/1">
            <Button
            variant="contained"
            color={"primary"}
            className={classNames(
                "button-schedule",
                "day1",
                day == 1 && "current"
            )}
            >
                {t("day1-number")}
            </Button>
        </MyLink>
        <MyLink href="/schedule/2">
            <Button
            variant="contained"
            color={"primary"}
            className={classNames(
                "button-schedule",
                "day2",
                day == 2 && "current"
            )}
            >
            {t("day2-number")}
            </Button>
        </MyLink>
        </Stack>
        <PrimarySection fullWidth={true} style={{marginTop: '20px'}}>
            <Schedule params={params} day={day || 1} />
        </PrimarySection>
    </>
  );

}
