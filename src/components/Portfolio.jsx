import './Portfolio.css'

export default function Portfolio() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop'
    },
    {
      title: 'Social App',
      category: 'Mobile App',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop'
    },
    {
      title: 'Brand Identity',
      category: 'UI/UX Design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop'
    },
    {
      title: 'SaaS Dashboard',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop'
    },
    {
      title: 'Video Campaign',
      category: 'Video Production',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&h=300&fit=crop'
    },
    {
      title: 'Marketing Website',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1460925895917-adf4e565f900?w=500&h=300&fit=crop'
    }
  ]

  return (
    <section id="portfolio" className="portfolio">
      <div className="portfolio-container">
        <h2>Recent Projects</h2>
        <p className="subtitle">Showcasing our best work</p>
        
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <div key={index} className="portfolio-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <button className="view-btn">View Project</button>
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
