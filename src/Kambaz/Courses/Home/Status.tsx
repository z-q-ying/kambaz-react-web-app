import { BiImport } from "react-icons/bi";
import { Button } from "react-bootstrap";
import { FaBullseye, FaCheckCircle, FaRegChartBar } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { IoStatsChartOutline } from "react-icons/io5";
import { LiaFileImportSolid } from "react-icons/lia";
import { MdDoNotDisturbAlt } from "react-icons/md";

export default function CourseStatus() {
    return (
        <div id="wd-course-status" style={{ width: "350px" }}>
            <h2>Course Status</h2>
            <div className="d-flex">
                <div className="w-50 pe-1">
                    <Button variant="secondary" size="lg" className="w-100 text-nowrap ">
                        <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
                    </Button>
                </div>
                <div className="w-50">
                    <Button variant="success" size="lg" className="w-100">
                        <FaCheckCircle className="me-2 fs-5" /> Publish
                    </Button>
                </div>
            </div>
            <br />

            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <BiImport className="me-2 fs-5" /> Import Existing Content
            </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons
            </Button>

            {/* Complete the rest of the buttons */}
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <FaBullseye className="me-2 fs-5" /> Choose Home Page
            </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <IoStatsChartOutline className="me-2 fs-5" /> View Course Stream
            </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <HiOutlineSpeakerphone className="me-2 fs-5" /> New Announcement
            </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <FaRegChartBar className="me-2 fs-5" /> New Analytics
            </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
                <FiBell className="me-2 fs-5" /> View Course Notifications
            </Button>
        </div>
    );
}