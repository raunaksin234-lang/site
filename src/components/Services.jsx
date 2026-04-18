import './Services.css'

export default function Services() {
  const services = [
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive design solutions that engage your users'
    },
    {
      icon: '⚡',
      title: 'Web Development',
      description: 'Fast, responsive, and scalable web applications built with modern tech'
    },
    {
      icon: '📱',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android'
    },
    {
      icon: '🎬',
      title: 'Video Production',
      description: 'Cinematic video content that tells your brand story'
    },
    {
      icon: '📊',
      title: 'Digital Marketing',
      description: 'Strategic marketing campaigns that drive results and growth'
    },
    {
      icon: '🔧',
      title: 'Consulting',
      description: 'Expert guidance to transform your digital strategy'
    }
  ]

  return (
    <section id="services" className="services">
      <div className="services-container">
        <h2>Our Services</h2>
        <p className="subtitle">Everything you need to succeed online</p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
