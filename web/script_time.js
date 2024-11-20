function loadDateAndTime(){
    const dateInput = document.getElementById('inpDate');

    var date = new Date();

    var currentDate;

    if (date.getDate() < 10){
        if (date.getMonth() < 10){
            currentDate = date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+date.getDate();
        }else{
            currentDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-0"+date.getDate();
        }
    }else{
        if (date.getMonth() < 10){
            currentDate = date.getFullYear()+"-0"+(date.getMonth()+1)+"-"+date.getDate();
        }else{
            currentDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        }
    }

    currentDate.replace("/", "-");

    dateInput.value = currentDate;

    //console.log(currentDate);

    const timeInput = document.getElementById('inpTime');

    var currentTime = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit', hour12: false});

    /*if (date.getMinutes() < 10){
        currentTime = date.getHours()+":0"+date.getMinutes()
    }else{
        currentTime = date.getHours()+":"+date.getMinutes()
    }*/

    timeInput.value = currentTime;

    //console.log(currentTime);
}

// updates the time every second
setInterval(loadDateAndTime, 1000);
