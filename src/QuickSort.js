import React from "react"


function partitions(arr,low,high,animations)
{
	//put arr[low] in its correct position
	let count=0;
	for(let i=low+1;i<=high;i++)
	{
		if(arr[i]<=arr[low])
		{
			count+=1;
		}
	}
	
	let temp=arr[low];
	arr[low]=arr[low+count];
	arr[low+count]=temp;
	animations.update.push([low,arr[low]]);
	animations.update.push([low+count,arr[low+count]]);
	let i=low;
	let j=high;
	while(i<(low+count) && j>(low+count))
	{
		if(arr[i]<=arr[low+count])
		{
			i++;
		}
		if(arr[j]>arr[low+count])
		{
			j--;
		}
		if(arr[i]>arr[low+count] && arr[j]<=arr[low+count])
		{
			let temp2=arr[i];
			arr[i]=arr[j];
			arr[j]=temp2;
			animations.update.push([i,arr[i]]);
			animations.update.push([j,arr[j]]);
			i++;
			j--;
		}
	}
	return low+count;
}

function quick_sort(arr,low,high,animations){

	if(low <= high)
	{
		let c=partitions(arr,low,high,animations);
		//c is in correct positon
		quick_sort(arr,low,c-1,animations);
		quick_sort(arr,c+1,high,animations);
	}
	

}
function quick_sort_animations(arr){

	let animations = {update:[],compare:[]}
	quick_sort(arr,0,arr.length-1,animations)
	
	return animations
}

export default quick_sort_animations

