console.log("app.js Linked")

/*class API
{
    api_index = 0;
    api_end_point;

    constructor(ep)
    {
        this.api_end_point = ep;
    }

    fetch_api()
    {
        const end_point = this.api_end_point;
        let first_catch = false;
        let second_catch = false;

        let tester = function test(){
        return fetch(end_point)
        .then(function(response){

            first_catch = false
            return response.json()
            .then(function(data){
                    
                second_catch = false
                console.log(data) 
                console.log(data.length)
 
                return data
            })
            .catch(function(error){

                second_catch = true
                console.log("ERROR! Failed to access data from .json! - SECOND  CATCH")
                console.log(error)
                return error
            })
        })
        .catch(function(error){

            first_catch = true
            console.log("ERROR! Failed to access API from end point! - FIRST CATCH")
            console.log(error)

            return error
        })}

        tester().then(function(values){

            console.log(values[0].name)

            return values
        })
    }
}*/

/*function location_fetch_func(api_callback)
    { 
        console.log(api_callback);

        for(fn_i=0;fn_i<fn_data.length;fn_i++)
        {
            console.log(fn_data[fn_i].name);

            const location_option = document.createElement("option");
            location_option.innerHTML = fn_data[fn_i].name;
            client_location.appendChild(location_option);
        }
    }*/

function init()
{
    //Function to generate Project Number Code : YYYYMMDD-(NAME CODE)-(COUNTRY CODE)-(JOB NO. FOR year YYYY e.g. 0018)
    //Example Project Number Code : 20200510-THEW-TTO-0001

    const client_name = document.querySelector("#client_name");
    const client_location = document.querySelector("#location_dropdown");
    const client_location_placeholder = document.querySelector("#location_placeholder");
    const start_date = document.querySelector("#start_date");
    const total_job_num = document.querySelector("#total_job_num");
    const gen_num_button = document.querySelector("#gen_num_button");
    
    const location_option = []
    const month_arr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    let i = 0;
    let date_code = "";
    let client_code = "";
    let country_code = "";
    
    /*const Location_API = new API(`https://restcountries.eu/rest/v2/all`);
    api_arr = [];
    api_arr.push(Location_API);*/

    //Waits for document to load
    document.addEventListener("DOMContentLoaded",function(){

        console.log("DOM Loaded");
        
        //Fetch API Code - Start

        const end_point = `https://restcountries.eu/rest/v2/all`;
        

        fetch(end_point)
        .then(function(response){

            response.json()
            .then(function(data){
                    
                console.log(data) 
                console.log(data.length)
 
                for(i=0;i<data.length;i++)
                {   
                    location_option[i] = document.createElement("option");
                    location_option[i].innerHTML = data[i].name;
                    location_option[i].dataset.alpha3Code = data[i].alpha3Code;
                    client_location.appendChild(location_option[i]);
                }

                console.log(data[0].name)
                console.log(location_option[0].dataset.alpha3Code)
            })
            .catch(function(error){

                console.log("ERROR! Failed to access data from .json! - SECOND  CATCH")
                console.log(error)
            })
        })
        .catch(function(error){

            console.log("ERROR! Failed to access API from end point! - FIRST CATCH")
            console.log(error)
        });

        //Fetch API Code - End
    });

    //Waits for changes to Client Name 
    client_name.addEventListener("change",function(){

        let client_name_holder = client_name.value.replace("The ","",).replace("A ","").replace("& ","");
        console.log(`Client name changed from "${client_name.value}" to "${client_name_holder}" to generate client code`);
        const client_acronym_arr = client_name_holder.split(" ", 2); 

        client_code = "";

        for(i=0;i<client_acronym_arr.length;i++)
        {
            client_code += client_acronym_arr[i].substr(0, 2).toUpperCase();

            console.log(client_acronym_arr[i])
            console.log(client_acronym_arr[i].substr(0, 2));
        }

        console.log(`Client Code is ${client_code} for ${client_name.value}`);
    });

    //Waits for changes to Client Location
    client_location.addEventListener("change",function(){

        client_location_placeholder.remove();

        console.log("Selected Location Changed!");
        console.log(`This location index no. is ${this.selectedIndex}`);

        country_code = location_option[this.selectedIndex].dataset.alpha3Code;
        console.log(`Selected Country Alpha 3 Code is ${country_code}`);

        display_country_code = document.querySelector("#country_code");
        display_country_code.innerHTML = `Selected Country Alpha 3 Code is "${country_code}"`;
    });

    //Waits for changes to Start Date
    start_date.addEventListener("change",function(){

        console.log("Date Changed!");

        const start_date_arr = start_date.value.split("-"); //splits date into an array of [year,month,day] (numbers only)

        for(i=0;i<month_arr.length;i++)
        {
            if(start_date_arr[1] == i+1)
            {
                start_date_arr[1] = month_arr[i];
            }
        }

        console.log(`Selected month is ${start_date_arr[1]}`);
        console.log(start_date.value);

        date_code = start_date_arr[0] + start_date_arr[1].toUpperCase() + start_date_arr[2];
        console.log(`Selected Date Code is ${date_code}`);
    })

    //Waits for changes to Job Number
    total_job_num.addEventListener("change",function(){

        console.log("Job Number Changed!");

        if(total_job_num > 9999)
        {
            total_job_num = 9999;
        }
    })

    //Waits for user to click Generate Project Number
    gen_num_button.addEventListener("click",function(){

        display_project_num = document.querySelector("#display_project_num");

        console.log(`Selected Date Code is ${date_code}`);
        console.log(`The Client Code is ${client_code}`);
        console.log(`Selected Country Alpha 3 Code is ${country_code}`);
        console.log(`Selected Job Number is ${total_job_num.value}`);

        //Final Generator Output
        const project_num_code = (`PN-${date_code.toString()}-${client_code}-${country_code}-${total_job_num.value.padStart(4, "0")}`).toString();
        display_project_num.innerHTML = `This Project Number : ${project_num_code}`;
        console.log(`This Project Number : ${project_num_code}`);
    });
}

init()

/*addEventListener("change",function(){

    alert("Option selected");
});

const end_point = `https://opentdb.com/api.php?amount=1&category=19&difficulty=easy&type=multiple`

fetch(end_point)
.then(function(response){

    response.json()
    .then(function(data){

        const question = document.querySelector("#question");
        question.innerHTML = `${data.results[0].question}`;
    })
    .catch(function(error){

    })
})
.catch(function(error){

 
    

    const task_div = document.createElement("div");
        task_div.setAttribute("class","task-items");        

        if(input_item_name.value == "")
        {
            alert("Please enter an item name");
        }

        else
        {
        const task_header = document.createElement("h3");
        task_header.innerHTML = input_item_name.value;
        input_item_name.value = "";
        input_item_name.focus();

        const task_link = document.createElement("a");
        task_link.setAttribute("href","#");
        task_link.innerHTML = "Remove"

        task_div.appendChild(task_header);
        task_div.appendChild(task_link);

        item_list_area.appendChild(task_div);
        }*/