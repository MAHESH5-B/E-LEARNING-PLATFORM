import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard() {
  const { user, logout, users, updateUser, removeUser } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Data
  const [courses, setCourses] = useState(() => JSON.parse(localStorage.getItem("APP_COURSES") || "[]"));
  const [enrollments, setEnrollments] = useState(() => JSON.parse(localStorage.getItem("APP_ENROLLMENTS") || "[]"));
  const [quizzes, setQuizzes] = useState(() => JSON.parse(localStorage.getItem("APP_QUIZZES") || "[]"));
  const [complaints, setComplaints] = useState(() => JSON.parse(localStorage.getItem("APP_COMPLAINTS") || "[]"));

  useEffect(() => {
    localStorage.setItem("APP_COMPLAINTS", JSON.stringify(complaints));
  }, [complaints]);

  const totalUsers = users.length;
  const totalCourses = courses.length;
  const totalQuizzes = quizzes.length;
  const pendingComplaints = complaints.filter(c => c.status === 'pending').length;

  const verifyUser = (userId) => {
    updateUser(userId, { verified: true });
  };

  const solveComplaint = (complaintId) => {
    setComplaints(complaints.map(c => c.id === complaintId ? { ...c, status: 'solved' } : c));
  };

  const removeInstructor = (userId) => {
    removeUser(userId);
    setCourses(courses.filter(c => c.instructorId !== userId));
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            <i className="bi bi-shield-lock me-2"></i>E-Learning Platform
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <span className="nav-link">Welcome, {user.name}</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light ms-2" onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div className="bg-white shadow-sm p-3" style={{ width: '250px', minHeight: 'calc(100vh - 76px)' }}>
          <h5 className="text-primary mb-4">Admin Menu</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button className={`nav-link  btn btn-link text-start ${activeTab !== "dashboard" ? "text-dark fw-bold" : "text-primary"}`} onClick={() => setActiveTab("dashboard")}>
                <i className="bi bi-house-door me-2"></i>Dashboard
              </button>
            </li>
            <li className="nav-item mb-2">
              <button className={`nav-link btn btn-link text-start ${activeTab !== "users" ? "text-dark fw-bold" : "text-primary"}`} onClick={() => setActiveTab("users")}>
                <i className="bi bi-people me-2"></i>Users
              </button>
            </li>
            <li className="nav-item mb-2">
              <button className={`nav-link btn btn-link text-start ${activeTab !== "courses" ? "text-dark fw-bold" : "text-primary"}`} onClick={() => setActiveTab("courses")}>
                <i className="bi bi-collection me-2"></i>Courses
              </button>
            </li>
            <li className="nav-item mb-2">
              <button className={`nav-link btn btn-link text-start ${activeTab !== "quizzes" ? "text-dark fw-bold" : "text-primary"}`} onClick={() => setActiveTab("quizzes")}>
                <i className="bi bi-question-circle me-2"></i>Quizzes
              </button>
            </li>
            <li className="nav-item mb-2">
              <button className={`nav-link btn btn-link text-start ${activeTab !== "complaints" ? "text-dark fw-bold" : "text-primary"}`} onClick={() => setActiveTab("complaints")}>
                <i className="bi bi-exclamation-triangle me-2"></i>Complaints
              </button>
            </li>
            <li className="nav-item mb-2">
              <button className={`nav-link btn btn-link text-start ${activeTab !== "reports" ? "text-dark fw-bold" : "text-primary"}`} onClick={() => setActiveTab("reports")}>
                <i className="bi bi-bar-chart me-2"></i>Reports
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
          {activeTab === "dashboard" && (
            <div>
              <div style={{backgroundColor:'#22d3ee',color:'white'}}className=" text-white p-5 mb-4 rounded shadow">
                <h1 className="display-4">Admin Dashboard</h1>
                <p className="lead">Oversee the entire platform.</p>
              </div>
              <div className="row">
                <div className="col-md-3 mb-4">
                  <div className="card text-center shadow">
                    <div className="card-body">
                      <i className="bi bi-people display-4 text-primary"></i>
                      <h5 className="card-title">Total Users</h5>
                      <p className="card-text display-4">{totalUsers}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-4">
                  <div className="card text-center shadow">
                    <div className="card-body">
                      <i className="bi bi-book display-4 text-success"></i>
                      <h5 className="card-title">Total Courses</h5>
                      <p className="card-text display-4">{totalCourses}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-4">
                  <div className="card text-center shadow">
                    <div className="card-body">
                      <i className="bi bi-question-circle display-4 text-warning"></i>
                      <h5 className="card-title">Total Quizzes</h5>
                      <p className="card-text display-4">{totalQuizzes}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-4">
                  <div className="card text-center shadow">
                    <div className="card-body">
                      <i className="bi bi-exclamation-triangle display-4 text-danger"></i>
                      <h5 className="card-title">Pending Complaints</h5>
                      <p className="card-text display-4">{pendingComplaints}</p>
                    </div>
                  </div>
                </div>
              </div>
              <h4>Recent Activity</h4>
              <p>No recent activity.</p> {/* Placeholder */}
            </div>
          )}

          {activeTab === "users" && (
            <div>
              <h2 className="mb-4">All Users</h2>
              <div className="row">
                {users.map(u => (
                  <div key={u.id} className="col-md-6 mb-4">
                    <div className="card shadow">
                      <div className="card-body">
                        <h5 className="card-title">{u.name} ({u.role})</h5>
                        <p className="card-text">Email: {u.email}</p>
                        <p className="card-text">Verified: {u.verified ? "Yes" : "No"}</p>
                        {!u.verified && <button className="btn btn-success me-2" onClick={() => verifyUser(u.id)}>Verify</button>}
                        {u.role === "instructor" && <button className="btn btn-danger" onClick={() => removeInstructor(u.id)}>Remove Instructor</button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "courses" && (
            <div>
              <h2 className="mb-4">All Courses</h2>
              <div className="row">
                {courses.map(course => (
                  <div key={course.id} className="col-md-6 mb-4">
                    <div className="card shadow">
                      <div className="card-body">
                        <h5 className="card-title">{course.title}</h5>
                        <p className="card-text">{course.description}</p>
                        <p className="text-muted">Instructor: {course.instructorName}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "quizzes" && (
            <div>
              <h2 className="mb-4">All Quizzes</h2>
              <div className="row">
                {quizzes.map(quiz => {
                  const course = courses.find(c => c.id === quiz.courseId);
                  return (
                    <div key={quiz.id} className="col-md-4 mb-4">
                      <div className="card shadow">
                        <div className="card-body">
                          <h5 className="card-title">{quiz.title}</h5>
                          <p className="card-text">Course: {course?.title}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "complaints" && (
            <div>
              <h2 className="mb-4">All Complaints</h2>
              <div className="row">
                {complaints.map(c => (
                  <div key={c.id} className="col-md-6 mb-4">
                    <div className="card shadow">
                      <div className="card-body">
                        <h5 className="card-title">From: {c.userName}</h5>
                        <p className="card-text">{c.complaint}</p>
                        <p className="card-text">Status: {c.status}</p>
                        {c.status === 'pending' && <button className="btn btn-primary" onClick={() => solveComplaint(c.id)}>Mark as Solved</button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div>
              <h2 className="mb-4">Reports</h2>
              <p>Reports will be displayed here.</p> {/* Placeholder */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}