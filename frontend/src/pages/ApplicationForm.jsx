import { useState } from "react";
import { X, Upload, FileText, Send, User, Briefcase } from "lucide-react";
import { Button } from "../components/Button"; 

const ApplicationForm = ({ jobId, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    coverLetter: "",
    attachment: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Dummy data for initial display
  const dummyData = {
    coverLetter: "Dear Hiring Manager,\n\nI am excited to apply for this position. With my extensive experience in full-stack development and a passion for creating innovative solutions, I believe I would be a valuable addition to your team.\n\nI have successfully delivered multiple projects using React, Node.js, and various modern technologies. My approach focuses on clean code, user experience, and meeting project deadlines.\n\nI would love to discuss how my skills can contribute to your project's success.\n\nBest regards,\nYour Name",
    attachedFile: "sample_resume.pdf"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        attachment: file
      }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFormData(prev => ({
        ...prev,
        attachment: file
      }));
    }
  };

  const loadDummyData = () => {
    setFormData(prev => ({
      ...prev,
      coverLetter: dummyData.coverLetter
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('coverLetter', formData.coverLetter);
      formDataToSend.append('jobId', jobId);
      
      if (formData.attachment) {
        formDataToSend.append('attachment', formData.attachment);
      }

      const response = await fetch(`/api/freelancers/apply/${jobId}`, {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend
      });

      const result = await response.json();

      if (result.success) {
        onSubmit(result.application);
        onClose();
      } else {
        alert('Failed to submit application: ' + result.message);
      }
    } catch (error) {
      console.error('Application submission error:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      attachment: null
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-500/20 border border-white/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/10 backdrop-blur-xl border-b border-white/20 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Submit Application</h2>
                <p className="text-slate-600">Apply for this position</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Demo Data Button */}
          <div className="bg-emerald-50/50 backdrop-blur-sm rounded-2xl p-4 border border-emerald-200/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-emerald-600" />
                <div>
                  <h3 className="font-semibold text-emerald-900">Try Demo Data</h3>
                  <p className="text-sm text-emerald-700">Fill form with sample content</p>
                </div>
              </div>
              <Button
                type="button"
                onClick={loadDummyData}
                variant="outline"
                className="bg-emerald-100/50 border-emerald-300 text-emerald-700 hover:bg-emerald-200/50"
              >
                Load Demo
              </Button>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">
              Cover Letter / Proposal *
            </label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              placeholder="Write a compelling cover letter explaining why you're perfect for this job..."
              rows={8}
              className="w-full bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 focus:border-emerald-500 focus:outline-none resize-none transition-colors"
              required
            />
            <p className="text-xs text-slate-500">
              {formData.coverLetter.length}/1000 characters
            </p>
          </div>

          {/* File Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">
              Attach Resume/Portfolio (Optional)
            </label>
            
            {!formData.attachment ? (
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-emerald-500 bg-emerald-50/50' 
                    : 'border-white/30 bg-white/20 hover:bg-white/30'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      Drop your file here, or <span className="text-emerald-600">browse</span>
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Supports PDF, DOC, DOCX, TXT (Max: 10MB)
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{formData.attachment.name}</p>
                      <p className="text-sm text-slate-600">
                        {(formData.attachment.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <X className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 h-12 bg-white/30 backdrop-blur-sm border-white/30 hover:bg-white/40"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.coverLetter.trim()}
              className="flex-1 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Send className="h-5 w-5" />
                  <span>Submit Application</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
