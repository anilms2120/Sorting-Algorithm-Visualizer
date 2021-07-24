import React from "react"




function bubble_sort(arr,animations){

	let n = arr.length;
	for(let i=0;i<n-1;i++)
	{
		for(let j=0;j<n;j++)
		{
			if( j+1 < n &&arr[j] > arr[j+1] )
			{
				let temp = arr[j]
				arr[j]=arr[j+1]
				arr[j+1]=temp
				animations.update.push([j,arr[j]])
				animations.update.push([j+1,arr[j+1]])

			}
		}
	}
	return

	

}
function bubble_sort_animations(arr){

	let animations = {update:[],compare:[]}
	bubble_sort(arr,animations)
	return animations
}

export default bubble_sort_animations

