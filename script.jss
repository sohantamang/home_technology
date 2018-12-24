	var key = config.KEY;
    var home = 'https://developer.trimet.org/'
    var id = 9821
    var link = home + '/ws/v1/arrivals?locIDs='+id+'&AppID='+key+'&json=true';
    
    $.getJSON(link,function(data){
                    
        var text1 = '';
        var date = new Date();
        var arrivaltime = 0;
        var currenttime = 0;
        var subtime = 0;
        var text = '';
        var scheduled = '';
        var i;
        
        for (i =0;i<data.resultSet.arrival.length;i++)
        {
        	text1 = new Date(data.resultSet.arrival[i].estimated);
        	scheduled = text1.toLocaleTimeString();
    		arrivaltime = Number(text1.getMinutes());
            currenttime = Number(date.getMinutes());
        	subtime = Math.abs(arrivaltime - currenttime);
        	text += `${data.resultSet.arrival[i].shortSign}<br>
        	Scheduled: ${scheduled}<br>
        	ARRIVES IN: ${Math.abs(subtime)+' minutes'}<br><br>`
        
        
        }          			        			       
        $(".mypanel").html(text);
        console.log(data.resultSet.arrival[1].estimated);
    });

    

    

    