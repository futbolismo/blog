function Timeline(options) {

	

	
	var already={};

	options.data.forEach(function(d){
		switch(d["type"]) {
			case "birth":
				d.ts1=d.timestamps[0];
				d.ts2=d.ts1;
			break;
			case "history":
				d.ts1=d.timestamps[0];
				d.ts2=d.ts1;
				break;
			case "olympics":	
			case "worldcup":
				d.ts1=d.timestamps[0];
				d.ts2=d.timestamps[0];
				break;
			case "club":
			case "national":
			case "trainer":
				d.ts1=new Date(d.timestamps[0],0,1);
				d.ts2=d.timestamps[1]?new Date(d.timestamps[1],0,1):new Date();
			break;
		}

		if(!already[d.ts1.getFullYear()]) {
			already[d.ts1.getFullYear()]=0;
			//console.log(d.ts1.getFullYear(),d.team,already[d.ts1.getFullYear()])
		}
		already[d.ts1.getFullYear()]++;

		d.x=already[d.ts1.getFullYear()]-1;



	})

	options.data=options.data.filter(function(d){
		return 1;
		return 	d["type"]=="birth" || 
				d["type"]=="club" || 
				d["type"]=="trainer" || 
				d["type"]=="national" || 
				d["type"]=="worldcup" ||
				d["type"]=="olympics"
 	})

	var WIDTH=195,
		HEIGHT=1000;

	var margin={
		top:10,
		bottom:10,
		left:5,
		right:5
	}
	var padding={
		top:0,
		bottom:0
	}

	var svg=d3.select(options.container)
				.append("svg")
				.attr("width",WIDTH)
				.attr("height",HEIGHT)
				.on("touchend",function(d){
					d3.event.preventDefault();
					d3.event.stopPropagation();
					tooltip.hide();
					timeline.selectAll(".hover").classed("hover",false);
				})

	var defs=svg.append("defs")
			.append("pattern")
				.attr({
					id:"diagonalHatch",
					width:3,
					height:3,
					patternTransform:"rotate(45 0 0)",
					patternUnits:"userSpaceOnUse"
				});
	defs
		.append("line")
		.attr({
			x0:0,
			y1:0,
			x2:0,
			y2:4
		})
		.style({
			stroke:"#000",
			"stroke-width":3,
			"stroke-opacity":0.6
		})
	var BAR_STROKE=2
		BAR_WIDTH=14+BAR_STROKE*2;
	var CENTER=50;//BAR_WIDTH*1.5;//(WIDTH-(margin.left+margin.right))/2;//+margin.left;
	var years=svg.append("g")
					.attr("id","years")
					.attr("transform",function(){
						var x=CENTER,
							y=margin.top;
						return "translate("+x+","+y+")"
					});

	var timeline=svg.append("g")
					.attr("transform",function(){
						var x=CENTER,
							y=margin.top;
						return "translate("+x+","+y+")"
					})

	var yscale=d3.scale.linear()
					.rangeRound([padding.top,HEIGHT-(margin.top+margin.bottom+padding.top+padding.bottom)])
					.domain([new Date(1954,0,1),new Date()]);

	timeline.append("line")
			.attr("class","time-axis")
			.attr("x1",0)
			.attr("y1",0)
			.attr("x2",0)
			.attr("y2",yscale.range()[1]);
	

	var national_bar=timeline.selectAll("g.club")
				.data(options.data.filter(function(d){
					return d["type"]=="national"
				}))
				.enter()
				.append("g")
					.attr("class",function(d){
						return d["type"]
					})
					.attr("transform",function(d){
						var y=yscale(d.ts1);

						d.y1=y;

						if(d.ts2!=d.ts1) {
							d.y2=yscale(d.ts2) - yscale(d.ts1);
						}

						return "translate("+0+","+y+")";
					})

	national_bar.append("rect")
			.attr("x",-BAR_WIDTH/2)
			.attr("width",BAR_WIDTH)
			.attr("y",0)
			.attr("height",function(d){
				return d.y2;
			})
			.style({
				fill:"url(#diagonalHatch)"
			})

	var clubs=timeline.selectAll("g.club")
				.data(options.data.filter(function(d){
					return d["type"]=="club" || d["type"]=="trainer"
				}))
				.enter()
				.append("g")
					.attr("class",function(d){
						return d["type"]
					})
					.attr("transform",function(d){
						var y=yscale(d.ts1);

						d.y1=y;

						if(d.ts2!=d.ts1) {
							d.y2=yscale(d.ts2) - yscale(d.ts1);
						}

						return "translate("+0+","+y+")";
					})
					.on("mouseover",function(d){
						tooltip.update(d.text,0,d.y1);
					})
					.on("mouseout",function(d){
						tooltip.hide();
					})
					.on("touchstart",function(d){
						d3.event.preventDefault();
						d3.event.stopPropagation();
						tooltip.update(d.text,0,d.y1);
						timeline.selectAll(".hover").classed("hover",false);
						d3.select(this).classed("hover",true);
					})
					.on("touchend",function(d){
						d3.event.preventDefault();
						d3.event.stopPropagation();
						//tooltip.hide();
						//d3.select(this).classed("hover",false);
					})

	var BAR_STROKE=2
		BAR_WIDTH=14+BAR_STROKE*2,
		SQUARE_WIDTH=7;

	clubs.append("rect")
			.attr("class","ix")
			.attr("x",-CENTER)
			.attr("width",(WIDTH))
			.attr("y",0)
			.attr("height",function(d){
				return d.y2;
			})

	clubs.append("rect")
			.attr("x",-BAR_WIDTH/2)
			.attr("width",BAR_WIDTH)
			.attr("y",0)
			.attr("height",function(d){
				return d.y2;
			})
	
	clubs
		.filter(function(d){
			return d["team"];
		})
		.append("text")
		.attr("x",WIDTH-CENTER)
		.attr("y",11)
		.style({
			"font-family":"arial",
			"text-transform":"uppercase",
			"font-size":"10px",
			"text-anchor":"end"
		})
		.html(function(d){
			return d["team"]
		})
	
			

	var events=timeline.selectAll("g.event")
				.data(options.data.filter(function(d){
					//return d["type"]=="birth" || d["type"]=="worldcup" || d["type"]=="olympics"
					return d["category"]=="event"
				}))
				.enter()
				.append("g")
					.attr("class",function(d){
						return d["type"]
					})
					.attr("transform",function(d){
						var y=yscale(d.ts1);
						

						d.y1=y;

						d.x1=0;
						if(d["type"]=="worldcup" || d["type"]=="olympics") {
							d.x1=BAR_WIDTH;
						}

						if(d.ts2!=d.ts1) {
							d.y2=yscale(d.ts2) - yscale(d.ts1);
						}

						return "translate("+d.x1+","+y+")";
					})
					.on("mouseover",function(d){
						var x=CENTER+BAR_WIDTH-5,
							y=d.y1-10;
						if (d["type"]=="birth") {
							x-=BAR_WIDTH;
						}
						if (d["type"]=="history") {
							x-=BAR_WIDTH+SQUARE_WIDTH*3;
							
						}
						tooltip.update(d.text,x,y);
					})
					.on("mouseout",function(d){
						tooltip.hide();
					})
					.on("touchstart",function(d){
						d3.event.preventDefault();
						d3.event.stopPropagation();
						tooltip.update(d.text,0,d.y1);
						timeline.selectAll(".hover").classed("hover",false);
						d3.select(this).classed("hover",true);
					})
					.on("touchend",function(d){
						d3.event.preventDefault();
						d3.event.stopPropagation();
						//tooltip.hide();
						//d3.select(this).classed("hover",false);
					})

	events
		.filter(function(d){
			return d["type"]=="birth"
		})
		.append("rect")
			.attr("class","ix")
			.attr("x",-CENTER-BAR_WIDTH)
			.attr("width",(WIDTH))
			.attr("y",-10)
			.attr("height",20)
	events
		.filter(function(d){
			return d["type"]=="birth"
		})
		.append("circle")
			.attr("cx",0)
			.attr("cy",0)
			.attr("r",4)

	

	

	events
		.filter(function(d){
			return d["type"]!="birth" && d["type"]!="history"
		})
		.append("rect")
			.attr("class","ix")
			.attr("x",-BAR_WIDTH/2)
			.attr("width",BAR_WIDTH*2)
			.attr("y",-10)
			.attr("height",20)

	

	events
		.filter(function(d){
			return d["category"]!="event"
		})
		.append("rect")
			.attr("class","ix")
			.attr("x",-SQUARE_WIDTH)
			.attr("width",(WIDTH))
			.attr("y",-SQUARE_WIDTH)
			.attr("height",function(d){
				return SQUARE_WIDTH*2;
			})

	events
		.filter(function(d){
			return d["type"]=="worldcup" || d["type"]=="olympics"
		})
		.append("circle")
			.attr("cx",0)
			.attr("cy",0)
			.attr("r",SQUARE_WIDTH/1.5)

	events
		.filter(function(d){
			return d["type"]=="worldcup" || d["type"]=="olympics"
		})
		.append("text")
			.attr("x",SQUARE_WIDTH)
			.attr("y",4)
			.text(function(d){
				var cup="WC";
				if(d["type"]=="olympics") {
					cup="OL";
				}
				return cup;//+" "+d.ts1.getFullYear()
			})

	events
		.filter(function(d){
			return d["type"]=="history"
		})
		.append("rect")
			.attr("class","ix")
			.attr("x",-(BAR_WIDTH+SQUARE_WIDTH*2))
			.attr("width",SQUARE_WIDTH*4)
			.attr("y",-SQUARE_WIDTH*1.5)
			.attr("height",SQUARE_WIDTH*3)
	events
		.filter(function(d){
			return d["type"]=="history"
		})
		.append("rect")
			.attr("x",-BAR_WIDTH/2-SQUARE_WIDTH*2)
			.attr("y",0)
			.attr("width",SQUARE_WIDTH)
			.attr("height",SQUARE_WIDTH)
			.attr("transform","rotate(45)translate("+5+","+11+")")
	

	var year=years.selectAll("g.year")
				.data(options.data.filter(function(d){
					return d["type"]=="club" || d["type"]=="trainer"|| d["type"]=="birth" ||  d["type"]=="worldcup" || d["type"]=="olympics"
				}))
				.enter()
				.append("g")
					.attr("class",function(d){
						return "year "+d["type"]
					})
					.attr("transform",function(d){
						var x=0;
						var delta=0;
						if(d["category"]=="range") {
							delta=BAR_STROKE;
						}
						
						return "translate("+x+","+(d.y1+delta)+")";
					})

	year
		.filter(function(d){
			return d["category"]!="event"
		})
		.append("line")
		.attr("x1",function(d){
			return BAR_WIDTH/2+2;
		})
		.attr("x2",function(d){
			var x=(WIDTH-(margin.left+margin.right));
			if(d["category"]=="event") {
				x=x-25;
			}
			return x;
			/*if(d["type"]=="history") {
				return -((WIDTH-(margin.left+margin.right))/2)
			}
			return (WIDTH-(margin.left+margin.right))/2;
			*/
		})
		.attr("y1",0)
		.attr("y2",0);

	year.append("text")
		.attr("x",function(d){
			if(d["type"]=="history") {
				return -CENTER;
				return -((WIDTH-(margin.left+margin.right))/2)
			}
			
			return -CENTER;//WIDTH-CENTER;//(WIDTH-(margin.left+margin.right));//(WIDTH-(margin.left+margin.right))/2;
		})
		.attr("y",function(d){
			var y=9;

			if(d["category"]=="event") {
				y=4;
			}

			return y;
		})
		.text(function(d){
			//if(d["type"]=="birth") {
			//	return d3.time.format("%d/%m/%Y")(d.ts1)
			//}
			//if(d["team"]) {
			//	return d["team"]
			//}
			return d.ts1.getFullYear();
		})

	var tooltip=new Tooltip();

	function Tooltip() {
		var tooltip=d3.select(options.container)
			.append("div")
			.attr("class","timeline-tooltip")
			.classed("hidden",true)
			.on("mouseout",function(d){
				d3.select(this).classed("hidden",true)
			})
			.on("mouseover",function(d){
				d3.select(this).classed("hidden",false)
			})
				
		var container=tooltip.append("div").attr("class","clearfix");
		var body=container.append("p").html(""),
			link=container.append("a")
						.attr("title","Approfondisci")
						.attr("target","_blank")
						.attr("href","#")
						.html("Approfondisci <b>&gt;</b>")

		this.update=function(text,x,y) {

			var x=Math.round(x)-218-42,
				y=Math.round(y);

			tooltip.style("top",(y+margin.top)+"px").style("left",x+"px").classed("hidden",false)
			
			body.html(text.body);

			link.attr("href",text.link?text.link:"#").style("display",function(d){
				if(!text.link) {
					return "none";
				}
				return "inline";
			})

		}

		this.hide=function(){
			tooltip.classed("hidden",true)
		}


	}

}