document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PROJECTS
    ===================================================== */

    const projectsContainer =
        document.getElementById("projects-container");

    if (projectsContainer) {

        fetch("/api/projects/")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Projects API failed");
                }
                return response.json();
            })
            .then(projects => {

                projectsContainer.innerHTML = "";

                projects.forEach(project => {

                    const card = document.createElement("div");
                    card.classList.add("project-card");

                    const technologies = project.technologies
                        ? project.technologies
                            .split(",")
                            .map(tech =>
                                `<span>${tech.trim()}</span>`
                            )
                            .join("")
                        : "";

                    card.innerHTML = `
                        <div class="project-image">
                            ${project.image
                            ? `<img
                                        src="${project.image}"
                                        alt="${project.title}"
                                      >`
                            : `<div class="project-image-placeholder">
                                        AI PROJECT
                                      </div>`
                        }
                        </div>

                        <div class="project-content">

                            <span class="project-category">
                                ${project.category || "PROJECT"}
                            </span>

                            <h3>
                                ${project.title}
                            </h3>

                            <p>
                                ${project.description || ""}
                            </p>

                            <div class="project-tech">
                                ${technologies}
                            </div>

                            <div class="project-links">

                                ${project.github_url
                            ? `
                                            <a
                                                href="${project.github_url}"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                GitHub ↗
                                            </a>
                                          `
                            : ""
                        }

                                ${project.live_url
                            ? `
                                            <a
                                                href="${project.live_url}"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Live Demo ↗
                                            </a>
                                          `
                            : ""
                        }

                            </div>

                        </div>
                    `;

                    projectsContainer.appendChild(card);
                });

            })
            .catch(error => {

                console.error(
                    "Projects API Error:",
                    error
                );

                projectsContainer.innerHTML = `
                    <p>
                        Unable to load projects.
                    </p>
                `;
            });
    }


    /* =====================================================
       SKILLS
    ===================================================== */

    const skillsContainer =
        document.getElementById("skills-container");

    if (skillsContainer) {

        fetch("/api/skills/")
            .then(response => {

                if (!response.ok) {
                    throw new Error("Skills API failed");
                }

                return response.json();
            })
            .then(skills => {

                skillsContainer.innerHTML = "";

                const categories = {};

                skills.forEach(skill => {

                    if (!categories[skill.category]) {
                        categories[skill.category] = [];
                    }

                    categories[skill.category].push(
                        skill.name
                    );
                });

                Object.keys(categories).forEach(category => {

                    const card =
                        document.createElement("div");

                    card.classList.add("skill-card");

                    card.innerHTML = `
                        <h3>
                            ${category}
                        </h3>

                        ${categories[category]
                            .map(skill =>
                                `<p>${skill}</p>`
                            )
                            .join("")
                        }
                    `;

                    skillsContainer.appendChild(card);
                });

            })
            .catch(error => {

                console.error(
                    "Skills API Error:",
                    error
                );

                skillsContainer.innerHTML = `
                    <p>
                        Unable to load skills.
                    </p>
                `;
            });
    }


    /* =====================================================
       SERVICES
    ===================================================== */

    const servicesContainer =
        document.getElementById("services-container");

    if (servicesContainer) {

        fetch("/api/services/")
            .then(response => {

                if (!response.ok) {
                    throw new Error("Services API failed");
                }

                return response.json();
            })
            .then(services => {

                servicesContainer.innerHTML = "";

                services.forEach((service, index) => {

                    const card =
                        document.createElement("div");

                    card.classList.add("service-card");

                    card.innerHTML = `
                        <div class="service-number">
                            ${service.number ||
                        String(index + 1).padStart(2, "0")
                        }
                        </div>

                        <h3>
                            ${service.title || ""}
                        </h3>

                        <p>
                            ${service.description || ""}
                        </p>
                    `;

                    servicesContainer.appendChild(card);
                });

            })
            .catch(error => {

                console.error(
                    "Services API Error:",
                    error
                );

                servicesContainer.innerHTML = `
                    <p>
                        Unable to load services.
                    </p>
                `;
            });
    }


    /* =====================================================
       EXPERIENCE
    ===================================================== */

    const experienceContainer =
        document.getElementById("experience-container");

    if (experienceContainer) {

        fetch("/api/experience/")
            .then(response => {

                if (!response.ok) {
                    throw new Error(
                        "Experience API failed"
                    );
                }

                return response.json();
            })
            .then(experiences => {

                experienceContainer.innerHTML = "";

                experiences.forEach(experience => {

                    const item =
                        document.createElement("div");

                    item.classList.add("timeline-item");

                    item.innerHTML = `
                        <div class="timeline-date">
                            ${experience.date || ""}
                        </div>

                        <div class="timeline-content">

                            <h3>
                                ${experience.title || ""}
                            </h3>

                            <h4>
                                ${experience.organization || ""}
                            </h4>

                            <p>
                                ${experience.description || ""}
                            </p>

                        </div>
                    `;

                    experienceContainer.appendChild(item);
                });

            })
            .catch(error => {

                console.error(
                    "Experience API Error:",
                    error
                );

                experienceContainer.innerHTML = `
                    <p>
                        Unable to load experience.
                    </p>
                `;
            });
    }


    /* =====================================================
       PROFILE
       ONE API CALL → ABOUT + HERO
    ===================================================== */

    fetch("/profile/")
        .then(response => {

            if (!response.ok) {
                throw new Error("Profile API failed");
            }

            return response.json();
        })
        .then(profiles => {

            if (!profiles || profiles.length === 0) {

                console.warn(
                    "No profile found."
                );

                const profileContainer =
                    document.getElementById(
                        "profile-container"
                    );

                if (profileContainer) {

                    profileContainer.innerHTML = `
                        <p>
                            Profile information
                            not available.
                        </p>
                    `;
                }

                return;
            }


            /* ===============================
               GET PROFILE
            =============================== */

            const profile = profiles[0];


            /* ===============================
               ABOUT SECTION
            =============================== */

            const profileContainer =
                document.getElementById(
                    "profile-container"
                );

            if (profileContainer) {

                profileContainer.innerHTML = `

                    <div class="about-text">

                        <h3>
                            ${profile.about_title || ""}
                        </h3>

                        <p>
                            ${profile.about_description || ""}
                        </p>

                    </div>

                    <div class="about-info">

                        <div>
                            <span>Focus</span>

                            <strong>
                                ${profile.focus || "AI / ML"}
                            </strong>
                        </div>

                        <div>
                            <span>Backend</span>

                            <strong>
                                ${profile.backend || "Django"}
                            </strong>
                        </div>

                        <div>
                            <span>GenAI</span>

                            <strong>
                                ${profile.genai || "Generative AI"}
                            </strong>
                        </div>

                    </div>
                `;
            }


            /* ===============================
               HERO SECTION
            =============================== */

            const heroContainer =
                document.getElementById(
                    "hero-container"
                );

            if (heroContainer) {

                heroContainer.innerHTML = `

                    <div class="hero-content">

                        <p class="hero-small">
                            WELCOME TO MY PORTFOLIO
                        </p>

                        <h1>
                            Hi, I'm
                            <span>
                                ${profile.name || "Usama Khalil"}
                            </span>
                        </h1>

                        <p class="hero-description">
                            ${profile.about_description ||
                    "AI/ML Engineer building intelligent systems and modern digital experiences."
                    }
                        </p>

                        <div class="hero-buttons">

                            <a
                                href="#projects"
                                class="primary-btn"
                            >
                                View My Work
                            </a>

                            <a
                                href="#contact"
                                class="secondary-btn"
                            >
                                Contact Me
                            </a>

                        </div>

                    </div>
                `;
            }

        })
        .catch(error => {

            console.error(
                "Profile API Error:",
                error
            );

        });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const formData = {

                    name:
                        contactForm.name.value,

                    email:
                        contactForm.email.value,

                    subject:
                        contactForm.subject.value,

                    message:
                        contactForm.message.value
                };


                fetch("/api/contact/", {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(formData)

                })
                    .then(response => {

                        if (!response.ok) {

                            throw new Error(
                                "Failed to send message"
                            );
                        }

                        return response.json();
                    })

                    .then(data => {

                        alert(
                            "Message sent successfully! 🚀"
                        );

                        contactForm.reset();
                    })

                    .catch(error => {

                        console.error(
                            "Contact API Error:",
                            error
                        );

                        alert(
                            "Something went wrong. Please try again."
                        );
                    });
            }
        );
    }

});
