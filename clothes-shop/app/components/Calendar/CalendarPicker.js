/* eslint-disable no-plusplus */
import React, {useState, useEffect} from 'react';
import T from 'prop-types';
import {Calendar} from 'react-native-calendars';
import XDate from 'xdate';

const CalendarPicker = ({
  onSuccess,
  theme,
  initialRange,
  employedDate = [],
  disablePicker,
  ...props
}) => {
  const [isFromDatePicked, setFromDatePicked] = useState(false);
  const [isToDatePicked, setToDatePicked] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [fromDate, setFromDate] = useState({});
  const [formatedEmployedDates, setFormatedEmployedDates] = useState({});
  const [markingType, setMarkingType] = useState();

  useEffect(() => {
    setupInitialRange();
  }, [setupInitialRange]);

  useEffect(() => {
    setFormatedEmployedDates(convertFromArrayToObject(employedDate));
  }, [convertFromArrayToObject, employedDate]);

  function convertFromArrayToObject(arr) {
    const reducer = (accumulator, currentValue) => {
      return {
        ...accumulator,
        [currentValue]: {
          disabled: true,
          disableTouchEvent: true,
          textColor: theme.employedDayTextColor,
        },
      };
    };

    return arr.reduce(reducer, {});
  }

  function onDayPress(day) {
    if (
      formatedEmployedDates[day.dateString] ||
      disablePicker ||
      fromDate === day.dateString
    ) {
      return;
    }

    if (!isFromDatePicked || (isFromDatePicked && isToDatePicked)) {
      setupSingleMarker(day);
    } else if (!isToDatePicked) {
      setMarkingType('period');

      const newMarkedDates = markedDates;
      newMarkedDates[fromDate] = {
        startingDay: true,
        color: theme.markColor,
        textColor: theme.markTextColor,
      };

      setMarkedDates(newMarkedDates);
      const markedDates_ = {...markedDates};
      const [
        mMarkedDates,
        range,
        previousMarkedDate,
        isBreakingRange,
      ] = setupMarkedDates(fromDate, day.dateString, markedDates_);

      if (range >= 0) {
        setFromDatePicked(true);
        setToDatePicked(true);
        setMarkedDates(mMarkedDates);

        const toDate = isBreakingRange ? previousMarkedDate : day.dateString;

        if (!toDate) {
          return;
        }

        const diffDays = new XDate(fromDate).diffDays(toDate);

        onSuccess(fromDate, toDate, diffDays + 1);
      } else {
        setupSingleMarker(day);
      }
    }
  }

  function setupSingleMarker(day, forceSetup) {
    if (markedDates[day.dateString] && !forceSetup) {
      return;
    }
    setMarkingType(undefined);
    const startMarkerDate = {
      [day.dateString]: {
        selected: true,
        color: theme.markColor,
        textColor: theme.markTextColor,
        selectedColor: theme.markColor,
      },
    };

    setFromDatePicked(true);
    setToDatePicked(false);
    setFromDate(day.dateString);
    setMarkedDates(startMarkerDate);
    onSuccess(day.dateString, day.dateString, 1);
  }

  function setupStartMarker(day) { // eslint-disable-line
    setMarkingType('period');
    const startMarkerDate = {
      [day.dateString]: {
        startingDay: true,
        color: theme.markColor,
        textColor: theme.markTextColor,
      },
    };

    setFromDatePicked(true);
    setToDatePicked(false);
    setFromDate(day.dateString);
    setMarkedDates(startMarkerDate);
  }

  function setupMarkedDates(fromDate_, toDate_, markedDates_) {
    const mFromDate = new XDate(fromDate_);
    const mToDate = new XDate(toDate_);
    const range = mFromDate.diffDays(mToDate);
    let previousMarkedDate;
    let isBreakingRange = false;

    if (range >= 0) {
      if (range === 0) {
        markedDates_ = {
          [toDate_]: {
            color: theme.markColor,
            textColor: theme.markTextColor,
          },
        };
      } else {
        for (let i = 1; i <= range; i++) {
          const tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd');

          if (formatedEmployedDates[tempDate]) {
            markedDates_[previousMarkedDate] = {
              endingDay: true,
              color: theme.markColor,
              textColor: theme.markTextColor,
            };

            isBreakingRange = true;

            break;
          }

          previousMarkedDate = tempDate;

          if (i < range) {
            markedDates_[tempDate] = {
              color: theme.markColor,
              textColor: theme.markTextColor,
            };
          } else {
            markedDates_[tempDate] = {
              endingDay: true,
              color: theme.markColor,
              textColor: theme.markTextColor,
            };
          }
        }
      }
    }

    return [markedDates_, range, previousMarkedDate, isBreakingRange];
  }

  function setupInitialRange() {
    if (!initialRange) {
      return;
    }
    const [initialFormDate, initialToDate] = initialRange;
    const initialMarkedDates = {
      [initialFormDate]: {
        startingDay: true,
        color: theme.markColor,
        textColor: theme.markTextColor,
      },
    };

    const [mMarkedDates] = setupMarkedDates(
      initialFormDate,
      initialToDate,
      initialMarkedDates,
    );

    setMarkedDates(mMarkedDates);
    setFromDate(initialFormDate);
  }

  return (
    <Calendar
      {...props}
      theme={theme}
      markingType={markingType}
      current={fromDate}
      markedDates={{...markedDates, ...formatedEmployedDates}}
      onDayPress={day => onDayPress(day)}
    />
  );
};

CalendarPicker.propTypes = {
  theme: T.object,
  initialRange: T.array,
  onSuccess: T.func,
  employedDate: T.array,
  disablePicker: T.bool,
};

export default CalendarPicker;
