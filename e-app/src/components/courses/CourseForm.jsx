import React, { useState } from 'react';

export default function CourseForm({ onSubmit, onCancel }) {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    duration: "",
    content: [{ topic: "", videoUrl: "" }] 
  });

  const handleAddTopic = () => {
    setCourseData({
      ...courseData,
      content: [...courseData.content, { topic: "", videoUrl: "" }]
    });
  };

  const handleRemoveTopic = (index) => {
    const updatedContent = courseData.content.filter((_, i) => i !== index);
    setCourseData({ ...courseData, content: updatedContent });
  };

  const handleTopicChange = (index, field, value) => {
    const updatedContent = [...courseData.content];
    updatedContent[index][field] = value;
    setCourseData({ ...courseData, content: updatedContent });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(courseData); }} className="p-2">
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold small">Course Title</label>
          <input type="text" className="form-control" placeholder="e.g. React Mastery" 
            onChange={(e) => setCourseData({...courseData, title: e.target.value})} required />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold small">Duration</label>
          <input type="text" className="form-control" placeholder="e.g. 15 Hours" 
            onChange={(e) => setCourseData({...courseData, duration: e.target.value})} required />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold small">Thumbnail Image URL</label>
        <input type="url" className="form-control" placeholder="https://images.unsplash.com/..." 
          onChange={(e) => setCourseData({...courseData, thumbnail: e.target.value})} required />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold small">Course Description</label>
        <textarea className="form-control" rows="3" placeholder="Describe what students will learn..." 
          onChange={(e) => setCourseData({...courseData, description: e.target.value})} required />
      </div>

      <h6 className="fw-bold mt-4 border-bottom pb-2">Course Curriculum</h6>
      {courseData.content.map((item, index) => (
        <div key={index} className="row g-2 mb-3 align-items-center bg-light p-2 rounded">
          <div className="col-md-5">
            <input placeholder="Topic Name (e.g. Introduction)" className="form-control form-control-sm" 
              value={item.topic} onChange={(e) => handleTopicChange(index, 'topic', e.target.value)} required />
          </div>
          <div className="col-md-6">
            <input placeholder="YouTube Video URL" className="form-control form-control-sm" 
              value={item.videoUrl} onChange={(e) => handleTopicChange(index, 'videoUrl', e.target.value)} required />
          </div>
          <div className="col-md-1 text-center">
            {courseData.content.length > 1 && (
              <button type="button" className="btn btn-link text-danger p-0" onClick={() => handleRemoveTopic(index)}>
                <i className="bi bi-trash"></i>
              </button>
            )}
          </div>
        </div>
      ))}

      <button type="button" className="btn btn-outline-primary btn-sm mb-4" onClick={handleAddTopic}>
        <i className="bi bi-plus-circle me-1"></i> Add Another Topic
      </button>

      <div className="d-flex gap-3">
        <button type="submit" className="btn btn-primary px-5">Publish Course</button>
        <button type="button" className="btn btn-outline-secondary px-5" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}