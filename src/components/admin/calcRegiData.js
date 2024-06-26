function calcRegiData(usersList, usersTimestamps) {

    // get today's date
    const today = new Date();
    const todayYear = today.getFullYear() - 2000; // e.g. 24 for the year 2024
    const todayMonth = today.getMonth() + 1; // January is 0
    const todayDate = today.getDate() + 1; // 1-31 (we pretend it's tomorrow so that today's data is included in the chart, and timezones don't mess up the data)

    // first day of data collection
    const firstYear = 24; // 2024
    const firstMonth = 3;
    const firstDate = 29;

    let usersPerDayArray = []; // contains objects e.g: { label: "2023-10-09", ubd: 0 }
    let totalUserCount = 0;
    let totalAdmins = 0;
    let totalNonAdmins = 0;

    const mapDateToIndex = new Map();
    let indexTracker = 0;

    let startYear = firstYear;
    let startMonth = firstMonth;
    let startDate = firstDate;


    setupLoop:
    for (let year = startYear; year <= todayYear; year++) {
        for (let month = startMonth; month <= 12; month++) {
            for (let date = startDate; date <= 31; date++) {

                let dateString = year.toString() + "-" + ("0" + month.toString()).slice(-2) + "-" + ("0" + date.toString()).slice(-2);

                // indexTracker keeps track of which array item corresponds to which date
                mapDateToIndex.set(dateString, indexTracker);
                indexTracker++;
                usersPerDayArray.push({ label: dateString, dailyUserCount: 0, adminCount: 0, nonAdminCount: 0 });

                // stop loop once we reach today's date
                if (year === todayYear && month === todayMonth && date === todayDate) {
                    break setupLoop;
                }
            }
            startDate = 1;
        }
        startMonth = 1;
    }

    for (let i = 0; i < usersTimestamps.length; i++) {
        console.log("i: " + i);
        console.log("usersTimestamps[i]: " + usersTimestamps[i]);
        console.log("usersTimestamps.length " + usersTimestamps.length);
        
        let userYear = usersTimestamps[i].slice(2, 4);
        let userMonth = usersTimestamps[i].slice(5, 7);
        let userDate = usersTimestamps[i].slice(8, 10);
        let userIsAdmin = usersList[i].isAdmin;

        // FORMAT: MM & DD (always contain leading zeros)
        let dateString =
            userYear +
            "-" +
            ("0" + userMonth.toString()).slice(-2) + // add leading zero if needed, gets sliced out if unnecessary
            "-" +
            ("0" + userDate.toString()).slice(-2); // add leading zero if needed, gets sliced out if unnecessary

        // increment totalUserCount
        totalUserCount++;

        // increment dailyUserCount in the object located in usersPerDayArray at the index corresponding to the date
        console.log("dateString: ", dateString);
        console.log("mapDateToIndex.get(dateString): " + mapDateToIndex.get(dateString));
        console.log("usersPerDayArray[mapDateToIndex.get(dateString)]: "+ usersPerDayArray[mapDateToIndex.get(dateString)]);
        usersPerDayArray[mapDateToIndex.get(dateString)].dailyUserCount++;

        // count admins and count non-admins
        if (userIsAdmin) {
            totalAdmins++;
            usersPerDayArray[mapDateToIndex.get(dateString)].adminCount++;
        } else {
            totalNonAdmins++;
            usersPerDayArray[mapDateToIndex.get(dateString)].nonAdminCount++;
        }

    }

    console.log("finished calcRegiData-------------")
    return { usersPerDayArray, totalUserCount, totalAdmins, totalNonAdmins };
}

export default calcRegiData;