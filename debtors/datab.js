const reg = new RegExp(/^[0-9]{13}$/);


const idRoutine = (message='Hmmm I dont think there are 13 numbers in the ID') => value => value && reg.test(value) ? undefined: message;
const idBirthDate = (message='This date in the id is wack!') => value => {
    let yearDigit = value.toString().substring(0, 2) === '00'?'20':'19';
    let year  = yearDigit.toString()+value.toString().substring(0, 2) , month = value.toString().substring(2, 4), day = value.toString().substring(4, 6);
    let fuDate = [year,month.toString(),day].join('-')
    let meBeADate = moment(fuDate, 'YYYY-M-DD', true);
    return meBeADate.isValid() ? undefined: message;
}

const idChecksum = (message='ID number not real - check digit is not valid') => values => {
    let checkSum = 0;
    let dimSum = 1, total = 0;
    for (var i = 0; i < 13; ++i) {
    // eslint-disable-next-line
        total = parseInt(values.toString().charAt(i)) * dimSum;
        if (total > 9) {
            total = parseInt(total.toString().charAt(0)) + parseInt(total.toString().charAt(1));
        }
        checkSum = checkSum + total
        dimSum = (dimSum % 2 === 0) ? 1 : 2;
    }

return (checkSum % 10) !== 0 ? message: undefined;
}
const genders = [
    { id: 'Male', text: 'male'},
    { id: 'Female', text: 'female'},
    { id: 'Other', text: 'other'}
];
const banktypes = [{text:'Savings',id:"1"}, {text:'Current', id:"2"}]

const freq = [{ id: 'weekly', text: 'Weekly' }, { id: 'monthly', text: 'Monthly' }, { id: 'fortnightly', text: 'Fortnightly' }];
const payments = [{ id: 'Last Monday', text: 'Last Monday' }, { id: 'Last Tuesday', text: 'Last Tuesday' }, { id: 'Last Wednesday', text: 'Last Wednesday' },
{ id: 'Last Thursday', text: 'Last Thursday' },
{ id: 'Last Friday', text: 'Last Friday' },
{ id: 'Last Working Day', text: 'Last Working Day' },
{ id: '2nd Last Working Day', text: '2nd Last Working Day' },
{ id: '2nd Last Tuesday', text: '2nd Last Tuesday' },
{ id: '2nd Last Wednesday', text: '2nd Last Wednesday' },
{ id: '2nd Last Thursday', text: '2nd Last Thursday' },
{ id: '2nd Last Friday', text: '2nd Last Friday' },
{ id: '4th Friday', text: '4th Friday' },
{ id: 'Temp', text: 'Temp' },
{ id: '1', text: '1' },
{ id: '2', text: '2' },
{ id: '3', text: '3' },
{ id: '4', text: '4' },
{ id: '5', text: '5' },
{ id: '6', text: '6' },
{ id: '7', text: '7' },
{ id: '8', text: '8' },
{ id: '9', text: '9' },
{ id: '10', text: '10' },
{ id: '11', text: '11' },
{ id: '12', text: '12' },
{ id: '13', text: '13' },
{ id: '14', text: '14' }, { id: '15', text: '15' }, { id: '16', text: '16' }, { id: '17', text: '17' }, { id: '18', text: '18' }, { id: '19', text: '19' }, { id: '20', text: '20' }, { id: '21', text: '21' }, { id: '22', text: '22' }, { id: '23', text: '23' }, { id: '24', text: '24' }, { id: '25', text: '25' }, { id: '26', text: '26' }, { id: '27', text: '27' }, { id: '28', text: '28' }, { id: '29', text: '29' }, { id: '30', text: '30' },
{ id: '31', text: '31' }];


