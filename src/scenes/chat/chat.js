function getCookie(name){
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + "=")) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
        }
        }
    }
    return cookieValue;
}

class Message{
    constructor(user__username, time, text){
        this.user__username = user__username;
        this.time = time;
        this.text = text;
    }
}

var int;

function set_interval(bool){
    if(bool){
        int = setInterval(function(){
            receive_messages();
        }, 500);
    }
    else{
        clearInterval(int);
    }
}

function clear_message_divs(){
    const messages = document.getElementById("messages");
    messages.innerHTML = "";
}

function fetch_last(){  
    $.ajax({
        url: "fetch_last_messages",
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

   $("#chat_text").keypress(function (e) {
    if(e.which === 13 && !e.shiftKey) {
        e.preventDefault();
    
        send_message($("#chat_text").val());
        $("#chat_text").val("");
    }
    });
}

$(document).ready(function(){
});

function send_message(text){
    if(text != null && text != "" && text != " "){
    $.ajax({
        url: "send_message",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({payload: text,}),
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        success: (data) => {
          console.log(data);
          const m = new Message(data.context[0], data.context[1], data.context[2]);
          render_message(m);
        },
        error: (error) => {
          console.log(error);
        }
    });
    }
}

function render_message(message){
    $(document).ready(function(){
        var tag = document.createElement("div");

        if(message.user__username == "admin")
        tag.innerHTML = message.time.slice(11,16) + " " + message.user__username + " 👑" + ": " + message.text;
            else
        tag.innerHTML = message.time.slice(11,16) + " " + message.user__username + ": " + message.text;
        tag.classList.add("chat_container");
        $("#messages").append(tag);
    });
}

function receive_messages(){
    $.ajax({
        url: "receive_new_messages",
        type: "GET",
        dataType: "json",
        success: (data) => {
            for(var i=0; i<data.context.length; i++){
                const m = new Message(data.context[i].user__username, data.context[i].time, data.context[i].text);
                console.log(m);
                render_message(m);
            }
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function test(){
    $.ajax({
        url: "receive_new_messages",
        type: "GET",
        dataType: "json",
        success: (data) => {
            console.log(data);
        },
        error: (error) => {
            console.log(error);
        }
    });
}


window.onbeforeunload = set_interval(false);

export {
    fetch_last,
    set_interval,
    clear_message_divs,
}