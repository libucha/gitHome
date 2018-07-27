var student = require('./student');
var teacher = require('./teacher');
function add(teachername,students){
	teacher.add(teachername);
	students.forEach( function(element, index) {
		student.add(element)
	});
}
exports.add= add