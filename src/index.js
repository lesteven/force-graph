import {
	selectAll,
	select,
	selection,
	html} from 'd3-selection';
import {timeParse} from 'd3-time-format';
import {scaleLinear,scaleQuantile} from 'd3-scale';
import {range,extent,max} from 'd3-array';
import {axisBottom,axisLeft} from 'd3-axis';
import {transition} from 'd3-transition';
import {format} from 'd3-format';
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
	console.log(data)
	//variable holding svg attributes
	const margin ={top:100,bottom:100,left:70,right:50}
	const width = 950;
	const height = 550;
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	//creates svg
	let svg = select('body')
		.append('svg')
		.attr('width',width)
		.attr('height',height)
		.attr('class','graph');

	let g = svg.append('g')
		.attr('transform','translate('
			+ margin.left + ',' + margin.top + ')');
}