import React from "react";

export default function CourseCard({course,onView,onDelete}){
    return(
        <div className="card h-100 shadow-sm border-0">
            <div className="bg-light d-flex align-items-center justify-content-center" style={{height:'160px'}}>
                {course.thumbnail ?(
                    <img src={course.thumbnail} alt={course.title} className="card-img-top h-100 object-fit-cover"  />
                ):(
                    <i className="bi bi-play-btn-fill display-1 text-secondary"></i>
                )}
            </div>
                
            <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold text-dark">{course.title}</h5>
                <p className="text-muted small mb-2">By {course.instructorName}</p>

                <p className="card-text text-secondary small flex-grow-1">
                    {course.description?.substring(0,80)}...
                </p>

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="badge bg-info-subtle text-info-emphasis px-2 py-1">
                        <i className="bi bi-clock me-1"></i>{course.duration || 'N/A'}
                    </span>
                    <button className="btn btn-primary btn-sm px-3" onClick={()=>onView(course)}>
                        View Course    
                    </button> 
                    {onDelete && (
                        <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(course.id)}>
                        <i className="bi bi-trash"></i>
                        </button>
                    )}


                </div>
            </div>

        </div>
    );
}