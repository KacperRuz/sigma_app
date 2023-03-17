class Message{
    constructor(time, text){
        this.time = time;
        this.text = text;
    }
}

function fetch_last(){  
    $.ajax({
        url: "fetch_alerts",
        type: "GET",
        dataType: "json",
        success: (data) => {
            console.log(data);
            for(var prop in data){
                var obj = data[prop];
                for(var i in obj){
                    var item = obj[i];
                    render_message(item);
                }
            }
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function render_message(message){
    $(document).ready(function(){
        var tag = document.createElement("div");

        tag.innerHTML = message.date.slice(11,16) + ": " + message.text;
        tag.classList.add("alert_container");
        $("#alerts").append(tag);
    });
}

export{
    fetch_last
}