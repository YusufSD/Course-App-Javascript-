//Course Constructor
function Course(title, instructor, image){
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}

//UI Constructor
function UI (){

}

//Create UI
const ui = new UI();

//Add Course
UI.prototype.addCourseList = function(course){
    const list = document.getElementById("course-list");

    var html = `
        <tr>
            <td><img src="image/${course.image}"/></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        </tr>    
    `;

    list.innerHTML += html ;
}

//Delete Course
UI.prototype.deleteCourse = function(element){
    if(element.classList.contains("delete")){
        element.parentElement.parentElement.remove();
    } 
}


//Clear Control
UI.prototype.clearControl = function(){
    const title = document.getElementById("title").value = "";
    const instructor = document.getElementById("instructor").value = "";
    const image = document.getElementById("image").value = "";
}

//Show Alert
UI.prototype.showAlert = function(message,className){
    
    var alert = `
        <div class="alert alert-${className}">
            ${message}
        </div>
    `;

    const row = document.querySelector(".row");
    row.insertAdjacentHTML("beforebegin",alert);

    setTimeout(()=>{
        document.querySelector(".alert").remove();
    },1500);

}


document.getElementById("new-course").addEventListener("submit",
function(e){

    const title = document.getElementById("title").value;
    const instructor = document.getElementById("instructor").value;
    const image = document.getElementById("image").value;

    //create course object
    const course = new Course(title, instructor, image);
    
    //add course
    if(title=="" || instructor=="" || image==""){
        ui.showAlert("Lütfen tüm alanları eksiksiz doldurunuz.", "warning");
    }
    else{
        // add course to list
        ui.addCourseList(course);

        //Clear İnput
        ui.clearControl();

        ui.showAlert("Kurs başarıyla eklendi", "success");

    }

   


    e.preventDefault();
});

document.getElementById("course-list").addEventListener("click", 
function(e){
    ui.deleteCourse(e.target);
    ui.showAlert("Kurs Silindi", "danger");
});