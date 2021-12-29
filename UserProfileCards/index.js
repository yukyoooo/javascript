// オブジェクトを入力として受け取ります。
function createEmployeeCard(employeeObject){
    let innerFlex = document.createElement("div");
    innerFlex.classList.add("d-flex", "align-items-center", "col-md-7", "col-10", "m-1");

    let cardDiv = document.createElement("div");
    innerFlex.append(cardDiv);
    cardDiv.classList.add("d-flex", "col-12", "profile-card");

    // ユーザーの入力を使用します。
    //*** 左半分 ***
    let leftInfo = document.createElement("div");
    leftInfo.classList.add("col-8", "py-3");
    let div1 = document.createElement("div");
    div1.classList.add("py-2")
    let div2 = div1.cloneNode(true);
    let div3 = div1.cloneNode(true);

    let nameTitle = document.createElement("h4");
    // getFullName()メソッド
    nameTitle.innerHTML = employeeObject.getFullName();

    let employeeJob = document.createElement("p")
    let employeeSkill = document.createElement("p")
    let employeeCountry = document.createElement("p");

    // オブジェクト employeeObject.job
    employeeJob.innerHTML = "Job: " + "<br>"  + employeeObject.job;
    div1.append(employeeJob);

    employeeSkill.innerHTML = "Skill: " + "<br>"  + employeeObject.skills;
    div2.append(employeeSkill);

    employeeCountry.innerHTML = "Country : " + "<br>"  + employeeObject.country;
    div3.append(employeeCountry);

    leftInfo.append(nameTitle);
    leftInfo.append(div1);
    leftInfo.append(div2);
    leftInfo.append(div3);
    //*** 左半分終了 ***

    //*** 右半分 ***
    let rightInfo = document.createElement("div");
    let div4 = document.createElement("div");
    rightInfo.classList.add("col-4", "d-flex", "justify-content-center", "align-items-center");
    let avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.src = employeeObject.avatarUrl;
    div4.append(avatar);
    rightInfo.append(div4);
    //*** 右半分終了 ***

    cardDiv.append(leftInfo);
    cardDiv.append(rightInfo);

    return innerFlex;
}

const profileDiv = document.getElementById("profiles");

// 従業員のクラスを生成します。createEmployeeCard関数は、前回複数の変数を受け取っていましたが今回はオブジェクトを受け取ります。
class Employee{
    constructor(firstName, lastName, job, skills, country, avatarUrl){
        this.firstName = firstName;
        this.lastName = lastName;
        this.job = job;
        this.skills = skills;
        this.country = country;
        this.avatarUrl = avatarUrl;
    }

    getFullName(){
        return this.firstName + " " + this.lastName;
    }
}

let employee1 = new Employee("Kaiden" ,"Herman", "Software Engineer", "C++, C#, Java, PHP, JavaScript, Python","United States", "https://pbs.twimg.com/profile_images/501759258665299968/3799Ffxy.jpeg");
let employee2 = new Employee("Elizabeth", "Dunn", "Accountant", "Excel, Word, Quickbooks", "England", "https://randomuser.me/api/portraits/women/76.jpg");
let employee3 = new Employee("Duan", "Moreno", "Teacher",  "Working with children, History, Word", "Argentina", "https://randomuser.me/api/portraits/med/men/93.jpg");

profileDiv.append(createEmployeeCard(employee1));
profileDiv.append(createEmployeeCard(employee2));
profileDiv.append(createEmployeeCard(employee3));