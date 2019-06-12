function get_program() {
	// Returns whether user selected "beginner" or "advanced" programs
	// Arguments: none
	// Returns: string "beginner" or "advanced" based on selection

	if (document.getElementById('beginner').checked) {
		return "beginner";
	} else if (document.getElementById('advanced').checked) {
		return "advanced";
	}
}

function get_date() {
	// Returns the date of goal race entered by user in mm/dd/yyyy format
	// Arguments: none
	// Returns: race_date (string): date of goal race

	var race_date = document.getElementById('race_date').value;
	return race_date;
}

function get_race_distance() {
	// Returns the race date selected by the user
	// Arguments: none
	// Returns: string "5k", "10k", "half marathon", or "marathon" based on user selection

	if (document.getElementById('5k').checked) {
		return "5k";
	} else if (document.getElementById('10k').checked) {
		return "10k";
	} else if (document.getElementById('half_marathon').checked) {
		return "half marathon"
	} else if (document.getElementById('marathon').checked) {
		return "marathon"
	}
}

function get_days() {
	// Returns days of the week the user selected to train in an array
	// Arguments: none
	// Returns: day_list(array): an array with the names of the days of the week the user wants to train on

	var day_list = []; // initialize array
	if (document.getElementById('Mon').checked) {
		day_list.push("Monday");
	} 
	if (document.getElementById('Tues').checked) {
		day_list.push("Tuesday");
	} 
	if (document.getElementById('Wed').checked) {
		day_list.push("Wednesday");
	} 
	if (document.getElementById('Thur').checked) {
		day_list.push("Thursday");
	} 
	if (document.getElementById('Fri').checked) {
		day_list.push("Friday");
	}
	if (document.getElementById('Sat').checked) {
		day_list.push("Saturday");
	}
	if (document.getElementById('Sun').checked) {
		day_list.push("Sunday");
	}
	return day_list;
}

function get_age() {
	// Returns the age entered by the user. Only collected if "advanced" program selected.
	// Arguments: none
	// Returns: age (number): age of user

	var age = document.getElementById('age').value;
	return age;
}

function get_mileage() {
	// Returns the current weekly mileage entered by the user. Only collected if "advanced" program selected.
	// Arguments: none
	// Returns: mileage (number): current weekly mileage

	var mileage = document.getElementById('mileage').value;
	return mileage;
}

function get_pr() {
	// Returns the personal best race distance and time entered by the user. Only collected if "advanced" program selected.
	// Arguments: none
	// Returns: pr_list (array): an array with race distance and race time

	var pr_list = []; // initialize array
	if (document.getElementById('pr_5k').checked) {
		pr_list.push("5k");
	} 
	if (document.getElementById('pr_10k').checked) {
		pr_list.push("10k");
	} 
	if (document.getElementById('pr_half_marathon').checked) {
		pr_list.push("half marathon");
	} 
	if (document.getElementById('pr_marathon').checked) {
		pr_list.push("marathon");
	} 
	var pr_time = document.getElementById('pr_time').value;
	pr_list.push(pr_time);
	return pr_list;
}

function get_sunday(date) {
	// Finds the date of the first Sunday after the current date.
	// Arguments: date (date object): current date
	// Returns: sunday_date (date object): date of next Sunday after current date

	var is_it_sunday = false; 
	var sunday_date = new Date(date);
	while (is_it_sunday == false) {
  		if (sunday_date.getDay() == "0") { // checks to see if day of week is Sunday(0)
  			is_it_sunday = true;
  		} else {
  			sunday_date.setDate(sunday_date.getDate() + 1); // iterates through dates until the next Sunday
  		}
  	}
  	return sunday_date; 
}

