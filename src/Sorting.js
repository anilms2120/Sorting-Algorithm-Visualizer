import React from "react"
import merge_sort_animations from './MergeSort.js'
import quick_sort_animations from './QuickSort.js'
import heap_sort_animations from './HeapSort.js'
import bubble_sort_animations from './BubbleSort.js'
import Header from './Header'

class Sorting extends React.Component{

	constructor()
	{
		super()
		this.state={
			array :[],
			number : 200,
			speed : 20

		}
		this.generateArray=this.generateArray.bind(this);
		this.handleSolve = this.handleSolve.bind(this);
		this.handleSolve2=this.handleSolve2.bind(this);
		this.handleSlider=this.handleSlider.bind(this);
		this.handleSpeed=this.handleSpeed.bind(this);

	}

	componentDidMount()
	{
		this.generateArray()
	}

	generateArray(){
		
		const c=document.querySelectorAll(".bars");
		let n = this.state.number
		
		if(c.length >0)
		{
			for(let i=0;i<c.length;i++)
			{
				c[i].style.backgroundColor="blue";
				//console.log(c[i]);
			}
		}

		let temp = []
		for(let i=0;i<n;i++)
		{
			temp.push(this.randomItem(10,350))
		}
		this.setState({array : temp,number : n})
		// component.forceUpdate(callback);




	}

	randomItem(min,max)
	{
		return Math.floor(Math.random()*(max-min+1)+min)
	}

	handleSort(index,value,sorted_array)
	{
		let elements = document.querySelectorAll(".bars")[index]
		if(elements===undefined)
		{
			return 
		}
		else{
			const c=elements.style.height;
			elements.style.height=value+'px'
			if(value==sorted_array[index])
			{
				elements.style.backgroundColor="#00FF00"
			}
			else
			{
				elements.style.backgroundColor="blue"
			}
		}

	}

	handleSolve(e){
		
		let sorted_array = this.state.array.slice(0).sort(function(a,b){return(a-b)})
		let check = this.state.array
		let b = false
		for(let i=0;i<check.length;i++)
		{
			if(check[i]!=sorted_array[i])
			{
			
				b = true
				break
			}
		}
		if(b==false)
		{
			return 
		}
		let buttons = document.querySelectorAll("button")
		for(let i=0;i<buttons.length;i++)
		{
			buttons[i].setAttribute("disabled",true)
		}
		let sliders = document.querySelectorAll("input")
		for(let i=0;i<sliders.length;i++)
		{
			sliders[i].setAttribute("disabled",true)
		}
		//let sorted_array = this.state.array.slice(0).sort(function(a,b){return(a-b)})
		// //console.log(sorted_array)
		let temp;
		if(e.target.name==="merge_sort")
		{
			temp = merge_sort_animations(this.state.array).update;
		}
		else if(e.target.name==="quick_sort")
		{
			temp = quick_sort_animations(this.state.array).update;
		} 
		else if(e.target.name==="bubble_sort")
		{
			temp = bubble_sort_animations(this.state.array).update;
		}
		else if(e.target.name==="heap_sort")
		{
			temp = heap_sort_animations(this.state.array).update;
		}
		for(let i=0;i<temp.length;i++)
		{
			//this.handleSort(temp[i][0],temp[i][1],sorted_array)
			setTimeout(()=>{

				this.handleSort(temp[i][0],temp[i][1],sorted_array)
				if(i==temp.length-1)
				{
					for(let i=0;i<buttons.length;i++)
					{
						buttons[i].removeAttribute("disabled")
					}
					for(let i=0;i<sliders.length;i++)
					{
						sliders[i].removeAttribute("disabled")
					}
				}
			},(35-this.state.speed)*i)
		}
			
		

	}
	handleSolve2(e){
		e.preventDefault();
		let temp=this.state.array;
		let arr=quick_sort_animations(temp).update;
		//console.log(temp)
	}

	handleSlider(e){

		let value = e.target.value 
		//console.log(value)
		//this.generateArray(value)
		const c=document.querySelectorAll(".bars");
		let n = value
		
		if(c.length >0)
		{
			for(let i=0;i<c.length;i++)
			{
				c[i].style.backgroundColor="blue";
				//console.log(c[i]);
			}
		}

		let temp = []
		for(let i=0;i<n;i++)
		{
			temp.push(this.randomItem(10,350))
		}
		this.setState({array : temp,number : n})
		


	}

	getWidth(n){

		
		if(n>=25 && n<=50)
			return 1.2
		else if(n >=51 && n <= 100)
			return 0.7
		else if(n >=101 && n<=200)
			return 0.28
		else if(n >=201 && n<=300)
			return 0.15
		else
			return 0.1

	}
	handleSpeed(e)
	{
		let value = e.target.value
		this.setState({speed : value})
	}

	render()
	{

		let width = this.getWidth(this.state.number)
		const temp_array=this.state.array.map((num,idx)=>{
			return(
				<div className="bars" style={{height:num, width :width+'em'}} key={idx}>
				</div>

			)
		})

		return(

			<div className="base">
				<Header />
				<div className="bar-container" >
				 	{temp_array}
				</div>
				
				<div className="slide">
				 <label>
				 	Size
			 	 	<input type="range" min="25" max="300" value={this.state.number} onChange={this.handleSlider}/>
			 	 </label>
			 	 <label>
			 	 	Speed   
			 	 	<input type="range" min="3" max="30" value={this.state.speed} onChange={this.handleSpeed}/>
				 </label>
				 <button type="button" className="btn btn-outline-success" onClick={this.generateArray}>new array</button>
				</div>
				 <div className="buttons">
					 <button type="button" className="btn btn-outline-success" onClick={this.handleSolve} name="merge_sort">MergeSort</button>
					 <button type="button" className="btn btn-outline-success" onClick={this.handleSolve} name="quick_sort">QuickSort</button>
					 <button type="button" className="btn btn-outline-success" onClick={this.handleSolve} name="bubble_sort">BubbleSort</button>
					 <button type="button" className="btn btn-outline-success" onClick={this.handleSolve} name="heap_sort">HeapSort</button>
				 </div>
		
			</div>


		)
	}
}

export default Sorting;