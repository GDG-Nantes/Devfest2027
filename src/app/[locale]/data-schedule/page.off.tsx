import { getAllSessions } from '@/services/sessions';
import { getAllSpeakers } from '@/services/speakers';
import { PartialSpeaker } from '@/app/[locale]/schedule/common';
import { Box, Typography, Stack } from '@mui/material';
import SessionCard from './session-card';

export async function generateMetadata() {
  return {
    title: "Programme - DevFest Nantes 2027",
    description: "Découvrez le programme complet du DevFest Nantes 2027 avec toutes les conférences, quickies et codelabs."
  };
}

export default async function DataSchedulePage() {
  const [sessions, speakers] = await Promise.all([
    getAllSessions(),
    getAllSpeakers()
  ]);

  // Créer un map des speakers pour un accès rapide
  const speakersMap = speakers.reduce((acc, speaker) => {
    acc[speaker.key] = speaker;
    return acc;
  }, {} as Record<string, PartialSpeaker>);

  // Ordre des salles
  const roomOrder = [
    'Jules Verne',
    'Titan', 
    'Belem',
    'Tour Bretagne',
    'Les Machines',
    'Hangar',
    "L'Atelier",
    'Unconf'
  ];

  // Fonction pour obtenir l'index de la salle
  const getRoomIndex = (room: string) => {
    const index = roomOrder.indexOf(room);
    return index === -1 ? -100 : index; // Si la salle n'est pas trouvée, la mettre à la fin
  };

  // Filtrer les sessions qui ne sont pas des pauses/ouvertures et les trier par heure puis par salle
  const scheduledSessions = sessions
    .filter(session => session.slot.type !== 'break' && session.slot.type !== 'opening' && session.slot.type !== 'lunch')
    .sort((a, b) => {
      const timeComparison = a.slot.start.localeCompare(b.slot.start);
      if (timeComparison !== 0) return timeComparison;
      return getRoomIndex(a.room) - getRoomIndex(b.room);
    });

  // Group sessions by day based on slot key
  const day1Sessions = scheduledSessions.filter(session => session.slot.key.startsWith('day-1'));
  const day2Sessions = scheduledSessions.filter(session => session.slot.key.startsWith('day-2'));

  const groupedSessions = {
    'Jeudi': day1Sessions,
    'Vendredi': day2Sessions
  };

  return (
    <Box sx={{ bgcolor: '#000', color: 'white', minHeight: '100vh', p: 3 }}>
      {Object.entries(groupedSessions).map(([day, daySessions]) => (
        <Box key={day} sx={{ mb: 4 }}>
          <Typography variant="h2" sx={{ 
            color: 'white', 
            mb: 3, 
            fontWeight: 'bold',
            fontSize: '3rem'
          }}>
            {day}
          </Typography>

          <Stack spacing={2}>
            {daySessions.map((session) => {
              const sessionSpeakers = session.speakers.map(speakerKey => speakersMap[speakerKey]).filter(Boolean);

              return (
                <SessionCard
                  key={session.key}
                  session={session}
                  speakers={sessionSpeakers}
                />
              );
            })}
          </Stack>
        </Box>
      ))}
    </Box>
  );
}
