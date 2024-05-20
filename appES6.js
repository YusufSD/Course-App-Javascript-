//Course Class
class Course {
    constructor(title, instructor, image){
        this.courseID = Math.floor(Math.random() * 100000);
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}

//UI Class
class UI {
    
    //add course
    addCourseList(course){
        const list = document.getElementById("course-list");

        var html = `
            <tr>
                <td><img src="image/${course.image}"/></td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td><a href="#" data-id="${course.courseID}" class="btn btn-danger btn-sm delete">Delete</a></td>
            </tr>    
        `;
    
        list.innerHTML += html ;
    }

    //clear input
    clearControl(){
        const title = document.getElementById("title").value = "";
    const instructor = document.getElementById("instructor").value = "";
    const image = document.getElementById("image").value = "";
    }

    //delete course
    deleteCourse(element){
        if(element.classList.contains("delete")){
            element.parentElement.parentElement.remove();
            return true;
        } 
    }

    //show alert
    showAlert(message,className){
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
}

class Storage {
    
    static getCourses(){
        let courses;

        if(localStorage.getItem("courses") == null){
            courses = [];
        }
        else{
            courses = JSON.parse(localStorage.getItem("courses"));
        }
        return courses;
    }

    static displayCourses(){
        const courses = Storage.getCourses();

        courses.forEach(course => {
            const ui = new UI();
            ui.addCourseList(course); 
        });
    }

    static addCourse(course){
        const courses = Storage.getCourses();
        courses.push(course);
        localStorage.setItem("courses",JSON.stringify(courses));
    }

    static deleteCourse(element){
        if(element.classList.contains("delete")){
            const id = element.getAttribute("data-id");
            
            const courses = Storage.getCourses();

            courses.forEach((course,index)=> {

                if(course.courseID == id){
                    courses.splice(index,1);
                }
            });

            localStorage.setItem("courses",JSON.stringify(courses));
        }
    }
}

const ui = new UI();

document.addEventListener("DOMContentLoaded", Storage.displayCourses)

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

        //save Storage
        Storage.addCourse(course);

        //Clear İnput
        ui.clearControl();
        
        //ui message
        ui.showAlert("Kurs başarıyla eklendi", "success");

    }

    e.preventDefault();
});

document.getElementById("course-list").addEventListener("click", 
function(e){

    //delete course
    if(ui.deleteCourse(e.target)==true){
        //delete save Storage
        Storage.deleteCourse(e.target);
        ui.showAlert("Kurs Silindi", "danger");
    };

    
});