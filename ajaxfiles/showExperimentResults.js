/*!
 * showExperimentResultsComparison.js
 */

/*
function showChartDaily(jQuery)
{

	if (typeVar1 == "binary" && typeVar2 == "binary") 
	{

			var d1 = [];
			var d2 = [];

			for (var i = 0; i < times.length; ++i) {
				if (values1[i] == 1 && values2[i] == 1) {
					d1.push([i, 1]);
				}

				if (values1[i] == 1 && values2[i] == 0) {
					d1.push([i, -1]);
				}

				if (values1[i] == 0 && values2[i] == 1) {
					d2.push([i, 1]);
				}
				if (values1[i] == 0 && values2[i] == 0) {
					d2.push([i, -1]);
				}

			}//end for

			var xlabels = [];
			for (var i = 0; i < times.length; ++i) {
				//alert("times[0]="+times[0]);
				var xlabel = [];
				xlabel.push(i, times[i]);
				xlabels.push(xlabel);
			}//end for

			var ylabels = [];
			ylabels[0] = nameVar2 + " Yes";
			ylabels[1] = nameVar2 + " No";

			var data = [{
				data : d1,
				label : nameVar1 + " Yes",
				//color : "blue"
			}, {
				data : d2,
				label : nameVar1 + " No",
				//color : "red"
			}];

			var placeholder = $("#placeholder-daily");
			var plot = $.plot(placeholder, data, {
				bars : {
					show : true,
					barWidth : 0.5,
					fill : 0.9
				},
				xaxis : {
					tickLength : 0,
					//min: 0.5,
					//max: ticks.length+0.5,
					ticks : xlabels,
					rotateTicks : 90
				},
				yaxis : {
					ticks : [[0.5, "Yes"], [-0.5, "No"]],
					axisLabel : nameVar2
				},

				grid : {
					hoverable : true,
					clickable : true
				},
				legend : {
					noColumns : 0,
					container : $("#legendcontainer-daily")
				},

			});

			$("<div id='tooltip'></div>").css({
				position : "absolute",
				display : "none",
				border : "1px solid #fdd",
				padding : "2px",
				"background-color" : "#fee",
				opacity : 0.80
			}).appendTo("body");

			placeholder.bind("plothover", function(event, pos, item) {

				//    if ($("#enablePosition:checked").length > 0)
				{
					var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
					//$("#hoverdata").text(str);
				}

				//if ($("#enableTooltip:checked").length > 0)
				{
					if (item) {
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);

						if (y == 1)
							y = "Yes";
						else if (y == -1)
							y = "No";

						$("#tooltip").html(item.series.label + " , " + nameVar2 + " = " + y).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);

					} else {
						$("#tooltip").hide();
					}
				}
			});

			placeholder.bind("plotclick", function(event, pos, item) {
				if (item) {
					//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
					var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);

					if (y == 1)
						y = "Yes";
					else if (y == -1)
						y = "No";

					$("#tooltip").html(item.series.label + " , " + nameVar2 + " = " + y).css({
						top : item.pageY + 5,
						left : item.pageX + 5
					}).fadeIn(200);

					plot.highlight(item.series, item.datapoint);
				}
			});

		}//end if(typeVar1=='binary' && typeVar2=='binary')
		
		else if (typeVar1 == "binary" || typeVar2 == "binary") {

			var d1 = [];
			var d2 = [];
			var ylabels = [];
			var label2;
			var yMax = 0;

			if (typeVar1 == "binary" && (typeVar2 == "score" || typeVar2 == "count")) {
				label2 = nameVar2;
				ylabels[0] = nameVar1 + " Yes";
				ylabels[1] = nameVar1 + " No";
				for (var i = 0; i < values2.length; ++i) {

					//alert("values2[i]="+values2[i]);
					if(values2[i] > yMax)
						yMax = values2[i];
						
					if (values1[i] == 1)
						d1.push([i, values2[i]]);

					if (values1[i] == 0)
						d2.push([i, values2[i]]);
				}//end for

			}//end if(typeVar1 == "binary" && (typeVar2== "score" || typeVar2== "count"))

			if (typeVar2 == "binary" && (typeVar1 == "score" || typeVar1 == "count")) {

				label2 = nameVar1;
				ylabels[0] = nameVar2 + " Yes";
				ylabels[1] = nameVar2 + " No";
				for (var i = 0; i < values1.length; ++i) {

					if(values1[i] > yMax)
						yMax = values1[i];
						
					if (values2[i] == 1)
						d1.push([i, values1[i]]);

					if (values2[i] == 0)
						d2.push([i, values1[i]]);
				}//end for
			}//end if(typeVar2 == "binary" && (typeVar1== "score" || typeVar1== "count"))

			var xlabels = [];

			for (var i = 0; i < times.length; ++i) {
				//alert("times[0]="+times[0]);
				var xlabel = [];
				xlabel.push(i, times[i]);
				xlabels.push(xlabel);
			}

			var data = [{
				data : d1,
				label : ylabels[0],
				//color : "blue"
			}, {
				data : d2,
				label : ylabels[1],
				//color : "red"
			}];
			var placeholder = $("#placeholder-daily");
			var plot = $.plot(placeholder, data, {
				bars : {
					show : true,
					barWidth : 0.5,
					fill : 0.9
				},
				xaxis : {
					tickLength : 0,
					//min: 0.5,
					//max: ticks.length+0.5,
					ticks : xlabels,
					rotateTicks : 90,
					panRange: [-0.5, times.length],
				},
				yaxis : {
					axisLabel : label2,
					panRange: [-0.5, yMax+0.5],
				},

				grid : {
					hoverable : true,
					clickable : true
				},
				legend : {
					noColumns : 0,
					container : $("#legendcontainer-daily")
				},
				
				pan: {
					interactive: true
				},

			});

			placeholder.bind("plotpan", function (event, plot) {
				var axes = plot.getAxes();
			});


			$("<div id='tooltip'></div>").css({
				position : "absolute",
				display : "none",
				border : "1px solid #fdd",
				padding : "2px",
				"background-color" : "#fee",
				opacity : 0.80
			}).appendTo("body");

			placeholder.bind("plothover", function(event, pos, item) {

				//    if ($("#enablePosition:checked").length > 0)
				{
					var str = "(" + pos.x.toFixed(2) + " , " + pos.y.toFixed(2) + ")";
					//$("#hoverdata").text(str);
				}

				//if ($("#enableTooltip:checked").length > 0)
				{
					if (item) {
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);

						$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);

					} else {
						$("#tooltip").hide();
					}
				}
			});

			placeholder.bind("plotclick", function(event, pos, item) {
				if (item) {
					//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
					var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);

					$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
						top : item.pageY + 5,
						left : item.pageX + 5
					}).fadeIn(200);

					plot.highlight(item.series, item.datapoint);
				}
			});

		}//end else if(typeVar1=="binary" || typeVar2=="binary")
		else if ((typeVar1 == "score" || typeVar1 == "count") && (typeVar2 == "score" || typeVar2 == "count")) {

			var d1 = [];
			var d2 = [];

			var xlabels = [];

			for (var i = 0; i < times.length; ++i) {
				//alert("times[0]="+times[0]);
				var xlabel = [];
				xlabel.push(i, times[i]);
				xlabels.push(xlabel);

				d1.push([i, values1[i]]);
				d2.push([i, values2[i]]);

			}

			var ylabels = [];
			ylabels[0] = nameVar2 + " Yes";
			ylabels[1] = nameVar2 + " No";

			var data = [{
				data : d1,
				label : nameVar1,
				//color : "blue"
			}, {
				data : d2,
				label : nameVar2,
				//color : "red",
				yaxis : 2
			}];

			var placeholder = $("#placeholder-daily");

			var plot = $.plot(placeholder, data, {
				lines : {
					show : true
				},
				points : {
					show : true
				},
				xaxis : //{ ticks: xlabels, autoscaleMargin: 1},

				{

					tickLength : 0,
					//min: 0.5,
					//max: ticks.length+0.5,
					ticks : xlabels,
					rotateTicks : 90

				},
				yaxes : [{
					min : 0
				}, {
					position : "right"
				}],

				grid : {
					hoverable : true,
					clickable : true
				},
				legend : {
					noColumns : 0,
					container : $("#legendcontainer-daily")
				},

			});

			$("<div id='tooltip'></div>").css({
				position : "absolute",
				display : "none",
				border : "1px solid #fdd",
				padding : "2px",
				"background-color" : "#fee",
				opacity : 0.80
			}).appendTo("body");

			placeholder.bind("plothover", function(event, pos, item) {

				//    if ($("#enablePosition:checked").length > 0)
				{
					var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
					//$("#hoverdata").text(str);
				}

				//if ($("#enableTooltip:checked").length > 0)
				{
					if (item) {
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);

						$("#tooltip").html(item.series.label + " = " + y).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);

					} else {
						$("#tooltip").hide();
					}
				}
			});

			placeholder.bind("plotclick", function(event, pos, item) {
				if (item) {
					//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
					var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);

					$("#tooltip").html(item.series.label + " = " + y).css({
						top : item.pageY + 5,
						left : item.pageX + 5
					}).fadeIn(200);

					plot.highlight(item.series, item.datapoint);
				}
			});

		}
		//end else if( (typeVar1== "score" || typeVar1== "count") && (typeVar2== "score" || typeVar2== "count")  )

}//end showChartDaily
*/

