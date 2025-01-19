'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './Products.module.css'; // Importing the CSS module

interface Project {
  id: string;
  name: string;
  price: number;
  status: string;
  describe_project?: string;
  created_at: string;
  updated_at: string;
}

const Products = () => {
  const [notification, setNotification] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<string>("");
  const [newPrice, setNewPrice] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // State for modal (to show project details in a popup)
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Fetch projects when the component mounts or page changes
  useEffect(() => {
    fetchProjects();
  }, [currentPage]);

  // Fetch projects from the API
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Project[]>(`http://localhost:3000/api/projects?page=${currentPage}&limit=7`);
      console.log("Fetched Projects:", response.data);

      if (response.data && Array.isArray(response.data)) {
        const fetchedProjects = response.data.map((project) => ({
          ...project,
          price: !isNaN(project.price) && project.price !== null ? project.price : 0,
        }));
        setProjects(fetchedProjects);
        setTotalPages(Number(response.headers['x-total-pages']) || 1);

        const count = fetchedProjects.filter((project) => project.status === "Pending").length;
        setPendingCount(count);
      } else {
        setError("No valid projects found in the response.");
      }
    } catch (err: any) {
      console.error("Error fetching projects:", err);
      setError(err.response?.data?.message || "Error fetching projects");
    } finally {
      setLoading(false);
    }
  };

  // Add a new project to the system
  const addProject = async () => {
    if (!newProject.trim() || !newPrice.trim() || isNaN(Number(newPrice)) || Number(newPrice) <= 0) {
      setError("Please fill in all fields correctly. Price must be a positive number.");
      return;
    }

    const newProjectObj = {
      name: newProject.trim(),
      price: parseFloat(newPrice),
      status: "Pending",
    };

    setLoading(true);
    setError(""); // Reset error state before making the request
    try {
      await axios.post("http://localhost:3000/api/projects", newProjectObj);
      setNotification("New project added!");
      setTimeout(() => setNotification(""), 5000); // Hide notification after 5 seconds
      fetchProjects(); // Refresh the list of projects
      setNewProject("");
      setNewPrice("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error adding project");
    } finally {
      setLoading(false);
    }
  };

  // Handle the deletion of a project
  const deleteProject = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/api/projects/${id}`);
      setNotification("Project deleted!");
      setTimeout(() => setNotification(""), 5000); // Hide notification after 5 seconds
      fetchProjects(); // Refresh the list of projects
    } catch (err: any) {
      setError(err.response?.data?.message || "Error deleting project");
    } finally {
      setLoading(false);
    }
  };

  // Update the project status
  const updateProjectStatus = async (id: string, newStatus: string) => {
    setLoading(true);
    try {
      await axios.patch(`http://localhost:3000/api/projects/${id}`, { status: newStatus });
      setNotification("Project status updated!");
      setTimeout(() => setNotification(""), 5000); // Hide notification after 5 seconds
      fetchProjects(); // Refresh the list of projects
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating project status");
    } finally {
      setLoading(false);
    }
  };

  // Open project details modal
  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  // Close project details modal
  const closeProjectDetails = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Manage Projects</h1>

      {/* Display Notification */}
      {notification && <div className={styles.notification}>{notification}</div>}
      {error && <div className={styles.error}>{error}</div>}

      {/* Add Project Form */}
      <div className={styles['add-project']}>
        <input
          type="text"
          placeholder="Project Name"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <button onClick={addProject} disabled={loading}>
          {loading ? "Adding..." : "Add Project"}
        </button>
      </div>

      {/* Show loading state */}
      {loading && <div className={styles.loading}>Loading...</div>}

      {/* Display List of Projects in Table */}
      <div className={styles['project-list']}>
        {projects.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>
                    {typeof project.price === "number" && !isNaN(project.price)
                      ? `$${project.price.toFixed(2)}`
                      : "Invalid Price"}
                  </td>
                  <td>{project.status}</td>
                  <td>{new Date(project.created_at).toLocaleString()}</td>
                  <td>
                    {/* View Details button */}
                    <button onClick={() => openProjectDetails(project)} disabled={loading}>
                      View Details
                    </button>
                    <button onClick={() => deleteProject(project.id)} disabled={loading}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No projects found</div>
        )}
      </div>

      {/* Display Pending Projects Count */}
      <p>Total Pending Projects: {pendingCount}</p>

      {/* Pagination Controls */}
      <div className={styles['pagination']}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1 || loading}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages || loading}>
          Next
        </button>
      </div>

      {/* Modal Dialog for Project Details */}
      {showModal && selectedProject && (
        <div className={styles['modal-overlay']}>
          <div className={styles['modal']}>
            <h2>Project Details</h2>
            <p><strong>ID:</strong> {selectedProject.id}</p>
            <p><strong>Name:</strong> {selectedProject.name}</p>
            <p><strong>Description:</strong> {selectedProject.describe_project || "No description"}</p>
            <p><strong>Status:</strong> {selectedProject.status}</p>
            <p><strong>Created At:</strong> {new Date(selectedProject.created_at).toLocaleString()}</p>
            <div>
              <button onClick={() => updateProjectStatus(selectedProject.id, "Accepted")} disabled={loading}>
                Mark as Accepted
              </button>
              <button onClick={() => updateProjectStatus(selectedProject.id, "Rejected")} disabled={loading}>
                Mark as Rejected
              </button>
              <button onClick={() => updateProjectStatus(selectedProject.id, "On Hold")} disabled={loading}>
                Mark as On Hold
              </button>
            </div>
            <button onClick={closeProjectDetails}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
