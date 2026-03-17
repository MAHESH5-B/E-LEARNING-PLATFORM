import React, { useState } from 'react';

const ManualQuizCreator = ({ onCreate }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([
    { id: Date.now(), type: 'single', questionText: '', options: ['', '', '', ''], correctAnswer: '' }
  ]);

  // Add a new empty question
  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      type: 'single',
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    };
    setQuestions([...questions, newQuestion]);
  };

  // Remove a specific question
  const removeQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  // Update question data
  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        // Reset answer if type changes to prevent data mismatch
        if (field === 'type') return { ...q, [field]: value, correctAnswer: value === 'multiple' ? [] : '' };
        return { ...q, [field]: value };
      }
      return q;
    }));
  };

  // Handle saving
  const handleCreateQuiz = () => {
    if (!quizTitle) return alert("Please enter a Quiz Title");
    
    const quizData = {
      title: quizTitle,
      questions: questions,
      totalQuestions: questions.length,
      createdAt: new Date().toLocaleDateString()
    };

    onCreate(quizData);
    // Reset form
    setQuizTitle('');
    setQuestions([{ id: Date.now(), type: 'single', questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  return (
    <div className="container py-5 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Manual Quiz Builder</h2>
          <div className="space-y-4">
            <label className="block text-gray-600 font-semibold">Quiz Title</label>
            <input 
              type="text" 
              className="form-control form-control-lg border-2 focus:border-blue-500"
              placeholder="e.g. JavaScript Fundamentals"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
            />
          </div>
        </div>

        {/* Dynamic Questions List */}
        {questions.map((q, index) => (
          <div key={q.id} className="bg-white p-6 rounded-xl shadow-md border-l-8 border-blue-600 mb-8 relative transition-all">
            
            {/* Remove Button */}
            <button 
              onClick={() => removeQuestion(q.id)}
              className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
              title="Remove Question"
            >
              <span className="font-bold">✕</span>
            </button>

            <div className="row g-3">
              <div className="col-md-8">
                <label className="text-sm font-bold text-gray-500 uppercase">Question {index + 1}</label>
                <textarea 
                  className="form-control mt-1" 
                  rows="2"
                  placeholder="Type your question here..."
                  value={q.questionText}
                  onChange={(e) => updateQuestion(q.id, 'questionText', e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="text-sm font-bold text-gray-500 uppercase">Type</label>
                <select 
                  className="form-select mt-1"
                  value={q.type}
                  onChange={(e) => updateQuestion(q.id, 'type', e.target.value)}
                >
                  <option value="single">Single Choice</option>
                  <option value="multiple">Multiple Choice</option>
                  <option value="text">Short Answer (Text)</option>
                </select>
              </div>
            </div>

            <hr className="my-4" />

            {/* Answer Options Logic */}
            {q.type !== 'text' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                {q.options.map((opt, optIdx) => (
                  <div key={optIdx} className="input-group">
                    <span className="input-group-text bg-light text-xs font-bold">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder={`Option ${optIdx + 1}`}
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...q.options];
                        newOpts[optIdx] = e.target.value;
                        updateQuestion(q.id, 'options', newOpts);
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-3">
                <p className="text-sm text-blue-600 italic">User will be provided a text box to type their answer.</p>
              </div>
            )}

            {/* Set Correct Answer Section */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <label className="block text-sm font-bold text-gray-700 mb-2">Define Correct Answer:</label>
              {q.type === 'single' && (
                <select 
                  className="form-select form-select-sm w-1/2"
                  value={q.correctAnswer}
                  onChange={(e) => updateQuestion(q.id, 'correctAnswer', e.target.value)}
                >
                  <option value="">Select Correct Option</option>
                  {q.options.map((opt, i) => <option key={i} value={opt}>{opt || `Option ${i+1}`}</option>)}
                </select>
              )}
              {q.type === 'text' && (
                <input 
                  type="text" 
                  className="form-control form-control-sm"
                  placeholder="Correct keyword (Case insensitive)"
                  value={q.correctAnswer}
                  onChange={(e) => updateQuestion(q.id, 'correctAnswer', e.target.value)}
                />
              )}
              {q.type === 'multiple' && (
                <p className="text-xs text-gray-500">Note: For multiple answers, you can store an array of selected options.</p>
              )}
            </div>
          </div>
        ))}

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-100 p-6 rounded-xl border-2 border-dashed">
          <button 
            onClick={addQuestion}
            className="btn btn-outline-primary px-5 font-bold rounded-pill"
          >
            + Add Another Question
          </button>
          
          <button 
            onClick={handleCreateQuiz}
            className="btn btn-success px-10 py-3 font-bold shadow-lg hover:scale-105 transition-transform"
          >
            Finalize & Create Quiz
          </button>
        </div>

      </div>
    </div>
  );
};

export default ManualQuizCreator;