const freqs = [{ id: 'weekly', text: 'Weekly' }, { id: 'monthly', text: 'Monthly' }, { id: 'fortnightly', text: 'Fortnightly' }];
const paymentss = [{ id: 'Last Monday', text: 'Last Monday' }, { id: 'Last Tuesday', text: 'Last Tuesday' }, { id: 'Last Wednesday', text: 'Last Wednesday' },
    { id: 'Last Thursday', text: 'Last Thursday' },
    { id: 'Last Friday', text: 'Last Friday' },
    { id: 'Last Working Day', text: 'Last Working Day' },
    { id: '2nd Last Working Day', text: '2nd Last Working Day' },
    { id: '2nd Last Tuesday', text: '2nd Last Tuesday' },
    { id: '2nd Last Wednesday', text: '2nd Last Wednesday' },
    { id: '2nd Last Thursday', text: '2nd Last Thursday' },
    { id: '2nd Last Friday', text: '2nd Last Friday' },
    { id: '4th Friday', text: '4th Friday' },
    { id: 'Temp', text: 'Temp' },
    { id: '1', text: '1' },
    { id: '2', text: '2' },
    { id: '3', text: '3' },
    { id: '4', text: '4' },
    { id: '5', text: '5' },
    { id: '6', text: '6' },
    { id: '7', text: '7' },
    { id: '8', text: '8' },
    { id: '9', text: '9' },
    { id: '10', text: '10' },
    { id: '11', text: '11' },
    { id: '12', text: '12' },
    { id: '13', text: '13' },
    { id: '14', text: '14' }, { id: '15', text: '15' }, { id: '16', text: '16' }, { id: '17', text: '17' }, { id: '18', text: '18' }, { id: '19', text: '19' }, { id: '20', text: '20' }, { id: '21', text: '21' }, { id: '22', text: '22' }, { id: '23', text: '23' }, { id: '24', text: '24' }, { id: '25', text: '25' }, { id: '26', text: '26' }, { id: '27', text: '27' }, { id: '28', text: '28' }, { id: '29', text: '29' }, { id: '30', text: '30' },
    { id: '31', text: '31' }];
var weeksCount = (year, month_number) => {
        var firstOfMonth = new Date(year, month_number - 1, 1);
        var day = firstOfMonth.getDay() || 6;
        day = day === 1 ? 0 : day;
        if (day) { day-- }
        var diff = 7 - day;
        var lastOfMonth = new Date(year, month_number, 0);
        var lastDate = lastOfMonth.getDate();
        if (lastOfMonth.getDay() === 1) {
            diff--;
        }
        var result = Math.ceil((lastDate - diff) / 7);
        return result + 1;
    };
var calcWeeksInMonth = (year, month) => {
    const weeks = [],
      firstDate = new Date(year, month-1, 1),
      lastDate = new Date(year, month, 0),
      numDays = lastDate.getDate();
// console.log(lastDate.toString(), numDays)
    let dayOfWeekCounter = firstDate.getDay();
  
    for (let date = 1; date <= numDays; date++) {
      if (dayOfWeekCounter === 0 || weeks.length === 0) {
        weeks.push([]);
      }
      weeks[weeks.length - 1].push(date);
      dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
    }
  
    return weeks
      .filter((w) => !!w.length)
      .map((w) => ({
        start: w[0],
        end: w[w.length - 1],
        dates: w,
        numberOfWeeks:w.length
      }));
  }
  

const sizes = ['X-Small', 'Small', 'Medium', 'Large', 'X-Large', '2X-Large'];
const convenientTimesToCall = [
    {id: 'Any Time', text: 'Any Time'},
    {id: '8am-12pm', text: '8am-12pm'},
    {id: '12pm - 6pm', text: '12pm - 6pm'}, 
    {id: 'After 6pm', text: 'After 6pm'}];
// TODO: 
/**
 * * @param {monthly} filter 
 01 = Last Monday of the month
02 = Last Tuesday of the month
03 = Last Wednesday of the month
04 = Last Thursday of the month
05 = Last Friday of the month
06 = Last Saturday of the month
07 = First Monday of the month
08 = First Tuesday of the month
09 = First Wednesday of the month
10 = First Thursday of the month
11 = First Friday of the month
12 = First Saturday of the month
13 = Last day of the month
14 = Second last day of the month
 * */
/**
 * 
 * @param {weekly} filter 
 * 01 = Monday (weekly only)
02 = Tuesday (weekly only)
03 = Wednesday (weekly only)
04 = Thursday (weekly only)
05 = Friday (weekly only)
06 = Saturday (weekly only)
07 = Sunday (weekly only)
08 = 2nd Monday
09 = 2nd Tuesday
10 = 2nd Wednesday
11 = 2nd Thursday
12 = 2nd Friday
13 = 2nd Saturday
14 = 2nd Sunday
 * @returns 
 */
