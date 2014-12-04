function Timeline(options) {

	

	console.log(options.data)
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
			console.log(d.ts1.getFullYear(),d.team,already[d.ts1.getFullYear()])
		}
		already[d.ts1.getFullYear()]++;

		d.x=already[d.ts1.getFullYear()]-1;



	})

	var WIDTH=165,
		HEIGHT=900;

	var margin={
		top:10,
		bottom:10,
		left:10,
		right:10
	}
	var padding={
		top:0,
		bottom:0
	}

	var svg=d3.select(options.container)
				.append("svg")
				.attr("width",WIDTH)
				.attr("height",HEIGHT);

	var years=svg.append("g")
					.attr("id","years")
					.attr("transform",function(){
						var x=(WIDTH-(margin.left+margin.right))/2+margin.left,
							y=margin.top;
						return "translate("+x+","+y+")"
					});

	var timeline=svg.append("g")
					.attr("transform",function(){
						var x=(WIDTH-(margin.left+margin.right))/2+margin.left,
							y=margin.top;
						return "translate("+x+","+y+")"
					})

	var yscale=d3.scale.linear()
					.range([padding.top,HEIGHT-(margin.top+margin.bottom+padding.top+padding.bottom)])
					.domain([new Date(1954,0,1),new Date()]);

	timeline.append("line")
			.attr("class","time-axis")
			.attr("x1",0)
			.attr("y1",0)
			.attr("x2",0)
			.attr("y2",yscale.range()[1]);

	var events=timeline.selectAll("g.event")
				.data(options.data)
				.enter()
				.append("g")
					.attr("class","event")
					.attr("transform",function(d){
						var x=10+d.x*10,
							y=yscale(d.ts1);

						d.y1=y;
						d.y2=0;
						d.x1=x;

						if(d.ts2!=d.ts1) {
							d.y2=yscale(d.ts2) - yscale(d.ts1);
						}

						if(d["type"]=="national" || d["type"]=="olympics" || d["type"]=="worldcup") {
							d.x1=0;
						}
						if(d["type"]=="history") {
							d.x1=-15;
						}

						return "translate("+d.x1+","+y+")";
					})



	events.append("line")
			.attr("x1",0)
			.attr("x2",0)
			.attr("y1",0)
			.attr("y2",function(d){
				return d.y2;
			})

	events.append("circle")
			.attr("cx",0)
			.attr("cy",0)
			.attr("r",3)

	events.append("circle")
			.attr("cx",0)
			.attr("cy",function(d){
				return d.y2;
			})
			.attr("r",1)

	events.append("line")
			.attr("class","ix")
			.attr("x1",0)
			.attr("x2",0)
			.attr("y1",-3)
			.attr("y2",function(d){
				return d.y2+3;
			})
	

	var year=years.selectAll("g.year")
				.data(options.data)
				.enter()
				.append("g")
					.attr("class",function(d){
						return "year "+d["type"]
					})
					.attr("transform",function(d){
						var x=0;
						return "translate("+x+","+d.y1+")";
					})

	year.append("line")
		.attr("x1",function(d){
			return d.x1;
		})
		.attr("x2",function(d){
			if(d["type"]=="history") {
				return -((WIDTH-(margin.left+margin.right))/2)
			}
			return (WIDTH-(margin.left+margin.right))/2;
		})
		.attr("y1",0)
		.attr("y2",0);

	year.append("text")
		.attr("x",function(d){
			if(d["type"]=="history") {
				return -((WIDTH-(margin.left+margin.right))/2)
			}
			return (WIDTH-(margin.left+margin.right))/2;
		})
		.attr("y",9)
		.text(function(d){
			return d.ts1.getFullYear();
		})

	

}