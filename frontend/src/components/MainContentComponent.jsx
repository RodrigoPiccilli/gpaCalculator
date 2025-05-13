import React, { useState, useEffect } from 'react';

const GPACalculatorMenu = () => {

    const [addCourse, setAddCourse] = useState(false);
    const [courseName, setCourseName] = useState("");
    const [credits, setCredits] = useState("");
    const [grade, setGrade] = useState("");
    const [gpa, setGPA] = useState(-1);
    const [courseList, setCourseList] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const storedCourses = sessionStorage.getItem("courses");
        if (storedCourses) {
            setCourseList(JSON.parse(storedCourses));
        }
        setInitialized(true);
    }, []);

    useEffect(() => {
        const form = document.querySelector(".add-course-outer");
        if (form) {
            if (addCourse) {
                form.classList.add("open");
            } else {
                form.classList.remove("open");
                setCourseName("");
                setCredits("");
                setGrade("");
                setErrors({});
            }
        }
    }, [addCourse]);

    function validateForm(name, credits, grade) {
        const newErrors = {};
        const courseNamingConvention = /^[A-Z]{3} \d{3}$/;
        const letterGrade = [
            "A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"
        ];

        if (!courseNamingConvention.test(name)) {
            newErrors.courseName = "Course name must be in format 'ABC 123'";
        }

        const numericCredits = parseInt(credits);
        if (isNaN(numericCredits) || numericCredits < 1 || numericCredits > 12) {
            newErrors.courseCredit = "Credits must be between 1 and 12";
        }

        if (!letterGrade.includes(grade)) {
            newErrors.courseGrade = "Grade must be a valid letter grade";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length > 0;
    }

    const handleAddCourse = () => {
        setErrors({});
        if (validateForm(courseName, credits, grade)) return;

        const newCourse = {
            name: courseName,
            credits: credits,
            grade: grade
        };

        setCourseList(prev => [...prev, newCourse]);
        setAddCourse(false);
    };

    useEffect(() => {
        if (!initialized) return;

        const coursePoints = {
            "A+": 4.333,
            "A": 4.0,
            "A-": 3.667,
            "B+": 3.333,
            "B": 3.0,
            "B-": 2.667,
            "C+": 2.333,
            "C": 2.0,
            "C-": 1.667,
            "D+": 1.333,
            "D": 1.0,
            "D-": 0.667,
            "F": 0
        };

        let totalCredits = 0;
        let totalPoints = 0;

        courseList.forEach(course => {
            totalCredits += parseFloat(course.credits);
            totalPoints += parseFloat(course.credits) * coursePoints[course.grade];
        });

        const calculatedGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;
        setGPA(calculatedGPA);

        sessionStorage.setItem("courses", JSON.stringify(courseList));
    }, [courseList, initialized]);

    return (
        <div className="main-content">
            <h1 id="add-course" onClick={() => setAddCourse(true)}>
                Add Course +
            </h1>

            <div className="add-course-outer">
                <div className="add-course-form">
                    <h2>Add a New Course</h2>

                    {errors.courseName && <p className="error-message">{errors.courseName}</p>}
                    {errors.courseCredit && <p className="error-message">{errors.courseCredit}</p>}
                    {errors.courseGrade && <p className="error-message">{errors.courseGrade}</p>}

                    <div className="add-course-fields">
                        <div className="course-label">Course Name:</div>
                        <input
                            placeholder="[PREFIX] [NUMBER]"
                            className="course-input"
                            type="text"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                        />
                        <div className="credits-label">Credits:</div>
                        <select
                            className="credits-input"
                            value={credits}
                            onChange={(e) => setCredits(e.target.value)}
                        >
                            <option value="" disabled>Select Credits</option>
                            {[...Array(12)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>

                        <div className="grade-label">Grade:</div>
                        <select
                            className="grade-input"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                        >
                            <option value="" disabled>Select Grade</option>
                            {["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"].map(grade => (
                                <option key={grade} value={grade}>{grade}</option>
                            ))}
                        </select>
                    </div>

                    <div className="action-buttons">
                        <button onClick={handleAddCourse}>Add Course</button>
                        <button onClick={() => setAddCourse(false)}>Cancel</button>
                    </div>
                </div>
            </div>

            <div className="course-list">
                <h2>My Courses</h2>
                <table id="course-table">
                    {courseList.length > 0 ? (
                        <>
                            <thead>
                                <tr>
                                    <th>Course Name</th>
                                    <th>Credits</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courseList.map((course, index) => (
                                    <tr key={index}>
                                        <td>{course.name}</td>
                                        <td>{course.credits}</td>
                                        <td>{course.grade}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="3">No courses added yet.</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>

            <div className="gpa-display">
                <h1>Your Cumulative GPA Is</h1>
                {gpa > -1 && (
                    <p>{gpa.toFixed(2)}</p>
                )}
            </div>
        </div>
    );
};

export default GPACalculatorMenu;