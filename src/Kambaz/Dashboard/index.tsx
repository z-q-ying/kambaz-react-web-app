import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
            <div id="wd-dashboard-courses">

                {/* Course 1 */}
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/5610/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/reactjs.jpg" width={200} />
                        <div>
                            <h5>CS5610 41980</h5>
                            <p className="wd-dashboard-course-title">Web Development SEC 04 Summer 1 2025</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                {/* Course 2 */}
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/5500/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/reactjs.jpg" width={200} />
                        <div>
                            <h5>CS5500 20806</h5>
                            <p className="wd-dashboard-course-title">Found of Software Engineering SEC 06 Fall 2023</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                {/* Course 3 */}
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/5200/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/reactjs.jpg" width={200} />
                        <div>
                            <h5>CS5200 40634</h5>
                            <p className="wd-dashboard-course-title">Database Management Sys SEC 07 Spring 2025</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                {/* Course 4 */}
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/5800/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/reactjs.jpg" width={200} />
                        <div>
                            <h5>CS5800 40214</h5>
                            <p className="wd-dashboard-course-title">Algorithms SEC 07 Spring 2024</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                {/* Course 5 */}
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/6650/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/reactjs.jpg" width={200} />
                        <div>
                            <h5>CS6650 21490</h5>
                            <p className="wd-dashboard-course-title">Scalable Distributed Systems SEC 02 Fall 2024</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                {/* Course 6 */}
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/5002/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/reactjs.jpg" width={200} />
                        <div>
                            <h5>CS5002 36412</h5>
                            <p className="wd-dashboard-course-title">Discrete Structures SEC 14 Spring 2023</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                {/* Course 7 */}
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/5004/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/reactjs.jpg" width={200} />
                        <div>
                            <h5>CS5004 52482</h5>
                            <p className="wd-dashboard-course-title">Object-Oriented Design SEC 04 Summer Full 2023</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}