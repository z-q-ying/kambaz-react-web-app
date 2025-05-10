export default function Modules() {
    return (
        <div>
            {/* Implement Collapse All button, View Progress button, etc. */}
            <button id="wd-collapse-all-modules">Collapse All</button>{" "}
            <button id="wd-view-progress">View Progress</button>{" "}
            <select id="wd-publish-all-modules" defaultValue={"all"}>
                <option value="all">Publish All</option>
                <option value="modules">Publish Modules Only</option>
                <option value="unpublish-all">Unpublish All</option>
                <option value="unpublish-modules">Unpublish Modules Only</option>
            </select>{" "}
            <button id="wd-add-module">+ Module</button>
            <ul id="wd-modules">
                <li className="wd-module">
                    <div className="wd-title">Lecture 1 - Building React User Interfaces with HTML, Setting Up the Dev Environment</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to the course</li>
                                <li className="wd-content-item">Learn what is Web Development</li>
                            </ul>
                        </li>

                        <li className="wd-lesson">
                            <span className="wd-title">READING</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Chapter 1 - Building React User Interfaces with HTML</li>
                            </ul>
                        </li>

                        <li className="wd-lesson">
                            <span className="wd-title">Slides</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to Web Development</li>
                                <li className="wd-content-item">Creating a React Application</li>
                                <li className="wd-content-item">Commit your source to GitHub.com</li>
                                <li className="wd-content-item">Deploying to Netlify</li>
                            </ul>
                        </li>
                    </ul>
                </li>

                {/* Lecture 2 */}
                <li className="wd-module">
                    <div className="wd-title">Lecture 2 - Prototyping the React Kambaz User Interface with HTML</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
                                <li className="wd-content-item">Deploy the assignment to Netlify</li>
                            </ul>
                        </li>

                        <li className="wd-lesson">
                            <span className="wd-title">READING</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Chapter 1 - Building React User Interfaces with HTML</li>
                            </ul>
                        </li>

                        <li className="wd-lesson">
                            <span className="wd-title">Slides</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Implementing the Kambaz Account Screens</li>
                                <li className="wd-content-item">Implementing the Kambaz Dashboard Screen</li>
                                <li className="wd-content-item">Implementing the Kambaz Modules Screen</li>
                                <li className="wd-content-item">Kanbas Web App on Netlify</li>
                            </ul>
                        </li>
                    </ul>
                </li>

                {/* Lecture 3 */}
                <li className="wd-module">
                    <div className="wd-title">Lecture 3 - Styling Web Pages with CSS and Bootstrap</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">LEARNING OBJECTIVES</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to CSS</li>
                                <li className="wd-content-item">Selectors by tag ID, classes, and document structure</li>
                                <li className="wd-content-item">Styling color and background color</li>
                                <li className="wd-content-item">The box model - styling margins, borders, and paddings</li>
                            </ul>
                        </li>

                        <li className="wd-lesson">
                            <span className="wd-title">READING</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Chapter 2 - Styling Web Pages with CSS</li>
                            </ul>
                        </li>

                        <li className="wd-lesson">
                            <span className="wd-title">Slides</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">Introduction to Cascading Style Sheets</li>
                                <li className="wd-content-item">The Box Model</li>
                                <li className="wd-content-item">Rotating content & Gradient background</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}