/**
 * 
 * 0 = Weekly
1 = Every 2 weeks
2 = Monthly
3 = Once-off
4 = Monthly by rule
7 = Every 3 months (Quarterly)
8 = Every 6 months
9 = Every 12 months (Annually) 
 * @returns 
 */
const getPayFreq = (filter) => [{ id: "", freq: 'Monthly by rule', name: "select" },
    { id: 'Last Monday', collectionday: '01', freq: 'Monthly by rule', name: 'Last Monday', intconCode:4 },
    { id: 'Last Tuesday',  collectionday: '02', freq: 'Monthly by rule', name: 'Last Tuesday', intconCode:4 },
    { id: 'Last Wednesday',  collectionday: '03', freq: 'Monthly by rule', name: 'Last Wednesday', intconCode:4 },
    { id: 'Last Thursday',  collectionday: '04', freq: 'Monthly by rule', name: 'Last Thursday', intconCode:4 },
    { id: 'Last Friday',  collectionday: '05', freq: 'Monthly by rule', name: 'Last Friday', intconCode:4 },
    { id: 'Last Saturday',  collectionday: '06', freq: 'Monthly by rule', name: 'Last Saturday', intconCode:4 },
    { id: 'Last Working Day',  collectionday: '13', freq: 'Monthly by rule', name: 'Last Working Day', intconCode:4 },
    { id: '2nd Last Working Day',  collectionday: '14', freq: 'Monthly by rule', name: '2nd Last Working Day', intconCode:4 },
    
    { id: '1st Monday',  collectionday: '07', freq: 'Monthly by rule', name: '1st Monday', intconCode:4 },
    { id: '1st Tuesday',  collectionday: '08', freq: 'Monthly by rule', name: '1st Tuesday', intconCode:4 },
    { id: '1st Wednesday',  collectionday: '09', freq: 'Monthly by rule', name: '1st Wednesday', intconCode:4 },
    { id: '1st Thursday',  collectionday: '10', freq: 'Monthly by rule', name: '1st Thursday', intconCode:4 },
    { id: '1st Friday',  collectionday: '11', freq: 'Monthly by rule', name: '1st Friday', intconCode:4 },
    { id: '1st Saturday',  collectionday: '12', freq: 'Monthly by rule', name: '1st Saturday', intconCode:4 },
    
    { id: "", freq: 'Weekly', name: "select", intconCode: '0' },
    { id: 'Monday', freq: 'Weekly', name: 'Monday', intconCode: '0',collectionday: '01'  },
    { id: 'Tuesday', freq: 'Weekly', name: 'Tuesday', intconCode: '0',collectionday: '02'  },
    { id: 'Wednesday', freq: 'Weekly', name: 'Wednesday', intconCode: '0',collectionday: '03'  },
    { id: 'Thursday', freq: 'Weekly', name: 'Thursday', intconCode: '0',collectionday: '04' },
    { id: 'Friday', freq: 'Weekly', name: 'Friday', intconCode: '0',collectionday: '05'  },
    { id: 'Saturday', freq: 'Weekly', name: 'Saturday', intconCode: '0',collectionday: '06' },
    { id: 'Sunday', freq: 'Weekly', name: 'Sunday', intconCode: '0' ,collectionday: '07' },

    { id: "", freq: 'fortnightly', name: "select", intconCode: '0' },
    { id: '2nd Monday', freq: 'Fortnightly', name: '2nd Monday', intconCode: '1',collectionday: '01' },
    { id: '2nd Tuesday', freq: 'Fortnightly', name: '2nd Tuesday', intconCode: '1' ,collectionday: '02'},
    { id: '2nd Wednesday', freq: 'Fortnightly', name: '2nd Wednesday', intconCode: '1',collectionday: '03'  },
    { id: '2nd Thursday', freq: 'Fortnightly', name: '2nd Thursday', intconCode: '1',collectionday: '04' },
    { id: '2nd Friday', freq: 'Fortnightly', name: '2nd Friday', intconCode: '1',collectionday: '05' },
    { id: '2nd Sunday', freq: 'Fortnightly', name: '2nd Sunday', intconCode: '1',collectionday: '07' },
    { id: '2nd Saturday', freq: 'Fortnightly', name: '2nd Saturday', intconCode: '1',collectionday: '06' },
    { id: '1', freq: 'Monthly', name: '1', intconCode: '2',collectionday: '01' },
    { id: '2', freq: 'Monthly', name: '2', intconCode: '2',collectionday: '02' },
    { id: '3', freq: 'Monthly', name: '3', intconCode: '2',collectionday: '03' },
    { id: '4', freq: 'Monthly', name: '4', intconCode: '2',collectionday: '04' },
    { id: '5', freq: 'Monthly', name: '5', intconCode: '2',collectionday: '05' },
    { id: '6', freq: 'Monthly', name: '6', intconCode: '2',collectionday: '06' },
    { id: '7', freq: 'Monthly', name: '7', intconCode: '2',collectionday: '07' },
    { id: '8', freq: 'Monthly', name: '8', intconCode: '2',collectionday: '08' },
    { id: '9', freq: 'Monthly', name: '9', intconCode: '2',collectionday: '09' },
    { id: '10', freq: 'Monthly', name: '10', intconCode: '2',collectionday: '10' },
    { id: '11', freq: 'Monthly', name: '11', intconCode: '2',collectionday: '11' },
    { id: '12', freq: 'Monthly', name: '12', intconCode: '2',collectionday: '12' },
    { id: '13', freq: 'Monthly', name: '13', intconCode: '2',collectionday: '13' },
    { id: '14', freq: 'Monthly', name: '14', intconCode: '2',collectionday: '14' },
    { id: '15', freq: 'Monthly', name: '15', intconCode: '2',collectionday: '15' },
    { id: '16', freq: 'Monthly', name: '16', intconCode: '2',collectionday: '16' },
    { id: '17', freq: 'Monthly', name: '17', intconCode: '2',collectionday: '16' },
    { id: '18', freq: 'Monthly', name: '18', intconCode: '2',collectionday: '18' },
    { id: '19', freq: 'Monthly', name: '19', intconCode: '2',collectionday: '19' },
    { id: '20', freq: 'Monthly', name: '20', intconCode: '2',collectionday: '20' },
    { id: '21', freq: 'Monthly', name: '21', intconCode: '2',collectionday: '21' },
    { id: '22', freq: 'Monthly', name: '22', intconCode: '2',collectionday: '22' },
    { id: '23', freq: 'Monthly', name: '23', intconCode: '2',collectionday: '23' },
    { id: '24', freq: 'Monthly', name: '24', intconCode: '2',collectionday: '24' },
    { id: '25', freq: 'Monthly', name: '25', intconCode: '2',collectionday: '25' },
    { id: '26', freq: 'Monthly', name: '26', intconCode: '2',collectionday: '26' },
    { id: '27', freq: 'Monthly', name: '27', intconCode: '2', collectionday: '27'},
    { id: '28', freq: 'Monthly', name: '28', intconCode: '2', collectionday: '28'},
    { id: '29', freq: 'Monthly', name: '29', intconCode: '2', collectionday: '29' },
    { id: '30', freq: 'Monthly', name: '30', intconCode: '2', collectionday: '30'},
    { id: '31', freq: 'Monthly', name: '31', intconCode: '2', collectionday: '31'}].filter((a) => a.freq === filter);


        