function loadChart()
{
	var variable1 = document.getElementById("shown-variable1").value;
	var variable2 = document.getElementById("shown-variable2").value;
	/*
 	alert("experimentId="+experimentId);
	alert("userId="+userId);
	alert("variable1="+variable1_id);
	alert("variable2="+variable2_id);
	*/
   //alert("values.length="+values.length);		
   //alert("variable1="+variable1);
   //alert("variable2="+variable2);
  //if(variable1 == "-1" && variable2 == "-1")
  //return;
  
	//var variable1_index = <?php echo json_encode($variable_chart1_index)?>;
	//alert(variable1_index);
  
  
	var variable1_index= document.getElementById("shown-variable1").selectedIndex;
  	var variable1_id = variableIds_js[variable1_index];
	//alert("variable1_index="+variable1_index);
	//alert("variableIds_js[variable1_index]="+variableIds_js[variable1_index]);
  
	var variable2_index= document.getElementById("shown-variable2").selectedIndex;
	var variable2_id = variableIds_js[variable2_index];
	//alert("variable2_index="+variable2_index);
	//alert("variableIds_js[variable2_index]="+variableIds_js[variable2_index]);
  
  
	//var typeVar1 =  <?php echo json_encode($variableTypes[$variable1_index]); ?>;
	//var typeVar2 =  <?php echo json_encode($variableTypes[$variable2_index]); ?>;
		
	//var variableTypes_js = <?php echo json_encode($variableTypes)?>;
	
	//var values = <?php echo json_encode($variableValues); ?>;

	var values1 =  values[variable1_index];
	var values2 =  values[variable2_index];
	
	var valuesPP1 =  valuesPP[variable1_index];
	var valuesPP2 =  valuesPP[variable2_index];
	
	var nameVar1 = variableNames_js[variable1_index];
	var nameVar2 = variableNames_js[variable2_index];
	
			
	var typeVar1 =  variableTypes_js[variable1_index];
	var typeVar2 =  variableTypes_js[variable2_index];
	
	//alert("typeVar1="+typeVar1);
	//alert("typeVar2="+typeVar2);
	//alert(values1.length);
	//var experiment_results_period = <?php echo json_encode($experiment_results_period)?>;			
//	var experiment_results_period = $("input[type='radio'][name='results-period']:checked").val();
	
//	var experiment_results_start_date = $("#datepicker2").val();
	//alert(experiment_results_start_date);

	
				
 	//alert(<?php echo json_encode($variable1_index); ?>);
 	//alert(<?php echo json_encode($variable2_index); ?>);
/*
 	alert(variable1_index);
 	alert(variable2_index);
 	alert(typeVar1);
	alert(typeVar2);
*/
	if(variable1=="-1")
  		variable1_id = -1;
  
	if(variable2=="-1")
 	 	variable2_id = -1;
  
	//alert("variable1_id="+variable1_id);
	//alert("variable2_id="+variable2_id);
  
	var friendId = document.getElementById("experiment-members").value;

     var d1 = [];
        var d2 = [];
        var d3 = [];
        var d4 = [];
        
        
        //alert("variable1_id="+variable1_id);
		//alert("variable2_id="+variable1_id);
		//alert("typeVar1="+typeVar1);
		//alert("typeVar2="+typeVar2);

        if(variable1_id==-1 && variable2_id==-1)
        {
		  	if($("#comparison-cumulative").length !=0)
			{
				//var div2 = document.getElementById("comparison-cumulative");
				//div2.parentNode.removeChild(div2);
				$( "#comparison-cumulative" ).remove();
			}
			
        	if($("#comparison-individual").length !=0)
			{
				//var div2 = document.getElementById("comparison-cumulative");
				//div2.parentNode.removeChild(div2);
				$( "#comparison-individual" ).remove();
			}			
			
			if($("#content-cumulative").length != 0)
			{
				$("#content-cumulative").remove();
				
			}
			
			if($("#content-cumulative-pp").length != 0)
			{
				$("#content-cumulative-pp").remove();
				
			}
			
			var emptyData = [];
			
			$.plot("#placeholder-daily", emptyData, {
					
					legend : {
						noColumns : 0,
						container : $("#legendcontainer-daily")
					},
	
				});
			$.plot("#placeholder-daily-pp", emptyData, {
					
					legend : {
						noColumns : 0,
						container : $("#legendcontainer-daily-pp")
					},
	
				});
				
        }//end if(variable1_id==-1 && variable2_id==-1)
        
        else if( (variable1_id==-1 && variable2_id!=-1) || (variable1_id!=-1 && variable2_id==-1)  )
        {
        	
        	//alert("one side");
        	
        	if(variable1_id!=-1)
        	{
        		if(typeVar1=="binary")
        		{
 					
 					
					if ($("#content-cumulative").length == 0)
					{
						$("<div id='content-cumulative' name='content-cumulative'> <div class='demo-container'> <div id='legendcontainer-cumulative'></div> <div id='placeholder-cumulative' class='demo-placeholder'></div> </div> <span id='hoverdata'></span> <span id='clickdata'></span> </div>").appendTo("#show-cumulative-charts");
					}
					
					if ($("#content-cumulative-pp").length == 0)
					{
						//alert("content-cumulative-p not there");
						$("<div id='content-cumulative-pp' name='content-cumulative-pp'> <div class='demo-container'> <div id='legendcontainer-cumulative-pp'></div> <div id='placeholder-cumulative-pp' class='demo-placeholder'></div> </div> <span id='hoverdata'></span> <span id='clickdata'></span> </div>").appendTo("#show-cumulative-pp-charts");
					} 
					 
						var d1 = [];
						var d2 = [];					
						
						/*
						 *  Daily visualization for all participants
						 */	
						
						for(var i=0; i< values1.length; i++)
						{
							//alert("values1[i]="+values1[i]);
							
							if(values1[i]==1)
								d1.push([i, 1]);
								
							if(values1[i]==0)
								d2.push([i, 1]);							
						}//end for
						
						//alert("values1.length="+values1.length);
						//alert("times.length="+times.length);
						//alert("d1.length="+times.length);
						
						var xlabels = [];
						for (var i = 0; i < times.length; ++i) {
							//alert("times[0]="+times[0]);
							var xlabel = [];
							xlabel.push(i, times[i]);
							xlabels.push(xlabel);
						}//end for
			
						var ylabels = [];
						ylabels[0] = nameVar1 + " Yes";
						ylabels[1] = nameVar1 + " No";
						
						var data = [{
							data : d1,
							label : nameVar1 + " Yes",
							//color : "blue"
						}, {
							data : d2,
							label : nameVar1 + " No",
							//color : "red"
						}];
			
						var placeholder = $("#placeholder-daily");
						var plot = $.plot(placeholder, data, {
							bars : {
								show : true,
								barWidth : 0.5,
								fill : 0.9
							},
							xaxis : {
								tickLength : 0,
								//min: 0.5,
								//max: ticks.length+0.5,
								ticks : xlabels,
								rotateTicks : 90,
								panRange: [-0.1, times.length],
							},
							yaxis : {
								//ticks : [[0.5, "Yes"], [-0.5, "No"]],
								//axisLabel : nameVar1,
								panRange: false,
							},
			
							grid : {
								hoverable : true,
								clickable : true
							},
							legend : {
								noColumns : 0,
								container : $("#legendcontainer-daily")
							},
							pan: {
								interactive: true
							},
			
						});
	
						$("<div id='tooltip'></div>").css({
							position : "absolute",
							display : "none",
							border : "1px solid #fdd",
							padding : "2px",
							"background-color" : "#fee",
							opacity : 0.80
						}).appendTo("body");
			
						placeholder.bind("plothover", function(event, pos, item) {
			
							//    if ($("#enablePosition:checked").length > 0)
							{
								var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
								//$("#hoverdata").text(str);
							}
			
							//if ($("#enableTooltip:checked").length > 0)
							{
								if (item) {
									var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
			
									$("#tooltip").html(item.series.label).css({
										top : item.pageY + 5,
										left : item.pageX + 5
									}).fadeIn(200);
			
								} else {
									$("#tooltip").hide();
								}
							}
						});
			
						placeholder.bind("plotclick", function(event, pos, item) {
							if (item) {
								//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
			
								$("#tooltip").html(item.series.label).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
			
								plot.highlight(item.series, item.datapoint);
							}
						});
						
						
						/*
						 * Cumulative visualization 
						 */
						
						
						var dc1 = [];
						var dc2 = [];
			
						var count1 = 0;
						var count2 = 0;
			
						for (var i = 0; i < times.length; ++i) 
						{
							if (values1[i] == 1)  
							{
								count1++;
							}
			
							if (values1[i] == 0) 
							{
								count2++;
							}
						}//end for
			
						dc1.push([0, count1]);
						dc2.push([2, count2]);

						var xlabels = [];
						
						var xlabel1 = [];
						xlabel1.push(0, nameVar1+"? Yes");
						xlabels.push(xlabel1);
						
						var xlabel2 = [];
						xlabel2.push(2, nameVar1+"? No");
						xlabels.push(xlabel2);
													
	
						var data = [{
							data : dc1,
							label : nameVar1 + " Yes",
							//color : "blue"
						}, {
							data : dc2,
							label : nameVar1 + " No",
							//color : "red"
						}];
			
						var placeholder = $("#placeholder-cumulative");
						var plot = $.plot(placeholder, data, {
							bars : {
								show : true,
								barWidth : 0.5,
								fill : 0.9
							},
							xaxis : {
								tickLength : 0,
								//min: 0.5,
								//max: ticks.length+0.5,
								ticks : xlabels,
								rotateTicks : 90,
								panRange: false,
							},
							yaxis : {
								//ticks : [[0.5, "Yes"], [-0.5, "No"]],
								//axisLabel : nameVar1,
								panRange: false,
							},
			
							grid : {
								hoverable : true,
								clickable : true
							},
							legend : {
								noColumns : 0,
								container : $("#legendcontainer-cumulative")
							},
							pan: {
								interactive: true
							},
			
						});
	
						$("<div id='tooltip'></div>").css({
							position : "absolute",
							display : "none",
							border : "1px solid #fdd",
							padding : "2px",
							"background-color" : "#fee",
							opacity : 0.80
						}).appendTo("body");
			
						placeholder.bind("plothover", function(event, pos, item) {
			
							//    if ($("#enablePosition:checked").length > 0)
							{
								var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
								//$("#hoverdata").text(str);
							}
			
							//if ($("#enableTooltip:checked").length > 0)
							{
								if (item) {
									var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
			
									$("#tooltip").html(item.series.label).css({
										top : item.pageY + 5,
										left : item.pageX + 5
									}).fadeIn(200);
			
								} else {
									$("#tooltip").hide();
								}
							}
						});
			
						placeholder.bind("plotclick", function(event, pos, item) {
							if (item) {
								//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
			
								$("#tooltip").html(item.series.label).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
			
								plot.highlight(item.series, item.datapoint);
							}
						});
						
						/*
						 * Daily visualizations per participant
						 */
						
						for(var i=0; i< valuesPP1.length; i++)
						{
							//alert("values1[i]="+values1[i]);
							
							if(valuesPP1[i]==1)
								d1.push([i, 1]);
								
							if(valuesPP1[i]==0)
								d2.push([i, 1]);							
						}//end for
						
						//alert("values1.length="+values1.length);
						//alert("times.length="+times.length);
						//alert("d1.length="+times.length);
						
						var xlabels = [];
						for (var i = 0; i < timesPP.length; ++i) {
							//alert("times[0]="+times[0]);
							var xlabel = [];
							xlabel.push(i, times[i]);
							xlabels.push(xlabel);
						}//end for
			
						var ylabels = [];
						ylabels[0] = nameVar1 + " Yes";
						ylabels[1] = nameVar1 + " No";
						
						var data = [{
							data : d1,
							label : nameVar1 + " Yes",
							//color : "blue"
						}, {
							data : d2,
							label : nameVar1 + " No",
							//color : "red"
						}];
			
						var placeholder = $("#placeholder-daily-pp");
						var plot = $.plot(placeholder, data, {
							bars : {
								show : true,
								barWidth : 0.5,
								fill : 0.9
							},
							xaxis : {
								tickLength : 0,
								//min: 0.5,
								//max: ticks.length+0.5,
								ticks : xlabels,
								rotateTicks : 90,
								panRange: [-0.1, times.length],
							},
							yaxis : {
								//ticks : [[0.5, "Yes"], [-0.5, "No"]],
								//axisLabel : nameVar1,
								panRange: false,
							},
			
							grid : {
								hoverable : true,
								clickable : true
							},
							legend : {
								noColumns : 0,
								container : $("#legendcontainer-daily-pp")
							},
							pan: {
								interactive: true
							},
			
						});
	
						$("<div id='tooltip'></div>").css({
							position : "absolute",
							display : "none",
							border : "1px solid #fdd",
							padding : "2px",
							"background-color" : "#fee",
							opacity : 0.80
						}).appendTo("body");
			
						placeholder.bind("plothover", function(event, pos, item) {
			
							//    if ($("#enablePosition:checked").length > 0)
							{
								var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
								//$("#hoverdata").text(str);
							}
			
							//if ($("#enableTooltip:checked").length > 0)
							{
								if (item) {
									var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
			
									$("#tooltip").html(item.series.label).css({
										top : item.pageY + 5,
										left : item.pageX + 5
									}).fadeIn(200);
			
								} else {
									$("#tooltip").hide();
								}
							}
						});
			
						placeholder.bind("plotclick", function(event, pos, item) {
							if (item) {
								//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
			
								$("#tooltip").html(item.series.label).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
			
								plot.highlight(item.series, item.datapoint);
							}
						});					
						
						
						/*
						 * Cumulative visualization per participant
						 */
						
						
						var dc1 = [];
						var dc2 = [];
			
						var count1 = 0;
						var count2 = 0;
			
						for (var i = 0; i < timesPP.length; ++i) 
						{
							if (valuesPP1[i] == 1)  
							{
								count1++;
							}
			
							if (valuesPP1[i] == 0) 
							{
								count2++;
							}
						}//end for
			
						dc1.push([0, count1]);
						dc2.push([2, count2]);
						
						
						
						
						var xlabels = [];
						
						var xlabel1 = [];
						xlabel1.push(0, nameVar1+"? Yes");
						xlabels.push(xlabel1);
						
						var xlabel2 = [];
						xlabel2.push(2, nameVar1+"? No");
						xlabels.push(xlabel2);
													
	
						var data = [{
							data : dc1,
							label : nameVar1 + " Yes",
							//color : "blue"
						}, {
							data : dc2,
							label : nameVar1 + " No",
							//color : "red"
						}];
			
						var placeholder = $("#placeholder-cumulative-pp");
						var plot = $.plot(placeholder, data, {
							bars : {
								show : true,
								barWidth : 0.5,
								fill : 0.9
							},
							xaxis : {
								tickLength : 0,
								//min: 0.5,
								//max: ticks.length+0.5,
								ticks : xlabels,
								rotateTicks : 90,
								panRange: false,
							},
							yaxis : {
								//ticks : [[0.5, "Yes"], [-0.5, "No"]],
								//axisLabel : nameVar1,
								panRange: false,
							},
			
							grid : {
								hoverable : true,
								clickable : true
							},
							legend : {
								noColumns : 0,
								container : $("#legendcontainer-cumulative-pp")
							},
							pan: {
								interactive: true
							},
			
						});
	
						$("<div id='tooltip'></div>").css({
							position : "absolute",
							display : "none",
							border : "1px solid #fdd",
							padding : "2px",
							"background-color" : "#fee",
							opacity : 0.80
						}).appendTo("body");
			
						placeholder.bind("plothover", function(event, pos, item) {
			
							//    if ($("#enablePosition:checked").length > 0)
							{
								var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
								//$("#hoverdata").text(str);
							}
			
							//if ($("#enableTooltip:checked").length > 0)
							{
								if (item) {
									var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
			
									$("#tooltip").html(item.series.label+"="+y).css({
										top : item.pageY + 5,
										left : item.pageX + 5
									}).fadeIn(200);
			
								} else {
									$("#tooltip").hide();
								}
							}
						});
			
						placeholder.bind("plotclick", function(event, pos, item) {
							if (item) {
								//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
			
								$("#tooltip").html(item.series.label+"="+y).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
			
								plot.highlight(item.series, item.datapoint);
							}
						});					

        		}//end if(typeVar1=="binary")
         		
         		if(typeVar1=="score")
        		{
        			if($("#content-cumulative").length != 0)
					{
						$("#content-cumulative").remove();
						
					}
					
					if($("#content-cumulative-pp").length != 0)
					{
						$("#content-cumulative-pp").remove();
						
					}
					

					var d1 = [];
					var d2 = [];
		
					var xlabels = [];
		
					for (var i = 0; i < times.length; ++i) {
						//alert("times[0]="+times[0]);
						var xlabel = [];
						xlabel.push(i, times[i]);
						xlabels.push(xlabel);
		
						d1.push([i, values1[i]]);
		
					}
		
					var ylabels = [];
					ylabels[0] = nameVar1 + " Yes";
					ylabels[1] = nameVar1 + " No";
		
					var data = [{
						data : d1,
						label : nameVar1,
						//color : "blue"
					}];
		
					var placeholder = $("#placeholder-daily");
		
					var plot = $.plot(placeholder, data, {
						lines : {
							show : true
						},
						points : {
							show : true
						},
						xaxis : //{ ticks: xlabels, autoscaleMargin: 1},
		
						{
		
							tickLength : 0,
							//min: 0.5,
							//max: ticks.length+0.5,
							ticks : xlabels,
							rotateTicks : 90,
							panRange: [-0.2, times.length],
		
						},
						yaxis : {
							panRange: false,
						}, 
						grid : {
							hoverable : true,
							clickable : true
						},
						legend : {
							noColumns : 0,
							container : $("#legendcontainer-daily")
						},
						pan: {
							interactive: true
						},
		
					});
		
					$("<div id='tooltip'></div>").css({
						position : "absolute",
						display : "none",
						border : "1px solid #fdd",
						padding : "2px",
						"background-color" : "#fee",
						opacity : 0.80
					}).appendTo("body");
		
					placeholder.bind("plothover", function(event, pos, item) {
		
						//    if ($("#enablePosition:checked").length > 0)
						{
							var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
							//$("#hoverdata").text(str);
						}
		
						//if ($("#enableTooltip:checked").length > 0)
						{
							if (item) {
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
								$("#tooltip").html(item.series.label + " = " + y).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
		
							} else {
								$("#tooltip").hide();
							}
						}
					});
		
					placeholder.bind("plotclick", function(event, pos, item) {
						if (item) {
							//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
							$("#tooltip").html(item.series.label + " = " + y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
		
							plot.highlight(item.series, item.datapoint);
						}
					});

					
					/*
					 * Daily visualization per participant
					 * 
					 */
					
					var d1 = [];
					var d2 = [];
		
					var xlabels = [];
		
					for (var i = 0; i < timesPP.length; ++i) {
						//alert("times[0]="+times[0]);
						var xlabel = [];
						xlabel.push(i, timesPP[i]);
						xlabels.push(xlabel);
		
						d1.push([i, valuesPP1[i]]);
		
					}
		
					var ylabels = [];
					ylabels[0] = nameVar1 + " Yes";
					ylabels[1] = nameVar1 + " No";
		
					var data = [{
						data : d1,
						label : nameVar1,
						//color : "blue"
					}];
		
					var placeholder = $("#placeholder-daily-pp");
		
					var plot = $.plot(placeholder, data, {
						lines : {
							show : true
						},
						points : {
							show : true
						},
						xaxis : //{ ticks: xlabels, autoscaleMargin: 1},
		
						{
		
							tickLength : 0,
							//min: 0.5,
							//max: ticks.length+0.5,
							ticks : xlabels,
							rotateTicks : 90,
							panRange: [-0.2, times.length],
		
						},
						yaxis : {
							panRange: false,
						}, 
						grid : {
							hoverable : true,
							clickable : true
						},
						legend : {
							noColumns : 0,
							container : $("#legendcontainer-daily-pp")
						},
						pan: {
							interactive: true
						},
		
					});
		
					$("<div id='tooltip'></div>").css({
						position : "absolute",
						display : "none",
						border : "1px solid #fdd",
						padding : "2px",
						"background-color" : "#fee",
						opacity : 0.80
					}).appendTo("body");
		
					placeholder.bind("plothover", function(event, pos, item) {
		
						//    if ($("#enablePosition:checked").length > 0)
						{
							var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
							//$("#hoverdata").text(str);
						}
		
						//if ($("#enableTooltip:checked").length > 0)
						{
							if (item) {
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
								$("#tooltip").html(item.series.label + " = " + y).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
		
							} else {
								$("#tooltip").hide();
							}
						}
					});
		
					placeholder.bind("plotclick", function(event, pos, item) {
						if (item) {
							//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
							$("#tooltip").html(item.series.label + " = " + y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
		
							plot.highlight(item.series, item.datapoint);
						}
					});
					
					
					
					
					
        		}//end if(typeVar1=="score") 
        		
         		if(typeVar1=="count")
        		{
        			if($("#content-cumulative").length != 0)
					{
						$("#content-cumulative").remove();
						
					}
					
					if($("#content-cumulative-pp").length != 0)
					{
						$("#content-cumulative-pp").remove();
						
					}
					
					

					var d1 = [];
					var d2 = [];
		
					var xlabels = [];
		
					for (var i = 0; i < times.length; ++i) {
						//alert("times[0]="+times[0]);
						var xlabel = [];
						xlabel.push(i, times[i]);
						xlabels.push(xlabel);
		
						d1.push([i, values1[i]]);
		
					}
		
					var ylabels = [];
					ylabels[0] = nameVar1 + " Yes";
					ylabels[1] = nameVar1 + " No";
		
					var data = [{
						data : d1,
						label : nameVar1,
						//color : "blue"
					}];
		
					var placeholder = $("#placeholder-daily");
		
					var plot = $.plot(placeholder, data, {
						lines : {
							show : true
						},
						points : {
							show : true
						},
						xaxis : //{ ticks: xlabels, autoscaleMargin: 1},
		
						{
		
							tickLength : 0,
							//min: 0.5,
							//max: ticks.length+0.5,
							ticks : xlabels,
							rotateTicks : 90,
							panRange: [-0.2, times.length],
		
						},
						yaxis : {
							panRange: false,
						}, 
						grid : {
							hoverable : true,
							clickable : true
						},
						legend : {
							noColumns : 0,
							container : $("#legendcontainer-daily")
						},
						pan: {
							interactive: true
						},
		
					});
		
					$("<div id='tooltip'></div>").css({
						position : "absolute",
						display : "none",
						border : "1px solid #fdd",
						padding : "2px",
						"background-color" : "#fee",
						opacity : 0.80
					}).appendTo("body");
		
					placeholder.bind("plothover", function(event, pos, item) {
		
						//    if ($("#enablePosition:checked").length > 0)
						{
							var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
							//$("#hoverdata").text(str);
						}
		
						//if ($("#enableTooltip:checked").length > 0)
						{
							if (item) {
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
								$("#tooltip").html(item.series.label + " = " + y).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
		
							} else {
								$("#tooltip").hide();
							}
						}
					});
		
					placeholder.bind("plotclick", function(event, pos, item) {
						if (item) {
							//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
							$("#tooltip").html(item.series.label + " = " + y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
		
							plot.highlight(item.series, item.datapoint);
						}
					});

					
					/*
					 * Daily visualization per participant
					 * 
					 */
					
					var d1 = [];
					var d2 = [];
		
					var xlabels = [];
		
					for (var i = 0; i < timesPP.length; ++i) {
						//alert("times[0]="+times[0]);
						var xlabel = [];
						xlabel.push(i, timesPP[i]);
						xlabels.push(xlabel);
		
						d1.push([i, valuesPP1[i]]);
		
					}
		
					var ylabels = [];
					ylabels[0] = nameVar1 + " Yes";
					ylabels[1] = nameVar1 + " No";
		
					var data = [{
						data : d1,
						label : nameVar1,
						//color : "blue"
					}];
		
					var placeholder = $("#placeholder-daily-pp");
		
					var plot = $.plot(placeholder, data, {
						lines : {
							show : true
						},
						points : {
							show : true
						},
						xaxis : //{ ticks: xlabels, autoscaleMargin: 1},
		
						{
		
							tickLength : 0,
							//min: 0.5,
							//max: ticks.length+0.5,
							ticks : xlabels,
							rotateTicks : 90,
							panRange: [-0.2, times.length],
		
						},
						yaxis : {
							panRange: false,
						}, 
						grid : {
							hoverable : true,
							clickable : true
						},
						legend : {
							noColumns : 0,
							container : $("#legendcontainer-daily-pp")
						},
						pan: {
							interactive: true
						},
		
					});
		
					$("<div id='tooltip'></div>").css({
						position : "absolute",
						display : "none",
						border : "1px solid #fdd",
						padding : "2px",
						"background-color" : "#fee",
						opacity : 0.80
					}).appendTo("body");
		
					placeholder.bind("plothover", function(event, pos, item) {
		
						//    if ($("#enablePosition:checked").length > 0)
						{
							var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
							//$("#hoverdata").text(str);
						}
		
						//if ($("#enableTooltip:checked").length > 0)
						{
							if (item) {
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
								$("#tooltip").html(item.series.label + " = " + y).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
		
							} else {
								$("#tooltip").hide();
							}
						}
					});
		
					placeholder.bind("plotclick", function(event, pos, item) {
						if (item) {
							//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
							$("#tooltip").html(item.series.label + " = " + y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
		
							plot.highlight(item.series, item.datapoint);
						}
					});
					
					
					
										
					
					
					
        		}//end if(typeVar1=="count")       		    		
        	}//end if(variable1_id!=-1)
        	if(variable2_id!=-1)
        	{
         		if(typeVar2=="binary")
        		{
					if ($("#content-cumulative").length == 0)
					{
						$("<div id='content-cumulative' name='content-cumulative'> <div class='demo-container'> <div id='legendcontainer-cumulative'></div> <div id='placeholder-cumulative' class='demo-placeholder'></div> </div> <span id='hoverdata'></span> <span id='clickdata'></span> </div>").appendTo("#show-cumulative-charts");
					}
					
					if ($("#content-cumulative-pp").length == 0)
					{
						$("<div id='content-cumulative-pp' name='content-cumulative-pp'> <div class='demo-container'> <div id='legendcontainer-cumulative-pp'></div> <div id='placeholder-cumulative-pp' class='demo-placeholder'></div> </div> <span id='hoverdata'></span> <span id='clickdata'></span> </div>").appendTo("#show-cumulative-pp-charts");
					} 
					 
						var d1 = [];
						var d2 = [];					
						
						/*
						 *  Daily visualization for all participants
						 */	
						
						for(var i=0; i< values2.length; i++)
						{
							//alert("values1[i]="+values1[i]);
							
							if(values2[i]==1)
								d1.push([i, 1]);
								
							if(values2[i]==0)
								d2.push([i, 1]);							
						}//end for
						
						//alert("values1.length="+values1.length);
						//alert("times.length="+times.length);
						//alert("d1.length="+times.length);
						
						var xlabels = [];
						for (var i = 0; i < times.length; ++i) {
							//alert("times[0]="+times[0]);
							var xlabel = [];
							xlabel.push(i, times[i]);
							xlabels.push(xlabel);
						}//end for
			
						var ylabels = [];
						ylabels[0] = nameVar2 + " Yes";
						ylabels[1] = nameVar2 + " No";
						
						var data = [{
							data : d1,
							label : nameVar2 + " Yes",
							//color : "blue"
						}, {
							data : d2,
							label : nameVar2 + " No",
							//color : "red"
						}];
			
						var placeholder = $("#placeholder-daily");
						var plot = $.plot(placeholder, data, {
							bars : {
								show : true,
								barWidth : 0.5,
								fill : 0.9
							},
							xaxis : {
								tickLength : 0,
								//min: 0.5,
								//max: ticks.length+0.5,
								ticks : xlabels,
								rotateTicks : 90,
								panRange: [-0.1, times.length],
							},
							yaxis : {
								//ticks : [[0.5, "Yes"], [-0.5, "No"]],
								//axisLabel : nameVar1,
								panRange: false,
							},
			
							grid : {
								hoverable : true,
								clickable : true
							},
							legend : {
								noColumns : 0,
								container : $("#legendcontainer-daily")
							},
							pan: {
								interactive: true
							},
			
						});
	
						$("<div id='tooltip'></div>").css({
							position : "absolute",
							display : "none",
							border : "1px solid #fdd",
							padding : "2px",
							"background-color" : "#fee",
							opacity : 0.80
						}).appendTo("body");
			
						placeholder.bind("plothover", function(event, pos, item) {
			
							//    if ($("#enablePosition:checked").length > 0)
							{
								var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
								//$("#hoverdata").text(str);
							}
			
							//if ($("#enableTooltip:checked").length > 0)
							{
								if (item) {
									var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
			
									$("#tooltip").html(item.series.label).css({
										top : item.pageY + 5,
										left : item.pageX + 5
									}).fadeIn(200);
			
								} else {
									$("#tooltip").hide();
								}
							}
						});
			
						placeholder.bind("plotclick", function(event, pos, item) {
							if (item) {
								//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
			
								$("#tooltip").html(item.series.label).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
			
								plot.highlight(item.series, item.datapoint);
							}
						});
						
						
						/*
						 * Cumulative visualization 
						 */
						
						
						var dc1 = [];
						var dc2 = [];
			
						var count1 = 0;
						var count2 = 0;
			
						for (var i = 0; i < times.length; ++i) 
						{
							if (values2[i] == 1)  
							{
								count1++;
							}
			
							if (values2[i] == 0) 
							{
								count2++;
							}
						}//end for
			
						dc1.push([0, count1]);
						dc2.push([2, count2]);
						
						
						
						
						var xlabels = [];
						
						var xlabel1 = [];
						xlabel1.push(0, nameVar2+"? Yes");
						xlabels.push(xlabel1);
						
						var xlabel2 = [];
						xlabel2.push(2, nameVar2+"? No");
						xlabels.push(xlabel2);
													
	
						var data = [{
							data : dc1,
							label : nameVar2 + " Yes",
							//color : "blue"
						}, {
							data : dc2,
							label : nameVar2 + " No",
							//color : "red"
						}];
			
						var placeholder = $("#placeholder-cumulative");
						var plot = $.plot(placeholder, data, {
							bars : {
								show : true,
								barWidth : 0.5,
								fill : 0.9
							},
							xaxis : {
								tickLength : 0,
								//min: 0.5,
								//max: ticks.length+0.5,
								ticks : xlabels,
								rotateTicks : 90,
								panRange: false,
							},
							yaxis : {
								//ticks : [[0.5, "Yes"], [-0.5, "No"]],
								//axisLabel : nameVar1,
								panRange: false,
							},
			
							grid : {
								hoverable : true,
								clickable : true
							},
							legend : {
								noColumns : 0,
								container : $("#legendcontainer-cumulative")
							},
							pan: {
								interactive: true
							},
			
						});
	
						$("<div id='tooltip'></div>").css({
							position : "absolute",
							display : "none",
							border : "1px solid #fdd",
							padding : "2px",
							"background-color" : "#fee",
							opacity : 0.80
						}).appendTo("body");
			
						placeholder.bind("plothover", function(event, pos, item) {
			
							//    if ($("#enablePosition:checked").length > 0)
							{
								var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
								//$("#hoverdata").text(str);
							}
			
							//if ($("#enableTooltip:checked").length > 0)
							{
								if (item) {
									var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
			
									$("#tooltip").html(item.series.label).css({
										top : item.pageY + 5,
										left : item.pageX + 5
									}).fadeIn(200);
			
								} else {
									$("#tooltip").hide();
								}
							}
						});
			
						placeholder.bind("plotclick", function(event, pos, item) {
							if (item) {
								//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
			
								$("#tooltip").html(item.series.label).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
			
								plot.highlight(item.series, item.datapoint);
							}
						});
						
						/*
						 * Daily visualizations per participant
						 */
						
						for(var i=0; i< valuesPP2.length; i++)
						{
							//alert("values1[i]="+values1[i]);
							
							if(valuesPP2[i]==1)
								d1.push([i, 1]);
								
							if(valuesPP2[i]==0)
								d2.push([i, 1]);							
						}//end for
						
						//alert("values1.length="+values1.length);
						//alert("times.length="+times.length);
						//alert("d1.length="+times.length);
						
						var xlabels = [];
						for (var i = 0; i < timesPP.length; ++i) {
							//alert("times[0]="+times[0]);
							var xlabel = [];
							xlabel.push(i, times[i]);
							xlabels.push(xlabel);
						}//end for
			
						var ylabels = [];
						ylabels[0] = nameVar2 + " Yes";
						ylabels[1] = nameVar2 + " No";
						
						var data = [{
							data : d1,
							label : nameVar2 + " Yes",
							//color : "blue"
						}, {
							data : d2,
							label : nameVar2 + " No",
							//color : "red"
						}];
			
						var placeholder = $("#placeholder-daily-pp");
						var plot = $.plot(placeholder, data, {
							bars : {
								show : true,
								barWidth : 0.5,
								fill : 0.9
							},
							xaxis : {
								tickLength : 0,
								//min: 0.5,
								//max: ticks.length+0.5,
								ticks : xlabels,
								rotateTicks : 90,
								panRange: [-0.1, times.length],
							},
							yaxis : {
								//ticks : [[0.5, "Yes"], [-0.5, "No"]],
								//axisLabel : nameVar1,
								panRange: false,
							},
			
							grid : {
								hoverable : true,
								clickable : true
							},
							legend : {
								noColumns : 0,
								container : $("#legendcontainer-daily-pp")
							},
							pan: {
								interactive: true
							},
			
						});
	
						$("<div id='tooltip'></div>").css({
							position : "absolute",
							display : "none",
							border : "1px solid #fdd",
							padding : "2px",
							"background-color" : "#fee",
							opacity : 0.80
						}).appendTo("body");
			
						placeholder.bind("plothover", function(event, pos, item) {
			
							//    if ($("#enablePosition:checked").length > 0)
							{
								var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
								//$("#hoverdata").text(str);
							}
			
							//if ($("#enableTooltip:checked").length > 0)
							{
								if (item) {
									var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
			
									$("#tooltip").html(item.series.label).css({
										top : item.pageY + 5,
										left : item.pageX + 5
									}).fadeIn(200);
			
								} else {
									$("#tooltip").hide();
								}
							}
						});
			
						placeholder.bind("plotclick", function(event, pos, item) {
							if (item) {
								//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
			
								$("#tooltip").html(item.series.label).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
			
								plot.highlight(item.series, item.datapoint);
							}
						});					
						
						
						/*
						 * Cumulative visualization per participant
						 */
						
						
						var dc1 = [];
						var dc2 = [];
			
						var count1 = 0;
						var count2 = 0;
			
						for (var i = 0; i < timesPP.length; ++i) 
						{
							if (valuesPP2[i] == 1)  
							{
								count1++;
							}
			
							if (valuesPP2[i] == 0) 
							{
								count2++;
							}
						}//end for
			
						dc1.push([0, count1]);
						dc2.push([2, count2]);
						
						
						
						
						var xlabels = [];
						
						var xlabel1 = [];
						xlabel1.push(0, nameVar2+"? Yes");
						xlabels.push(xlabel1);
						
						var xlabel2 = [];
						xlabel2.push(2, nameVar2+"? No");
						xlabels.push(xlabel2);
													
	
						var data = [{
							data : dc1,
							label : nameVar2 + " Yes",
							//color : "blue"
						}, {
							data : dc2,
							label : nameVar2 + " No",
							//color : "red"
						}];
			
						var placeholder = $("#placeholder-cumulative-pp");
						var plot = $.plot(placeholder, data, {
							bars : {
								show : true,
								barWidth : 0.5,
								fill : 0.9
							},
							xaxis : {
								tickLength : 0,
								//min: 0.5,
								//max: ticks.length+0.5,
								ticks : xlabels,
								rotateTicks : 90,
								panRange: false,
							},
							yaxis : {
								//ticks : [[0.5, "Yes"], [-0.5, "No"]],
								//axisLabel : nameVar1,
								panRange: false,
							},
			
							grid : {
								hoverable : true,
								clickable : true
							},
							legend : {
								noColumns : 0,
								container : $("#legendcontainer-cumulative-pp")
							},
							pan: {
								interactive: true
							},
			
						});
	
						$("<div id='tooltip'></div>").css({
							position : "absolute",
							display : "none",
							border : "1px solid #fdd",
							padding : "2px",
							"background-color" : "#fee",
							opacity : 0.80
						}).appendTo("body");
			
						placeholder.bind("plothover", function(event, pos, item) {
			
							//    if ($("#enablePosition:checked").length > 0)
							{
								var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
								//$("#hoverdata").text(str);
							}
			
							//if ($("#enableTooltip:checked").length > 0)
							{
								if (item) {
									var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
			
									$("#tooltip").html(item.series.label+"="+y).css({
										top : item.pageY + 5,
										left : item.pageX + 5
									}).fadeIn(200);
			
								} else {
									$("#tooltip").hide();
								}
							}
						});
			
						placeholder.bind("plotclick", function(event, pos, item) {
							if (item) {
								//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
			
								$("#tooltip").html(item.series.label+"="+y).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
			
								plot.highlight(item.series, item.datapoint);
							}
						});					
						
					
					
        		}//end if(typeVar2=="binary")         		
         		if(typeVar2=="score")
        		{
        			if($("#content-cumulative").length != 0)
					{
						$("#content-cumulative").remove();
						
					}
					
					if($("#content-cumulative-pp").length != 0)
					{
						$("#content-cumulative-pp").remove();
						
					}
					
					
					
					var d1 = [];
					var d2 = [];
		
					var xlabels = [];
		
					for (var i = 0; i < times.length; ++i) {
						//alert("times[0]="+times[0]);
						var xlabel = [];
						xlabel.push(i, times[i]);
						xlabels.push(xlabel);
		
						d1.push([i, values2[i]]);
		
					}
		
					var ylabels = [];
					ylabels[0] = nameVar2 + " Yes";
					ylabels[1] = nameVar2 + " No";
		
					var data = [{
						data : d1,
						label : nameVar2,
						//color : "blue"
					}];
		
					var placeholder = $("#placeholder-daily");
		
					var plot = $.plot(placeholder, data, {
						lines : {
							show : true
						},
						points : {
							show : true
						},
						xaxis : //{ ticks: xlabels, autoscaleMargin: 1},
		
						{
		
							tickLength : 0,
							//min: 0.5,
							//max: ticks.length+0.5,
							ticks : xlabels,
							rotateTicks : 90,
							panRange: [-0.2, times.length],
		
						},
						yaxis : {
							panRange: false,
						}, 
						grid : {
							hoverable : true,
							clickable : true
						},
						legend : {
							noColumns : 0,
							container : $("#legendcontainer-daily")
						},
						pan: {
							interactive: true
						},
		
					});
		
					$("<div id='tooltip'></div>").css({
						position : "absolute",
						display : "none",
						border : "1px solid #fdd",
						padding : "2px",
						"background-color" : "#fee",
						opacity : 0.80
					}).appendTo("body");
		
					placeholder.bind("plothover", function(event, pos, item) {
		
						//    if ($("#enablePosition:checked").length > 0)
						{
							var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
							//$("#hoverdata").text(str);
						}
		
						//if ($("#enableTooltip:checked").length > 0)
						{
							if (item) {
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
								$("#tooltip").html(item.series.label + " = " + y).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
		
							} else {
								$("#tooltip").hide();
							}
						}
					});
		
					placeholder.bind("plotclick", function(event, pos, item) {
						if (item) {
							//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
							$("#tooltip").html(item.series.label + " = " + y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
		
							plot.highlight(item.series, item.datapoint);
						}
					});

					
					/*
					 * Daily visualization per participant
					 * 
					 */
					
					var d1 = [];
					var d2 = [];
		
					var xlabels = [];
		
					for (var i = 0; i < timesPP.length; ++i) {
						//alert("times[0]="+times[0]);
						var xlabel = [];
						xlabel.push(i, timesPP[i]);
						xlabels.push(xlabel);
		
						d1.push([i, valuesPP2[i]]);
		
					}
		
					var ylabels = [];
					ylabels[0] = nameVar2 + " Yes";
					ylabels[1] = nameVar2 + " No";
		
					var data = [{
						data : d1,
						label : nameVar2,
						//color : "blue"
					}];
		
					var placeholder = $("#placeholder-daily-pp");
		
					var plot = $.plot(placeholder, data, {
						lines : {
							show : true
						},
						points : {
							show : true
						},
						xaxis : //{ ticks: xlabels, autoscaleMargin: 1},
		
						{
		
							tickLength : 0,
							//min: 0.5,
							//max: ticks.length+0.5,
							ticks : xlabels,
							rotateTicks : 90,
							panRange: [-0.2, times.length],
		
						},
						yaxis : {
							panRange: false,
						}, 
						grid : {
							hoverable : true,
							clickable : true
						},
						legend : {
							noColumns : 0,
							container : $("#legendcontainer-daily-pp")
						},
						pan: {
							interactive: true
						},
		
					});
		
					$("<div id='tooltip'></div>").css({
						position : "absolute",
						display : "none",
						border : "1px solid #fdd",
						padding : "2px",
						"background-color" : "#fee",
						opacity : 0.80
					}).appendTo("body");
		
					placeholder.bind("plothover", function(event, pos, item) {
		
						//    if ($("#enablePosition:checked").length > 0)
						{
							var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
							//$("#hoverdata").text(str);
						}
		
						//if ($("#enableTooltip:checked").length > 0)
						{
							if (item) {
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
								$("#tooltip").html(item.series.label + " = " + y).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
		
							} else {
								$("#tooltip").hide();
							}
						}
					});
		
					placeholder.bind("plotclick", function(event, pos, item) {
						if (item) {
							//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
							$("#tooltip").html(item.series.label + " = " + y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
		
							plot.highlight(item.series, item.datapoint);
						}
					});
					
					
					
					
					
					
        		}//end if(typeVar2=="score") 
        		
         		if(typeVar2=="count")
        		{
        			if($("#content-cumulative").length != 0)
					{
						$("#content-cumulative").remove();
						
					}
					
					if($("#content-cumulative-pp").length != 0)
					{
						$("#content-cumulative-pp").remove();
						
					}
					
					
					
					var d1 = [];
					var d2 = [];
		
					var xlabels = [];
		
					for (var i = 0; i < times.length; ++i) {
						//alert("times[0]="+times[0]);
						var xlabel = [];
						xlabel.push(i, times[i]);
						xlabels.push(xlabel);
		
						d1.push([i, values2[i]]);
		
					}
		
					var ylabels = [];
					ylabels[0] = nameVar2 + " Yes";
					ylabels[1] = nameVar2 + " No";
		
					var data = [{
						data : d1,
						label : nameVar2,
						//color : "blue"
					}];
		
					var placeholder = $("#placeholder-daily");
		
					var plot = $.plot(placeholder, data, {
						lines : {
							show : true
						},
						points : {
							show : true
						},
						xaxis : //{ ticks: xlabels, autoscaleMargin: 1},
		
						{
		
							tickLength : 0,
							//min: 0.5,
							//max: ticks.length+0.5,
							ticks : xlabels,
							rotateTicks : 90,
							panRange: [-0.2, times.length],
		
						},
						yaxis : {
							panRange: false,
						}, 
						grid : {
							hoverable : true,
							clickable : true
						},
						legend : {
							noColumns : 0,
							container : $("#legendcontainer-daily")
						},
						pan: {
							interactive: true
						},
		
					});
		
					$("<div id='tooltip'></div>").css({
						position : "absolute",
						display : "none",
						border : "1px solid #fdd",
						padding : "2px",
						"background-color" : "#fee",
						opacity : 0.80
					}).appendTo("body");
		
					placeholder.bind("plothover", function(event, pos, item) {
		
						//    if ($("#enablePosition:checked").length > 0)
						{
							var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
							//$("#hoverdata").text(str);
						}
		
						//if ($("#enableTooltip:checked").length > 0)
						{
							if (item) {
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
								$("#tooltip").html(item.series.label + " = " + y).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
		
							} else {
								$("#tooltip").hide();
							}
						}
					});
		
					placeholder.bind("plotclick", function(event, pos, item) {
						if (item) {
							//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
							$("#tooltip").html(item.series.label + " = " + y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
		
							plot.highlight(item.series, item.datapoint);
						}
					});

					
					/*
					 * Daily visualization per participant
					 * 
					 */
					
					var d1 = [];
					var d2 = [];
		
					var xlabels = [];
		
					for (var i = 0; i < timesPP.length; ++i) {
						//alert("times[0]="+times[0]);
						var xlabel = [];
						xlabel.push(i, timesPP[i]);
						xlabels.push(xlabel);
		
						d1.push([i, valuesPP2[i]]);
		
					}
		
					var ylabels = [];
					ylabels[0] = nameVar2 + " Yes";
					ylabels[1] = nameVar2 + " No";
		
					var data = [{
						data : d1,
						label : nameVar2,
						//color : "blue"
					}];
		
					var placeholder = $("#placeholder-daily-pp");
		
					var plot = $.plot(placeholder, data, {
						lines : {
							show : true
						},
						points : {
							show : true
						},
						xaxis : //{ ticks: xlabels, autoscaleMargin: 1},
		
						{
		
							tickLength : 0,
							//min: 0.5,
							//max: ticks.length+0.5,
							ticks : xlabels,
							rotateTicks : 90,
							panRange: [-0.2, times.length],
		
						},
						yaxis : {
							panRange: false,
						}, 
						grid : {
							hoverable : true,
							clickable : true
						},
						legend : {
							noColumns : 0,
							container : $("#legendcontainer-daily-pp")
						},
						pan: {
							interactive: true
						},
		
					});
		
					$("<div id='tooltip'></div>").css({
						position : "absolute",
						display : "none",
						border : "1px solid #fdd",
						padding : "2px",
						"background-color" : "#fee",
						opacity : 0.80
					}).appendTo("body");
		
					placeholder.bind("plothover", function(event, pos, item) {
		
						//    if ($("#enablePosition:checked").length > 0)
						{
							var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
							//$("#hoverdata").text(str);
						}
		
						//if ($("#enableTooltip:checked").length > 0)
						{
							if (item) {
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
								$("#tooltip").html(item.series.label + " = " + y).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
		
							} else {
								$("#tooltip").hide();
							}
						}
					});
		
					placeholder.bind("plotclick", function(event, pos, item) {
						if (item) {
							//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
							$("#tooltip").html(item.series.label + " = " + y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
		
							plot.highlight(item.series, item.datapoint);
						}
					});
					
					
        		}//end if(typeVar2=="count") 
        		           		
        	}//end if(variable2_id!=-1)

        }//end else if(variable1_id==-1 || variable2_id==-1)
               
        else if(variable1_id!=-1 && variable2_id!=-1)
        {
           
           		if(typeVar1!="binary" && typeVar2!="binary")
				{
					
					if($("#content-cumulative").length != 0)
					{
						$("#content-cumulative").remove();
						
					}
					
					if($("#content-cumulative-pp").length != 0)
					{
						$("#content-cumulative-pp").remove();
						
					}
				}//end if(typeVar1!="binary" && typeVar2!="binary")
				else if(typeVar1=="binary" || typeVar2=="binary")
				{
					
					
						if ($("#content-cumulative").length == 0)
						{
							$("<div id='content-cumulative' name='content-cumulative'> <div class='demo-container'> <div id='legendcontainer-cumulative'></div> <div id='placeholder-cumulative' class='demo-placeholder'></div> </div> <span id='hoverdata'></span> <span id='clickdata'></span> </div>").appendTo("#show-cumulative-charts");
  						}
  						
  						if ($("#content-cumulative-pp").length == 0)
						{
							$("<div id='content-cumulative-pp' name='content-cumulative-pp'> <div class='demo-container'> <div id='legendcontainer-cumulative-pp'></div> <div id='placeholder-cumulative-pp' class='demo-placeholder'></div> </div> <span id='hoverdata'></span> <span id='clickdata'></span> </div>").appendTo("#show-cumulative-pp-charts");
  						}
				}//end if(typeVar1=="binary" || typeVar2=="binary")
 		
          	/*
         		* Daily Visualizations 
         	*/             		
               if (typeVar1 == "binary" && typeVar2 == "binary") 
               {

					var d1 = [];
					var d2 = [];
		
					for (var i = 0; i < times.length; ++i) {
						if (values1[i] == 1 && values2[i] == 1) {
							d1.push([i, 1]);
						}
		
						if (values1[i] == 1 && values2[i] == 0) {
							d1.push([i, -1]);
						}
		
						if (values1[i] == 0 && values2[i] == 1) {
							d2.push([i, 1]);
						}
						if (values1[i] == 0 && values2[i] == 0) {
							d2.push([i, -1]);
						}
		
					}//end for
		
					var xlabels = [];
					for (var i = 0; i < times.length; ++i) {
						//alert("times[0]="+times[0]);
						var xlabel = [];
						xlabel.push(i, times[i]);
						xlabels.push(xlabel);
					}//end for
		
					var ylabels = [];
					ylabels[0] = nameVar2 + " Yes";
					ylabels[1] = nameVar2 + " No";
		
					var data = [{
						data : d1,
						label : nameVar1 + " Yes",
						//color : "blue"
					}, {
						data : d2,
						label : nameVar1 + " No",
						//color : "red"
					}];
		
					var placeholder = $("#placeholder-daily");
					var plot = $.plot(placeholder, data, {
						bars : {
							show : true,
							barWidth : 0.5,
							fill : 0.9
						},
						xaxis : {
							tickLength : 0,
							//min: 0.5,
							//max: ticks.length+0.5,
							ticks : xlabels,
							rotateTicks : 90,
							panRange: [-0.1, times.length],
						},
						yaxis : {
							ticks : [[0.5, "Yes"], [-0.5, "No"]],
							axisLabel : nameVar2,
							panRange: false,
						},
		
						grid : {
							hoverable : true,
							clickable : true
						},
						legend : {
							noColumns : 0,
							container : $("#legendcontainer-daily")
						},
						pan: {
							interactive: true
						},
		
					});
		
					$("<div id='tooltip'></div>").css({
						position : "absolute",
						display : "none",
						border : "1px solid #fdd",
						padding : "2px",
						"background-color" : "#fee",
						opacity : 0.80
					}).appendTo("body");
		
					placeholder.bind("plothover", function(event, pos, item) {
		
						//    if ($("#enablePosition:checked").length > 0)
						{
							var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
							//$("#hoverdata").text(str);
						}
		
						//if ($("#enableTooltip:checked").length > 0)
						{
							if (item) {
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
								if (y == 1)
									y = "Yes";
								else if (y == -1)
									y = "No";
		
								$("#tooltip").html(item.series.label + " , " + nameVar2 + " = " + y).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
		
							} else {
								$("#tooltip").hide();
							}
						}
					});
		
					placeholder.bind("plotclick", function(event, pos, item) {
						if (item) {
							//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
							if (y == 1)
								y = "Yes";
							else if (y == -1)
								y = "No";
		
							$("#tooltip").html(item.series.label + " , " + nameVar2 + " = " + y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
		
							plot.highlight(item.series, item.datapoint);
						}
					});
				}//end if(typeVar1=='binary' && typeVar2=='binary')
				
				else if (typeVar1 == "binary" || typeVar2 == "binary") 
				{
						
						var d1 = [];
						var d2 = [];
						var ylabels = [];
						var label2;
						var yMax = 0;
			
						if (typeVar1 == "binary" && (typeVar2 == "score" || typeVar2 == "count")) 
						{
							label2 = nameVar2;
							ylabels[0] = nameVar1 + " Yes";
							ylabels[1] = nameVar1 + " No";
							for (var i = 0; i < values2.length; ++i) 
							{
			
								if(parseFloat(values2[i]) > yMax)
									yMax = values2[i];
									
								//alert("values2[i]="+values2[i]+", yMax="+yMax);
								
								if (values1[i] == 1)
									d1.push([i, values2[i]]);
			
								if (values1[i] == 0)
									d2.push([i, values2[i]]);
							}//end for
			
						}//end if(typeVar1 == "binary" && (typeVar2== "score" || typeVar2== "count"))
			
						if (typeVar2 == "binary" && (typeVar1 == "score" || typeVar1 == "count")) 
						{
			
							label2 = nameVar1;
							ylabels[0] = nameVar2 + " Yes";
							ylabels[1] = nameVar2 + " No";
							for (var i = 0; i < values1.length; ++i) 
							{
								if(parseFloat(values1[i]) > yMax)
									yMax = values1[i];
									
								//alert("values1[i]="+values1[i]+", yMax="+yMax);
								
								if (values2[i] == 1)
									d1.push([i, values1[i]]);
			
								if (values2[i] == 0)
									d2.push([i, values1[i]]);
							}//end for
						}//end if(typeVar2 == "binary" && (typeVar1== "score" || typeVar1== "count"))
			
			
						var xlabels = [];
			
						for (var i = 0; i < times.length; ++i) {
							//alert("times[0]="+times[0]);
							var xlabel = [];
							xlabel.push(i, times[i]);
							xlabels.push(xlabel);
						}
			
						
						var data = [{
							data : d1,
							label : ylabels[0],
							//color : "blue"
						}, {
							data : d2,
							label : ylabels[1],
							//color : "red"
						}];
						var placeholder = $("#placeholder-daily");
						var plot = $.plot(placeholder, data, {
							bars : {
								show : true,
								barWidth : 0.5,
								fill : 0.9
							},
							xaxis : {
								tickLength : 0,
								//min: 0.5,
								//max: ticks.length+0.5,
								ticks : xlabels,
								rotateTicks : 90,
								panRange: [-0.1, times.length],
							},
							yaxis : {
								axisLabel : label2,
								panRange: false,
							},
			
							grid : {
								hoverable : true,
								clickable : true
							},
							legend : {
								noColumns : 0,
								container : $("#legendcontainer-daily")
							},
							
							pan: {
								interactive: true
							},			
						});
			
						$("<div id='tooltip'></div>").css({
							position : "absolute",
							display : "none",
							border : "1px solid #fdd",
							padding : "2px",
							"background-color" : "#fee",
							opacity : 0.80
						}).appendTo("body");
			
						placeholder.bind("plothover", function(event, pos, item) {
			
							//    if ($("#enablePosition:checked").length > 0)
							{
								var str = "(" + pos.x.toFixed(2) + " , " + pos.y.toFixed(2) + ")";
								//$("#hoverdata").text(str);
							}
			
							//if ($("#enableTooltip:checked").length > 0)
							{
								if (item) {
									var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
			
									$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
										top : item.pageY + 5,
										left : item.pageX + 5
									}).fadeIn(200);
			
								} else {
									$("#tooltip").hide();
								}
							}
						});
			
						placeholder.bind("plotclick", function(event, pos, item) {
							if (item) {
								//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
			
								$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
			
								plot.highlight(item.series, item.datapoint);
							}
						});
			
					}//end else if(typeVar1=="binary" || typeVar2=="binary")
					else if ((typeVar1 == "score" || typeVar1 == "count") && (typeVar2 == "score" || typeVar2 == "count")) {
			
						var d1 = [];
						var d2 = [];
						var yMax = 0;
			
						var xlabels = [];
			
						for (var i = 0; i < times.length; ++i) 
						{
							//alert("times[0]="+times[0]);
							var xlabel = [];
							xlabel.push(i, times[i]);
							xlabels.push(xlabel);
							
							if(parseFloat(values1[i]) > yMax )
								yMax = parseFloat(values1[i]);
								
							if(parseFloat(values2[i]) > yMax )
								yMax = parseFloat(values2[i]);
			
							d1.push([i, values1[i]]);
							d2.push([i, values2[i]]);
			
						}
			
						var ylabels = [];
						ylabels[0] = nameVar2 + " Yes";
						ylabels[1] = nameVar2 + " No";
			
						var data = [{
							data : d1,
							label : nameVar1,
							//color : "blue"
						}, {
							data : d2,
							label : nameVar2,
							//color : "red",
							yaxis : 2
						}];
			
						var placeholder = $("#placeholder-daily");
			
						var plot = $.plot(placeholder, data, {
							lines : {
								show : true
							},
							points : {
								show : true
							},
							xaxis : //{ ticks: xlabels, autoscaleMargin: 1},
			
							{
								tickLength : 0,
								//min: 0.5,
								//max: ticks.length+0.5,
								ticks : xlabels,
								rotateTicks : 90,
								panRange: [-0.1, times.length],
			
							},
							yaxes : [
								{
									min : 0, 
									panRange: false,
								}, 
								{
									position : "right",
									panRange: false,
								} 
								],
							
							//yaxis : {},
			
							
							grid : {
								hoverable : true,
								clickable : true
							},
							legend : {
								noColumns : 0,
								container : $("#legendcontainer-daily")
							},
							
							pan: {
								interactive: true
							},	
			
						});
			
						$("<div id='tooltip'></div>").css({
							position : "absolute",
							display : "none",
							border : "1px solid #fdd",
							padding : "2px",
							"background-color" : "#fee",
							opacity : 0.80
						}).appendTo("body");
			
						placeholder.bind("plothover", function(event, pos, item) {
			
							//    if ($("#enablePosition:checked").length > 0)
							{
								var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
								//$("#hoverdata").text(str);
							}
			
							//if ($("#enableTooltip:checked").length > 0)
							{
								if (item) {
									var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
			
									$("#tooltip").html(item.series.label + " = " + y).css({
										top : item.pageY + 5,
										left : item.pageX + 5
									}).fadeIn(200);
			
								} else {
									$("#tooltip").hide();
								}
							}
						});
			
						placeholder.bind("plotclick", function(event, pos, item) {
							if (item) {
								//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
			
								$("#tooltip").html(item.series.label + " = " + y).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
			
								plot.highlight(item.series, item.datapoint);
							}
						});
			
					}//end else if( (typeVar1== "score" || typeVar1== "count") && (typeVar2== "score" || typeVar2== "count")  )
					
					
					/*
					 * Cumulative visualizations - all participants
					 * 
					 */
					
			if (typeVar1 == "binary" && typeVar2 == "binary") 
			{

					var dc1 = [];
					var dc2 = [];
		
					var count1 = 0;
					var count2 = 0;
					var count3 = 0;
					var count4 = 0;
		
					for (var i = 0; i < times.length; ++i) 
					{
						if (values1[i] == 1 && values2[i] == 1) {
							count1++;
						}
		
						if (values1[i] == 1 && values2[i] == 0) {
							count2++;
						}
		
						if (values1[i] == 0 && values2[i] == 1) {
							count3++;
						}
		
						if (values1[i] == 0 && values2[i] == 0) {
							count4++;
						}
					}//end for
		
					dc1.push([0, count1]);
					dc1.push([3, count2]);
		
					dc2.push([1, count3]);
					dc2.push([4, count4]);
		
					var xlabels1 = [];
					var xlabel1 = [];
					xlabel1.push(1, nameVar2 + ":Yes");
					xlabels1.push(xlabel1);
		
					var xlabel2 = [];
					xlabel2.push(4, nameVar2 + ":No");
					xlabels1.push(xlabel2);
		
					var ylabels = [];
					ylabels[0] = nameVar2 + " Yes";
					ylabels[1] = nameVar2 + " No";
		
					var data = [{
						data : dc1,
						label : nameVar1 + ":Yes",
						//color : "blue"
					}, {
						data : dc2,
						label : nameVar1 + ":No",
						//color : "red"
					}];
		
					var placeholder = $("#placeholder-cumulative");
		
					var plot = $.plot(placeholder, data, {
						bars : {
							show : true,
							barWidth : 1,
							fill : 0.9
						},
						xaxis : {
							ticks : xlabels1,
							autoscaleMargin : 1,
							panRange: [0.0, 12.0],
						},
						yaxis : {
							panRange: false,
						},
						grid : {
							hoverable : true,
							clickable : true
						},
						legend : {
							noColumns : 0,
							container : $("#legendcontainer-cumulative")
						},
						
						pan: {
							interactive: true
						},	

					});
		
					$("<div id='tooltip'></div>").css({
						position : "absolute",
						display : "none",
						border : "1px solid #fdd",
						padding : "2px",
						"background-color" : "#fee",
						opacity : 0.80
					}).appendTo("body");

			placeholder.bind("plothover", function(event, pos, item) 
			{

				//    if ($("#enablePosition:checked").length > 0)
				{
					var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
					//$("#hoverdata").text(str);
				}

				//if ($("#enableTooltip:checked").length > 0)
				{
					if (item) {
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);

						var label2 = nameVar2;

						if (x == 0 || x == 1)
							label2 += "Yes";
						if (x == 3 || x == 4)
							label2 += "No";

						$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);

					} else {
						$("#tooltip").hide();
					}
				}
			});

			placeholder.bind("plotclick", function(event, pos, item) {
				if (item) {
					//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
					var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);

					var label2 = nameVar2;

					if (x == 0 || x == 1)
						label2 += "Yes";
					if (x == 3 || x == 4)
						label2 += "No";

					$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
						top : item.pageY + 5,
						left : item.pageX + 5
					}).fadeIn(200);

					plot.highlight(item.series, item.datapoint);
				}
			});

		}//end if(typeVar1=='binary' && typeVar2=='binary')
		
		else if (typeVar1 == "binary" || typeVar2 == "binary") 
		{

				var d1 = [];
				var d2 = [];
				var ylabels = [];
				var xlabels1 = [];
				var totalCount1 = 0;
				var totalCount2 = 0;
				var avgScore1 = 0;
				var avgScore2 = 0;
				var count1 = 0;
				var count2 = 0;
				var label2;
	
				if (typeVar1 == "binary") {
	
					label2 = nameVar2;
					ylabels[0] = nameVar1 + " Yes";
					ylabels[1] = nameVar1 + " No";
	
					var xlabel1 = [];
					xlabel1.push(0.2, nameVar1 + ":Yes");
					xlabels1.push(xlabel1);
	
					var xlabel2 = [];
					xlabel2.push(1.2, nameVar1 + ":No");
					xlabels1.push(xlabel2);
	
					if (typeVar2 == "score") {
						for (var i = 0; i < values2.length; ++i) {
							if (values1[i] == 1) {
								count1++;
								avgScore1 = parseInt(avgScore1) + parseInt(values2[i]);
							}
							if (values1[i] == 0) {
								count2++;
								avgScore2 = parseInt(avgScore2) + parseInt(values2[i]);
							}
						}//end for
	
						d1.push([0, avgScore1 / count1]);
						d2.push([1, avgScore2 / count2]);
	
					}//end if(typeVar2=="score")
	
					if (typeVar2 == "count") {
						for (var i = 0; i < values2.length; ++i) {
							if (values1[i] == 1) {
								totalCount1 = parseInt(totalCount1) + parseInt(values2[i]);
							}
							if (values1[i] == 0) {
								//alert("parseInt(values2[i]="+parseInt(values2[i]);
								//alert("values2[i]="+values2[i]);
								//alert("totalCount2="+totalCount2);
								totalCount2 = parseInt(totalCount2) + parseInt(values2[i]);
							}
						}//end for
	
						d1.push([0, totalCount1]);
						d2.push([1, totalCount2]);
	
					}//end if(typeVar2=="count")
	
				}//end if(typeVar1 == "binary")
			
			else if (typeVar2 == "binary") {
	
					label2 = nameVar1;
					ylabels[0] = nameVar2 + " Yes";
					ylabels[1] = nameVar2 + " No";
	
					var xlabel1 = [];
					xlabel1.push(0.2, nameVar2 + ":Yes");
					xlabels1.push(xlabel1);
	
					var xlabel2 = [];
					xlabel2.push(1.2, nameVar2 + ":No");
					xlabels1.push(xlabel2);
	
					if (typeVar1 == "score") {
						for (var i = 0; i < values1.length; ++i) {
							if (values2[i] == 1) {
								count1++;
								avgScore1 = parseInt(avgScore1) + parseInt(values1[i]);
							}
							if (values2[i] == 0) {
								count2++;
								avgScore2 = parseInt(avgScore2) + parseInt(values1[i]);
							}
						}//end for
	
						d1.push([0, avgScore1 / count1]);
						d2.push([1, avgScore2 / count2]);
	
					}//end if(typeVar1=="score")
	
					if (typeVar1 == "count") {
						for (var i = 0; i < values1.length; ++i) {
							if (values2[i] == 1) {
								totalCount1 = parseInt(totalCount1) + parseInt(values1[i]);
							}
							if (values2[i] == 0) {
								totalCount2 = parseInt(totalCount2) + parseInt(values1[i]);
							}
						}//end for
	
						d1.push([0, totalCount1]);
						d2.push([1, totalCount2]);
					}//end if(typeVar2=="count")
	
				}
				//end if(typeVar2 == "binary")
	
				var data = [{
					data : d1,
					label : ylabels[0],
					//color : "blue"
				}, {
					data : d2,
					label : ylabels[1],
					//color : "red"
				}];
	
				var placeholder = $("#placeholder-cumulative");
	
				var plot = $.plot(placeholder, data, {
					bars : {
						show : true,
						barWidth : 0.5,
						fill : 0.9
					},
	
					xaxis : {
						ticks : xlabels1,
						autoscaleMargin : 1,
						panRange: [0.0, 4.0],
					},
					yaxis : {
						axisLabel : label2,
						panRange: false,
					},
	
					grid : {
						hoverable : true,
						clickable : true
					},
	
					legend : {
						noColumns : 0,
						container : $("#legendcontainer-cumulative")
					},
					
					pan: {
						interactive: true
					},	
				});
	
				$("<div id='tooltip'></div>").css({
					position : "absolute",
					display : "none",
					border : "1px solid #fdd",
					padding : "2px",
					"background-color" : "#fee",
					opacity : 0.80
				}).appendTo("body");
	
				placeholder.bind("plothover", function(event, pos, item) {
	
					//    if ($("#enablePosition:checked").length > 0)
					{
						var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
						//$("#hoverdata").text(str);
					}
	
					//if ($("#enableTooltip:checked").length > 0)
					{
						if (item) {
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
							if (y == 1)
								y = "Yes";
							else if (y == -1)
								y = "No";
	
							$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
	
						} else {
							$("#tooltip").hide();
						}
					}
				});
	
				placeholder.bind("plotclick", function(event, pos, item) {
					if (item) {
						//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
						if (y == 1)
							y = "Yes";
						else if (y == -1)
							y = "No";
	
						$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);
	
						plot.highlight(item.series, item.datapoint);
					}
				});
	
			}//end else if(typeVar1=="binary" || typeVar2=="binary")
			
			/*
			 * Daily Visualizations - individual
			 */
			
			if (typeVar1 == "binary" && typeVar2 == "binary") 
			{

					var d1 = [];
					var d2 = [];
					var dOne = 0;
					var dTwo = 0;
		
					for (var i = 0; i < timesPP.length; ++i) {
						if (valuesPP1[i] == 1 && valuesPP2[i] == 1) {
							d1.push([i, 1]);
						}
		
						if (valuesPP1[i] == 1 && valuesPP2[i] == 0) {
							d1.push([i, -1]);
						}
		
						if (valuesPP1[i] == 0 && valuesPP2[i] == 1) {
							d2.push([i, 1]);
						}
						if (valuesPP1[i] == 0 && valuesPP2[i] == 0) {
							d2.push([i, -1]);
						}
		
					}//end for
		
					var xlabels = [];
		
					for (var i = 0; i < timesPP.length; ++i) {
						//alert("times[0]="+times[0]);
						var xlabel = [];
						xlabel.push(i, timesPP[i]);
						xlabels.push(xlabel);
					}
		
					var ylabels = [];
					ylabels[0] = nameVar2 + " Yes";
					ylabels[1] = nameVar2 + " No";
		
					var data = [{
						data : d1,
						label : nameVar1 + " Yes",
						//color : "blue"
					}, {
						data : d2,
						label : nameVar1 + " No",
						//color : "red"
					}];
		
					var placeholder = $("#placeholder-daily-pp");
		
					var plot = $.plot(placeholder, data, {
						bars : {
							show : true,
							barWidth : 0.5,
							fill : 0.9
						},
						xaxis : {
							tickLength : 0,
							//min: 0.5,
							//max: ticks.length+0.5,
							ticks : xlabels,
							rotateTicks : 90,
							panRange: [0.0, timesPP.length],
						},
						yaxis : {
							ticks : [[0.5, "Yes"], [-0.5, "No"]],
							axisLabel : nameVar2,
							panRange: false,
						},
						grid : {
							hoverable : true,
							clickable : true
						},
						legend : {
							noColumns : 0,
							container : $("#legendcontainer-daily-pp")
						},
						pan: {
							interactive: true
						},						
					});
		
					$("<div id='tooltip'></div>").css({
						position : "absolute",
						display : "none",
						border : "1px solid #fdd",
						padding : "2px",
						"background-color" : "#fee",
						opacity : 0.80
					}).appendTo("body");
		
					placeholder.bind("plothover", function(event, pos, item) {
		
						//    if ($("#enablePosition:checked").length > 0)
						{
							var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
							//$("#hoverdata").text(str);
						}
		
						//if ($("#enableTooltip:checked").length > 0)
						{
							if (item) {
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
								if (y == 1)
									y = "Yes";
								else if (y == -1)
									y = "No";
		
								$("#tooltip").html(item.series.label + " , " + nameVar2 + " = " + y).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
		
							} else {
								$("#tooltip").hide();
							}
						}
					});
		
					placeholder.bind("plotclick", function(event, pos, item) {
						if (item) {
							//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
							if (y == 1)
								y = "Yes";
							else if (y == -1)
								y = "No";
		
							$("#tooltip").html(item.series.label + " , " + nameVar2 + " = " + y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
		
							plot.highlight(item.series, item.datapoint);
						}
					});
		
				}//end if(typeVar1=='binary' && typeVar2=='binary')
		
		else if (typeVar1 == "binary" || typeVar2 == "binary") {
	
				var d1 = [];
				var d2 = [];
				var ylabels = [];
				var label2;
	
				if (typeVar1 == "binary" && (typeVar2 == "score" || typeVar2 == "count")) {
					label2 = nameVar2;
					ylabels[0] = nameVar1 + " Yes";
					ylabels[1] = nameVar1 + " No";
					for (var i = 0; i < valuesPP2.length; ++i) {
						if (valuesPP1[i] == 1)
							d1.push([i, valuesPP2[i]]);
	
						if (valuesPP1[i] == 0)
							d2.push([i, valuesPP2[i]]);
					}//end for
	
				}//end if(typeVar1 == "binary" && (typeVar2== "score" || typeVar2== "count"))
	
				if (typeVar2 == "binary" && (typeVar1 == "score" || typeVar1 == "count")) {
					label2 = nameVar1;
					ylabels[0] = nameVar2 + " Yes";
					ylabels[1] = nameVar2 + " No";
					for (var i = 0; i < valuesPP1.length; ++i) {
	
						if (valuesPP2[i] == 1)
							d1.push([i, valuesPP1[i]]);
	
						if (valuesPP2[i] == 0)
							d2.push([i, valuesPP1[i]]);
					}//end for
				}//end if(typeVar2 == "binary" && (typeVar1== "score" || typeVar1== "count"))
	
				var xlabels = [];
	
				for (var i = 0; i < timesPP.length; ++i) {
					//alert("times[0]="+times[0]);
					var xlabel = [];
					xlabel.push(i, timesPP[i]);
					xlabels.push(xlabel);
				}
	
				var data = [{
					data : d1,
					label : ylabels[0],
					//color : "blue"
				}, {
					data : d2,
					label : ylabels[1],
					//color : "red"
				}];
	
				var placeholder = $("#placeholder-daily-pp");
	
				var plot = $.plot(placeholder, data, {
					bars : {
						show : true,
						barWidth : 0.5,
						fill : 0.9
					},
	
					xaxis : {
						tickLength : 0,
						//min: 0.5,
						//max: ticks.length+0.5,
						ticks : xlabels,
						rotateTicks : 90,
						panRange: [-0.1, timesPP.length],
	
					},
	
					yaxis : {
						axisLabel : label2,
						panRange: false,
					},
	
					grid : {
						hoverable : true,
						clickable : true
					},
	
					legend : {
						noColumns : 0,
						container : $("#legendcontainer-daily-pp")
					},
					pan: {
						interactive: true
					},	
	
				});
	
				$("<div id='tooltip'></div>").css({
					position : "absolute",
					display : "none",
					border : "1px solid #fdd",
					padding : "2px",
					"background-color" : "#fee",
					opacity : 0.80
				}).appendTo("body");
	
				placeholder.bind("plothover", function(event, pos, item) {
	
					//    if ($("#enablePosition:checked").length > 0)
					{
						var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
						//$("#hoverdata").text(str);
					}
	
					//if ($("#enableTooltip:checked").length > 0)
					{
						if (item) {
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
							if (y == 1)
								y = "Yes";
							else if (y == -1)
								y = "No";
	
							$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
	
						} else {
							$("#tooltip").hide();
						}
					}
				});
	
				placeholder.bind("plotclick", function(event, pos, item) {
					if (item) {
						//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
						if (y == 1)
							y = "Yes";
						else if (y == -1)
							y = "No";
	
						$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);
	
						plot.highlight(item.series, item.datapoint);
					}
				});
	
			}//end else if(typeVar1=="binary" || typeVar2=="binary")
	
			else if ((typeVar1 == "score" || typeVar1 == "count") && (typeVar2 == "score" || typeVar2 == "count")) {
	
				var d1 = [];
				var d2 = [];
	
				var xlabels = [];
	
				for (var i = 0; i < timesPP.length; ++i) {
					//alert("times[0]="+times[0]);
					var xlabel = [];
					xlabel.push(i, timesPP[i]);
					xlabels.push(xlabel);
	
					d1.push([i, valuesPP1[i]]);
					d2.push([i, valuesPP2[i]]);
	
				}
	
				var ylabels = [];
				ylabels[0] = nameVar2 + " Yes";
				ylabels[1] = nameVar2 + " No";
	
				var data = [{
					data : d1,
					label : nameVar1,
					//color : "blue"
				}, {
					data : d2,
					label : nameVar2,
					//color : "red",
					yaxis : 2
				}];
	
				var placeholder = $("#placeholder-daily-pp");
	
				var plot = $.plot(placeholder, data, {
					lines : {
						show : true
					},
					points : {
						show : true
					},
					xaxis : //{ ticks: xlabels, autoscaleMargin: 1},
	
					{
	
						tickLength : 0,
						//min: 0.5,
						//max: ticks.length+0.5,
						ticks : xlabels,
						rotateTicks : 90,
						panRange: [0.0, timesPP.length]
	
					},
					yaxes : [{
						min : 0,
						panRange: false,
					}, {
						position : "right",
						panRange: false,
					}],
	
					grid : {
						hoverable : true,
						clickable : true
					},
					legend : {
						noColumns : 0,
						container : $("#legendcontainer-daily-pp")
					},
					pan: {
						interactive: true
					},						
	
				});
	
				$("<div id='tooltip'></div>").css({
					position : "absolute",
					display : "none",
					border : "1px solid #fdd",
					padding : "2px",
					"background-color" : "#fee",
					opacity : 0.80
				}).appendTo("body");
	
				placeholder.bind("plothover", function(event, pos, item) {
	
					//    if ($("#enablePosition:checked").length > 0)
					{
						var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
						//$("#hoverdata").text(str);
					}
	
					//if ($("#enableTooltip:checked").length > 0)
					{
						if (item) {
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
							$("#tooltip").html(item.series.label + " = " + y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
	
						} else {
							$("#tooltip").hide();
						}
					}
				});
	
				placeholder.bind("plotclick", function(event, pos, item) {
					if (item) {
						//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
						$("#tooltip").html(item.series.label + " = " + y).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);
	
						plot.highlight(item.series, item.datapoint);
					}
				});
	
			}//end else if( (typeVar1== "score" || typeVar1== "count") && (typeVar2== "score" || typeVar2== "count")  )

			/*
			 * Cumulative Visualizations - individual
			*/		
			
			if (typeVar1 == "binary" && typeVar2 == "binary") 
			{

					var dc1 = [];
					var dc2 = [];
		
					var count1 = 0;
					var count2 = 0;
					var count3 = 0;
					var count4 = 0;
		
					for (var i = 0; i < timesPP.length; ++i) 
					{
						if (valuesPP1[i] == 1 && valuesPP2[i] == 1) {
							count1++;
						}
		
						if (valuesPP1[i] == 1 && valuesPP2[i] == 0) {
							count2++;
						}
		
						if (valuesPP1[i] == 0 && valuesPP2[i] == 1) {
							count3++;
						}
		
						if (valuesPP1[i] == 0 && valuesPP2[i] == 0) {
							count4++;
						}
					}
		
					dc1.push([0, count1]);
					dc1.push([3, count2]);
		
					dc2.push([1, count3]);
					dc2.push([4, count4]);
		
					var xlabels1 = [];
					var xlabel1 = [];
					xlabel1.push(1, nameVar2 + ":Yes");
					xlabels1.push(xlabel1);
		
					var xlabel2 = [];
					xlabel2.push(4, nameVar2 + ":No");
					xlabels1.push(xlabel2);
		
					var ylabels = [];
					ylabels[0] = nameVar2 + " Yes";
					ylabels[1] = nameVar2 + " No";
		
					var data = [{
						data : dc1,
						label : nameVar1 + ":Yes",
						//color : "blue"
					}, {
						data : dc2,
						label : nameVar1 + ":No",
						//color : "red"
					}];
		
					//var placeholder = $("#placeholder-cumulative-pp");
		
					var placeholder = $("#placeholder-cumulative-pp");
		
					var plot = $.plot(placeholder, data, {
						bars : {
							show : true,
							barWidth : 1,
							fill : 0.9
						},
						xaxis : {
							ticks : xlabels1,
							autoscaleMargin : 1,
							panRange: [0.0, 10.0],
						},
						yaxis:{panRange:false},
						grid : {
							hoverable : true,
							clickable : true
						},
						legend : {
							noColumns : 0,
							container : $("#legendcontainer-cumulative-pp")
						},
						pan: {
						interactive: true
						},	
					});
		
					$("<div id='tooltip'></div>").css({
						position : "absolute",
						display : "none",
						border : "1px solid #fdd",
						padding : "2px",
						"background-color" : "#fee",
						opacity : 0.80
					}).appendTo("body");
		
					placeholder.bind("plothover", function(event, pos, item) {
		
						//    if ($("#enablePosition:checked").length > 0)
						{
							var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
							//$("#hoverdata").text(str);
						}
		
						//if ($("#enableTooltip:checked").length > 0)
						{
							if (item) {
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
								var label2 = nameVar2;
		
								if (x == 0 || x == 1)
									label2 += "Yes";
								if (x == 3 || x == 4)
									label2 += "No";
		
								$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
		
							} else {
								$("#tooltip").hide();
							}
						}
					});
		
					placeholder.bind("plotclick", function(event, pos, item) {
						if (item) {
							//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
							var label2 = nameVar2;
		
							if (x == 0 || x == 1)
								label2 += "Yes";
							if (x == 3 || x == 4)
								label2 += "No";
		
							$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
		
							plot.highlight(item.series, item.datapoint);
						}
					});
		
				}//end if(typeVar1=='binary' && typeVar2=='binary')
		
				else if (typeVar1 == "binary" || typeVar2 == "binary") 
				{

					var d1 = [];
					var d2 = [];
					var ylabels = [];
					var xlabels1 = [];
					var totalCount1 = 0;
					var totalCount2 = 0;
					var avgScore1 = 0;
					var avgScore2 = 0;
					var count1 = 0;
					var count2 = 0;
					var label2;
		
					if (typeVar1 == "binary") {
						label2 = nameVar2;
						ylabels[0] = nameVar1 + " Yes";
						ylabels[1] = nameVar1 + " No";
		
						var xlabel1 = [];
						xlabel1.push(0.2, nameVar1 + ":Yes");
						xlabels1.push(xlabel1);
		
						var xlabel2 = [];
						xlabel2.push(1.2, nameVar1 + ":No");
						xlabels1.push(xlabel2);
		
						if (typeVar2 == "score") {
							for (var i = 0; i < valuesPP2.length; ++i) {
								if (valuesPP1[i] == 1) {
									count1++;
									avgScore1 = parseInt(avgScore1) + parseInt(valuesPP2[i]);
								}
								if (valuesPP1[i] == 0) {
									count2++;
									avgScore2 = parseInt(avgScore2) + parseInt(valuesPP2[i]);
								}
							}//end for
		
							d1.push([0, avgScore1 / count1]);
							d2.push([1, avgScore2 / count2]);
		
						}//end if(typeVar2=="score")
		
						if (typeVar2 == "count") {
							for (var i = 0; i < valuesPP1.length; ++i) {
								if (valuesPP1[i] == 1) {
									totalCount1 = parseInt(totalCount1) + parseInt(valuesPP2[i]);
								}
		
								if (valuesPP1[i] == 0) {
									totalCount2 = parseInt(totalCount2) + parseInt(valuesPP2[i]);
									//alert("valuesPP2[i]="+valuesPP2[i]);
									//alert("totalCount2="+totalCount2);
		
								}
							}//end for
		
							d1.push([0, totalCount1]);
							d2.push([1, totalCount2]);
		
						}//end if(typeVar2=="count")
		
					}//end if(typeVar1 == "binary")
				
				else if (typeVar2 == "binary") 
				{
						label2 = nameVar1;
						ylabels[0] = nameVar2 + " Yes";
						ylabels[1] = nameVar2 + " No";
		
						var xlabel1 = [];
						xlabel1.push(0.2, nameVar2 + ":Yes");
						xlabels1.push(xlabel1);
		
						var xlabel2 = [];
						xlabel2.push(1.2, nameVar2 + ":No");
						xlabels1.push(xlabel2);
		
						if (typeVar1 == "score") {
							for (var i = 0; i < valuesPP1.length; ++i) {
								if (valuesPP2[i] == 1) {
									count1++;
									avgScore1 = parseInt(avgScore1) + parseInt(valuesPP1[i]);
								}
								if (valuesPP2[i] == 0) {
									count2++;
									avgScore2 = parseInt(avgScore2) + parseInt(valuesPP1[i]);
								}
							}//end for
		
							d1.push([0, avgScore1 / count1]);
							d2.push([1, avgScore2 / count2]);
		
						}//end if(typeVar1=="score")
		
						if (typeVar1 == "count") {
							for (var i = 0; i < valuesPP1.length; ++i) {
								if (valuesPP2[i] == 1) {
									totalCount1 = parseInt(totalCount1) + parseInt(valuesPP1[i]);
								}
								if (valuesPP2[i] == 0) {
									totalCount2 = parseInt(totalCount2) + parseInt(valuesPP1[i]);
								}
							}//end for
		
							d1.push([0, totalCount1]);
							d2.push([1, totalCount2]);
		
						}//end if(typeVar2=="count")
		
					}
					//end if(typeVar2 == "binary")
		
					var data = [{
						data : d1,
						label : ylabels[0],
						//color : "blue"
					}, {
						data : d2,
						label : ylabels[1],
						//color : "red"
					}];
		
					var placeholder = $("#placeholder-cumulative-pp");
		
					var plot = $.plot(placeholder, data, {
						bars : {
							show : true,
							barWidth : 0.5,
							fill : 0.9
						},
		
						xaxis : {
							ticks : xlabels1,
							autoscaleMargin : 1,
							panRange: false,
						},
		
						yaxis : {
							axisLabel : label2,
							panRange: false,
						},
		
						grid : {
							hoverable : true,
							clickable : true
						},
		
						legend : {
							noColumns : 0,
							container : $("#legendcontainer-cumulative-pp")
						},
						pan: {
							interactive: true
						},			
					});
		
					$("<div id='tooltip'></div>").css({
						position : "absolute",
						display : "none",
						border : "1px solid #fdd",
						padding : "2px",
						"background-color" : "#fee",
						opacity : 0.80
					}).appendTo("body");
		
					placeholder.bind("plothover", function(event, pos, item) {
		
						//    if ($("#enablePosition:checked").length > 0)
						{
							var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
							//$("#hoverdata").text(str);
						}
		
						//if ($("#enableTooltip:checked").length > 0)
						{
							if (item) {
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
								if (y == 1)
									y = "Yes";
								else if (y == -1)
									y = "No";
		
								$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
		
							} else {
								$("#tooltip").hide();
							}
						}
					});
		
					placeholder.bind("plotclick", function(event, pos, item) {
						if (item) {
							//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
							if (y == 1)
								y = "Yes";
							else if (y == -1)
								y = "No";
		
							$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
		
							plot.highlight(item.series, item.datapoint);
						}
					});
	
				}//end else if(typeVar1=="binary" || typeVar2=="binary")
				
        }//end if(variable1_id!=-1 && variable2_id!=-1)
}//end loadChart




function showDataPointValues(placeholderString)
{
	var placeholder = $(''+placeholderString+'');
	$("<div id='tooltip'></div>").css({
	position : "absolute",
	display : "none",
	border : "1px solid #fdd",
	padding : "2px",
	"background-color" : "#fee",
		opacity : 0.80
	}).appendTo("body");

	placeholder.bind("plothover", function(event, pos, item) {
	
		//    if ($("#enablePosition:checked").length > 0)
		{
			var str = "(" + pos.x.toFixed(2) + " , " + pos.y.toFixed(2) + ")";
			//$("#hoverdata").text(str);
		}
	
		//if ($("#enableTooltip:checked").length > 0)
		{
			if (item) {
				var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
				$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
					top : item.pageY + 5,
					left : item.pageX + 5
				}).fadeIn(200);
	
			} else {
				$("#tooltip").hide();
			}
		}
	});
	
	placeholder.bind("plotclick", function(event, pos, item) {
		if (item) {
			//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
			var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
			$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
				top : item.pageY + 5,
				left : item.pageX + 5
			}).fadeIn(200);
	
			plot.highlight(item.series, item.datapoint);
		}
	});
}//end showDataPointValues