function get_weekly_mileage(mileage, weeks_until_race, week_counter) {
	// Determines the total weekly mileage to be run. Weekly mileage increases two weeks at a time by 10%.
	// Weekly mileage decreases every third week by 5%. Weekly mileage decreases by 20% for the final 
	// two weeks before the event as a taper.
	// Arguments: mileage (number): starting mileage or mileage currently run
	//			  weeks_until_race (number): how many weeks until the race?
	//			  week_counter (number): how many weeks into the program?
	// Returns: new_mileage (number): mileage to be run the following week

	weeks_until_race = parseInt(weeks_until_race);
	if (weeks_until_race < 3) { // taper weekly mileage by 20% in final two weeks before race
		var new_mileage = mileage - (mileage * 0.2);
	} else if (weeks_until_race > 2 && week_counter % 3 == 0) { // decrease mileage by 5% every third week
		var new_mileage = mileage - (mileage * 0.05);
	} else if (weeks_until_race > 2 && week_counter % 3 != 0) { // increase weekly mileage by 10% two weeks at a time
		var new_mileage = mileage + (mileage * 0.1);
	}
	if (document.getElementById("race_distance").innerHTML == "5k" && document.getElementById("which_program").innerHTML == "beginner" && new_mileage > 30) { // weekly mileage capped for beginner program at 30 miles for 5k
		var new_mileage = 30;
	}
	if (document.getElementById("race_distance").innerHTML == "10k" && document.getElementById("which_program").innerHTML == "beginner" && new_mileage > 40) { // weekly mileage capped for beginner program at 40 miles for 10k
		var new_mileage = 40;
	}
	if (document.getElementById("race_distance").innerHTML == "5k" && document.getElementById("which_program").innerHTML == "beginner" && new_mileage > 50) { // weekly mileage capped for beginner program at 50 miles for half marathon
		var new_mileage = 50;
	}
	if (document.getElementById("race_distance").innerHTML == "5k" && document.getElementById("which_program").innerHTML == "beginner" && new_mileage > 60) { // weekly mileage capped for advanced program at 60 miles for marathon
		var new_mileage = 60;
	}
	if (document.getElementById("which_program").innerHTML == "advanced" && new_mileage > 100) { // weekly mileage capped for advanced program at 100 miles
		var new_mileage = 100;
	}

	return new_mileage;
}

function get_long_run(mileage) {
	// Determines what the length of the longest run of the week should be based on weekly mileage.
	// Arguments: mileage (number): weekly mileage
	// Returns: long_run (number): length of long run

	var long_run = Math.ceil(mileage * .2); // long run to be 20% of weekly mileage
	return long_run;
}

function get_training_week(mileage) {
	// Creates an array that has the number of miles to be run on each day of the week selected for training based on weekly mileage. 
	// Long run should occur on the last day of the week selected.
	// Arguments: mileage (number): weekly mileage
	// Returns: training_list (array): a list with miles to be run for each day of the week selected for training

	var training_list = []; // initialize array
	var weekly_mileage = mileage;

	var days = document.getElementById("training_days").innerHTML; // get array of days selected for training
	var days_array = days.split(","); // separate each day 
	var days_per_week = days_array.length; // count the number of training days

	var last_day = days_array[days_per_week - 1]; // determine which day of the week is last to use for the long run

	var days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

	for (var i = 0; i < days_of_week.length; i++) { // for each day of the week
		var long_run_miles = get_long_run(weekly_mileage); // determine number of miles for long run
		if (days.includes(days_of_week[i]) && days_of_week[i] == last_day) { // check to see if current day was selected for training and if it's the last training day of the week for the long run
			training_list.push(Math.ceil(long_run_miles) + " miles"); 
		} else if (days.includes(days_of_week[i]) && days_of_week[i] != last_day) { // check to see if current day was selected for training and is not the long run day
			training_list.push(Math.floor((weekly_mileage - Math.floor((long_run_miles))) / (days_per_week)) + " miles");
		} else {
			training_list.push("Rest"); // rest on days not selected for training
		}
	}
	return training_list;
}