const monthOptions = (filtOpts) => [
        { optValue: '1', optName: '1', freq: 24, optDisplay: 'Monthly' },
        { optValue: '2', optName: '2', freq: 24, optDisplay: 'Monthly' },
        { optValue: '3', optName: '3', freq: 24, optDisplay: 'Monthly' },
        { optValue: '4', optName: '4', freq: 24, optDisplay: 'Monthly' },
        { optValue: '5', optName: '5', freq: 24, optDisplay: 'Monthly' },
        { optValue: '6', optName: '6', freq: 24, optDisplay: 'Monthly' },
        { optValue: '7', optName: '7', freq: 24, optDisplay: 'Monthly' },
        { optValue: '8', optName: '8', freq: 24, optDisplay: 'Monthly' },
        { optValue: '9', optName: '9', freq: 24, optDisplay: 'Monthly' },
        { optValue: '10', optName: '10', freq: 24, optDisplay: 'Monthly' },
        { optValue: '11', optName: '11', freq: 24, optDisplay: 'Monthly' },
        { optValue: '12', optName: '12', freq: 24, optDisplay: 'Monthly' },
        { optValue: '13', optName: '13', freq: 24, optDisplay: 'Monthly' },
        { optValue: '14', optName: '14', freq: 24, optDisplay: 'Monthly' },
        { optValue: '15', optName: '15', freq: 24, optDisplay: 'Monthly' },
        { optValue: '16', optName: '16', freq: 24, optDisplay: 'Monthly' },
        { optValue: '17', optName: '17', freq: 24, optDisplay: 'Monthly' },
        { optValue: '18', optName: '18', freq: 24, optDisplay: 'Monthly' },
        { optValue: '19', optName: '19', freq: 24, optDisplay: 'Monthly' },
        { optValue: '20', optName: '20', freq: 24, optDisplay: 'Monthly' },
        { optValue: '21', optName: '21', freq: 24, optDisplay: 'Monthly' },
        { optValue: '22', optName: '22', freq: 24, optDisplay: 'Monthly' },
        { optValue: '23', optName: '23', freq: 24, optDisplay: 'Monthly' },
        { optValue: '24', optName: '24', freq: 24, optDisplay: 'Monthly' },
        { optValue: '25', optName: '25', freq: 24, optDisplay: 'Monthly' },
        { optValue: '26', optName: '26', freq: 24, optDisplay: 'Monthly' },
        { optValue: '27', optName: '27', freq: 24, optDisplay: 'Monthly' },
        { optValue: '28', optName: '28', freq: 24, optDisplay: 'Monthly' },
        { optValue: '29', optName: '29', freq: 24, optDisplay: 'Monthly' },
        { optValue: '30', optName: '30', freq: 24, optDisplay: 'Monthly' },
        { optValue: '31', optName: '31', freq: 24, optDisplay: 'Monthly' },
        { optValue: '01', optName: 'Last Mon', freq: 25, optDisplay: 'Monthly by rule' },
        { optValue: '02', optName: 'Last Tue', freq: 25, optDisplay: 'Monthly by rule' },
        { optValue: '03', optName: 'Last Wed', freq: 25, optDisplay: 'Monthly by rule' },
        { optValue: '04', optName: 'Last Thu', freq: 25, optDisplay: 'Monthly by rule' },
        { optValue: '05', optName: 'Last Fri', freq: 25, optDisplay: 'Monthly by rule' },
        { optValue: '06', optName: 'Last Sat', freq: 25, optDisplay: 'Monthly by rule' },
        { optValue: '07', optName: 'First Mon', freq: 25, optDisplay: 'Monthly by rule' },
        { optValue: '08', optName: 'First Tue', freq: 25, optDisplay: 'Monthly by rule' },
        { optValue: '09', optName: 'First Wed', freq: 25, optDisplay: 'Monthly by rule' },
        { optValue: '10', optName: 'First Thu', freq: 25, optDisplay: 'Monthly by rule' },
        { optValue: '11', optName: 'First Fri', freq: 25, optDisplay: 'Monthly by rule' },
        { optValue: '12', optName: 'First Sat', freq: 25, optDisplay: 'Monthly by rule' },
        { optValue: '01', optName: 'Monday', freq: 104, optDisplay: 'Weekly' },
        { optValue: '02', optName: 'Tuesday', freq: 104, optDisplay: 'Weekly' },
        { optValue: '03', optName: 'Wednesday', freq: 104, optDisplay: 'Weekly' },
        { optValue: '04', optName: 'Thursday', freq: 104, optDisplay: 'Weekly' },
        { optValue: '05', optName: 'Friday', freq: 104, optDisplay: 'Weekly' },
        { optValue: '06', optName: 'Saturday', freq: 104, optDisplay: 'Weekly' },
        { optValue: '07', optName: 'Sunday', freq: 104, optDisplay: 'Weekly' },
        { optValue: '14', optName: '2nd Last Day', freq: 24, optDisplay: 'Monthly' }].filter((ft) => ft.optDisplay === filtOpts)
    

