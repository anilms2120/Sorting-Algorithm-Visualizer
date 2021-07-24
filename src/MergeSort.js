import React from "react"


function merge(arr,low,mid,high,animations){


	let n = (mid-low)+1
	let m = (high-(mid+1))+1
	let i=0
	let j=0
	let k=low
	let L=[]
	let R=[]
	for(let i=low;i<=mid;i++)
	{
		L.push(arr[i])
	}
	for(let i=mid+1;i<=high;i++)
	{
		R.push(arr[i])
	}
	while(i<n && j<m)
	{
		animations.compare.push([i,j])
		if(L[i] <= R[j])
		{
			animations.update.push([k,L[i]])
			arr[k]=L[i]
			i+=1
			k+=1
		}
		else
		{
			animations.update.push([k,R[j]])
			arr[k]=R[j]
			j+=1
			k+=1
		}
	}
	while(i<n)
	{
		
		animations.update.push([k,L[i]])
		arr[k]=L[i]
			i+=1
			k+=1
	}
	while(j<m)
	{
		
		animations.update.push([k,R[j]])
		arr[k]=R[j]
			j+=1
			k+=1
	}
	return 
}

function merge_sort(arr,low,high,animations){

	if(low < high)
	{
		let mid = Math.floor((low+high)/2)
		merge_sort(arr,low,mid,animations)
		merge_sort(arr,mid+1,high,animations)
		merge(arr,low,mid,high,animations)
	}
	

}
function merge_sort_animations(arr){

	let animations = {update:[],compare:[]}
	merge_sort(arr,0,arr.length-1,animations)
	return animations
}

export default merge_sort_animations

