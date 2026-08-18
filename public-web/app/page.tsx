import { formatMoney, getMenu } from '@/lib/catalog';

export default async function Home() {
  const menu = await getMenu();

  return (
    <main>
      <section className="hero">
        <nav className="nav shell">
          <a className="brand" href="#top">Cinnamon & Clay</a>
          <div className="links">
            <a href="#about">About</a>
            <a href="#menu">Menu</a>
            <a href="#visit">Visit Us</a>
          </div>
        </nav>
        <div id="top" className="heroContent shell">
          <p className="kicker">A neighbourhood coffee house in the heart of Colombo.</p>
          <h1>Cinnamon & Clay</h1>
          <p className="tagline">Slow coffee. Warm bakes. Good company.</p>
          <div className="actions">
            <a className="button primary" href="#menu">View menu</a>
            <a className="button ghost" href="#visit">Find us</a>
          </div>
        </div>
      </section>

      <section id="about" className="section shell intro">
        <div>
          <p className="sectionKicker">Who we are</p>
          <h2>From demo to a real system</h2>
        </div>
        <div className="copy">
          <p>
            The visual identity stays close to the original Cinnamon & Clay demo, but the menu below is no longer embedded in the page. It comes from PostgreSQL through the Spring Boot API.
          </p>
          <p>
            In the next slices, the story, gallery, reviews, location, hours and social links will move through the same managed-content path.
          </p>
        </div>
      </section>

      <section id="menu" className="section menuSection">
        <div className="shell">
          <div className="sectionHeading">
            <p className="sectionKicker">Good things to order</p>
            <h2>The Menu</h2>
            <p>Prices in Sri Lankan Rupees.</p>
          </div>

          {menu.categories.length === 0 ? (
            <p className="empty">Menu data is unavailable during this build.</p>
          ) : (
            <div className="menuGrid">
              {menu.categories.map((category) => (
                <article className="menuCategory" key={category.id}>
                  <h3>{category.name}</h3>
                  {category.items.map((item) => (
                    <div className="menuItem" key={item.id}>
                      <div>
                        <strong>{item.name}</strong>
                        <p>{item.description}</p>
                      </div>
                      <span>{formatMoney(item.price)}</span>
                    </div>
                  ))}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="visit" className="section shell visit">
        <div>
          <p className="sectionKicker">Come say hi</p>
          <h2>Visit Us</h2>
        </div>
        <div>
          <p>42 Flower Road, Colombo 07, Sri Lanka</p>
          <p>hello@cinnamonandclay.lk</p>
          <p>+94 77 123 4567</p>
        </div>
      </section>

      <footer>
        <div className="shell">Cinnamon & Clay - production portfolio build</div>
      </footer>
    </main>
  );
}