function hideComparison()
{
    if(comparisonShown==1)
    {
        $('[name="experiment-hide-comparison"]').attr("style", "visibility: hidden");
		$('[name="compare"]').attr("style", "visibility: visible");
        comparisonShown = 0;
  
        //$('[name="comparison-individual"]').attr("style", "visibility: hidden");
        if($("#comparison-individual").length != 0)
        {
        	//var div1 = document.getElementById("comparison-individual");
        	//div1.parentNode.removeChild(div1);
        	$( "#comparison-individual" ).remove();
        }

        if($("#comparison-cumulative").length != 0)
        {
        	$( "#comparison-cumulative" ).remove();
        	//var div2 = document.getElementById("comparison-cumulative");
        	//div2.parentNode.removeChild(div2);
        }
    }
}//end hideComparison()
  
  
function showComparison()
 {
  
 	var variable1 = document.getElementById("shown-variable1").value;
	var variable2 = document.getElementById("shown-variable2").value;
	
     if(comparisonShown==0)
     {
 		$('[name="experiment-hide-comparison"]').attr("style", "visibility: visible");
		//$('[name="compare"]').attr("style", "visibility: hidden");
     	comparisonShown = 1;
     }

	if ($("#comparison-individual").length == 0)
	{
		$("<div id='comparison-individual' name='comparison-individual'> <div class='demo-container'> <div id='legendcontainer-compare'></div> <div id='placeholder-compare' class='demo-placeholder'></div> </div> <span id='hoverdata'></span> <span id='clickdata'></span> </div>").appendTo("#show-comparison-charts");
  	}

  //alert(variable1);
  //alert(variable2);
  //if(variable1 == "-1" && variable2 == "-1")
  //return;
  
	//var variable1_index = <?php echo json_encode($variable_chart1_index)?>;
	//alert(variable1_index);
  
    //alert("times.length="+times.length);
  
	var variable1_index= document.getElementById("shown-variable1").selectedIndex;
  	var variable1_id = variableIds_js[variable1_index];
	//alert(variable1_index);
	//alert(variableIds_js[variable1_index]);
  
	var variable2_index= document.getElementById("shown-variable2").selectedIndex;
	var variable2_id = variableIds_js[variable2_index];
  
	//var typeVar1 =  <?php echo json_encode($variableTypes[$variable1_index]); ?>;
	//var typeVar2 =  <?php echo json_encode($variableTypes[$variable2_index]); ?>;
		
	//var variableTypes_js = <?php echo json_encode($variableTypes)?>;
	
	var nameVar1 = variableNames_js[variable1_index];
	var nameVar2 = variableNames_js[variable2_index];
	
			
	var typeVar1 =  variableTypes_js[variable1_index];
	var typeVar2 =  variableTypes_js[variable2_index];
	
	var experiment_results_start_date = $("#datepicker2").val();
		
				
 	//alert(<?php echo json_encode($variable1_index); ?>);
 	//alert(<?php echo json_encode($variable2_index); ?>);
	/*
 	alert(variable1_index);
 	alert(variable2_index);
 	alert(typeVar1);
	alert(typeVar2);
  */
	if(variable1=="-1")
  		variable1_id = -1;
  
	if(variable2=="-1")
 	 	variable2_id = -1;
  
	//alert(variable1_id);
	//alert(variable2_id);
  
	var friendId = document.getElementById("experiment-members").value;
	//alert(friendId);
	//alert(<?php echo json_encode($variable_chart1_index); ?>);
  
  
	if (window.XMLHttpRequest)
	{
    	// code for IE7+, Firefox, Chrome, Opera, Safari
    	xmlhttp = new XMLHttpRequest();
	}
  	else
  	{
  		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
  
	xmlhttp.onreadystatechange = function()
	{
        //document.getElementById("placeholder-compare1").innerHTML = xmlhttp.responseText;

		//alert("xmlhttp.onreadystatechange");
		
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
    	{
			var response = xmlhttp.responseText;
        	//alert(response);
  
			var obj = jQuery.parseJSON (response);
        	//alert(obj.user_variable1_values);
			//alert(obj.friend_variable1_values);

            //var user_variable1_values = obj.user_variable1_values;
            var friend_variable1_values = obj.friend_variable1_values;
              
            //var user_variable2_values = obj.user_variable2_values;
            var friend_variable2_values = obj.friend_variable2_values;

            var user_variable1_values = valuesPP[variable1_index];
            var user_variable2_values = valuesPP[variable2_index];
            	
			//alert("user_variable1_values=");
              
            var d1 = [];
            var d2 = [];
            var d3 = [];
            var d4 = [];
            
            //alert("variable1_id="+variable1_id);
			//alert("variable2_id="+variable1_id);
            
            if(variable1_id!=-1 && variable2_id!=-1)
            {

            	
            	/*
            	for(var i=0; i< user_variable1_values.length; i++)
            	{
            		alert("user_variable1_values="+user_variable1_values[i]);
            	}
            	*/


            	/*
				var typeVar1 =  <?php echo json_encode($variableTypes[$variable_chart1_index]); ?>;
				var typeVar2 =  <?php echo json_encode($variableTypes[$variable_chart2_index]); ?>;


				alert(<?php echo json_encode($variable_chart1_index); ?>);
				alert(<?php echo json_encode($variable_chart2_index); ?>);
				*/
				//typeVar1 =  variableTypes_js[variable1_index];
				 //typeVar2 =  variableTypes_js[variable2_index];			
				//alert("typeVar1="+typeVar1);
				//alert("typeVar2="+typeVar2);


				//$.plot("#placeholder-compare", [ d1, d2, d3, d4] );
				
				if (typeVar1 == "binary" && typeVar2 == "binary")
				{
					
					
					for (var i = 0; i < user_variable1_values.length; ++i) 
					{
						if (user_variable1_values[i] == 1 && user_variable2_values[i] == 1) {
								d1.push([i, 1]);
							}
			
						if (user_variable1_values[i] == 1 && user_variable2_values[i] == 0) 
						{
								d1.push([i, -1]);
						}
			
						if (user_variable1_values[i] == 0 && user_variable2_values[i] == 1) {
								d3.push([i, 1]);
						}
						if (user_variable1_values[i] == 0 && user_variable2_values[i] == 0) {
								d3.push([i, -1]);
						}

					}//end for
		    		
		    		for (var i = 0; i < friend_variable1_values.length; ++i) 
					{
						if (friend_variable1_values[i] == 1 && friend_variable2_values[i] == 1) 
						{
								d2.push([i+0.2, 1]);
						}
			
						if (friend_variable1_values[i] == 1 && friend_variable2_values[i] == 0) 
						{
								d2.push([i+0.2, -1]);
						}
			
						if (friend_variable1_values[i] == 0 && friend_variable2_values[i] == 1) 
						{
								d4.push([i+0.2, 1]);
						}
						if (friend_variable1_values[i] == 0 && friend_variable2_values[i] == 0) 
						{
								d4.push([i+0.2, -1]);
						}

					}//end for
					
					var xlabels = [];
						
					var max_length = user_variable1_values.length;
					if(friend_variable1_values.length > max_length)
						max_length = friend_variable1_values.length;
						
					for (var i = 0; i < max_length; ++i) 
					{
						//alert("times[0]="+times[0]);
						var xlabel = [];
						xlabel.push(i, "Day "+ (i+1));
						xlabels.push(xlabel);
					}
	
					var ylabels = [];
					ylabels[0] = nameVar2 + "=Yes";
					ylabels[1] = nameVar2 + "=No";
					
					var data = [
					{
						data : d1,
						label : nameVar1 + "=Yes(you)",
						//color : "blue"
					}, 
					
					{
						data : d2,
						label : nameVar1 + "=Yes(friend)",
						//color : "yellow"
					},
					
					{
						data : d3,
						label : nameVar1 + "=No(you)",
						//color : "green"
					},
					
					
					{
						data : d4,
						label : nameVar1 + "=No(friend)",
						//color : "orange"
					}
					
					];
		
					var placeholder = $("#placeholder-compare");
					var plot = $.plot(placeholder, data, {
						bars : {
							show : true,
							barWidth : 0.2,
							fill : 0.9
						},
						xaxis : {
							tickLength : 0,
							//min: 0.5,
							//max: ticks.length+0.5,
							ticks : xlabels,
							rotateTicks : 90,
							
							//zoomRange: [1, 1],
							panRange: [-0.5, max_length]
						},
						yaxis : {
							ticks : [[0.5, "Yes"], [-0.5, "No"]],
							axisLabel : nameVar2,
							//zoomRange: [1,1],
							panRange: false,
						},
		
						grid : {
							hoverable : true,
							clickable : true
						},
						legend : {
							noColumns : 0,
							container : $("#legendcontainer-compare")
						},
						/*
						zoom: {
							interactive: true
						},
						*/
						pan: {
							interactive: true
						},
							
					});
		
					placeholder.bind("plotpan", function (event, plot) {
						var axes = plot.getAxes();
						/*
						$(".message").html("Panning to x: "  + axes.xaxis.min.toFixed(2)
						+ " &ndash; " + axes.xaxis.max.toFixed(2)
						+ " and y: " + axes.yaxis.min.toFixed(2)
						+ " &ndash; " + axes.yaxis.max.toFixed(2));
						*/
					});

					// and add panning buttons
			
			/*
					// little helper for taking the repetitive work out of placing
					// panning arrows
					function addArrow(dir, right, top, offset) {
						$("<img class='button' src='arrow-" + dir + ".gif' style='right:" + right + "px;top:" + top + "px'>")
							.appendTo(placeholder)
							.click(function (e) {
								e.preventDefault();
								plot.pan(offset);
							});
					}
			
					addArrow("left", 55, 60, { left: -100 });
					addArrow("right", 25, 60, { left: 100 });
					addArrow("up", 40, 45, { top: -100 });
					addArrow("down", 40, 75, { top: 100 });		
				*/
				
					$("<div id='tooltip'></div>").css({
						position : "absolute",
						display : "none",
						border : "1px solid #fdd",
						padding : "2px",
						"background-color" : "#fee",
						opacity : 0.80
					}).appendTo("body");
		
					placeholder.bind("plothover", function(event, pos, item) {
		
						//    if ($("#enablePosition:checked").length > 0)
						{
							var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
							//$("#hoverdata").text(str);
						}
		
						//if ($("#enableTooltip:checked").length > 0)
						{
							if (item) {
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
								if (y == 1)
									y = "Yes";
								else if (y == -1)
									y = "No";
		
								$("#tooltip").html(item.series.label + " , " + nameVar2 + " = " + y).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
		
							} else {
								$("#tooltip").hide();
							}
						}
					});
		
					placeholder.bind("plotclick", function(event, pos, item) {
						if (item) {
							//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
							if (y == 1)
								y = "Yes";
							else if (y == -1)
								y = "No";
		
							$("#tooltip").html(item.series.label + " , " + nameVar2 + " = " + y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
		
							plot.highlight(item.series, item.datapoint);
						}
					});	
					
					
					
					/**
					 * Cumulative 
					 */			
					 
					 if ($("#comparison-cumulative").length == 0)
					 {
					 	$("<div id='comparison-cumulative' name='comparison-cumulative'> <div class='demo-container'> <div id='legendcontainer-compare-cumulative'></div> <div id='placeholder-compare-cumulative' class='demo-placeholder'></div> </div> <span id='hoverdata'></span> <span id='clickdata'></span> </div>").appendTo("#show-comparison-charts");
				
					 }
										
					var user_dc1 = [];
					var user_dc2 = [];
					var friend_dc1 = [];
					var friend_dc2 = [];
		
					var count1 = 0;
					var count2 = 0;
					var count3 = 0;
					var count4 = 0;			
					var count5 = 0;
					var count6 = 0;
					var count7 = 0;
					var count8 = 0;	
					
					for (var i = 0; i < user_variable1_values.length; ++i) 
					{
						if (user_variable1_values[i] == 1 && user_variable2_values[i] == 1) 
						{
							count1++;
						}
		
						if (user_variable1_values[i] == 1 && user_variable2_values[i] == 0) {
							count2++;
						}
		
						if (user_variable1_values[i] == 0 && user_variable2_values[i] == 1) {
							count3++;
						}
		
						if (user_variable1_values[i] == 0 && user_variable2_values[i] == 0) {
							count4++;
						}
					}//end for
					
					for (var i = 0; i < friend_variable1_values.length; ++i) 
					{
						if (friend_variable1_values[i] == 1 && friend_variable2_values[i] == 1) 
						{
							count5++;
						}
		
						if (friend_variable1_values[i] == 1 && friend_variable2_values[i] == 0) 
						{
							count6++;
						}
		
						if (friend_variable1_values[i] == 0 && friend_variable2_values[i] == 1) 
						{
							count7++;
						}
		
						if (friend_variable1_values[i] == 0 && friend_variable2_values[i] == 0) 
						{
							count8++;
						}
					}//end for
					
						
						user_dc1.push([0, count1]);
						friend_dc1.push([1, count5]);
						user_dc1.push([5, count2]);
						friend_dc1.push([6, count6]);
						
						user_dc2.push([2, count3]);
						friend_dc2.push([3, count7]);
						user_dc2.push([7, count4]);
						friend_dc2.push([8, count8]);

						
						
						var xlabels1 = [];
						var xlabel1 = [];
						xlabel1.push(1, nameVar2 + "=Yes");
						xlabels1.push(xlabel1);
			
						var xlabel2 = [];
						xlabel2.push(6, nameVar2 + "=No");
						xlabels1.push(xlabel2);
			
						var ylabels = [];
						ylabels[0] = nameVar2 + "=Yes";
						ylabels[1] = nameVar2 + "=No";
			
						var data = [
						{
							data : user_dc1,
							label : nameVar1 + "=Yes(you)",
							//color : "blue"
						}, 
						
														
						{
							data : friend_dc1,
							label : nameVar1 + "=Yes(friend)",
							//color : "yellow"
						}
						
						,
						
						{
							data : user_dc2,
							label : nameVar1 + "=No(you)",
							//color : "green"
						},
					
						{
							data : friend_dc2,
							label : nameVar1 + "=Yes(friend)",
							//color : "orange"
						}	
						
						];
			
						var placeholder = $("#placeholder-compare-cumulative");
			
						var plot = $.plot(placeholder, data, {
							bars : {
								show : true,
								barWidth : 1,
								fill : 0.9
							},
							xaxis : {
								ticks : xlabels1,
								autoscaleMargin : 1
							},
							grid : {
								hoverable : true,
								clickable : true
							},
							legend : {
								noColumns : 0,
								container : $("#legendcontainer-compare-cumulative")
							},
			
						});
			
						$("<div id='tooltip'></div>").css({
							position : "absolute",
							display : "none",
							border : "1px solid #fdd",
							padding : "2px",
							"background-color" : "#fee",
							opacity : 0.80
						}).appendTo("body");
			
						placeholder.bind("plothover", function(event, pos, item) {
			
							//    if ($("#enablePosition:checked").length > 0)
							{
								var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
								//$("#hoverdata").text(str);
							}
			
							//if ($("#enableTooltip:checked").length > 0)
							{
								if (item) {
									var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
			
									var label2 = nameVar2;
			
									if (x >= 0 && x <=4)
										label2 += "=Yes";
									if (x >= 5 || x <= 8)
										label2 += "=No";
			
									$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
										top : item.pageY + 5,
										left : item.pageX + 5
									}).fadeIn(200);
			
								} else {
									$("#tooltip").hide();
								}
							}
						});
			
						placeholder.bind("plotclick", function(event, pos, item) {
							if (item) {
								//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
			
								var label2 = nameVar2;
			
								if (x >= 0 && x <=4)
									label2 += "Yes";
								if (x >= 5 || x <= 8)
									label2 += "No";
			
								$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
			
								plot.highlight(item.series, item.datapoint);
							}
						});

						
						
						
					 
				}//end if (typeVar1 == "binary" && typeVar2 == "binary")
		
				else if ( (typeVar1 == "binary" && typeVar2 != "binary") || (typeVar2 == "binary" && typeVar1 != "binary")   )
				{
					
					/*
					 * Daily visualizations
					 */
					
					var ylabels = [];
					var label2;
					
					//alert(user_variable1_values.length);
					
					if(typeVar1 == "binary" && (typeVar2== "score" || typeVar2=="count"))
					{
		    			label2 = nameVar2;
						ylabels[0] = nameVar1 + "=Yes";
						ylabels[1] = nameVar1 + "=No";

						for (var i = 0; i < user_variable1_values.length; ++i) 
						{
		
							if (user_variable1_values[i] == 1)
								d1.push([i, user_variable2_values[i]]);
		
							if (user_variable1_values[i] == 0)
								d3.push([i, user_variable2_values[i]]);
							
							
						}//end for
						
						for (var i = 0; i < friend_variable1_values.length; ++i) 
						{
		
							if (friend_variable1_values[i] == 1)
								d2.push([i+0.5, friend_variable2_values[i]]);
		
							if (friend_variable1_values[i] == 0)
								d4.push([i+0.5, friend_variable2_values[i]]);
							
						}//end for
						
						
						
						
					}//if(typeVar1 == "binary" && (typeVar2== "score" || typeVar2=="count"))
					
					if(typeVar2 == "binary" && (typeVar1== "score" || typeVar1=="count"))
					{
						label2 = nameVar1;
						ylabels[0] = nameVar2 + "=Yes";
						ylabels[1] = nameVar2 + "=No";
						for (var i = 0; i < user_variable1_values.length; ++i) {
		
							if (user_variable2_values[i] == 1)
								d1.push([i, user_variable1_values[i]]);
		
							if (user_variable2_values[i] == 0)
								d3.push([i, user_variable1_values[i]]);
						}//end for
						
						for (var i = 0; i < friend_variable1_values.length; ++i) {
		
							if (friend_variable2_values[i] == 1)
								d2.push([i+0.5, friend_variable1_values[i]]);
		
							if (friend_variable2_values[i] == 0)
								d4.push([i+0.5, friend_variable1_values[i]]);
						}//end for
						

						
					}//if(typeVar2 == binary && (type2== "score" || type2=="count"))
					
					
						var xlabels = [];
						
						var max_length = user_variable1_values.length;
						if(friend_variable1_values.length > max_length)
							max_length = friend_variable1_values.length;
							
						for (var i = 0; i < max_length; ++i) 
						{
							//alert("times[0]="+times[0]);
							var xlabel = [];
							xlabel.push(i, "Day "+ (i+1));
							xlabels.push(xlabel);
						}

						var data = [
						{
							data : d1,
							label : nameVar1+"=Yes (you)",
							//color : "blue"
						}, 
						
						{
							data : d2,
							label : nameVar1+"=Yes (friend)",
							//color : "yellow"
				
						},
						
						{
							data : d3,
							label : nameVar1+"=No (you)",
							//color : "green"
				
						}
						,
			
						{
							data : d4,
							label : nameVar1+"=No (friend)",
							//color : "orange"
				
						}
						];	
			
						var placeholderString = "#placeholder-compare";
						var placeholder = $(placeholderString);
						//var placeholder = $("#placeholder-compare");
						var options = {
						
								bars : {
									show : true,
									barWidth : 0.4,
									fill : 0.9
								},
								xaxis : {
									tickLength : 0,
									//min: 0.5,
									//max: ticks.length+0.5,
									ticks : xlabels,
									rotateTicks : 90,
									panRange:[-0.5, max_length],
								},
								yaxis : {
									axisLabel : label2,
									panRange: false,
								},
				
								grid : {
									hoverable : true,
									clickable : true
								},
								legend : {
									noColumns : 0,
									container : $("#legendcontainer-compare")
								},
								pan: {
									interactive: true
								},
							};
							
						var plot = $.plot(placeholder, data, options);
							
						//showDataPointValues("#placeholder-compare");

							$("<div id='tooltip'></div>").css({
								position : "absolute",
								display : "none",
								border : "1px solid #fdd",
								padding : "2px",
								"background-color" : "#fee",
								opacity : 0.80
							}).appendTo("body");

							placeholder.bind("plothover", function(event, pos, item) {
				
								//    if ($("#enablePosition:checked").length > 0)
								{
									var str = "(" + pos.x.toFixed(2) + " , " + pos.y.toFixed(2) + ")";
									//$("#hoverdata").text(str);
								}
				
								//if ($("#enableTooltip:checked").length > 0)
								{
									if (item) {
										var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
				
										$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
											top : item.pageY + 5,
											left : item.pageX + 5
										}).fadeIn(200);
				
									} else {
										$("#tooltip").hide();
									}
								}
							});

							placeholder.bind("plotclick", function(event, pos, item) {
								if (item) {
									//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
									var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
				
									$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
										top : item.pageY + 5,
										left : item.pageX + 5
									}).fadeIn(200);
				
									plot.highlight(item.series, item.datapoint);
								}
							});
							
				/*
				 *   Start Cumulative visualization for comparison
				 * 
				 */
				
					if ($("#comparison-cumulative").length == 0)
					{
						$("<div id='comparison-cumulative' name='comparison-cumulative'> <div class='demo-container'> <div id='legendcontainer-compare-cumulative'></div> <div id='placeholder-compare-cumulative' class='demo-placeholder'></div> </div> <span id='hoverdata'></span> <span id='clickdata'></span> </div>").appendTo("#show-comparison-charts");
					}
				
							var data1 = [];
							var data2 = [];
							var data3 = [];
							var data4 = [];
							var ylabels = [];
							var xlabels1 = [];
							var totalCount1 = 0;
							var totalCount2 = 0;
							var totalCount3 = 0;
							var totalCount4 = 0;
							var avgScore1 = 0;
							var avgScore2 = 0;
							var avgScore3 = 0;
							var avgScore4 = 0;
							var count1 = 0;
							var count2 = 0;
							var count3 = 0;
							var count4 = 0;
							var label2;
							
							
							if (typeVar1 == "binary") 
							{

								label2 = nameVar2;
								ylabels[0] = nameVar1 + "=Yes";
								ylabels[1] = nameVar1 + "=No";
				
								var xlabel1 = [];
								xlabel1.push(0.8, nameVar1 + "=Yes");
								xlabels1.push(xlabel1);
				
								var xlabel2 = [];
								xlabel2.push(2.8, nameVar1 + "=No");
								xlabels1.push(xlabel2);
				
								if (typeVar2 == "score") 
								{
									for (var i = 0; i < user_variable2_values.length; ++i) 
									{
										if (user_variable1_values[i] == 1) 
										{
											count1++;
											avgScore1 = parseInt(avgScore1) + parseInt(user_variable2_values[i]);
										}
										if (user_variable1_values[i] == 0) 
										{
											count3++;
											avgScore3 = parseInt(avgScore3) + parseInt(user_variable2_values[i]);
										}
									}//end for
				
				
									for (var i = 0; i < friend_variable2_values.length; ++i) 
									{
										if (friend_variable1_values[i] == 1) 
										{
											count2++;
											avgScore2 = parseInt(avgScore2) + parseInt(friend_variable2_values[i]);
										}
										if (friend_variable1_values[i] == 0) 
										{
											count4++;
											avgScore4 = parseInt(avgScore4) + parseInt(friend_variable2_values[i]);
										}
									}//end for
				
				
									data1.push([0, avgScore1 / count1]);
									data2.push([1, avgScore2 / count2]);
									data3.push([2, avgScore3 / count3]);
									data4.push([3, avgScore4 / count4]);
				
								}//end if(typeVar2=="score")
				
								if (typeVar2 == "count") 
								{
									for (var i = 0; i < user_variable2_values.length; ++i) 
									{
										if (user_variable1_values[i] == 1) {
											totalCount1 = parseInt(totalCount1) + parseInt(user_variable2_values[i]);
										}
										if (user_variable1_values[i] == 0) {
											//alert("parseInt(values2[i]="+parseInt(values2[i]);
											//alert("values2[i]="+values2[i]);
											//alert("totalCount2="+totalCount2);
											totalCount3 = parseInt(totalCount3) + parseInt(user_variable2_values[i]);
										}
									}//end for
									
									for (var i = 0; i < friend_variable2_values.length; ++i) 
									{
										if (friend_variable1_values[i] == 1) {
											totalCount2 = parseInt(totalCount2) + parseInt(friend_variable2_values[i]);
										}
										if (friend_variable1_values[i] == 0) {
											//alert("parseInt(values2[i]="+parseInt(values2[i]);
											//alert("values2[i]="+values2[i]);
											//alert("totalCount2="+totalCount2);
											totalCount4 = parseInt(totalCount4) + parseInt(friend_variable2_values[i]);
										}
									}//end for
									
									data1.push([0, totalCount1]);
									data2.push([1, totalCount2]);
									data3.push([2, totalCount3]);
									data4.push([3, totalCount4]);
									

									}//end if(typeVar2=="count")
					
								}//end if(typeVar1 == "binary")
								
								else if (typeVar2 == "binary") 
								{

									label2 = nameVar1;
									ylabels[0] = nameVar2 + "=Yes";
									ylabels[1] = nameVar2 + "=No";
					
									var xlabel1 = [];
									xlabel1.push(0.8, nameVar2 + "=Yes");
									xlabels1.push(xlabel1);
					
									var xlabel2 = [];
									xlabel2.push(2.8, nameVar2 + "=No");
									xlabels1.push(xlabel2);
					
									if (typeVar1 == "score") 
									{
										for (var i = 0; i < user_variable1_values.length; ++i) 
										{
											if (user_variable2_values[i] == 1) 
											{
												count1++;
												avgScore1 = parseInt(avgScore1) + parseInt(user_variable1_values[i]);
											}
											if (user_variable2_values[i] == 0) 
											{
												count3++;
												avgScore3 = parseInt(avgScore3) + parseInt(user_variable1_values[i]);
											}
										}//end for
					
					
										for (var i = 0; i < friend_variable1_values.length; ++i) 
										{
											if (friend_variable2_values[i] == 1) 
											{
												count2++;
												avgScore2 = parseInt(avgScore2) + parseInt(friend_variable1_values[i]);
											}
											if (friend_variable2_values[i] == 0) 
											{
												count4++;
												avgScore4 = parseInt(avgScore4) + parseInt(friend_variable1_values[i]);
											}
										}//end for
					
					
										data1.push([0, avgScore1 / count1]);
										data2.push([1, avgScore2 / count2]);
										data3.push([2, avgScore3 / count3]);
										data4.push([3, avgScore4 / count4]);
					
									}//end if(typeVar1=="score")
					
									if (typeVar1 == "count") 
									{
										for (var i = 0; i < user_variable1_values.length; ++i) 
										{
											if (user_variable2_values[i] == 1) {
												totalCount1 = parseInt(totalCount1) + parseInt(user_variable1_values[i]);
											}
											if (user_variable2_values[i] == 0) {
												//alert("parseInt(values2[i]="+parseInt(values2[i]);
												//alert("values2[i]="+values2[i]);
												//alert("totalCount2="+totalCount2);
												totalCount3 = parseInt(totalCount3) + parseInt(user_variable1_values[i]);
											}
										}//end for
										
										for (var i = 0; i < friend_variable1_values.length; ++i) 
										{
											if (friend_variable2_values[i] == 1) {
												totalCount2 = parseInt(totalCount2) + parseInt(friend_variable1_values[i]);
											}
											if (friend_variable2_values[i] == 0) {
												//alert("parseInt(values2[i]="+parseInt(values2[i]);
												//alert("values2[i]="+values2[i]);
												//alert("totalCount2="+totalCount2);
												totalCount4 = parseInt(totalCount4) + parseInt(friend_variable1_values[i]);
											}
										}//end for
										
										data1.push([0, totalCount1]);
										data2.push([1, totalCount2]);
										data3.push([2, totalCount3]);
										data4.push([3, totalCount4]);
										

									}//end if(typeVar1=="count")
					
								}//end if(typeVar2 == "binary")								
								var data = [{
								data : data1,
								label : ylabels[0] +"(you)",
								//color : "blue"
								}, 
								{
								data : data2,
								label : ylabels[0]+"(friend)",
								//color : "yellow"
								},
							
								{
								data : data3,
								label : ylabels[1]+"(you)",
								//color : "green"
								},													
								{
								data : data4,
								label : ylabels[1]+"(friend)",
								//color : "orange"
								},										
								];
					
								var placeholder = $("#placeholder-compare-cumulative");
					
								var plot = $.plot(placeholder, data, {
									bars : {
										show : true,
										barWidth : 0.5,
										fill : 0.9
									},
					
									xaxis : {
										ticks : xlabels1,
										autoscaleMargin : 1
									},
									yaxis : {
										axisLabel : label2
									},
					
									grid : {
										hoverable : true,
										clickable : true
									},
					
									legend : {
										noColumns : 0,
										container : $("#legendcontainer-compare-cumulative")
									},
								});
					
								$("<div id='tooltip'></div>").css({
									position : "absolute",
									display : "none",
									border : "1px solid #fdd",
									padding : "2px",
									"background-color" : "#fee",
									opacity : 0.80
								}).appendTo("body");
					
								placeholder.bind("plothover", function(event, pos, item) {
					
									//    if ($("#enablePosition:checked").length > 0)
									{
										var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
										//$("#hoverdata").text(str);
									}
					
									//if ($("#enableTooltip:checked").length > 0)
									{
										if (item) {
											var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
					
											if (y == 1)
												y = "Yes";
											else if (y == -1)
												y = "No";
					
											$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
												top : item.pageY + 5,
												left : item.pageX + 5
											}).fadeIn(200);
					
										} else {
											$("#tooltip").hide();
										}
									}
								});
					
								placeholder.bind("plotclick", function(event, pos, item) {
									if (item) {
										//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
										var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
					
										if (y == 1)
											y = "Yes";
										else if (y == -1)
											y = "No";
					
										$("#tooltip").html(item.series.label + " , " + label2 + " = " + y).css({
											top : item.pageY + 5,
											left : item.pageX + 5
										}).fadeIn(200);
					
										plot.highlight(item.series, item.datapoint);
									}
								});

			/*
			 *   End Cumulative visualization for comparison
			 * 
			 */

			}//end if (typeVar1 == "binary" || typeVar2 == "binary")
			
			else if ((typeVar1 == "score" || typeVar1 == "count") && (typeVar2 == "score" || typeVar2 == "count")) 
			{
		
				if($("#comparison-cumulative").length !=0)
				{
					//var div2 = document.getElementById("comparison-cumulative");
					//div2.parentNode.removeChild(div2);
					$( "#comparison-cumulative" ).remove();
				}
		
				for (var i = 0; i < user_variable1_values.length; i++) 
	            {
					d1.push([i, user_variable1_values[i]]);
	            }
         
        		for (var i = 0; i < friend_variable1_values.length; i++) 
        		{
        			d2.push([i, friend_variable1_values[i]]);
        		}
        		
                for (var i = 0; i < user_variable2_values.length; i++) 
                {
                    d3.push([i, user_variable2_values[i]]);
                }

                for (var i = 0; i < friend_variable2_values.length; i++) 
                {
                    d4.push([i, friend_variable2_values[i]]);
                }


				var max_length = d1.length;
				if(d2.length > max_length)
					max_length = d2.length;

				var xlabels = [];
				for (var i = 0; i < max_length; ++i) 
				{
					//alert("times[0]="+times[0]);
					var xlabel = [];
					xlabel.push(i, "Day "+ (i+1));
					xlabels.push(xlabel);
				}

				var data = [{
					data : d1,
					label : nameVar1+" -you",
					//color : "blue"
					}, 
					{
					data : d2,
					label : nameVar1+" -friend",
					//color : "yellow"
					},
					{
						data : d3,
						label : nameVar2+" -you",
						//color : "green",
						yaxis : 2
					},
					
					{
						data : d4,
						label : nameVar2+" -friend",
						//color : "orange",
						yaxis : 2
					}
					
					];	

			var placeholder = $("#placeholder-compare");

			var plot = $.plot(placeholder, data, {
				lines : {
					show : true
				},
				points : {
					show : true
				},
				xaxis : //{ ticks: xlabels, autoscaleMargin: 1},
				{
					tickLength : 0,
					//min: 0.5,
					//max: ticks.length+0.5,
					ticks : xlabels,
					rotateTicks : 0,
					panRange: [-0.2, max_length],
				},
			
				yaxes : [{
					min : 0,
					panRange: false,
				}, {
					position : "right",
					panRange: false,
				}],

				grid : {
					hoverable : true,
					clickable : true
				},
				legend : {
					noColumns : 0,
					container : $("#legendcontainer-compare")
				},
				pan: {
					interactive: true
				},

			});

			$("<div id='tooltip'></div>").css({
				position : "absolute",
				display : "none",
				border : "1px solid #fdd",
				padding : "2px",
				"background-color" : "#fee",
				opacity : 0.80
			}).appendTo("body");

			placeholder.bind("plothover", function(event, pos, item) {

				//    if ($("#enablePosition:checked").length > 0)
				{
					var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
					//$("#hoverdata").text(str);
				}

				//if ($("#enableTooltip:checked").length > 0)
				{
					if (item) {
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);

						$("#tooltip").html(item.series.label + " = " + y).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);

					} else {
						$("#tooltip").hide();
					}
				}
			});

			placeholder.bind("plotclick", function(event, pos, item) {
				if (item) {
					//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
					var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);

					$("#tooltip").html(item.series.label + " = " + y).css({
						top : item.pageY + 5,
						left : item.pageX + 5
					}).fadeIn(200);

					plot.highlight(item.series, item.datapoint);
				}
			});

		}
		//end else if( (typeVar1== "score" || typeVar1== "count") && (typeVar2== "score" || typeVar2== "count")  )

		
	}//end if(variable1_id!=-1 && variable2_id!=-1)

	if (variable1_id==-1 && variable2_id==-1)  
	{

		if($("#comparison-cumulative").length !=0)
		{
			//var div2 = document.getElementById("comparison-cumulative");
			//div2.parentNode.removeChild(div2);
			$( "#comparison-cumulative" ).remove();
		}
		
		var emptyData = [];
		
		$.plot("#placeholder-compare", emptyData, {
				
				legend : {
					noColumns : 0,
					container : $("#legendcontainer-compare")
				},

			});

		
	}//end else if (variable1_id==-1 && variable2_id==-1)
	else if ( (variable1_id==-1 && variable2_id!=-1)  || (variable1_id!=-1 && variable2_id==-1) )
	{
		var user_d1=[];
		var user_d2=[];
		var friend_d1=[];
		var friend_d2=[];
		//alert("one is nothing");
		if(variable1_id==-1)
		{
			
			//alert(typeVar2);
			//alert(user_variable2_values.length);
			if(typeVar2=="binary")
			{
				for(var i=0; i<user_variable2_values.length; i++)
				{
					//alert(user_variable2_values[i]);
					if(user_variable2_values[i]==1)
						user_d1.push([i, 1]);
					
					if(user_variable2_values[i]==0)
						user_d2.push([i, 1]);
					
				}//end for
				
				
				for(var i=0; i<friend_variable2_values.length; i++)
				{
					//alert(user_variable2_values[i]);
					if(friend_variable2_values[i]==1)
						friend_d1.push([i+0.5, 1]);
					
					if(friend_variable2_values[i]==0)
						friend_d2.push([i+0.5, 1]);
					
				}//end for
								
				var max_length = user_variable2_values.length;
				if(friend_variable2_values.length > max_length)
					max_length = friend_variable2_values.length;
				
				var xlabels = [];
				for (var i = 0; i < max_length; ++i) {
					
					var xlabel = [];
					xlabel.push(i, "Day "+(i+1));
					xlabels.push(xlabel);
					//alert(xlabels[i]);
				}//end for
	
				var ylabels = [];
				ylabels[0] = nameVar2 + " Yes";
				ylabels[1] = nameVar2 + " No";
	
				var data = [
					{
						data : user_d1,
						label : nameVar2 + "=Yes(you)",
						//color : "blue"
					}, 
					{
						data : user_d2,
						label : nameVar2 + "=No(you)",
						//color : "yellow"
					},
					
					{
						data : friend_d1,
						label : nameVar2 + "=Yes(friend)",
						//color : "green"
					},
					
					{
						data : friend_d2,
						label : nameVar2 + "=No(you)",
						//color : "orange"
					}
				];

				var placeholder = $("#placeholder-compare");
				var plot = $.plot(placeholder, data, {
					bars : {
						show : true,
						barWidth : 0.4,
						fill : 0.9
					},
					xaxis : {
						tickLength : 0,
						//min: 0.5,
						//max: ticks.length+0.5,
						ticks : xlabels,
						rotateTicks : 0,
						panRange: [-0.2, max_length],
					},
					yaxis : {
						//ticks : [[0.5, "Yes"], [-0.5, "No"]],
						//axisLabel : nameVar2
						panRange: false,
					},
	
					grid : {
						hoverable : true,
						clickable : true
					},
					legend : {
						noColumns : 0,
						container : $("#legendcontainer-compare")
					},
					
					pan: {
						interactive: true
					},
						
				});
				
				$("<div id='tooltip'></div>").css({
					position : "absolute",
					display : "none",
					border : "1px solid #fdd",
					padding : "2px",
					"background-color" : "#fee",
					opacity : 0.80
				}).appendTo("body");
	
					placeholder.bind("plothover", function(event, pos, item) {
		
						//    if ($("#enablePosition:checked").length > 0)
						{
							var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
							//$("#hoverdata").text(str);
						}
		
						//if ($("#enableTooltip:checked").length > 0)
						{
							if (item) {
								var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
		
								$("#tooltip").html(item.series.label).css({
									top : item.pageY + 5,
									left : item.pageX + 5
								}).fadeIn(200);
		
							} else {
								$("#tooltip").hide();
							}
						}
				});

				placeholder.bind("plotclick", function(event, pos, item) {
					if (item) {
						//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
						$("#tooltip").html(item.series.label).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);
	
						plot.highlight(item.series, item.datapoint);
					}
				});
				
			/*
			 * Cumualtive
			 */
			
				if ($("#comparison-cumulative").length == 0)
				{
					$("<div id='comparison-cumulative' name='comparison-cumulative'> <div class='demo-container'> <div id='legendcontainer-compare-cumulative'></div> <div id='placeholder-compare-cumulative' class='demo-placeholder'></div> </div> <span id='hoverdata'></span> <span id='clickdata'></span> </div>").appendTo("#show-comparison-charts");
				}
				
				var user_dc1 = [];
				var user_dc2 = [];
				var friend_dc1 = [];
				var friend_dc2 = [];
	
				var user_count1 = 0;
				var user_count2 = 0;
				var friend_count1 = 0;
				var friend_count2 = 0;			

				
				for(var i=0; i<user_variable2_values.length; i++)
				{
					if(user_variable2_values[i]==1)
					{
						user_count1++;
					}
					
					if(user_variable2_values[i]==0)
					{
						user_count2++;
					}
					
				}//end for
							
				for(var i=0; i<friend_variable2_values.length; i++)
				{
					if(friend_variable2_values[i]==1)
					{
						friend_count1++;
					}
					
					if(friend_variable2_values[i]==0)
					{
						friend_count2++;
					}
					
				}//end for							
				
				user_dc1.push([0, user_count1]);
				friend_dc1.push([1, friend_count1]);		
				user_dc2.push([3, user_count2]);
				friend_dc2.push([4, friend_count2]);
				
				var data = [
					{
						data : user_dc1,
						label : nameVar2 + "=Yes(you)",
						//color : "blue"
					}, 
					{
						data : user_dc2,
						label : nameVar2 + "=No(you)",
						//color : "yellow"
					},
					
					{
						data : friend_dc1,
						label : nameVar2 + "=Yes(friend)",
						//color : "green"
					},
					
					{
						data : friend_dc2,
						label : nameVar2 + "=No(you)",
						//color : "orange"
					}
				];

				var placeholder = $("#placeholder-compare-cumulative");
				var plot = $.plot(placeholder, data, {
					bars : {
						show : true,
						barWidth : 0.9,
						fill : 0.9
					},
					
					xaxis : {
						tickLength : 0,
						//min: 0.5,
						//max: ticks.length+0.5,
						ticks : [[1.0, nameVar2+"=Yes"], [4.0, nameVar2+"=No"]],
						rotateTicks : 0
					},
					
					yaxis : {
						//ticks : [[0.5, "Yes"], [-0.5, "No"]],
						//axisLabel : nameVar2
					},
	
					grid : {
						hoverable : true,
						clickable : true
					},
					legend : {
						noColumns : 0,
						container : $("#legendcontainer-compare-cumulative")
					},
					
				});
				
				$("<div id='tooltip'></div>").css({
					position : "absolute",
					display : "none",
					border : "1px solid #fdd",
					padding : "2px",
					"background-color" : "#fee",
					opacity : 0.80
				}).appendTo("body");
	
				placeholder.bind("plothover", function(event, pos, item) {
	
					//    if ($("#enablePosition:checked").length > 0)
					{
						var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
						//$("#hoverdata").text(str);
					}
	
					//if ($("#enableTooltip:checked").length > 0)
					{
						if (item) {
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
							$("#tooltip").html(item.series.label+"="+y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
	
						} else {
							$("#tooltip").hide();
						}
					}
				});
	
				placeholder.bind("plotclick", function(event, pos, item) {
					if (item) {
						//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
						$("#tooltip").html(item.series.label+"="+y).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);
	
						plot.highlight(item.series, item.datapoint);
					}
				});
									
		
			}//end if(typeVar2=="binary")
			
			if(typeVar2=="score")
			{
				/*
				if($("#comparison-cumulative").length != 0)
				{
					$("#comparison-cumulative").remove();
				}	
				*/
				var user_data=[];
				var friend_data=[];
				
				for(var i=0; i< user_variable2_values.length; i++)
				{
					user_data.push([i, user_variable2_values[i]]);		
				}
				
				for(var i=0; i< friend_variable2_values.length; i++)
				{
					friend_data.push([i+0.4, friend_variable2_values[i]]);
				}
				
				var max_length = friend_variable2_values.length;
				if(user_variable2_values.length > max_length)
				{
					max_length = user_variable2_values.length;
				}
				
				var xlabels = [];
				for (var i = 0; i < max_length; ++i) 
				{
					var xlabel = [];
					xlabel.push(i, "Day "+ (i+1));
					xlabels.push(xlabel);
				}//end for
				
				var data = [
					{
						data : user_data,
						label : nameVar2 + "(you)",
						//color : "blue"
					}, 
					{
						data : friend_data,
						label : nameVar2 + "(friend)",
						//color : "yellow"
					}
				];

				var placeholder = $("#placeholder-compare");
				var plot = $.plot(placeholder, data, {
					bars : {
						show : true,
						barWidth : 0.5,
						fill : 0.9
					},
					
					xaxis : {
						tickLength : 0,
						//min: 0.5,
						//max: ticks.length+0.5,
						ticks : xlabels,
						rotateTicks : 0,
						panRange:[-0.2, max_length],
					},
					
					yaxis : {
						//ticks : [[0.5, "Yes"], [-0.5, "No"]],
						//axisLabel : nameVar2
						panRange: false,
					},
	
					grid : {
						hoverable : true,
						clickable : true
					},
					legend : {
						noColumns : 0,
						container : $("#legendcontainer-compare")
					},
					
					pan: {
							interactive: true
					},
					
				});
				
				$("<div id='tooltip'></div>").css({
					position : "absolute",
					display : "none",
					border : "1px solid #fdd",
					padding : "2px",
					"background-color" : "#fee",
					opacity : 0.80
				}).appendTo("body");
	
				placeholder.bind("plothover", function(event, pos, item) {
	
					//    if ($("#enablePosition:checked").length > 0)
					{
						var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
						//$("#hoverdata").text(str);
					}
	
					//if ($("#enableTooltip:checked").length > 0)
					{
						if (item) {
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
							$("#tooltip").html(item.series.label+"="+y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
	
						} else {
							$("#tooltip").hide();
						}
					}
				});
	
				placeholder.bind("plotclick", function(event, pos, item) {
					if (item) {
						//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
						$("#tooltip").html(item.series.label+"="+y).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);
	
						plot.highlight(item.series, item.datapoint);
					}
				});
							
				/**
				 * Cumulative
				 */
				
				if ($("#comparison-cumulative").length == 0)
				{
					$("<div id='comparison-cumulative' name='comparison-cumulative'> <div class='demo-container'> <div id='legendcontainer-compare-cumulative'></div> <div id='placeholder-compare-cumulative' class='demo-placeholder'></div> </div> <span id='hoverdata'></span> <span id='clickdata'></span> </div>").appendTo("#show-comparison-charts");
				}
				
				var user_data_cumulative = [];
				var friend_data_cumulative = [];
				var user_avgScore = 0;
				var friend_avgScore = 0;
				
				for(var i=0; i< user_variable2_values.length; i++)
				{
					//user_data.push([i, user_variable2_values[i]]);
					user_avgScore = parseInt(user_avgScore) + parseInt(user_variable2_values[i]);		
				}
				
				for(var i=0; i< friend_variable2_values.length; i++)
				{
					//friend_data.push([i+0.4, friend_variable2_values[i]]);
					friend_avgScore = parseInt(friend_avgScore) + parseInt(friend_variable2_values[i]);	
				}
				
				user_data_cumulative.push([0, user_avgScore/user_variable2_values.length]);
				friend_data_cumulative.push([1, friend_avgScore/friend_variable2_values.length]);
				
				//user_data_cumulative.push([0, 5]);
				//friend_data_cumulative.push(1, 7);

				
				var data = [
					{
						data : user_data_cumulative,
						label : nameVar2 + "(you)",
						//color : "blue"
					}, 
					{
						data : friend_data_cumulative,
						label : nameVar2 + "(friend)",
						//color : "yellow"
					}
				];

				var placeholder = $("#placeholder-compare-cumulative");
				var plot = $.plot(placeholder, data, {
					bars : {
						show : true,
						barWidth : 0.5,
						fill : 0.9
					},
					
					xaxis : {
						tickLength : 0,
						//min: 0.5,
						//max: ticks.length+0.5,
						ticks : [[0, "You"], [1, "Friend"]],
						rotateTicks : 0
					},
					
					yaxis : {
						//ticks : [[0.5, "Yes"], [-0.5, "No"]],
						//axisLabel : nameVar2
					},
	
					grid : {
						hoverable : true,
						clickable : true
					},
					legend : {
						noColumns : 0,
						container : $("#legendcontainer-compare-cumulative")
					},
					
				});
				
				$("<div id='tooltip'></div>").css({
					position : "absolute",
					display : "none",
					border : "1px solid #fdd",
					padding : "2px",
					"background-color" : "#fee",
					opacity : 0.80
				}).appendTo("body");
	
				placeholder.bind("plothover", function(event, pos, item) {
	
					//    if ($("#enablePosition:checked").length > 0)
					{
						var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
						//$("#hoverdata").text(str);
					}
	
					//if ($("#enableTooltip:checked").length > 0)
					{
						if (item) {
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
							$("#tooltip").html(item.series.label+"="+y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
	
						} else {
							$("#tooltip").hide();
						}
					}
				});
	
				placeholder.bind("plotclick", function(event, pos, item) {
					if (item) {
						//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
						$("#tooltip").html(item.series.label+"="+y).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);
	
						plot.highlight(item.series, item.datapoint);
					}
				});
				
			}//end if(typeVar2=="score")
			if(typeVar2=="count")
			{
				var user_data=[];
				var friend_data=[];
				
				for(var i=0; i< user_variable2_values.length; i++)
				{
					user_data.push([i, user_variable2_values[i]]);		
				}
				
				for(var i=0; i< friend_variable2_values.length; i++)
				{
					friend_data.push([i+0.4, friend_variable2_values[i]]);
				}
				
				var max_length = friend_variable2_values.length;
				if(user_variable2_values.length > max_length)
				{
					max_length = user_variable2_values.length;
				}
				
				var xlabels = [];
				for (var i = 0; i < max_length; ++i) 
				{
					var xlabel = [];
					xlabel.push(i, "Day "+ (i+1));
					xlabels.push(xlabel);
				}//end for
				
				var data = [
					{
						data : user_data,
						label : nameVar2 + "(you)",
						//color : "blue"
					}, 
					{
						data : friend_data,
						label : nameVar2 + "(friend)",
						//color : "yellow"
					}
				];

				var placeholder = $("#placeholder-compare");
				var plot = $.plot(placeholder, data, {
					bars : {
						show : true,
						barWidth : 0.5,
						fill : 0.9
					},
					
					xaxis : {
						tickLength : 0,
						//min: 0.5,
						//max: ticks.length+0.5,
						ticks : xlabels,
						rotateTicks : 0,
						panRange: [-0.2, max_length],
					},
					
					yaxis : {
						//ticks : [[0.5, "Yes"], [-0.5, "No"]],
						//axisLabel : nameVar2
						panRange:false,
					},
	
					grid : {
						hoverable : true,
						clickable : true
					},
					legend : {
						noColumns : 0,
						container : $("#legendcontainer-compare")
					},
					
					pan: {
						interactive: true
					},
					
				});
				
				$("<div id='tooltip'></div>").css({
					position : "absolute",
					display : "none",
					border : "1px solid #fdd",
					padding : "2px",
					"background-color" : "#fee",
					opacity : 0.80
				}).appendTo("body");
	
				placeholder.bind("plothover", function(event, pos, item) {
	
					//    if ($("#enablePosition:checked").length > 0)
					{
						var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
						//$("#hoverdata").text(str);
					}
	
					//if ($("#enableTooltip:checked").length > 0)
					{
						if (item) {
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
							$("#tooltip").html(item.series.label+"="+y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
	
						} else {
							$("#tooltip").hide();
						}
					}
				});
	
				placeholder.bind("plotclick", function(event, pos, item) {
					if (item) {
						//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
						$("#tooltip").html(item.series.label+"="+y).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);
	
						plot.highlight(item.series, item.datapoint);
					}
				});
							
				/**
				 * Cumulative
				 */
				
				if ($("#comparison-cumulative").length == 0)
				{
					$("<div id='comparison-cumulative' name='comparison-cumulative'> <div class='demo-container'> <div id='legendcontainer-compare-cumulative'></div> <div id='placeholder-compare-cumulative' class='demo-placeholder'></div> </div> <span id='hoverdata'></span> <span id='clickdata'></span> </div>").appendTo("#show-comparison-charts");
				}
				
				var user_data_cumulative = [];
				var friend_data_cumulative = [];
				var user_avgScore = 0;
				var friend_avgScore = 0;
				
				for(var i=0; i< user_variable2_values.length; i++)
				{
					//user_data.push([i, user_variable2_values[i]]);
					user_avgScore = parseInt(user_avgScore) + parseInt(user_variable2_values[i]);		
				}
				
				for(var i=0; i< friend_variable2_values.length; i++)
				{
					//friend_data.push([i+0.4, friend_variable2_values[i]]);
					friend_avgScore = parseInt(friend_avgScore) + parseInt(friend_variable2_values[i]);	
				}
				
				user_data_cumulative.push([0, user_avgScore]);
				friend_data_cumulative.push([1, friend_avgScore]);
				
				//user_data_cumulative.push([0, 5]);
				//friend_data_cumulative.push(1, 7);

				
				var data = [
					{
						data : user_data_cumulative,
						label : nameVar2 + "(you)",
						//color : "blue"
					}, 
					{
						data : friend_data_cumulative,
						label : nameVar2 + "(friend)",
						//color : "yellow"
					}
				];

				var placeholder = $("#placeholder-compare-cumulative");
				var plot = $.plot(placeholder, data, {
					bars : {
						show : true,
						barWidth : 0.5,
						fill : 0.9
					},
					
					xaxis : {
						tickLength : 0,
						//min: 0.5,
						//max: ticks.length+0.5,
						ticks : [[0, "You"], [1, "Friend"]],
						rotateTicks : 0
					},
					
					yaxis : {
						//ticks : [[0.5, "Yes"], [-0.5, "No"]],
						//axisLabel : nameVar2
					},
	
					grid : {
						hoverable : true,
						clickable : true
					},
					legend : {
						noColumns : 0,
						container : $("#legendcontainer-compare-cumulative")
					},
					
				});
				
				$("<div id='tooltip'></div>").css({
					position : "absolute",
					display : "none",
					border : "1px solid #fdd",
					padding : "2px",
					"background-color" : "#fee",
					opacity : 0.80
				}).appendTo("body");
	
				placeholder.bind("plothover", function(event, pos, item) {
	
					//    if ($("#enablePosition:checked").length > 0)
					{
						var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
						//$("#hoverdata").text(str);
					}
	
					//if ($("#enableTooltip:checked").length > 0)
					{
						if (item) {
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
							$("#tooltip").html(item.series.label+"="+y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
	
						} else {
							$("#tooltip").hide();
						}
					}
				});
	
				placeholder.bind("plotclick", function(event, pos, item) {
					if (item) {
						//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
						$("#tooltip").html(item.series.label+"="+y).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);
	
						plot.highlight(item.series, item.datapoint);
					}
				});
					
			}//end if(typeVar2="count")
			
		}//end if(variable1_id==-1)
		else if(variable2_id==-1)
		{
			
			if(typeVar1=="binary")
			{
				for(var i=0; i<user_variable1_values.length; i++)
				{
					//alert(user_variable2_values[i]);
					if(user_variable1_values[i]==1)
						user_d1.push([i, 1]);
					
					if(user_variable1_values[i]==0)
						user_d2.push([i, 1]);
					
				}//end for
				
				
				for(var i=0; i<friend_variable1_values.length; i++)
				{
					//alert(user_variable2_values[i]);
					if(friend_variable1_values[i]==1)
						friend_d1.push([i+0.5, 1]);
					
					if(friend_variable1_values[i]==0)
						friend_d2.push([i+0.5, 1]);
					
				}//end for
								
				var max_length = user_variable1_values.length;
				if(friend_variable1_values.length > max_length)
					max_length = friend_variable1_values.length;
				
				var xlabels = [];
				for (var i = 0; i < max_length; ++i) {
					
					var xlabel = [];
					xlabel.push(i, "Day "+(i+1));
					xlabels.push(xlabel);
					//alert(xlabels[i]);
				}//end for
	
				var ylabels = [];
				ylabels[0] = nameVar2 + " Yes";
				ylabels[1] = nameVar2 + " No";
	
				var data = [
					{
						data : user_d1,
						label : nameVar1 + "=Yes(you)",
						//color : "blue"
					}, 
					{
						data : user_d2,
						label : nameVar1 + "=No(you)",
						//color : "yellow"
					},
					
					{
						data : friend_d1,
						label : nameVar1 + "=Yes(friend)",
						//color : "green"
					},
					
					{
						data : friend_d2,
						label : nameVar1 + "=No(friend)",
						//color : "orange"
					}
				];

				var placeholder = $("#placeholder-compare");
				var plot = $.plot(placeholder, data, {
					bars : {
						show : true,
						barWidth : 0.5,
						fill : 0.9
					},
					xaxis : {
						tickLength : 0,
						//min: 0.5,
						//max: ticks.length+0.5,
						ticks : xlabels,
						rotateTicks : 0,
						panRange: [-0.2, max_length],
					},
					yaxis : {
						//ticks : [[0.5, "Yes"], [-0.5, "No"]],
						//axisLabel : nameVar2
						panRange: false,
					},
	
					grid : {
						hoverable : true,
						clickable : true
					},
					legend : {
						noColumns : 0,
						container : $("#legendcontainer-compare")
					},
					pan: {
						interactive: true
					},
					
				});
				
				$("<div id='tooltip'></div>").css({
					position : "absolute",
					display : "none",
					border : "1px solid #fdd",
					padding : "2px",
					"background-color" : "#fee",
					opacity : 0.80
				}).appendTo("body");
	
				placeholder.bind("plothover", function(event, pos, item) {
	
					//    if ($("#enablePosition:checked").length > 0)
					{
						var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
						//$("#hoverdata").text(str);
					}
	
					//if ($("#enableTooltip:checked").length > 0)
					{
						if (item) {
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
							$("#tooltip").html(item.series.label).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
	
						} else {
							$("#tooltip").hide();
						}
					}
				});
	
				placeholder.bind("plotclick", function(event, pos, item) {
					if (item) {
						//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
						$("#tooltip").html(item.series.label).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);
	
						plot.highlight(item.series, item.datapoint);
					}
				});
					
				/*
				 * Cumualtive
				 */
			
				if ($("#comparison-cumulative").length == 0)
				{
					$("<div id='comparison-cumulative' name='comparison-cumulative'> <div class='demo-container'> <div id='legendcontainer-compare-cumulative'></div> <div id='placeholder-compare-cumulative' class='demo-placeholder'></div> </div> <span id='hoverdata'></span> <span id='clickdata'></span> </div>").appendTo("#show-comparison-charts");
				}
				
				var user_dc1 = [];
				var user_dc2 = [];
				var friend_dc1 = [];
				var friend_dc2 = [];
	
				var user_count1 = 0;
				var user_count2 = 0;
				var friend_count1 = 0;
				var friend_count2 = 0;			

				
				for(var i=0; i<user_variable1_values.length; i++)
				{
					if(user_variable1_values[i]==1)
					{
						user_count1++;
					}
					
					if(user_variable1_values[i]==0)
					{
						user_count2++;
					}
					
				}//end for
							
				for(var i=0; i<friend_variable1_values.length; i++)
				{
					if(friend_variable1_values[i]==1)
					{
						friend_count1++;
					}
					
					if(friend_variable1_values[i]==0)
					{
						friend_count2++;
					}
					
				}//end for							
				
				user_dc1.push([0, user_count1]);
				friend_dc1.push([1, friend_count1]);		
				user_dc2.push([3, user_count2]);
				friend_dc2.push([4, friend_count2]);
				
				var data = [
					{
						data : user_dc1,
						label : nameVar1 + "=Yes(you)",
						//color : "blue"
					}, 
					{
						data : user_dc2,
						label : nameVar1 + "=No(you)",
						//color : "yellow"
					},
					
					{
						data : friend_dc1,
						label : nameVar1 + "=Yes(friend)",
						//color : "green"
					},
					
					{
						data : friend_dc2,
						label : nameVar1 + "=No(friend)",
						//color : "orange"
					}
				];

				var placeholder = $("#placeholder-compare-cumulative");
				var plot = $.plot(placeholder, data, {
					bars : {
						show : true,
						barWidth : 0.9,
						fill : 0.9
					},
					
					xaxis : {
						tickLength : 0,
						//min: 0.5,
						//max: ticks.length+0.5,
						ticks : [[1.0, nameVar1+"=Yes"], [4.0, nameVar1+"=No"]],
						rotateTicks : 0
					},
					
					yaxis : {
						//ticks : [[0.5, "Yes"], [-0.5, "No"]],
						//axisLabel : nameVar2
					},
	
					grid : {
						hoverable : true,
						clickable : true
					},
					legend : {
						noColumns : 0,
						container : $("#legendcontainer-compare-cumulative")
					},
					
				});
				
				$("<div id='tooltip'></div>").css({
					position : "absolute",
					display : "none",
					border : "1px solid #fdd",
					padding : "2px",
					"background-color" : "#fee",
					opacity : 0.80
				}).appendTo("body");
	
				placeholder.bind("plothover", function(event, pos, item) {
	
					//    if ($("#enablePosition:checked").length > 0)
					{
						var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
						//$("#hoverdata").text(str);
					}
	
					//if ($("#enableTooltip:checked").length > 0)
					{
						if (item) {
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
							$("#tooltip").html(item.series.label+"="+y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
	
						} else {
							$("#tooltip").hide();
						}
					}
				});
	
				placeholder.bind("plotclick", function(event, pos, item) {
					if (item) {
						//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
						$("#tooltip").html(item.series.label+"="+y).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);
	
						plot.highlight(item.series, item.datapoint);
					}
				});
			}//end if(typeVar1=="binary")
			

			if(typeVar1 == "score")
			{
				var user_data=[];
				var friend_data=[];
				
				for(var i=0; i< user_variable1_values.length; i++)
				{
					user_data.push([i, user_variable1_values[i]]);		
				}
				
				for(var i=0; i< friend_variable1_values.length; i++)
				{
					friend_data.push([i+0.4, friend_variable1_values[i]]);
				}
				
				var max_length = friend_variable1_values.length;
				if(user_variable1_values.length > max_length)
				{
					max_length = user_variable1_values.length;
				}
				
				var xlabels = [];
				for (var i = 0; i < max_length; ++i) 
				{
					var xlabel = [];
					xlabel.push(i, "Day "+ (i+1));
					xlabels.push(xlabel);
				}//end for
				
				var data = [
					{
						data : user_data,
						label : nameVar1 + "(you)",
						//color : "blue"
					}, 
					{
						data : friend_data,
						label : nameVar1 + "(friend)",
						//color : "yellow"
					}
				];

				var placeholder = $("#placeholder-compare");
				var plot = $.plot(placeholder, data, {
					bars : {
						show : true,
						barWidth : 0.5,
						fill : 0.9
					},
					
					xaxis : {
						tickLength : 0,
						//min: 0.5,
						//max: ticks.length+0.5,
						ticks : xlabels,
						rotateTicks : 0,
						panRange: [-0.2, max_length],
					},
					
					yaxis : {
						//ticks : [[0.5, "Yes"], [-0.5, "No"]],
						//axisLabel : nameVar2
						panRange: false,
					},
	
					grid : {
						hoverable : true,
						clickable : true
					},
					legend : {
						noColumns : 0,
						container : $("#legendcontainer-compare")
					},
					
					pan: {
						interactive: true
					},

					
				});
				
				$("<div id='tooltip'></div>").css({
					position : "absolute",
					display : "none",
					border : "1px solid #fdd",
					padding : "2px",
					"background-color" : "#fee",
					opacity : 0.80
				}).appendTo("body");
	
				placeholder.bind("plothover", function(event, pos, item) {
	
					//    if ($("#enablePosition:checked").length > 0)
					{
						var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
						//$("#hoverdata").text(str);
					}
	
					//if ($("#enableTooltip:checked").length > 0)
					{
						if (item) {
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
							$("#tooltip").html(item.series.label+"="+y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
	
						} else {
							$("#tooltip").hide();
						}
					}
				});
	
				placeholder.bind("plotclick", function(event, pos, item) {
					if (item) {
						//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
						$("#tooltip").html(item.series.label+"="+y).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);
	
						plot.highlight(item.series, item.datapoint);
					}
				});
							
				/**
				 * Cumulative
				 */
				
				if ($("#comparison-cumulative").length == 0)
				{
					$("<div id='comparison-cumulative' name='comparison-cumulative'> <div class='demo-container'> <div id='legendcontainer-compare-cumulative'></div> <div id='placeholder-compare-cumulative' class='demo-placeholder'></div> </div> <span id='hoverdata'></span> <span id='clickdata'></span> </div>").appendTo("#show-comparison-charts");
				}
				
				var user_data_cumulative = [];
				var friend_data_cumulative = [];
				var user_avgScore = 0;
				var friend_avgScore = 0;
				
				for(var i=0; i< user_variable1_values.length; i++)
				{
					//user_data.push([i, user_variable2_values[i]]);
					user_avgScore = parseInt(user_avgScore) + parseInt(user_variable1_values[i]);		
				}
				
				for(var i=0; i< friend_variable1_values.length; i++)
				{
					//friend_data.push([i+0.4, friend_variable2_values[i]]);
					friend_avgScore = parseInt(friend_avgScore) + parseInt(friend_variable1_values[i]);	
				}
				
				user_data_cumulative.push([0, user_avgScore/user_variable1_values.length]);
				friend_data_cumulative.push([1, friend_avgScore/friend_variable1_values.length]);
				
				//user_data_cumulative.push([0, 5]);
				//friend_data_cumulative.push(1, 7);

				
				var data = [
					{
						data : user_data_cumulative,
						label : nameVar1 + "(you)",
						//color : "blue"
					}, 
					{
						data : friend_data_cumulative,
						label : nameVar1 + "(friend)",
						//color : "yellow"
					}
				];

				var placeholder = $("#placeholder-compare-cumulative");
				var plot = $.plot(placeholder, data, {
					bars : {
						show : true,
						barWidth : 0.5,
						fill : 0.9
					},
					
					xaxis : {
						tickLength : 0,
						//min: 0.5,
						//max: ticks.length+0.5,
						ticks : [[0, "You"], [1, "Friend"]],
						rotateTicks : 0
					},
					
					yaxis : {
						//ticks : [[0.5, "Yes"], [-0.5, "No"]],
						//axisLabel : nameVar2
					},
	
					grid : {
						hoverable : true,
						clickable : true
					},
					legend : {
						noColumns : 0,
						container : $("#legendcontainer-compare-cumulative")
					},
					
				});
				
				$("<div id='tooltip'></div>").css({
					position : "absolute",
					display : "none",
					border : "1px solid #fdd",
					padding : "2px",
					"background-color" : "#fee",
					opacity : 0.80
				}).appendTo("body");
	
				placeholder.bind("plothover", function(event, pos, item) {
	
					//    if ($("#enablePosition:checked").length > 0)
					{
						var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
						//$("#hoverdata").text(str);
					}
	
					//if ($("#enableTooltip:checked").length > 0)
					{
						if (item) {
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
							$("#tooltip").html(item.series.label+"="+y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
	
						} else {
							$("#tooltip").hide();
						}
					}
				});
	
				placeholder.bind("plotclick", function(event, pos, item) {
					if (item) {
						//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
						$("#tooltip").html(item.series.label+"="+y).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);
	
						plot.highlight(item.series, item.datapoint);
					}
				});
			}//end if(typeVar1=="score")
			if(typeVar1=="count")
			{
				var user_data=[];
				var friend_data=[];
				
				for(var i=0; i< user_variable1_values.length; i++)
				{
					user_data.push([i, user_variable1_values[i]]);		
				}
				
				for(var i=0; i< friend_variable1_values.length; i++)
				{
					friend_data.push([i+0.4, friend_variable1_values[i]]);
				}
				
				var max_length = friend_variable1_values.length;
				if(user_variable1_values.length > max_length)
				{
					max_length = user_variable1_values.length;
				}
				
				var xlabels = [];
				for (var i = 0; i < max_length; ++i) 
				{
					var xlabel = [];
					xlabel.push(i, "Day "+ (i+1));
					xlabels.push(xlabel);
				}//end for
				
				var data = [
					{
						data : user_data,
						label : nameVar1 + "(you)",
						//color : "blue"
					}, 
					{
						data : friend_data,
						label : nameVar1 + "(friend)",
						//color : "yellow"
					}
				];

				var placeholder = $("#placeholder-compare");
				var plot = $.plot(placeholder, data, {
					bars : {
						show : true,
						barWidth : 0.5,
						fill : 0.9
					},
					
					xaxis : {
						tickLength : 0,
						//min: 0.5,
						//max: ticks.length+0.5,
						ticks : xlabels,
						rotateTicks : 0,
						panRange:[-0.2, max_length],
					},
					
					yaxis : {
						//ticks : [[0.5, "Yes"], [-0.5, "No"]],
						//axisLabel : nameVar2
						panRange: false,
					},
	
					grid : {
						hoverable : true,
						clickable : true
					},
					legend : {
						noColumns : 0,
						container : $("#legendcontainer-compare")
					},
					pan: {
						interactive: true
					},					
					
				});
				
				$("<div id='tooltip'></div>").css({
					position : "absolute",
					display : "none",
					border : "1px solid #fdd",
					padding : "2px",
					"background-color" : "#fee",
					opacity : 0.80
				}).appendTo("body");
	
				placeholder.bind("plothover", function(event, pos, item) {
	
					//    if ($("#enablePosition:checked").length > 0)
					{
						var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
						//$("#hoverdata").text(str);
					}
	
					//if ($("#enableTooltip:checked").length > 0)
					{
						if (item) {
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
							$("#tooltip").html(item.series.label+"="+y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
	
						} else {
							$("#tooltip").hide();
						}
					}
				});
	
				placeholder.bind("plotclick", function(event, pos, item) {
					if (item) {
						//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
						$("#tooltip").html(item.series.label+"="+y).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);
	
						plot.highlight(item.series, item.datapoint);
					}
				});
							
				/**
				 * Cumulative
				 */
				
				if ($("#comparison-cumulative").length == 0)
				{
					$("<div id='comparison-cumulative' name='comparison-cumulative'> <div class='demo-container'> <div id='legendcontainer-compare-cumulative'></div> <div id='placeholder-compare-cumulative' class='demo-placeholder'></div> </div> <span id='hoverdata'></span> <span id='clickdata'></span> </div>").appendTo("#show-comparison-charts");
				}
				
				var user_data_cumulative = [];
				var friend_data_cumulative = [];
				var user_avgScore = 0;
				var friend_avgScore = 0;
				
				for(var i=0; i< user_variable1_values.length; i++)
				{
					//user_data.push([i, user_variable2_values[i]]);
					user_avgScore = parseInt(user_avgScore) + parseInt(user_variable1_values[i]);		
				}
				
				for(var i=0; i< friend_variable1_values.length; i++)
				{
					//friend_data.push([i+0.4, friend_variable2_values[i]]);
					friend_avgScore = parseInt(friend_avgScore) + parseInt(friend_variable1_values[i]);	
				}
				
				user_data_cumulative.push([0, user_avgScore]);
				friend_data_cumulative.push([1, friend_avgScore]);
				
				//user_data_cumulative.push([0, 5]);
				//friend_data_cumulative.push(1, 7);

				
				var data = [
					{
						data : user_data_cumulative,
						label : nameVar1 + "(you)",
						//color : "blue"
					}, 
					{
						data : friend_data_cumulative,
						label : nameVar1 + "(friend)",
						//color : "yellow"
					}
				];

				var placeholder = $("#placeholder-compare-cumulative");
				var plot = $.plot(placeholder, data, {
					bars : {
						show : true,
						barWidth : 0.5,
						fill : 0.9
					},
					
					xaxis : {
						tickLength : 0,
						//min: 0.5,
						//max: ticks.length+0.5,
						ticks : [[0, "You"], [1, "Friend"]],
						rotateTicks : 0
					},
					
					yaxis : {
						//ticks : [[0.5, "Yes"], [-0.5, "No"]],
						//axisLabel : nameVar2
					},
	
					grid : {
						hoverable : true,
						clickable : true
					},
					legend : {
						noColumns : 0,
						container : $("#legendcontainer-compare-cumulative")
					},
					
				});
				
				$("<div id='tooltip'></div>").css({
					position : "absolute",
					display : "none",
					border : "1px solid #fdd",
					padding : "2px",
					"background-color" : "#fee",
					opacity : 0.80
				}).appendTo("body");
	
				placeholder.bind("plothover", function(event, pos, item) {
	
					//    if ($("#enablePosition:checked").length > 0)
					{
						var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
						//$("#hoverdata").text(str);
					}
	
					//if ($("#enableTooltip:checked").length > 0)
					{
						if (item) {
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
							$("#tooltip").html(item.series.label+"="+y).css({
								top : item.pageY + 5,
								left : item.pageX + 5
							}).fadeIn(200);
	
						} else {
							$("#tooltip").hide();
						}
					}
				});
	
				placeholder.bind("plotclick", function(event, pos, item) {
					if (item) {
						//$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
						var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
	
						$("#tooltip").html(item.series.label+"="+y).css({
							top : item.pageY + 5,
							left : item.pageX + 5
						}).fadeIn(200);
	
						plot.highlight(item.series, item.datapoint);
					}
				});				
			}//end if(typeVar1=="count")
			
		}//end if(variable2_id==-1)
		
		
	}//end else if (variable1_id==-1 || variable2_id==-1)


    }//end if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
  }//end xmlhttp.onreadystatechange = function()
 