function hr_zones(age) {
	// If the advanced program is selected, this function will generate heart rate zones based on ACSM intensity levels.
	// The function uses the age predicted heart rate max equation(220-age) to calculate the heart rate zones.
	// It will also suggest the 80/20 rule to the runner for intensity.
	// Arguments: age (number): age of user
	// Returns: void

	var predicted_max = 220 - age; // age predicted heart rate max

	// calculated ranges for low, moderate, and high intensity
	var low_intensity_min = Math.round(predicted_max * 0.57);
	var low_intensity_max = Math.round(predicted_max * 0.63);
	var moderate_intensity_min = Math.round(predicted_max * 0.64);
	var moderate_intensity_max = Math.round(predicted_max * 0.75);
	var high_intensity_min = Math.round(predicted_max * 0.76);
	var high_intensity_max = Math.round(predicted_max * 0.95);

	document.getElementById('hr_zones').style.display = 'block'; // unhide div with heart rate information

	document.getElementById('hr_info').innerHTML = 'It is recommended that 80% of your training be "easy," taking place in the light or moderate intensity heart rate zones, while 20% of your training be "hard,"  taking place in the high intensity zone.'
	document.getElementById('hr_low').innerHTML = "Light Intensity: " + low_intensity_min + "-" + low_intensity_max + " bpm";
	document.getElementById('hr_moderate').innerHTML = "Moderate Intensity: " + moderate_intensity_min + "-" + moderate_intensity_max + " bpm";
	document.getElementById('hr_high').innerHTML = "High Intensity: " + high_intensity_min + "-" + high_intensity_max + " bpm";
}

function make_calendar(race_date, weekly_mileage) {
	// Generates the training calendar based on user inputs.
	// Arguments: race_date(string): date of race in mm/dd/yyyy format
	//			  weekly_mileage(number): starting weekly mileage for calendar
	// Returns: void

	var r_date = new Date(race_date); // convert string to date object
	var r_milli = Date.parse(r_date); // get milliseconds of date for calculation
	var now_date = new Date(); // new date object for current date
	var now_milli = Date.parse(now_date);

	var days_between = Math.round((r_milli - now_milli) / (1000 * 3600 * 24)); // calculate number of days between current date and race based on milliseconds
	var weeks_until = days_between / 7;

	var body = document.getElementById("body"); 
  	var table = document.createElement("table");
  	var table_body = document.createElement("tbody");

  	var starting_date = new Date(get_sunday(now_date)); // find the first Sunday to use as basis for actual starting date(Monday)
  	
  	var day_before = new Date(r_date.getTime()); // find day before race
  	day_before.setDate(r_date.getDate() - 1);

  	var two_days_before = new Date(day_before.getTime()); // find two days before race 
  	two_days_before.setDate(day_before.getDate() - 1);

  	var week_counter = 0; // initialize week counter

  	for (var i = weeks_until; i > 0; i--) { // create a row for each week
  		week_counter = week_counter + 1; // count number of weeks
  		var weekly_mileage = get_weekly_mileage(weekly_mileage, i, week_counter); // get new weekly mileage
  		var row = document.createElement("tr");
  		for (var j = 0; j < 7; j++) { // create a cell for each day with training information
  			if (starting_date < two_days_before) { 
  				starting_date.setDate(starting_date.getDate() + 1); // iterate through days until race
  				var date_string = starting_date.toLocaleDateString(); // convert date to mm/dd/yyyy format 
  				var training_string = get_training_week(weekly_mileage); // determine number of miles to be run
  				var cell = document.createElement("td");
  				var cell_text = document.createTextNode(date_string + "\n" + training_string[j]); // add date and training information to cell
      			cell.appendChild(cell_text); // add text to cell
      			row.appendChild(cell); // add cell to row
      		}
      		if (starting_date < day_before && starting_date > two_days_before) { // Put "Rest" in cell on day before race
      			starting_date.setDate(starting_date.getDate() + 1);
      			var date_string = starting_date.toLocaleDateString();
      		  	var cell = document.createElement("td");
  				var cell_text = document.createTextNode(date_string + "\n" + "Rest");
      			cell.appendChild(cell_text);
      			row.appendChild(cell);	
  			}
  			if (starting_date < r_date && starting_date > day_before) { // Put "Race Day!!!" in cell on day of race
  				starting_date.setDate(starting_date.getDate() + 1);
  				var date_string = starting_date.toLocaleDateString();
      		  	var cell = document.createElement("td");
  				var cell_text = document.createTextNode(date_string + "\n" + "Race Day!!!");
      			cell.appendChild(cell_text);
      			row.appendChild(cell);	
  			}
  		}
    	table_body.appendChild(row);  // add row to table body
 	}
  	table.appendChild(table_body); // add table body to table
  	body.appendChild(table); // add table to html body
}