const byRuleCalculation = (ruleName) => {
    // let _m2ndlast
    // const sumTo = (cv, fv) => {
    //     let icv = 0;
    //     if (cv > fv) {
    //         while (cv > fv) {
    //             icv++
    //             cv--
    //         }
    //     } else {
    //         while (cv < fv) {
    //             icv++
    //             cv++
    //         }
    //     }
    //     return icv
    // }
    // switch (ruleName) {
    //     case 'Last Monday':
    //     case 'Last Tuesday': 
    //     case 'Last Wednesday': 
    //     case 'Last Thursday': 
    //     case 'Last Friday':
    //     case 'Last Saturday':
    //     case '1st Monday':
    //     case '1st Tuesday':
    //     case '1st Wednesday':
    //     case '1st Thursday':
    //     case '1st Friday':
    //     case '1st Saturday': {
    //         return  dateCalcer(ruleName)
    //     }
    //     case 'Last Working Day': {
    //         let resuw = moment().endOf('month');
    //         const dayNumber = resuw.day()

    //         if (dayNumber === 6 || dayNumber === 0) {
    //             resuw.subtract(dayNumber === 0 ? 2 : 1, 'day');
    //         }
    //         _m2ndlast = moment(resuw.format('YYYY/MM/DD 00:00:ss'));
    //         break;
    //     }
    //     case '2nd Last Working Day': {
    //         let resuwx = moment().endOf('month');
    //         resuwx.subtract(2, 'day')
    //         if (resuwx.day() === 7) {
    //             resuwx.subtract(2, 'day')
    //         }
    //         if (resuwx.day === 6) {
    //             resuwx.subtract(1, 'day')
    //         }
    //         _m2ndlast = moment(resuwx.format('YYYY/MM/DD 00:00:ss'));
    //         break;
    //     }
    //     default: {return false;}

    // }
    
    // return _m2ndlast
}


