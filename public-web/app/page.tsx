import { getMenu } from '@/lib/catalog';
import {
  getContact,
  getSiteContent,
  whatsappHref
} from '@/lib/site';
export default async function Home() {
  const [menu, content, contact] = await Promise.all([
    getMenu(),
    getSiteContent(),
    getContact()
  ]);

  const whatsAppUrl = whatsappHref(contact.whatsapp);

  return (
    <main>
      <p className="kicker">{content.brand.heroNote}</p>
<h1>{content.brand.name}</h1>
<p className="tagline">{content.brand.tagline}</p>

      <section id="about" className="section shell intro">
  <div>
    <p className="sectionKicker">Who we are</p>
    <h2>{content.about.title}</h2>
  </div>

  <div className="copy">
    {content.about.paragraphs.map((paragraph) => (
      <p key={paragraph}>{paragraph}</p>
    ))}

    <div className="featureGrid">
      {content.about.features.map((feature) => (
        <article className="featureCard" key={feature.title}>
          <span className="featureIcon">{feature.icon}</span>
          <h3>{feature.title}</h3>
          <p>{feature.text}</p>
        </article>
      ))}
    </div>
  </div>
</section>

      <p>{content.menuNote}</p>

      <section id="visit" className="section shell visit">
  <div>
    <p className="sectionKicker">Come say hi</p>
    <h2>Visit Us</h2>

    {contact.mapEmbedUrl && (
      <iframe
        className="mapFrame"
        src={contact.mapEmbedUrl}
        loading="lazy"
        title="Kirikopi location"
      />
    )}
  </div>

  <div className="visitDetails">
    <h3>Address</h3>
    <p>{contact.address}</p>

    <h3>Opening Hours</h3>
    <div className="hoursList">
      {contact.hours.map((hour) => (
        <div className="hoursRow" key={hour.day}>
          <span>{hour.day}</span>
          <span>{hour.time}</span>
        </div>
      ))}
    </div>

    <h3>Contact</h3>
    <p>
      <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}>
        {contact.phone}
      </a>
      <br />
      <a href={`mailto:${contact.email}`}>
        {contact.email}
      </a>
    </p>

    <div className="socialLinks">
      {contact.socialLinks.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.platform}
        </a>
      ))}
    </div>

    {whatsAppUrl && (
      <a
        className="whatsappLink"
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Order on WhatsApp
      </a>
    )}
  </div>
</section>

      <footer>
  <div className="shell">
    © {new Date().getFullYear()} {content.brand.name}
  </div>
</footer>
    </main>
  );
}
