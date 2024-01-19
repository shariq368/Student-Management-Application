"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
class Course {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
}
class Student {
    constructor(name) {
        this.courses = [];
        this.balance = 0;
        this.id = Student.studentCounter++;
        this.name = name;
    }
    enroll(course) {
        this.courses.push(course);
        this.balance += course.cost;
    }
    viewBalance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }
    payTuition(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`Payment of $${amount} received. Remaining balance: $${this.balance}`);
        }
        else {
            console.log(`Insufficient funds. Balance: $${this.balance}`);
        }
    }
    showStatus() {
        console.log(`Student ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses Enrolled:`);
        this.courses.forEach(course => console.log(` - ${course.name}`));
        console.log(`Balance: $${this.balance}`);
    }
}
Student.studentCounter = 10001;
class StudentManagementSystem {
    constructor() {
        this.students = [];
        this.courses = [
            new Course("Computer", 4500),
            new Course("Science", 6000),
            new Course("History", 5000)
        ];
    }
    addStudent() {
        return __awaiter(this, void 0, void 0, function* () {
            const answers = yield inquirer_1.default.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter student name:'
                }
            ]);
            const newStudent = new Student(answers.name);
            this.students.push(newStudent);
            console.log(`Student ${answers.name} added with ID ${newStudent.id}`);
        });
    }
    enrollStudent() {
        return __awaiter(this, void 0, void 0, function* () {
            const studentAnswers = yield inquirer_1.default.prompt([
                {
                    type: 'input',
                    name: 'studentId',
                    message: 'Enter student ID:'
                }
            ]);
            const courseAnswers = yield inquirer_1.default.prompt([
                {
                    type: 'input',
                    name: 'courseName',
                    message: 'Enter course name:'
                }
            ]);
            const student = this.findStudent(Number(studentAnswers.studentId));
            const course = this.findCourse(courseAnswers.courseName);
            if (student && course) {
                student.enroll(course);
                console.log(`${student.name} enrolled in ${course.name}`);
            }
            else {
                console.log("Student or course not found.");
            }
        });
    }
    viewStudentBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            const studentAnswers = yield inquirer_1.default.prompt([
                {
                    type: 'input',
                    name: 'studentId',
                    message: 'Enter student ID:'
                }
            ]);
            const student = this.findStudent(Number(studentAnswers.studentId));
            if (student) {
                student.viewBalance();
            }
            else {
                console.log("Student not found.");
            }
        });
    }
    payStudentTuition() {
        return __awaiter(this, void 0, void 0, function* () {
            const studentAnswers = yield inquirer_1.default.prompt([
                {
                    type: 'input',
                    name: 'studentId',
                    message: 'Enter student ID:'
                }
            ]);
            const amountAnswers = yield inquirer_1.default.prompt([
                {
                    type: 'input',
                    name: 'amount',
                    message: 'Enter tuition amount:'
                }
            ]);
            const student = this.findStudent(Number(studentAnswers.studentId));
            if (student) {
                const amount = parseFloat(amountAnswers.amount);
                student.payTuition(amount);
            }
            else {
                console.log("Student not found.");
            }
        });
    }
    showStudentStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const studentAnswers = yield inquirer_1.default.prompt([
                {
                    type: 'input',
                    name: 'studentId',
                    message: 'Enter student ID:'
                }
            ]);
            const student = this.findStudent(Number(studentAnswers.studentId));
            if (student) {
                student.showStatus();
            }
            else {
                console.log("Student not found.");
            }
        });
    }
    findStudent(studentId) {
        return this.students.find(student => student.id === studentId);
    }
    findCourse(courseName) {
        return this.courses.find(course => course.name === courseName);
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const sms = new StudentManagementSystem();
        while (true) {
            const action = yield inquirer_1.default.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'Choose an action:',
                    choices: ['Add Student', 'Enroll Student', 'View Balance', 'Pay Tuition', 'Show Status', 'Exit']
                }
            ]);
            switch (action.action) {
                case 'Add Student':
                    yield sms.addStudent();
                    break;
                case 'Enroll Student':
                    yield sms.enrollStudent();
                    break;
                case 'View Balance':
                    yield sms.viewStudentBalance();
                    break;
                case 'Pay Tuition':
                    yield sms.payStudentTuition();
                    break;
                case 'Show Status':
                    yield sms.showStudentStatus();
                    break;
                case 'Exit':
                    console.log('Exiting from student management system');
                    process.exit();
            }
        }
    });
}
main();
