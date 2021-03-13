/**
 * tracks eyes and plays music corresponding to the tone of the passage
 * 
 * Ethan Haque
 */

window.onload = function() {
    var localstorageLabel = 'webgazerGlobalData';
    window.localStorage.setItem(localstorageLabel, null);

    webgazer.setRegression('ridge') /* currently must set regression and tracker */
    .setTracker('clmtrackr')
    .begin()
    .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */

    function checkIfReady() {
        var feedbackBox = document.getElementById( webgazer.params.faceFeedbackBoxId );
        
        if (!webgazer.isReady()) {
                setTimeout(checkIfReady, 100);
        }
        // This isn't strictly necessary, but it makes the DOM easier to read
        // to have the z draw order reflect the DOM order.
        else if( typeof(feedbackBox) == 'undefined' || feedbackBox == null ) {
                setTimeout(checkIfReady, 100);
        }
        else
        {
            // Add the SVG component on the top of everything.
            //webgazer.setGazeListener( collisionEyeListener );
        }
    }

    setTimeout(checkIfReady,100);
  };

  window.onbeforeunload = function() {
    //webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
    window.localStorage.clear(); //Comment out if you want to save data across different sessions
  }

function start()
{
    main();
    webgazer.setGazeListener( collisionEyeListener );
}

var bounds = [];
function main()
{
    mouseNode = {"radius": 0, "fixed": true, "px": 0, "py": 0};

    var svg = d3.select('body').append('svg')
    .attr('width', document.documentElement.clientWidth)
    .attr('height', 3500) // make this as long as the text 
    .on('mousemove', function() {
        //console.log(d3.mouse(this)) // log the mouse x,y position
        var point = d3.mouse(this);
        mouseNode.px = point[0];
        mouseNode.py = point[1];
        
        for(var i = 0; i < bounds.length; i++)
        {
            chooseMusic(collision(mouseNode, bounds[i]), i);
            console.log((collision(mouseNode, bounds[i], i)), mouseNode, bounds[i]);
        }

    });

    var svgBox = d3.select("svg").node().getBoundingClientRect()
    //var story = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua.",  "Ut enim ad minimveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat.", "Duis aute irure dolor in reprehenderit in voluptatevelit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecatcupidatat non proident, sunt in culpa qui officia deserunt mollit anim idest laborum."];
    // var story = ["It's move-in day, my first day living in this new place. I'm sitting at my new desk in my new room, and my new roommate is in the new bathroom.", 
    //             "Today was a mix of nervousness and excitement. I hope no one noticed that I was nervous. I just tried to be myself. So, it's also a scary experience for me but I'm trying to make myself comfortable.",
    //             "I can't believe my parents actually sent me here though. I half thought they would drive part of the way, turn around, and make me go back home with them on the drive here. Should I stay here? Do I belong here? What should I do?",
    //             ];
    var story = [
                    "It's move-in day, my first day living in this new place. I'm sitting at my new desk in my new room, and my new roommate is in the new bathroom. My chair creaks when I move, there are chips in the wall, stains on the carpet. But I do not notice because I am thinking too much about the day",
                    "It made me nervous trying not to be nervous. I just tried to be myself. It's a scary experience for me but I'm trying to adjust.",
                    "The first thing I thought when I got on campus was how nice it looked. There's so much open space and even a campfire too. And I saw so many people walking around outside and having fun. A lot of kids and parents were roaming around carrying their luggage and school supplies. When I got to my hall, there were so many people coming towards my car asking me what my name was, where I was from, which wing I'm going to live in, and if I need help carrying my stuff to my room. Everyone seems so nice",
                    "I met my RC, who gave me my keys to my room, I put them on my new lanyard and found my room. I came earlier than my roommate, so the room was barren and It also smelled like old carpet. Lugging all my stuff upstairs took forever, but there were so many helpful people. I’m still so surprised at how friendly they are.",
                    "I met so many cool people, such as my roommate and my big sib. The diversity here is surprising. For example, I met some people that are from the other side of the state.",
                    "After our 10 pm roll call, 10 check, my roommate and I started talking a bit. We’re both just starting to know each other. One unique thing came up in our conversation. Everything here seems great and all, but I still miss home.",
                    "It kinda feels different here. Well, first, I’m alone. Not like literally by myself all the time because I realized that’s basically impossible here. But it’s more like I have no familiar faces here to see everyday. I miss my old friends. I miss my family. Oh, how much I miss the home-cooked meals.",
                    "I can’t believe my parents actually let me come here, though. I half thought they would drive part of the way, turn around, and make me go back home with them on the drive here. Should I stay here? Do I belong here? What should I do?",
                    "The biggest thing that worries me is whether I’m going to fit in or not. I was pretty quiet at my old school, never really getting into anything. I feel like everyone around me is already talking to people like they knew of each other. How can people become friends so quickly? I sometimes get worried I won’t be as interesting or as funny as someone else. It’s kinda sad to imagine the entire school living together but I can’t talk to anyone. I hope that changes.",
                    "I do like talking with my roommate and my wing, though. Everyone seems pretty chill. Well, then again, we’re all just sophomores. Hopefully, the rest of the upperclassmen aren’t scary or anything.",
                    "I just have this weird feeling that life at IMSA is going to be chaotic. I’ve seen some of the posts on social media. Everyone looks like they’re having so much fun here. Maybe the school work will be interesting too because people actually care about school here. I just hope I’ll be okay.",
                    "I decided to start a diary here to write down all my memories at this school if I choose to stay here. You never know, maybe one day in the near future, I’ll find it and look back and smile (or more likely frown in confusion) at the times I had. Well, hopefully, I choose what is best for me. I need to get ready for bed now.",
                ];
    var center =  100 * ((document.documentElement.clientWidth - 600)/2)/document.documentElement.clientWidth
    const padding = 50;
    for(var i = 0; i < story.length; i++)
    {
        var data;
        if(i == 0)
        {
            data = [{"cx": center + "%" , "cy": 200 + svgBox.y}];
        }
        else
        {
            var previous = document.getElementsByTagName("text")[i - 1];
            var bBox = previous.getBoundingClientRect();
            data = [{"cx": center + "%" , "cy": bBox.bottom + 200}];
            
        }
            svg.selectAll("text." + "text" + i)
                        .data(data) // make this automatically scale 
                        .enter()
                        .append("text")
                        .attr("class", "text" + i)
                        .attr("x", function(d) { return d.cx; })
                        .attr("y", function(d) { return d.cy; })
                        .attr("dy", 0)
                        .text(function(d) {
                            return story[i]
                        })
                        .call(wrap, 600);

            var textBox = d3.selectAll("text").node().getBoundingClientRect();
            var texts = document.getElementsByTagName("text");
            var text = texts[i].getBoundingClientRect();
            bounds.push([{  "x1": parseFloat(text.left) - padding, 
                            "x2": parseFloat(text.right) + padding, 
                            "y1": parseFloat(text.top) - padding, 
                            "y2": parseFloat(text.bottom) + padding
                        }]);
    }
    console.log(bounds)


}

