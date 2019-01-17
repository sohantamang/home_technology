'use strict';
 var key = config.KEY;
 var home = 'https://developer.trimet.org/';
 var id = 9821;
 var link = home + '/ws/v1/arrivals?locIDs='+id+'&AppID='+key+'&json=true';

 $.getJSON(link,function(data){
   var text, estimated_time, scheduled, i, estimated, arrival_min, due_time, date = new Date();

   for (i = 0; i < data.resultSet.arrival.length; i++){
     estimated = data.resultSet.arrival[i].estimated;
     if (estimated === undefined)
       estimated_time = new Date(data.resultSet.arrival[i].scheduled);
     else
       estimated_time = new Date(estimated);
     scheduled = estimated_time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
     due_time = Math.floor((estimated_time-date)/60000);
     due_time > 0 ? arrival_min = `${due_time} min` : arrival_min = 'Due'
     text = `<span id="route">${route_or_icon(data.resultSet.arrival[i].route)}</span>
             <span id="short_sign">${data.resultSet.arrival[i].shortSign}</span>
             <span id="arrival_min">${arrival_min}</span>
             <span id="scheduled_time">${scheduled}</span>`
     $(`.schedule-${i}`).html(text);
   }
   console.log(data.resultSet);
   console.log(date);
   console.log(estimated_time);
 });

 function route_or_icon(route){
   if (route === 90)
     return '<i class="fas fa-circle" style="color: #BF1B1B"></i>';
   else if (route === 100)
     return '<i class="fas fa-circle" style="color: #0D0D76"></i>';
   return route;
 }
