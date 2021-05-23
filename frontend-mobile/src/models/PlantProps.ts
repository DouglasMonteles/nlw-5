export default interface PlantProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [
    string,
  ],
  frequency: {
    times: number,
    repeat_every: RepeatProps,
  };
  dateTimeNotification: Date;
  hour: string;
}

enum RepeatProps {
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
}