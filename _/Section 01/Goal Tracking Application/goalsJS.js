let allGoals = new Array(); 
let selectedGoalIndex = 0;


$("document").ready(function(){
     init();    
});

let init = function(){
    getGoals();
}

let completeGoal = function(){
    closeDialog();
     allGoals[selectedGoalIndex].status = "complete";
     localStorage.setItem("goals", JSON.stringify(allGoals));
     getGoals();
}

let closeDialog=function(){
    $("#popupBasic").popup("close");
}

let getGoals = function(){
    let savedGoals = JSON.parse(localStorage.getItem("goals"));
    if(savedGoals != "" && savedGoals != null){
        allGoals = savedGoals;
        let output = "<ul data-role='listview' id='goalListView'>";
        output += "<li data-role='list-divider'>Incomplete Goals</li>";
        for(var x = 0; x < allGoals.length; x++){
        console.log(x);
        if(allGoals[x].status != "complete"){
            let goalText = parseGoal(allGoals[x]);
            let rawDate = allGoals[x].date;
            output = output +  "<li onclick='editGoal(" + x + ")'>" + goalText + "</li>";
        }
        }
        output += "<li data-role='list-divider'>Complete Goals</li>";
        for(var x= 0; x < allGoals.length; x++){
        if(allGoals[x].status == "complete"){
            let goalText = parseGoal(allGoals[x]);
            let rawDate = allGoals[x].date;
            output = output +  "<li><strike>" + goalText + "</strike></li>";
        }
        }

        output += "</ul>"
        console.log(output);
        $("#goalsList").html(output);
        $("#goalListView").listview().trigger("create");
    }
}

let editGoal = function(goalIndex){
    $("#popupBasic").popup("open");
    selectedGoalIndex = goalIndex;
}

let parseGoal = function(goalText) {
    console.log(goalText);
    let goalDate = new Date(goalText.date);
    let month = goalDate.getMonth();
    let day = goalDate.getDate();
    let year = goalDate.getFullYear();
    let text = goalText.goalText;
    let out = (month+1) + "/" + day + "/" + year +  "<br/>";
    out += "<h2>" + text + "</h2>";
    return out;
}

let saveGoal = function(){
    console.log("saveGoal()");
    let goalText = document.getElementById("goal").value;
    let theGoal = new Goal(Date.now(),goalText, "incomplete" );
    allGoals.push(theGoal);
    localStorage.setItem("goals", JSON.stringify(allGoals));
    getGoals();
    $("#goal").val("");
}

let newDay = function(){
    allGoals = [];
    localStorage.setItem("goals", JSON.stringify(allGoals));
    $("#goalListView").html("");

}

let btnGoalSave = $("#btnSave");
let btnNewDay = $("#btnNewDay");
$("#btnSave").bind("click", saveGoal);
$("#btnNewDay").bind("click", newDay);

