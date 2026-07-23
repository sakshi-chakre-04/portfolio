const fs = require('fs');
let content = fs.readFileSync('views/index.ejs', 'utf-8');

// The regex approach is safer because whitespace might vary.
// Replace Conflict 1
content = content.replace(
  /<<<<<<< HEAD\s*<li><i class="bi bi-chevron-right"><\/i> <strong>GitHub:<\/strong>.*?>>>>>>> master/s,
  '<li><i class="bi bi-chevron-right"></i> <strong>GitHub:</strong> <span><a href="https://github.com/sakshi-chakre-04" target="_blank">https://github.com/sakshi-chakre-04</a></span></li>\n                  <li><i class="bi bi-chevron-right"></i> <strong>City:</strong> <span>Pune, Maharashtra, India</span></li>'
);

// Replace Conflict 2
content = content.replace(
  /<<<<<<< HEAD\s*<li><i class="bi bi-chevron-right"><\/i> <strong>Email:<\/strong> <span>sakshichakre04\.skn.*?>>>>>>> master/s,
  '<li><i class="bi bi-chevron-right"></i> <strong>Email:</strong>\n                    <span>sakshichakre.skncoe.comp@gmail.com</span>\n                  </li>'
);

// Replace Conflict 3
content = content.replace(
  /<<<<<<< HEAD\s*<li><strong>Programming Languages:<\/strong> Python, C, C\+\+, Java.*?>>>>>>> master/s,
  '<li><strong>Programming Languages:</strong> Python, C, C++, Java</li>\n          <li><strong>Web Technologies & Database:</strong> HTML5, CSS3, JavaScript, Node.js, Express.js, EJS, MongoDB, MongoDB Atlas</li>\n          <li><strong>Tools and Frameworks:</strong> Git, GitHub, VS code, Nodemon</li>\n          <li><strong>Other Skills:</strong> API Development & Integration, Project Documentation, Unit Testing, Bug Tracking, Cloud Deployment (Render)</li>'
);

// Replace Conflict 4
content = content.replace(
  /<<<<<<< HEAD\s*<p>A showcase of my latest web development projects.*?>>>>>>> master/s,
  '<p>A showcase of my latest web development projects, demonstrating skills in Node.js, Express, MongoDB, authentication, and responsive UI design.</p>'
);

// Replace Conflict 5 (Portfolio block)
const portfolioBlock = `<p class="portfolio-overlay-text">A comprehensive user management system for
                    registration, profile management, and data handling. Built with Node.js, Express, EJS, and MongoDB.
                    Features authentication, validation, pagination, and email notifications. Optimized for performance
                    and security using MVC architecture.</p>
                    <a href="assets/img/portfolio/userform-screenshot.png" title="User Management CRUD API"
                      data-gallery="portfolio-gallery-app" class="glightbox preview-link"><i
                        class="bi bi-zoom-in"></i></a>
                    <a href="https://node-backend-3-f264.onrender.com/api/user/userform" title="Live Project"
                      class="details-link" target="_blank"><i class="bi bi-link-45deg"></i></a>
                </div>
              </div>
            </div><!-- End Portfolio Item -->

            <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
              <div class="portfolio-content h-100">
                <img src="assets/img/portfolio/sinhgadconnect.image.png" class="img-fluid" alt="SinhgadConnect">
                <div class="portfolio-info">
                  <h4>SinhgadConnect</h4>
                  <p>Built a campus-only social platform for SKNCOE with secure authentication, real-time notifications, department-wise filtering, CRUD operations, threaded discussions, JWT authentication, React, Redux Toolkit, Tailwind CSS, and MongoDB.</p>
                  <a href="assets/img/portfolio/sinhgadconnect.image.png" title="SinhgadConnect"
                    data-gallery="portfolio-gallery-app" class="glightbox preview-link"><i
                      class="bi bi-zoom-in"></i></a>
                  <a href="https://sinhgad-connect-frontend.vercel.app/" title="Live Project" class="details-link"
                    target="_blank"><i class="bi bi-link-45deg"></i></a>`;

content = content.replace(
  /<<<<<<< HEAD\s*<p class="portfolio-overlay-text">A comprehensive user management system.*?>>>>>>> master/s,
  portfolioBlock
);

// Replace Conflict 6 (Testimonials)
content = content.replace(
  /<<<<<<< HEAD=======/s,
  ''
);
content = content.replace(
  />>>>>>> master/g,
  ''
);

fs.writeFileSync('views/index.ejs', content);
