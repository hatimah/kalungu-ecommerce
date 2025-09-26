// src/components/OurStory.jsx
import "./OurStory.css";
import storyImage from "../assets/our-story.jpeg";

export default function OurStory() {
  return (
    <section className="our-story">
      <div className="container">
        <div className="story-container">
          <div className="story-image">
            <img src={storyImage} alt="Our Story" />
          </div>
          <div className="story-content">
            <h2>Our Story</h2>
            <div className="story-text">
              <p>
                At Kalungu Banana Fiber, we are passionate about sustainability
                and empowering local communities in Uganda. Our journey began when
                we discovered the incredible potential of banana fiber - a natural,
                renewable resource that was being overlooked.
              </p>
              <p>
                We work closely with farmers and artisans, supporting fair
                trade practices while promoting environmental responsibility. Every
                product tells a story of tradition, creativity, and care for the
                planet. Our mission is to create beautiful, functional items that
                don't compromise on quality or sustainability.
              </p>
              <p>
                By choosing our products, you're not just buying a beautiful item -
                you're supporting local communities, reducing environmental impact,
                and preserving traditional craftsmanship for future generations.
              </p>
            </div>
            <div className="story-stats">
              <div className="stat">
                <h3>500+</h3>
                <p>Artisans Supported</p>
              </div>
              <div className="stat">
                <h3>10,000+</h3>
                <p>Products Sold</p>
              </div>
              <div className="stat">
                <h3>100%</h3>
                <p>Eco-Friendly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
