/*jslint white: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 14 */
/*global window: false, REDIPS: true */

/* enable strict mode */
"use strict";

// define redips_init variable
var redipsInit;

var redipsInit,			// define redipsInit variable
	toggleAnimation,	// enable / disable animation
	startPositions,		// remember initial positions of DIV elements
	pos = {},			// initial positions of DIV elements
	rd = REDIPS.drag;


// redips initialization
redipsInit = function () {
	// reference to the REDIPS.drag library and message line
	var	rd = REDIPS.drag;

	var msg = document.getElementById('message');
	// how to display disabled elements
	rd.style.borderDisabled = 'solid';	// border style for disabled element will not be changed (default is dotted)
	rd.style.opacityDisabled = 60;		// disabled elements will have opacity effect
	// initialization
	rd.init();
	REDIPS.drag.hover.colorTr = 'red';
	// only "smile" can be placed to the marked cell
	//rd.enableDrag(false, '#drag div')     Permite desactivar el DRAG de los elementos con clase #drag
	rd.dropMode = 'single';
	REDIPS.drag.only.div.a1 = 'last';
	//rd.enableDrag(false, rd.obj);
	//rd.mark.exception.d8 = 'smile';
	// prepare handlers
	rd.event.clicked = function (e) {
		console.log(e);
		////msg.innerHTML = 'Clicked';
		$(function () {
                    $('.drag').popover({
                    title: 'Detalles Agenda',
                    content: 'Hello Popover',
                    placement: 'top'
                });
        });
		rd.event.dblClicked = function () {
			//windowsUpdate("245454");
			windowsUpdate(e.children[0].id);
			//msg.innerHTML = 'Dblclicked';
			//http://localhost/ucm/inc/modules/calendar/editFromCalendar.php?id=245454&type=edit
			//windowsUpdate();
		};
		
	};
	rd.event.moved  = function () {
		//msg.innerHTML = 'Moved';
	};

	rd.event.notMoved = function () {
		//msg.innerHTML = 'Not moved';
	};
	rd.event.dropped = function () {
		//msg.innerHTML = 'Dropped';
		var	objOld = rd.event,					// original object
			targetCell = rd.td.target,			// target cell
			targetRow = targetCell.parentNode,	// target row
			objNew, idEvent = targetCell.id;
			var id = event.srcElement.id;
			document.getElementById(id).style.opacity = '1';
			rd.td.current.parentElement.style.background ='#8BB6DE';
			// Al posicionar el objeto en su posicion final, se restaura el color del TD que indica la hora en la cual se arrastra
			var date = rd.td.current.id;
			var day = date.split("_");
			document.getElementById(day[1]).style.background = '#8BB6DE';
			updateCalendar(id, day[0], day[1]);
			
	};
	rd.event.switched = function () {
		//msg.innerHTML = 'Switched';
	};
	rd.event.clonedEnd1 = function () {
		//msg.innerHTML = 'Cloned end1';
	};
	rd.event.clonedEnd2 = function () {
		//msg.innerHTML = 'Cloned end2';
	};
	rd.event.notCloned = function () {
		//msg.innerHTML = 'Not cloned';
	};
	rd.event.deleted = function (cloned) {
		if (cloned) {
		}
		else {
		}
	};
	rd.event.undeleted = function () {
	};
	rd.event.cloned = function () {
		rd.obj.innerHTML += 'd';
	};
	rd.event.changed = function () {
		// get target and source position (method returns positions as array)
		var pos = rd.getPosition();
		//var id2 = event.target.id;
		var id2 = rd.obj.id;
		document.getElementById(id2).style.opacity = '0.4'; // Transparencia al mover objeto

		// Ilumina TD con la hora donde se esta arrastrando
		var date = rd.td.current.id;
		var day = date.split("_");
		document.getElementById(day[1]).style.background = '#CFDFFE';

		// Devuelve el color despues de pasar sobre la hora
		var dateP = rd.td.previous.id;
		var dayP = dateP.split("_");
		document.getElementById(dayP[1]).style.background = '#8BB6DE';
	};
};


// toggles trash_ask parameter defined at the top
function toggleConfirm(chk) {
	if (chk.checked === true) {
		REDIPS.drag.trash.question = 'Are you sure you want to delete DIV element?';
	}
	else {
		REDIPS.drag.trash.question = null;
	}
}


// toggles delete_cloned parameter defined at the top
function toggleDeleteCloned(chk) {
	REDIPS.drag.clone.drop = !chk.checked;
}


// enables / disables dragging
function toggleDragging(chk) {
	REDIPS.drag.enableDrag(chk.checked);
}


// function sets drop_option parameter defined at the top
function setMode(radioButton) {
	REDIPS.drag.dropMode = radioButton.value;
}


// show prepared content for saving
function save(type) {
	// define table_content variable
	var table_content;
	// prepare table content of first table in JSON format or as plain query string (depends on value of "type" variable)
	table_content = REDIPS.drag.saveContent('table1', type);
	// if content doesn't exist
	if (!table_content) {
		alert('Table is empty!');
	}
	// display query string
	else if (type === 'json') {
		//window.open('/my/multiple-parameters-json.php?p=' + table_content, 'Mypop', 'width=350,height=260,scrollbars=yes');
		window.open('multiple-parameters-json.php?p=' + table_content, 'Mypop', 'width=350,height=260,scrollbars=yes');
	}
	else {
		//window.open('/my/multiple-parameters.php?' + table_content, 'Mypop', 'width=350,height=160,scrollbars=yes');
		window.open('multiple-parameters.php?' + table_content, 'Mypop', 'width=350,height=260,scrollbars=yes');
	}
}
//OriginalPosition=id div a cortar,TargetPosition=id celda a pegar
function movePositions(OriginalPosition,TargetPosition){
		//var id = rd.obj.id;
		
		var pos2 = rd.getPosition(TargetPosition); //Se obtiene la coordenada de la celda a pegar
		
		rd.moveObject({
			id: OriginalPosition,			// DIV element id
			target: pos2	// target position
		});
		//document.getElementById(OriginalPosition).style.background = '#6C6714';
        document.getElementById(OriginalPosition).style.opacity = '1';
}

// add onload event listener
if (window.addEventListener) {
	window.addEventListener('load', redipsInit, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', redipsInit);
}