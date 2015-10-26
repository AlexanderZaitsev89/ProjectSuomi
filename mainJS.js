 $(document).ready(function(){
	 var relPositTownX=[44.9,24.6,83.2,50.3,70.7,20.9,64.2,50.5,65.1,39.6,57.2,84.6,60.3,19.5];//Relative position of x coordinate of the town on this image
	 var relPositTownY=[93.7,90.8,70.9,49.3,85.7,67.1,33.6,86.1,69.8,41.5,28.7,65.1,53.7,41.2];//Relative position of y coordinate of the town on this image
	 var townName=["Helsinki","Turku","Joensuu","Oulu","Lappeenranta","Vaasa","Kemijarvi","Lahti","Kuopio","Tonio","Sodankyla","Lieksa","Vaala","Boden"];//Names of the town
	 var rightAnswer=0;
	 var i=0;
	 var j=0;
	

	
	var xmlhttp = new XMLHttpRequest();											//
	var url = "http://users.metropolia.fi/~alexanza/ProjectSUOMI/save_json.php";	//
	xmlhttp.onreadystatechange=function() {										//
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {					//
			myFunction(xmlhttp.responseText);									//
		}																		//
	}																			//
	xmlhttp.open("GET", url, true);												// Communication with server and getting data from it
	xmlhttp.send();																//
	function myFunction(response) {												//
		var arr=JSON.parse(response);											//
		console.log(arr);														//
		$("#topic").text(arr.topic);  											//
		$("#date").text(arr.date);												//
		$("#author").text(arr.madeby);											//
		$("#newsSection").text(arr.news);										//
	}
		
			
	 $("#btn").hide();//this button will be revealed after user interaction
	
	
	 
	$("#goHome").click(function() {
		window.location.href = 'mainPage.html';
	});	 
	$("#mainPageImage").click(function() {
		window.location.href = 'appPage.html';
	});	 
	$("#btn").click(function() {
		if(i==townName.length-1){
			if(rightAnswer>townName.length/2){
				window.location.href = 'winPage.html';
			}else{
				window.location.href = 'loserPage.html';
			}
		}
		$("#btn").hide();
		$("#question").text('Where '+townName[j]+' is situated?'+' Score:'+rightAnswer);
		i++;
		
		
	});
	
	$("#mainImage").click(function(e) {
		var clickPositionX=0;//Coordinate x of click that is calculated FOR THE IMAGE element 
		var clickPositionY=0;//Coordinate y of click that is calculated FOR THE IMAGE element
		var heightImage=e.currentTarget.clientHeight;//Actual height of the image element
		var widthImage=e.currentTarget.clientWidth;//Actual width of the image element

		var actualCoordinateTownX=(widthImage/100)*relPositTownX[i];//Actual x coordinate of the town on map (it might be different because of the different screen sizes)
		var actualCoordinateTownY=(heightImage/100)*relPositTownY[i];//Actual y coordinate of the town on map (it might be different because of the different screen sizes)
		var deltaa=20;//this value is an error for the click coordinate that is allowed for the user
		
		
		//next two functions evaluate  ACTUAL coordinates of the click (for the image area )
		clickPositionX=defPosition(e,0);
		clickPositionY=defPosition(e,1);		
		
		if(clickPositionX<actualCoordinateTownX+deltaa && clickPositionX>actualCoordinateTownX-deltaa&&clickPositionY<actualCoordinateTownY+deltaa && clickPositionY>actualCoordinateTownY-deltaa ){
			rightAnswer++;
			console.log("NICE");
		}else{
			console.log("LOL");
		}
		
		//next two draw output of a user click and right answer
		drawDot(actualCoordinateTownX+e.currentTarget.offsetLeft-10,actualCoordinateTownY+e.currentTarget.offsetTop-10,'#A9A9A9','20px');//drawing a square are for the write answer 
		drawDot(e.pageX,e.pageY,'#F80000','6px');//drawing a red dot on the map- USER INPUT
		
		
		
		
		//console.log(relPositTownX);
		//console.log(relPositTownY);
		//console.log(widthImage);
		//console.log(e.pageX);
		//console.log(e.pageY);

		//console.log(clickPositionX ,clickPositionY);
		//console.log(relPositTownX);
		
		//console.log(actualCoordinateTownX,actualCoordinateTownY);
		//var XX=positionX/(widthImage/100);	
		//var YY=positionY/(heightImage/100);	
		//console.log(XX);
		//console.log(YY);
		$("#question").text('Where '+townName[j]+' is situated?'+' Score:'+rightAnswer);
		
		j++;
		$("#btn").show();		
	});

	function defPosition(event,	position) {
		var x = y = 0;
		var event = event || window.event;
		 
		
		//getting absolute coordinates of click on the page 
		if (document.attachEvent != null) { // Internet Explorer & Opera
			x = window.event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
			y = window.event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
		} else if (!document.attachEvent && document.addEventListener) { // Gecko
			x = event.clientX + window.scrollX;
			y = event.clientY + window.scrollY;
		}
		
		
		//Evaluating borderes of the image element
		y0=document.getElementById("mainImage").offsetTop;
		x0=document.getElementById("mainImage").offsetLeft;
			 
		
		//calculating the resulted coordinates
		x = x-x0;
		y = y-y0;
		 
		//alert(x+'|'+y);
		if(position==0){
		return x;
		}else{
		return y;
		}
	}

	function drawDot(mouseX,mouseY,color,size) {
        //var color = '#000000';
        //var size = '6px';
        $("body").append(
            $('<div></div>')
                .css('position', 'absolute')
                .css('top', mouseY + 'px')
                .css('left', mouseX + 'px')
                .css('width', size)
                .css('height', size)
                .css('background-color', color)
        );		
	}
		
	
	
 });
 












