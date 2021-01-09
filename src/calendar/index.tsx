import { ReactNode, useCallback, useMemo, useState } from "react";
import "./styles.css";

const Calendar = () => {
  type monthInfoType = {
    order: number;
    name: string;
    genetive: string;
    daysPerMounth: (leap?: number) => number;
  };

  type monthAndYearType = {
    month: number;
    year: number;
  };
  const dateNow = new Date();
  const [date, setDate] = useState<monthAndYearType>({
    month: dateNow.getMonth(),
    year: dateNow.getFullYear(),
  });

  const monthYear = new Date(date.year, date.month);

  const getMonthInfo = useMemo(
    () => (order: number): monthInfoType => {
      switch (order) {
        case 0:
          return {
            order: 0,
            name: "Январь",
            genetive: "Января",
            daysPerMounth: () => 31,
          };
        case 1:
          return {
            order: 1,
            name: "Февраль",
            genetive: "Февраля",
            daysPerMounth: (leap) => (leap ? 29 : 28),
          };
        case 2:
          return {
            order: 2,
            name: "Март",
            genetive: "Марта",
            daysPerMounth: () => 31,
          };
        case 3:
          return {
            order: 3,
            name: "Апрель",
            genetive: "Апреля",
            daysPerMounth: () => 30,
          };
        case 4:
          return {
            order: 4,
            name: "Май",
            genetive: "Мая",
            daysPerMounth: () => 31,
          };
        case 5:
          return {
            order: 5,
            name: "Июнь",
            genetive: "Июня",
            daysPerMounth: () => 30,
          };
        case 6:
          return {
            order: 6,
            name: "Июль",
            genetive: "Июля",
            daysPerMounth: () => 31,
          };
        case 7:
          return {
            order: 7,
            name: "Август",
            genetive: "Августа",
            daysPerMounth: () => 31,
          };
        case 8:
          return {
            order: 8,
            name: "Сентябрь",
            genetive: "Сентября",
            daysPerMounth: () => 30,
          };
        case 9:
          return {
            order: 9,
            name: "Октябрь",
            genetive: "Октября",
            daysPerMounth: () => 31,
          };
        case 10:
          return {
            order: 10,
            name: "Ноябрь",
            genetive: "Ноября",
            daysPerMounth: () => 30,
          };
        case 11:
          return {
            order: 11,
            name: "Декабрь",
            genetive: "Декабря",
            daysPerMounth: () => 31,
          };
        default:
          return {
            order: 0,
            name: "Январь",
            genetive: "Января",
            daysPerMounth: () => 31,
          };
      }
    },
    [date]
  );

  const monthMinus = useCallback(() => {
    setDate({
      month:
        getMonthInfo(date.month).order - 1 < 0
          ? 11
          : getMonthInfo(date.month).order - 1,
      year: getMonthInfo(date.month).order - 1 < 0 ? date.year - 1 : date.year,
    });
  }, [date]);

  const monthPlus = useCallback(() => {
    setDate({
      month:
        getMonthInfo(date.month).order + 1 > 11
          ? 0
          : getMonthInfo(date.month).order + 1,
      year: getMonthInfo(date.month).order + 1 > 11 ? date.year + 1 : date.year,
    });
  }, [date]);

  const getDay = useCallback(
    (date: Date): number => {
      let day = date.getDay();
      if (day == 0) day = 7;
      return day - 1;
    },
    [date]
  );
  const calendarGrid = (days: number): ReactNode => {
    const res: Array<number[]> = [];
    let week: number[] = [];
    let dayOfTheWeek = 0;

    let currentDay = 1;
    const dayFromCurrentMonthStarted = getDay(monthYear);
    const prevMonth =
      getMonthInfo(date.month).order - 1 < 0
        ? 11
        : getMonthInfo(date.month).order - 1;
    let monthStarted = getDay(monthYear) > 0 ? false : true;

    const prevMonthDayCount = getMonthInfo(prevMonth).daysPerMounth();
    let dayOfPrevMounth =
      dayFromCurrentMonthStarted > 0
        ? prevMonthDayCount - dayFromCurrentMonthStarted
        : 0;

    while (days > -1) {
      if (dayOfTheWeek < 7) {
        if (days === 0) {
          res.push([...week]);
        }
        if (monthStarted) {
          dayOfTheWeek++;
          days--;
          week.push(currentDay);
          currentDay++;
        } else {
          if (dayOfPrevMounth < prevMonthDayCount) {
            dayOfTheWeek++;
            week.push(dayOfPrevMounth);
            dayOfPrevMounth++;
          } else {
            monthStarted = true;
          }
        }
      } else {
        res.push([...week]);
        week = [];
        dayOfTheWeek = 0;
      }
    }

    return (
      <>
        {res.map((week) => (
          <tr>
            {week.map((el) => (
              <td>{el}</td>
            ))}
          </tr>
        ))}
      </>
    );
  };

  return (
    <div className="calendarWrapper">
      <div className="dateSwitcher">
        <div onClick={monthMinus}>
          <button>-</button>
        </div>
        <div>
          <pre>
            {getMonthInfo(date.month).name} {date.year}
          </pre>
        </div>
        <div>
          <button onClick={monthPlus}>+</button>
        </div>
      </div>
      <table>
        <tr>
          <th>пн</th>
          <th>вт</th>
          <th>ср</th>
          <th>чт</th>
          <th>пт</th>
          <th>сб</th>
          <th>вс</th>
        </tr>
        {calendarGrid(getMonthInfo(date.month).daysPerMounth(date.year))}
      </table>
    </div>
  );
};

export default Calendar;
