import './Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Creative Solutions for Digital Success</h1>
          <p>We craft stunning digital experiences that elevate your brand</p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="gradient-circle"></div>
          <div className="gradient-shape"></div>
        </div>
      </div>
    </section>
  )
}
