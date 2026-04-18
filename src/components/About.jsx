import './About.css'

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-content">
          <h2>About OScorp Creatives</h2>
          <p>
            We are a team of passionate designers, developers, and creative minds 
            dedicated to transforming ideas into exceptional digital experiences.
          </p>
          <p>
            With over a decade of experience, we've helped hundreds of brands establish 
            their digital presence and achieve their goals through innovative solutions.
          </p>
          
          <div className="stats">
            <div className="stat">
              <h3>500+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat">
              <h3>200+</h3>
              <p>Happy Clients</p>
            </div>
            <div className="stat">
              <h3>50+</h3>
              <p>Team Members</p>
            </div>
            <div className="stat">
              <h3>15+</h3>
              <p>Years Experience</p>
            </div>
          </div>
        </div>
        
        <div className="about-visual">
          <div className="visual-grid">
            <div className="grid-item"></div>
            <div className="grid-item"></div>
            <div className="grid-item"></div>
            <div className="grid-item"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
