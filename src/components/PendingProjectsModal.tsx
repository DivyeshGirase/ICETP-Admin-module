import React from "react";

interface Project {
  id: number;
  name: string;
  status: string;
}

interface ModalProps {
  projects: Project[];
  onClose: () => void;
  onSelectProject: (id: number) => void;
}

const PendingProjectsModal: React.FC<ModalProps> = ({ projects, onClose, onSelectProject }) => {
  if (!projects.length) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          margin: "100px auto",
          padding: "20px",
          width: "50%",
          borderRadius: "10px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Pending Projects</h2>
        <ul>
          {projects.map((project) => (
            <li
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              style={{ cursor: "pointer", margin: "10px 0" }}
            >
              {project.name} (ID: {project.id})
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PendingProjectsModal;
