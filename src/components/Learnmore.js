// LearnMore.js
import React from "react";
import "./Learnmore.css";

const Learnmore = () => {
  return (
    <div className="learn-more-container">
      <h2>Learn More</h2>
      <p>
        Welcome to the Learn More page! Here, you can explore more about our
        website and discover exciting features and content. Whether you're
        interested in our latest updates, user testimonials, or upcoming events,
        you'll find it all here. Dive in and enhance your experience with us!
      </p>
      <p>
        Feel free to navigate through different sections and make the most of
        your visit. If you have any questions or feedback, don't hesitate to
        reach out to us through our <a href="/contact">Contact page</a>. We
        appreciate your interest and look forward to providing you with a
        fantastic experience on our platform.
      </p>
      <p>Thank you for choosing us!</p>
    </div>
  );
};

export default Learnmore;