const isHoliday = (dateString) => {
    //let properDate = dateString ? moment(dateString).format('YYYY-MM-DD'):  moment().format('YYYY-MM-DD')

    const theDays = {'2022-01-01' : 'New Years Day',
    '2022-03-21' : 'Human Rights Day',
    '2022-03-22' : 'Public holiday **',
    '2022-04-02' : 'Good Friday *',
    '2022-04-05' : 'Family Day',
    '2022-04-27' : 'Freedom Day',
    '2022-05-01' : 'Workers Day',
    '2022-06-16' : 'Youth Day',
    '2022-08-09' : 'National Women’s Day',
    '2022-09-24' : 'Heritage Day',
    '2022-12-16' : 'Day of Reconciliation',
    '2022-12-25' : 'Christmas Day',
    '2022-12-26' : 'Day of Goodwill',
    '2022-12-27' : 'Public holiday'}

    return  !!theDays[dateString]

}
const getWorkDay = (aDate, holiday=false) => {
    
    let workDay = aDate;

    //let lx = DateTime.fromISO(aDate)
    const dd = new Date(aDate); //moment(aDate).day();
    const dayAsNumber = dd.getDay();
   
    if (dayAsNumber === 0 ) {
        //workDay = lx.minus({ days: 2 })
        dd.setDate(ndd.getDate()-2);
        let m = ndd.getMonth()+1;
        m = m.toString().length === 1 ? '0'+m:m;
        workDay = `${dd.getFullYear()+'-'+m+'-'+dd.getDate()}`; 
    }
    if (dayAsNumber === 6 ) {
        //workDay = lx.minus({ days: 1 }); //  should go back 16
        dd.setDate(ndd.getDate()-1);
        let m = ndd.getMonth()+1;
        m = m.toString().length === 1 ? '0'+m:m;
        workDay = `${dd.getFullYear()+'-'+m+'-'+dd.getDate()}`; 
    }
    if (dayAsNumber !== 0 || dayAsNumber !== 6 && holiday === true) {
        //workDay = lx.minus({ days: 1 })
        dd.setDate(ndd.getDate()-1);
        let m = ndd.getMonth()+1;
        m = m.toString().length === 1 ? '0'+m:m;
        workDay = `${dd.getFullYear()+'-'+m+'-'+dd.getDate()}`; 
    }
    
    let workingDay = isHoliday(workDay) === true ? getWorkDay(workDay): workDay
    console.log(workingDay,'getWorkDay',workDay)
    //let {year, month, day} = workingDay.c;
    return new Date(workDay); //year,month,day);
}
/**
 * 
 * @param {*} aPaydayObj freq: monthly id: 11
 * @param {*} date 
 * @returns 
 */
