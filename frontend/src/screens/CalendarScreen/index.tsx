import React, { useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import { EventsList } from '../../components/EventsList';
import { createStyles } from './styles';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootTabParamList } from '../../navigation/AppNavigator';

type CalendarScreenRouteProp = RouteProp<RootTabParamList, 'Календарь'>;

const CalendarScreen: React.FC = () => {
  const { getColor, isDark } = useThemeStyles();
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(formattedToday);
  const route = useRoute<CalendarScreenRouteProp>();
  const isCalendarVisible = route.params?.isCalendarVisible ?? true;
  const styles = createStyles(getColor);

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const calendarTheme = {
    backgroundColor: 'transparent',
    calendarBackground: 'transparent',
    textSectionTitleColor: isDark ? '#F7F7F7' : '#1E1E1F',
    selectedDayBackgroundColor: getColor('primary'),
    selectedDayTextColor: getColor('textOnPrimary'),
    todayTextColor: getColor('primary'),
    dayTextColor: isDark ? '#F7F7F7' : '#1E1E1F',
    textDisabledColor: isDark ? '#666666' : '#999999',
    dotColor: getColor('primary'),
    selectedDotColor: getColor('textOnPrimary'),
    arrowColor: isDark ? '#F7F7F7' : '#1E1E1F',
    monthTextColor: isDark ? '#F7F7F7' : '#1E1E1F',
    indicatorColor: isDark ? '#F7F7F7' : '#1E1E1F',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16,
    borderRadius: 24,
    overflow: 'hidden',
  };

  return (
    <View style={styles.container}>
      {isCalendarVisible && (
        <Calendar
          onDayPress={handleDayPress}
          locale="ru"
          theme={calendarTheme}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: getColor('primary'),
              selectedTextColor: getColor('textOnPrimary')
            }
          }}
        />
      )}
      <View style={styles.eventsContainer}>
        <EventsList
          filters={{
            categoryId: ['all'],
            date: formatDate(selectedDate),
          }}
        />
      </View>
    </View>
  );
};

export default CalendarScreen; 