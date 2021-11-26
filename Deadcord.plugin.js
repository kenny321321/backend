/**
 * @name Deadcord
 * @author Galaxzy
 * @description BetterDiscord plugin to interface with Deadcord
 * @version 0.3
 * @invite J4jY6Zp7A3
 */

module.exports = class Deadcord {

    start() {

        var container = document.querySelector("section[class='panels-j1Uci_']");
        var deadcord_ui = document.querySelector("section[aria-label='Deadcord Area']")

        if(deadcord_ui){
          deadcord_ui.remove()
        } else {
          get_html("https://raw.githubusercontent.com/Galaxzy345/Deadcord-Backend/main/main.html").then(main_html => {
            container.insertAdjacentHTML('afterend', main_html);

            document.getElementById('ping_tokens').addEventListener('click', ping_tokens, false);
            document.getElementById('join_tokens').addEventListener('click', join_tokens, false);
            document.getElementById('leave_tokens').addEventListener('click', leave_tokens, false);
            document.getElementById('nick_tokens').addEventListener('click', nick_tokens, false);
            document.getElementById('disguise_tokens').addEventListener('click', disguise_tokens, false);
            document.getElementById('speak_tokens').addEventListener('click', speak_tokens, false);
            document.getElementById('react_tokens').addEventListener('click', react_tokens, false);
            document.getElementById('start_spam').addEventListener('click', start_spam, false);
            document.getElementById('stop_spam').addEventListener('click', stop_spam, false);
            document.getElementById('help_button').addEventListener('click', show_help, false);
          });
        }

        function show_help() {
          get_html("https://raw.githubusercontent.com/Galaxzy345/Deadcord-Backend/main/help.html").then(help_html => {
            BdApi.alert("💀 Deadcord Help", BdApi.React.createElement('div', {dangerouslySetInnerHTML: {__html: help_html}}))
          });
        }

        async function get_html(url){
            let response = await fetch(url);
            let data = await response.text();
            return data
        }

        function ping_tokens() {

          const ping_tokens = get_data('ping-tokens')

        }

        function join_tokens() {

          const join = post_data('join-server', {
            'invite': get_text_data()[0]
          });
        }

        function leave_tokens() {

         const leave = get_data(`leave-server/${get_url()[4]}`);

        }

        function nick_tokens() {

          const start = post_data(`change-nick/${get_url()[4]}`, {
            'nick': get_text_data().join("")
          });

        }

        function disguise_tokens() {

          const hide = get_data(`disguise/${get_url()[4]}`)

        }

        function speak_tokens() {

          const speak = post_data(`speak/${get_url()[4]}`, {
            'message_content': get_text_data().join("")
          });

        }

        function react_tokens() {
          var params = get_text_data()
          const react = post_data(`react`, {
            'channel_id': params[0],
            'message_id': params[1],
            'emoji':  params[2]
          });

        }

        function start_spam() {

          const start = post_data(`spam/${get_url()[4]}`, {
            'channel_id': get_url()[5],
            'message_content': get_text_data(),
            'mode': parseInt(document.getElementById("spam_modes").value),
            'tts': document.getElementsByName("tts_text")[0].checked
          });

        }

        function stop_spam() {

          stop_spam = get_data('stop-spam');

        }

        function notify(text){

          document.querySelector(".base-3dtUhz").insertAdjacentHTML("afterbegin", `<div class="notice-3bPHh-" style="background-color:#722fb5;color:white;">${text}</div>`);

          setTimeout(function() {
            document.querySelector("div[class='notice-3bPHh-']").remove();
          }, 5500);

        }

        function error(text){

           console.log(`%c${text}`,"color: #f7f7f7; padding: 10px; background-color: #7a183e; font-size: 20px;");

        }

        async function post_data(url, data = {}) {
          try {
              fetch(`http://127.0.0.1:4321/deadcord/${url}`,{
                method: 'POST',
                cache: "no-cache",
                credentials: "same-origin",
                body: JSON.stringify(data),
                headers: {"Content-Type": "text/plain"}
              })
              .then(response => response.json())
              .then((json) => { BdApi.showToast(json["message"]) })
          } catch (err){
            error(`An error occured while sending a POST request to the Deadcord Engine: ${err}`)
          }
        }

        async function get_data(endpoint) {
          try {
            const response = await fetch(`http://127.0.0.1:4321/deadcord/${endpoint}`)
            .then(response => response.json())
            BdApi.showToast(response["message"])
          } catch (err) {
            error(`An error occurred while sending a POST request to the Deadcord Engine: ${err}`)
          }
        }

        function get_url() {
          return window.location.href.split("/")
        }

        function get_text_data(){
          if(document.querySelector("span[data-slate-string='true']")){

            var text = document.querySelector("span[data-slate-string='true']");

            var raw_found_params = []
            var found_params = []

            var extracted = text.innerText;
            if (typeof extracted !== 'undefined'){
              raw_found_params = extracted.split(",")

              for(var i = 0; i < raw_found_params.length; ++i){
                found_params.push(raw_found_params[i].trim())
              }
            }

            return found_params

          } else {
             BdApi.showToast('You must give paramters in the Discord message bar.', {type: 'error', timeout: '5500'})
          }

        }

    }

}
