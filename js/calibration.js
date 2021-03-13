var width = document.documentElement.clientWidth;
var height = document.documentElement.clientHeight;
var trackerWidth = 320;
var trackerHeight = 240;
var count = 0;

/**
 * calibration for diglit project
 * 
 * Ethan Haque
 */


function mainCal() 
{
    var table = document.createElement("table");
    document.getElementsByTagName("body")[0].appendChild(table);
    for(var i = 0; i < 4; i++)
    {
        var tr = document.createElement("tr");
        table.appendChild(tr);
        for(var j = 0; j < 4; j++)
        {
            var td = document.createElement("td");
			td.id = "room " + 4 * i +j;
			var btn = createRoom(4 * i + j);
			btn.style.left = (100) + "px";
			btn.style.top = (height / 16 * (i - 2)) + "px";
            td.appendChild(btn)
            tr.appendChild(td);
        }
    }
	var btn0 = document.getElementById("button 0");
	var td0 = document.getElementById("room 00");
	btn0.parentElement.removeChild(btn0)
	td0.style.width = "320px";
	td0.style.height = "240px";
}

function createRoom(i) 
{
    var btn;
    btn = document.createElement("button");
    btn.innerHTML = "Dorm room " + i;
    btn.id = "button " + i;
	btn.className = "room";
	btn.style.position = "relative";
    btn.addEventListener("click", function () {
        this.disabled = true;
        this.style.backgroundColor = "grey";
        var buttons = document.getElementsByClassName("room");
        for (var i = 0; i < buttons.length; i++)
        {
            buttons[i].style.display = "none";
        }
        createFood()
    });
    return btn;
}

function createFood() 
{
	const foods = ["🍔", "🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🥝", "🍅", "🥥", "🥑", "🍆", "🥔", "🥕", "🌽", "🌶", "🥒", "🥬", "🥦", "🧄", "🧅", "🍄", "🥜", "🌰", "🍞", "🥐", "🥖", "🥨", "🥯", "🥞", "🧇", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🥙", "🧆"];
	var directions = document.createElement("h1");
	directions.innerHTML = "Collect the food item";
	directions.style.textAlign = "center";
	document.getElementsByTagName("body")[0].appendChild(directions);
	var x = Math.floor(Math.random() * (width - trackerWidth - 20) + trackerWidth); 
	var y = Math.floor(Math.random() * (height - trackerHeight - 20) + trackerHeight);

	var btn = document.createElement("button");
	btn.innerHTML = foods[Math.floor(Math.random() * (foods.length - 1 ))]
	btn.style.position = "absolute";
	btn.style.left = x + "px";
	btn.style.top = y + "px";
	btn.style.backgroundColor = "yellow";
	btn.className = "food";
	btn.addEventListener("click", function () {
		this.parentElement.removeChild(this);
		count++;
		returnToRooms()
		
	});
	document.getElementsByTagName("body")[0].appendChild(btn);
}

function returnToRooms()
{
	document.getElementsByTagName("h1")[0].parentElement.removeChild(document.getElementsByTagName("h1")[0]);
	// poorly written because I got lazy
    if(count < 15)
    {
		var buttons = document.getElementsByClassName("room");
			for (var i = 0; i < buttons.length; i++)
			{
				buttons[i].style.display = "block";
			}
    }
    else
    {
        end();
    }
}

function end()
{
	start();
}
