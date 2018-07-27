function learn(something){
	console.log(something)
}
function we(callback,something){
	something += ' is cool';
	callback(something); 
}
// we第一参数是回调的函数

we(learn ,'node.js')