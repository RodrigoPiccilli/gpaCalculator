import React, { useState } from 'react';

const MainContentComponent = () => {

    const [addCourse, setAddCourse] = useState(false);

    // const [courseList, setCourseList] = useState([]);

    // const handleAddCourse = () => {
        
    // }

    return (

        <div className="main-content">

            {!addCourse && (
                <h1 id="add-course" onClick={() => setAddCourse(true)}>Add Course +</h1>
            )}

            {addCourse && (

                <div className="add-course-form">
                    <h2>Add a New Course</h2>

                    <div className="add-course-fields">
                    
                        <div className="course-label">Course Name:</div>
                        <input className="course-input" type="text" name="courseName"/>

                        <div className="credits-label">Credits:</div>
                        <select className="credits-input">
                                <option value="" disabled selected>Select Credits</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                        </select>

                        <div className="grade-label">Credits:</div>
                        <select className="grade-input">
                                <option value="" disabled selected>Select Grade</option>
                                <option value="A+">A+</option>
                                <option value="A">A</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B">B</option>
                                <option value="B-">B-</option>
                                <option value="C+">C+</option>
                                <option value="C">C</option>
                                <option value="C-">C-</option>
                                <option value="D+">D+</option>
                                <option value="D">D</option>
                                <option value="D-">D-</option>
                                <option value="F">F</option>
                        </select>

                    </div>

                    <div className="action-buttons">
                        <button type="submit">Add Course</button>
                        <button type="button" onClick={() => setAddCourse(false)}>Cancel</button>
                    </div>

                </div>
            )}

            <div className="course-list">
                <h2>My Courses</h2>

                <div>

                    <table id="course-table">
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Credits</th>
                                <th>Grade</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>CSC 216</td>
                                <td>3</td>
                                <td>A</td>
                                
                            </tr>

                            <tr>
                                <td>CSC 226</td>
                                <td>3</td>
                                <td>B+</td>
                                
                            </tr>
                            

                        </tbody>
                    </table>
                </div>

            </div>
        </div>

    )

}

export default MainContentComponent;