function dateParser(aPaydayObj, date){
    let paydayObj = aPaydayObj || {};
    let todaysDate = date ? new Date(date) : new Date();

    let defaultDay = todaysDate;
    let dayNumber = { "Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6 };
    // let fortNumber = { "2nd Sunday": 0, "2nd Monday": 1, "2nd Tuesday": 2, "2nd Wednesday": 3, "2nd Thursday": 4, "Friday": 5, "2nd Saturday": 6 };
    if (paydayObj.freq === 'Monthly' || paydayObj.freq === 'monthly') {
        //+ 2  one  to compensate  for the month im in plus business
        // logic  requiring  that monthly will mean beginning of next pay cycle
        const d = parseInt(paydayObj.name);
        let m = todaysDate.getMonth()+1;
        let md = todaysDate.getDate();
        // selecting the current day a past date in this month
        if (md === d || d < md) {
            m = todaysDate.getMonth()+2  
        }
        let y =todaysDate.getFullYear();
        if(m > 12){
            m = m - 12;
            y++;
        }
        m = m.toString().length === 1 ?  '0'+m:m;
        
        let dd = `${y+'-'+m+'-'+d}`;
        let ndd = new Date(dd);

        //let newMonth = moment.utc(dd.toString()).format()
        //console.log('Moment:::: ', newMonth, dd);
        const weekValue = ndd.getDay(); //moment(newMonth).day();
 
        if (weekValue === 0) {
            //newMonth = moment(newMonth).subtract(2, 'days')
            ndd.setDate(ndd.getDate()-2);
        }
        if (weekValue === 6) {
            //newMonth = moment(newMonth).subtract(1, 'days')
            ndd.setDate(ndd.getDate()-1);
        }
        m = ndd.getMonth()+1;
        m = m.toString().length === 1 ? '0'+m:m;
        let newMonth = `${ndd.getFullYear()+'-'+m+'-'+ndd.getDate()}`;
        let newMonthret;
        if (isHoliday(newMonth)) {
            // so you are a holiday and you're not a weekend
            newMonthret = getWorkDay(newMonth);

        }else{newMonthret = new Date(newMonth);}
        return newMonthret;//._isAMomentObject? newMonth.toISOString(true) : moment(newMonth).toISOString(true);

        //paydayObj.name
    }
    // if (paydayObj.freq === 'Monthly by rule') {

    //     //console.log(y, m,d)
    //     let newDay = byRuleCalculation(paydayObj.name)
    //     if (isHoliday(newDay)) {
    //         // so you are a holiday and you're not a weekend
    //        // newDay = getWorkDay(newDay, true);
    //     }

    //     return newDay
    // }
    // if (paydayObj.freq === 'Weekly' || paydayObj.freq === 'weekly') {
    //     // paydayObj.name
    //     // current day + a week from current day pushed to the day selected so the 
    //     // following paydayObj.Name
    //     const  todaysDate = moment();
    //     const m = todaysDate.get('month') + 1;
    //     const y = todaysDate.get('year');
    //     const d = dayNumber[paydayObj.name];
    //     let addDays = 7
    //     if (d > moment().day()) {
    //         addDays = d - moment().day();
    //     } else {
    //         if (d === moment().day()) {
    //             let  sevenDays = moment().add(addDays, 'days');
    //             return sevenDays
    //         } else {
    //             addDays = addDays+1
    //         }
    //     }
    //     const aWeekFrom = moment().add(addDays, 'days');
    //     const isoDate = aWeekFrom.format('YYYY-MM-DD');
    //     if (isHoliday(isoDate)) {
    //         // so you are a holiday and you're not a weekend
    //        return getWorkDay(isoDate, true);
    //     }
    //     //console.log('A Week From::::: ', aWeekFrom);
    //     return aWeekFrom._isAMomentObject? aWeekFrom.toISOString(true) : moment(aWeekFrom).toISOString(true);
    // }
    // if (paydayObj.freq === 'Fortnightly' || paydayObj.freq === 'fortnightly') {
    //     let addDays = 14;
    //     const d = dayNumber[paydayObj.name.split('2nd ')[1]];

    //     if (d > moment().day()) {
    //         addDays = d - moment().day()+7;
    //     } else {
    //         if (d === moment().day()) {
    //             let  sevenDays = moment().add(addDays, 'days');
    //             return sevenDays;
    //         } else {
    //             addDays = addDays+8;
    //         }
    //     }
    //     const aWeekFrom = moment().add(addDays, 'days');

    //     return aWeekFrom._isAMomentObject? aWeekFrom.toISOString(true) : moment(aWeekFrom).toISOString(true); //aWeekFrom;
    // }
}
const dateCalcerOld = (w, dayOfWeek) => {
    // var date = new Date();
    // var month_week = w || 3;	// 2nd Week
    // var week_day = dayOfWeek || 5;	// Thursday

    // var first_week = moment(date).startOf("month").day(week_day);
    // return first_week.add(7 * (month_week - 1), "days");
}
const dateCalcer = (str, monthFromCurrentMonth) => {
   
//     const reg = /^\dnd|\drd|\dst|last|Last|Thursday|Friday|Monday|Tuesday|Wednesday|Sunday|Saturday?/gmi
//     let dayNumber = { "Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6 };
//     let calculateUsing = monthFromCurrentMonth || moment();
    
//     let ser = str.match(reg);

//     console.log(ser,'dateCalcer dateCalcer', dayNumber[ser[1]])

//     let numberFromDay = 1
//     if (ser.length === 2) {
//         numberFromDay = dayNumber[ser[1]]
//     }
//     if (ser.length === 3) {
//         numberFromDay = dayNumber[ser[2]]
//     }
   
//     let wObject = {};
//     let yearMonth = calculateUsing.format('YYYY-M-DD').split('-')
//     console.log(calculateUsing.toString(),'calculateUsing3',yearMonth)

//     const weeksInMonth = weeksCount(yearMonth[0],yearMonth[1]);
//     const getWeekObject = (aWeeksInMonth) => {
//         if (aWeeksInMonth === 6) {
//             return {
//                 '1st':1,
//                 '2nd':2,
//                 '3rd':3, 
//                 '3rd last':3,
//                 '2nd last':4,
//                 'last':5
//             };
//         }
//         if (aWeeksInMonth === 5) {
//            return {
//                 '1st': 1,
//                 '2nd': 2,
//                 '3rd last': 2,
//                 '3rd': 3,
//                 '2nd last': 3,
//                 'last': 4
//             };
//         }
//     }
    

//     var month_week = getWeekObject(weeksInMonth)[ser[0].toLowerCase()] //||3;	// 2nd Week
//   console.log(month_week,'aWeeksInMonth',weeksInMonth)
//     var week_day = numberFromDay; //||5;	// Thursday
//     let first_week = calculateUsing.startOf("month").day(week_day);

//     let selectedDay = first_week.add(7 * (month_week ), "days")
    
//     let todaysDate = moment();

//     let diffs = selectedDay.diff(todaysDate, 'days')

    
//     if (diffs < 0 ) {
        
//         let aMonthAhead  =  moment().add(1,'month');
//         let startOfMonth = moment().add(1,'month').startOf('month')
//         let mParts = aMonthAhead.format('YYYY-MM-DD').split('-');
//         const mweeksInMonth = calcWeeksInMonth(mParts[0],mParts[1]);
//         let mmonth_week = getWeekObject(mweeksInMonth)[ser[0].toLowerCase()]
//         if (diffs === -1) {
//             // a day after 
//             mmonth_week = mmonth_week -1
//             console.log(startOfMonth, 'slowly cai')
//         }
//         let nfirst_week =  startOfMonth.day(week_day);
//         console.log(nfirst_week.toString(),'calculateUsing',mmonth_week)
//         return nfirst_week.add(7 * (mmonth_week), "days")
    
//     } else {
//         return selectedDay
//     }
}
const dateOfWeekCalculator  = (sDay) => {

    return sDay
}
const canDebitOrder = (date, a) => {
    // /*current day + 1*/
    // let aNewDate =moment.utc().add(7, 'days').format();

    // let canyou = moment(date).format() > moment().format() ? moment(date).format() : dateParser(a, aNewDate );
    // console.log(canyou,'canu', date, aNewDate, a)
    // return canyou
}
const datafrequency = [{id:'noselection', name:'Make selection'},{ id: 'Weekly', name: 'Weekly' }, { id: 'Monthly', name: 'Monthly' }, { id: 'Monthly by rule', name: 'Monthly by rule' }, { id: 'Fortnightly', name: 'Fortnightly' }];
module.exports ={
    idRoutine,
    idBirthDate,
    idChecksum,
    getPayFreq,
    dateParser
};