function ddWeekCalendar(iDate, eDate, iTime, eTime, freq)
{
    this.frecuency = freq;
    this.htmlCalendar = function() 
    {
        var html;
        var dCursor = Date.parse(iDate);
        var ed = Date.parse(eDate);
        var tCursor = Date.parse(iTime);
        var et = Date.parse(eTime);
        html='<table class="tableDay">';
        while(dCursor<=ed) {
            html+='<td class="tdCalendar">'+dateToString(dCursor, "ddd d MMM")+'</td>';
            dCursor.add(1).days();
        }
        html+='</table>';
        
        html+='<table class="tableCalendar"><th class="thCalendar">';
        html+='</th>';
        while(tCursor<=et) {
            dCursor = Date.parse(iDate);
            html+='<tr class="trCalendar">';
            html+='<td>'+timeToString(tCursor)+'</td>';
            while(dCursor<=ed) {
                html+='<td class="tdCalendar2" id="'+dateToString(dCursor, "dd-MM-yyyy")+'_'+timeToString(tCursor)+'"></td>';
                dCursor.add(1).days();
            }
            html+='</tr>';
            tCursor.add(this.frecuency).minutes();
        }
        html+='</table>';
        return html;
    };
    
    this.draw = function(id) 
    {
        document.getElementById(id).innerHTML = this.htmlCalendar();
    };

    this.addSchedule = function(day, from, to, color, name){
        var tCursor = Date.parse(from);
        var et = Date.parse(to);
        color = color || '#eeffee';
        while(tCursor<=et) {
            id = day+'_'+timeToString(tCursor);
            document.getElementById(id).bgColor = color;
            if(name) {
                document.getElementById(id).title = name;
            }
            tCursor.add(this.frecuency).minutes();
        }
    };

    dateToString = function(date, format)
    {
        return (new Date(date).toString(format));
    };
    timeToString = function(date)
    {
        return (new Date(date).toString("HH:mm"));
    };
}
