function ddWeekCalendar(iDate, eDate, iTime, eTime, frequency)
{
    this.htmlCalendar = function() 
    {
        var html;
        var dCursor = Date.parse(iDate);
        var ed = Date.parse(eDate);
        var tCursor = Date.parse(iTime);
        var et = Date.parse(eTime);
        html='<table><th><td>-</td>';
        while(dCursor<=ed) {
            html+='<td>'+this.dateToString(dCursor, "ddd d MMM")+'</td>';
            dCursor.add(1).days();
        }
        html+='</th>';
        while(tCursor<=et) {
            dCursor = Date.parse(iDate);
            html+='<tr>';
            html+='<td>'+this.timeToString(tCursor)+'</td>';
            while(dCursor<=ed) {
                html+='<td id="'+this.dateToString(dCursor, "dd-MM-yyyy")+'_'+this.timeToString(tCursor)+'"></td>';
                dCursor.add(1).days();
            }
            html+='</tr>';
            tCursor.add(frequency).minutes();
        }
        html+='</table>';
        return html;
    };
    
    this.draw = function(id) 
    {
        document.getElementById(id).innerHTML = this.htmlCalendar();
    };

    this.dateToString = function(date, format)
    {
        return (new Date(date).toString(format));
    };
    this.timeToString = function(date)
    {
        return (new Date(date).toString("HH:mm"));
    };
}