function collision(position, bound)
{
    var p = position;
    var b = bound[0];
    return(!(p.px < b.x1 || p.px > b.x2 || p.py < b.y1 || p.py > b.y2))
}

function wrap(text, width) 
{
    text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            x = text.attr("x"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
        }
    });
    }

function chooseMusic(play, index)
{
    var music1 = document.getElementById("music1");
    var music2 = document.getElementById("music2");
    var music3 = document.getElementById("music3");
    var music4 = document.getElementById("music4");
    if(play && (index < 3 ))
    {
        music1.play();
        music2.pause();
        music3.pause();
        music4.pause();
    }
    else if(play && (index < 6))
    {
        music2.play();
        music1.pause();
        music3.pause();
        music4.pause();
    }
    else if(play && (index < 9))
    {
        music3.play();
        music1.pause();
        music2.pause();
        music4.pause();
    }
    else if(play && (index < 12))
    {
        music4.play();
        music1.pause();
        music2.pause();
        music3.pause();
    }
}

  var collisionEyeListener = function(data, clock) {
    if(!data)
      return;
    mouseNode.px = data.x;
    mouseNode.py = data.y + window.pageYOffset;
    for(var i = 0; i < bounds.length; i++)
        {
            chooseMusic(collision(mouseNode, bounds[i]), i);
            console.log((collision(mouseNode, bounds[i], i)), mouseNode, bounds[i]);
        }
  }
    