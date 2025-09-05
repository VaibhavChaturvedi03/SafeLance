// LocalStorage utility for managing Job Postings
export class JobStorage {
  static STORAGE_KEY = 'job_postings';

  // Generate unique job ID
  static generateJobId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // Save a job to localStorage
  static saveJob(jobData) {
    try {
      const existingJobs = this.getAllJobs();
      const jobId = this.generateJobId();

      const newJob = {
        id: jobId,
        ...jobData,
        postedDate: new Date().toISOString().split('T')[0],
        status: 'Open'
      };

      const updatedJobs = [...existingJobs, newJob];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedJobs));

      return { success: true, jobId };
    } catch (error) {
      console.error('Error saving job:', error);
      return { success: false, error: error.message };
    }
  }

  // Get all jobs
  static getAllJobs() {
    try {
      const jobs = localStorage.getItem(this.STORAGE_KEY);
      return jobs ? JSON.parse(jobs) : [];
    } catch (error) {
      console.error('Error retrieving jobs:', error);
      return [];
    }
  }

  // Search jobs by criteria
  static searchJob(searchType, searchValue) {
    try {
      const allJobs = this.getAllJobs();
      const searchValueLower = searchValue.toLowerCase().trim();

      const result = allJobs.filter(job => {
        switch (searchType) {
          case 'title':
            return job.title && job.title.toLowerCase().includes(searchValueLower);
          case 'category':
            return job.category && job.category.toLowerCase().includes(searchValueLower);
          case 'skills':
            return job.skills && job.skills.some(skill =>
              skill.toLowerCase().includes(searchValueLower)
            );
          case 'id':
            return job.id && job.id.includes(searchValue);
          default:
            return false;
        }
      });

      return result;
    } catch (error) {
      console.error('Error searching jobs:', error);
      return [];
    }
  }

  // Update job status (Open → Closed, etc.)
  static updateJobStatus(jobId, newStatus) {
    try {
      const allJobs = this.getAllJobs();
      const jobIndex = allJobs.findIndex(job => job.id === jobId);

      if (jobIndex === -1) {
        return { success: false, error: 'Job not found' };
      }

      const updatedJob = { ...allJobs[jobIndex], status: newStatus };
      allJobs[jobIndex] = updatedJob;

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allJobs));
      return { success: true };
    } catch (error) {
      console.error('Error updating job status:', error);
      return { success: false, error: error.message };
    }
  }

  // Get job statistics
  static getStatistics() {
    try {
      const allJobs = this.getAllJobs();
      const total = allJobs.length;
      const statuses = allJobs.reduce((acc, job) => {
        acc[job.status] = (acc[job.status] || 0) + 1;
        return acc;
      }, {});

      return {
        total,
        open: statuses['Open'] || 0,
        closed: statuses['Closed'] || 0
      };
    } catch (error) {
      console.error('Error getting statistics:', error);
      return { total: 0, open: 0, closed: 0 };
    }
  }

  // Initialize sample jobs
  static initializeSampleData() {
    const existingJobs = this.getAllJobs();
    if (existingJobs.length === 0) {
      const sampleJobs = [
        {
          id: 'job1',
          title: 'React Developer',
          category: 'Web Development',
          subcategory: 'Frontend',
          description: 'Build dynamic UIs using React and Tailwind.',
          skills: ['React', 'JavaScript', 'TailwindCSS'],
          budget: '500',
          budgetType: 'fixed',
          timeline: '2 weeks',
          experience: 'Intermediate',
          attachments: [],
          postedDate: '2025-09-05',
          status: 'Open'
        },
        {
          id: 'job2',
          title: 'API Developer',
          category: 'Web Development',
          subcategory: 'Backend',
          description: 'Develop scalable REST APIs using Node.js and Express.',
          skills: ['Node.js', 'Express', 'MongoDB'],
          budget: '1000',
          budgetType: 'fixed',
          timeline: '1 month',
          experience: 'Expert',
          attachments: [],
          postedDate: '2025-09-04',
          status: 'Open'
        }
      ];

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sampleJobs));
    }
  }

  // Clear all jobs
  static clearAllData() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
 