function TeamHeader(data,options){

	var th=d3.select(options.container)
				.append("div")
					.attr("class","team-header");

	th.append("div")
		.attr("class","colors")
			.selectAll("div.color")
			.data(data.colors)
			.enter()
				.append("div")
					.attr("class","color")
					.style("width",(100/data.colors.length)+"%")
					.style("background-color",function(d){
						return d;
					})
	th.append("div")
		.attr("class","sentence")
			.append("h1")
				.html(data.sentence)

}