/*
 	alert("times="+times.length);
 	
 	for(var i=0; i < times.length; i++)
 	{
 		alert("times["+i+"]="+times[i]);
 	}
*/

/*
   	xmlhttp.open("GET", "http://localhost/ajaxfiles/getExperimentResultsComparison.php?experimentId="+experimentId+"&userId="+userId+"&friendId="+friendId+
   	"&variable1="+variable1_id+"&variable2="+variable2_id+"&typeVar1="+typeVar1+"&typeVar2="+typeVar2+"&times[]="+times+"&timesPP[]="+timesPP, true);
*/
   	xmlhttp.open("GET", "http://digitalbrain-test.lancs.ac.uk/ajaxfiles/getExperimentResultsComparison.php?experimentId="+experimentId+"&userId="+userId+"&friendId="+friendId+
   	"&variable1="+variable1_id+"&variable2="+variable2_id+"&typeVar1="+typeVar1+"&typeVar2="+typeVar2+"&times[]="+times+"&timesPP[]="+timesPP, true);
   	   	
   	//xmlhttp.open("GET", "http://digitalbrain-test.lancs.ac.uk/ajaxfiles/getExperimentResultsComparison.php?experimentId="+experimentId+"&userId="+userId+"&friendId="+friendId+"&variable1="+variable1_id+"&variable2="+variable2_id, true);
  	 	
  	xmlhttp.send();
 }//end showComparison
  