function main() {	
	// Calls the functions to take in the user input and output the training calendar. 
	// Hides and unhides buttons, forms, and text as buttons are pressed. 
	// Records user answers in <p> elements. I'm thinking there are better ways to do store user input, 
	// but I had trouble figuring out how to get the variables out of the function(and using buttons in general).
	// Uses JQuery
	// Arguments: none
	// Returns: void

	$('#program_button').click(function() {
		var which_program = get_program();
		document.getElementById('which_program_form').style.display = "none"; // hide current form
		document.getElementById('race_date_form').style.display = "block"; // reveal next form
		document.getElementById('program_button').style.display = 'none'; // hide current button
		document.getElementById('date_button').style.display = 'block'; // reveal next button
		document.getElementById("which_program").innerHTML = which_program; // store which program as string in a <p> element
	});

	$("#date_button").click(function() {
		var race_date = get_date();
		document.getElementById('race_date_form').style.display = "none";
		document.getElementById('race_distance_form').style.display = "block";
		document.getElementById('date_button').style.display = 'none';
		document.getElementById('distance_button').style.display = 'block';
		document.getElementById("race_d").innerHTML = race_date; // store date as string in <p> element
	});

	$("#distance_button").click(function() {
		var race_distance = get_race_distance();
		document.getElementById('race_distance_form').style.display = "none";
		document.getElementById('days_form').style.display = "block";
		document.getElementById('distance_button').style.display = 'none';
		document.getElementById('days_button').style.display = 'block';
		document.getElementById("race_distance").innerHTML = race_distance; // store race distance as string in <p> element 
	});

	$("#days_button").click(function() {
		var days = get_days();
		document.getElementById('days_form').style.display = "none";
		document.getElementById('days_button').style.display = 'none';
		document.getElementById("training_days").innerHTML = days; // store training days as array in <p> element
		if (document.getElementById("which_program").innerHTML == "advanced") { // ask extra questions if advanced program selected
			document.getElementById('age_form').style.display = "block";
			document.getElementById('age_button').style.display = 'block';
		} else {
			document.getElementById('calendar_button').style.display = 'block'; // show make calendar button if beginner program selected
		}
	});

	$("#age_button").click(function() {
		var age = get_age();
		document.getElementById('age_form').style.display = "none";
		document.getElementById('mileage_form').style.display = "block";
		document.getElementById('age_button').style.display = 'none';
		document.getElementById('mileage_button').style.display = 'block';
		document.getElementById("age_text").innerHTML = age; // store age as string in <p> element
	});

	$("#mileage_button").click(function() {
		var mileage = get_mileage();
		document.getElementById('mileage_form').style.display = "none";
		document.getElementById('pr_form').style.display = "block";
		document.getElementById('mileage_button').style.display = 'none';
		document.getElementById('pr_button').style.display = 'block';
		document.getElementById("mileage_text").innerHTML = mileage; // store weekly mileage as string in <p> element
	});
		
	$("#pr_button").click(function() {
		var pr = get_pr();
		document.getElementById('pr_form').style.display = "none";
		document.getElementById('pr_button').style.display = 'none';
		document.getElementById('calendar_button').style.display = 'block';
		document.getElementById("pr").innerHTML = pr; // store pr information as array in <p> element
	});

	$("#calendar_button").click(function() {
		document.getElementById('track_photo').style.display = 'none';
		var race_date = document.getElementById('race_d').innerHTML;
		if (document.getElementById("which_program").innerHTML == "advanced") { // send age and weekly mileage entered by user to hr_zones and make_calendar function if advanced program selected
			var weekly_mileage_string = document.getElementById('mileage_text').innerHTML;
			var weekly_mileage = parseInt(weekly_mileage_string); // convert mileage to number
			var age_string = document.getElementById('age_text').innerHTML;
			var age = parseInt(age_string); // convert age to number
			hr_zones(age); // get heart rate zones based on age
		} else {
			var weekly_mileage = 8; // starting weekly mileage is 8 if beginner program selected
		}
		make_calendar(race_date, weekly_mileage); // create calendar!!!

		document.getElementById('calendar_button').style.display = 'none';
	});
}

main();







