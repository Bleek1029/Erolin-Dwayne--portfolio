import "./Projects.css";

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "A personal portfolio showcasing my work and skills",
    image: "https://via.placeholder.com/400x250",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce application with cart and payment integration",
    image: "https://via.placeholder.com/400x250",
  },
  {
    id: 3,
    title: "Task Management App",
    description:
      "A productivity app for tracking and managing daily tasks",
    image: "https://via.placeholder.com/400x250",
  },
];

function Projects() {
  return (
    <section className="projects">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">My Work</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A showcase of my best work and creative projects
          </p>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id}>
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;