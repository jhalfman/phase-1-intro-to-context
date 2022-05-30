// Your code here
function createEmployeeRecord([first, last, title, pay]) {
    return {
        firstName: first,
        familyName: last,
        title: title,
        payPerHour: pay,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeData) {
    //[[first, last, title, pay], [first, last, title, pay], [first, last, title, pay]]
    const employeeList = [];
    employeeData.forEach(employee => {
        employeeList.push(createEmployeeRecord(employee));
    })
    return employeeList;
}

function createTimeInEvent(employeeRecord, date) {
    const dateStamp = {};
    const dateParse = date.split(" ");
    dateStamp.type = "TimeIn";
    dateStamp.hour = parseInt(dateParse[1]);
    dateStamp.date = dateParse[0];
    employeeRecord.timeInEvents.push(dateStamp);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, date) {
    const dateStamp = {};
    const dateParse = date.split(" ");
    dateStamp.type = "TimeOut";
    dateStamp.hour = parseInt(dateParse[1]);
    dateStamp.date = dateParse[0];
    employeeRecord.timeOutEvents.push(dateStamp);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    let clockIn = 0;
    let clockOut = 0;
    employeeRecord.timeInEvents.forEach(time => {
        if (date === time.date){
            clockIn = time.hour/100;
        }
    })
    employeeRecord.timeOutEvents.forEach(time => {
        if (date === time.date){
            clockOut = time.hour/100;
        }
    })
    return (clockOut - clockIn);
}

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    let allWages = 0;
    const dateRange = [];
    employeeRecord.timeInEvents.forEach(time => {
        dateRange.push(time.date)
    })
    dateRange.forEach(date => {
        allWages += wagesEarnedOnDate(employeeRecord, date);
    })
    return allWages;
}

function calculatePayroll(employeeRecordsArray) {
    let allEmployeeWages = 0;
    employeeRecordsArray.forEach(employee => {
       allEmployeeWages += allWagesFor(employee);
   })
    return allEmployeeWages;
    
}