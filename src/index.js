import {
	selectAll,
	select,
	selection,
	html,
	event} from 'd3-selection';
import {
	forceSimulation,
	forceLink,
	forceManyBody,
	forceCenter
} from 'd3-force';
import {drag} from 'd3-drag';
import {transition} from 'd3-transition';

require('./index.css');

const url='https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json'
getData(url)

function getData(url){
	fetch(url)
	.then(response=>response.json())
	.then(data=>{
		//console.log(data)
		drawGraph(data)
	})
}
function drawGraph(data){
	//console.log(data)
	//variable holding svg attributes
	const width = 950;
	const height = 550;

	//creates svg
	let svg = select('body')
		.append('svg')
		.attr('width',width)
		.attr('height',height)
		.attr('class','graph');
		
	console.log(data.nodes[data.links[1].target],
		data.nodes[data.links[1].source])

	let simulation = forceSimulation()
		.force('link',forceLink())
		.force('charge',forceManyBody())
		.force('center',forceCenter(width/2,height/2))

	//console.log(forceLink().id(function(d){return d.id}))

	//shows data on mousehover
	let div = select('body').append('div')
		.attr('class','tooltip')
		.style('opacity',0);

	let link = svg.append('g')
		.attr('class','links')
		.selectAll('line')
		.data(data.links)
		.enter().append('line')
		.attr('stroke','black')
		.attr('stroke-width', 1)

	let node = svg.append('g')
		.attr('class','nodes')
		.selectAll('circle')
		.data(data.nodes)
		.enter().append('circle')
			.attr('r',5)
			.attr('fill','blue')
			.call(drag()
				.on('start',dragstarted)
				.on('drag',dragged)
				.on('end',dragended))
			.on('mouseover',function(d){
				div.transition()
					.duration(300)
					.style('opacity',.9)
				div.html(d.country)
					.style('left',(event.pageX -50)+'px')
					.style('top',(event.pageY-80)+'px')
				
			})
			.on('mouseout',function(d){
				div.transition()
					.duration(300)
					.style('opacity',0)
			})


		
	simulation
		.nodes(data.nodes)
		.on('tick',ticked);

	simulation.force('link')
		.links(data.links)
		
	function ticked(){
		link
			.attr('x1',function(d){return d.source.x;})
			.attr('y1',function(d){return d.source.y;})
			.attr('x2',function(d){return d.target.x;})
			.attr('y2',function(d){return d.target.y;})
		node
			.attr('cx',function(d){return d.x})
			.attr('cy',function(d){return d.y})
	}
	function dragstarted(d){
		if(!event.active) simulation.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y
	}
	function dragged(d){
		d.fx = event.x;
		d.fy = event.y;
	}
	function dragended(d){
		if(!event.active) simulation.alphaTarget(0);
		d.fx = null;
		d.fy = null;
	}
}

