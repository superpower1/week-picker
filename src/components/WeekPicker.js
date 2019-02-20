import React, {Component} from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

function getWeekDays(weekStart) {
  const days = [weekStart];
  for (let i = 1; i < 7; i += 1) {
    days.push(
      moment(weekStart)
        .add(i, 'days')
        .toDate()
    );
  }
  return days;
}

function getWeekRange(date) {
  return {
    from: moment(date)
      .startOf('week')
      .toDate(),
    to: moment(date)
      .endOf('week')
      .toDate(),
  };
}

/*
* This function is to check if selected day is available for weekly insight
* User can only selet weeks before the current week
*/
function checkIfAvailable(date) {
  const startDateOfWeek = moment().startOf('week');
  return startDateOfWeek.diff(date, 'days')>0;
}

class WeekPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false,
      hoverRange: undefined,
      selectedDays: [],
    };
  }

  componentDidMount() {
    this.handleDayChange(moment().subtract(1, 'weeks'));
  }

  toggleCalendar = () => {
    this.setState({showCalendar: !this.state.showCalendar})
  }

  handleDayChange = date => {
    if (checkIfAvailable(date)) {
      this.setState({
        selectedDays: getWeekDays(getWeekRange(date).from),
      });
    }
  };

  handleDayEnter = date => {
    if (checkIfAvailable(date)) {
      this.setState({
        hoverRange: getWeekRange(date),
      });
    }
  };

  handleDayLeave = () => {
    this.setState({
      hoverRange: undefined,
    });
  };

  /*
  * This will fire when user click on week number (which is currently disabled)
  */
  handleWeekClick = (weekNumber, days, e) => {
    this.setState({
      selectedDays: days,
    });
  };

  render() {
    const { hoverRange, selectedDays } = this.state;

    const daysAreSelected = selectedDays.length > 0;

    const modifiers = {
      hoverRange,
      selectedRange: daysAreSelected && {
        from: selectedDays[0],
        to: selectedDays[6],
      },
      hoverRangeStart: hoverRange && hoverRange.from,
      hoverRangeEnd: hoverRange && hoverRange.to,
      selectedRangeStart: daysAreSelected && selectedDays[0],
      selectedRangeEnd: daysAreSelected && selectedDays[6],
    };

    return (
      <div>
        <div onClick={this.toggleCalendar}>
          {moment(selectedDays[0]).format('LL')} –{' '}
          {moment(selectedDays[6]).format('LL')}
        </div>
        {
          this.state.showCalendar &&
          <div className="week-picker animated fadeIn fadeOut">
            <DayPicker
              selectedDays={selectedDays}
              // showWeekNumbers
              showOutsideDays
              modifiers={modifiers}
              onDayClick={this.handleDayChange}
              onDayMouseEnter={this.handleDayEnter}
              onDayMouseLeave={this.handleDayLeave}
              onWeekClick={this.handleWeekClick}
              toMonth={new Date()}
            />
          </div>
        }
      </div>
    );
  }
}

export default WeekPicker;
