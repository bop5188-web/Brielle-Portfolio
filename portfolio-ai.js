(function () {
  var root = document.getElementById("portfolioAi");
  if (!root) return;

  var messagesEl = document.getElementById("portfolioAiMessages");
  var form = document.getElementById("portfolioAiForm");
  var input = document.getElementById("portfolioAiInput");
  var prompts = document.getElementById("portfolioAiPrompts");
  var resetBtn = document.getElementById("portfolioAiReset");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var busy = false;

  var KB = {
    name: "Brielle Picard",
    shortName: "Brielle",
    tagline:
      "Technology, design, and business strategy applied to meaningful digital experiences.",
    school: "Penn State — College of Information Sciences and Technology",
    degree: "B.S. Human-Centered Design and Development (HCDD)",
    grad: "Expected May 2027",
    focus: "Social Media Trends and Analytics",
    gpa: "3.51",
    deans: "Dean’s List Fall 2024 and Spring 2025",
    email: "briellepicard20@gmail.com",
    phone: "(978) 337-0817",
    linkedin: "https://www.linkedin.com/in/brielle-picard-4519b7318",
    resume: "assets/resume.pdf",
    contact: "contact.html",
    about: "about.html",
    work: "work.html",
    portfolioCase: "project-portfolio.html",
    salesCase: "project-sales-gauge.html",
    afaCase: "project-afa.html",
    genaiCase: "project-genai.html",
    olderPortfolio: "https://bop5188-web.github.io/Portfolio/#/",
    tradeTable: "https://github.com/bop5188-web/SalesGaugeTradeTable",
    salesSite: "https://www.sales-gauge.com/",
    skills: {
      design: [
        "Wireframing",
        "Prototyping",
        "Website design",
        "Figma",
        "Usability testing",
      ],
      technical: [
        "JavaScript",
        "HTML",
        "CSS",
        "Python",
        "SQL",
        "API integration",
        "MongoDB basics",
      ],
      ai: [
        "Prompt engineering",
        "LangChain / OpenAI",
        "ChatGPT / Claude / Gemini",
        "Cursor",
        "LLM conversation UX",
        "Responsible AI use",
      ],
      analytics: [
        "Google Analytics (certified)",
        "Social media analytics",
        "SEO / content strategy",
      ],
      professional: [
        "Client collaboration",
        "Project coordination",
        "Stakeholder communication",
      ],
    },
  };

  function answerFor(raw) {
    var q = (raw || "").toLowerCase().trim();
    if (!q) {
      return {
        text:
          "Ask about Brielle’s experience, projects, design process, technical skills, AI work, business impact, collaboration style, education, activities outside work, or contact details.",
        links: [],
      };
    }

    if (/(hello|hi\b|hey|who are you|what are you)/.test(q)) {
      return {
        text:
          "I’m BrieBot — a guide to Brielle Picard’s background and work. I can explain her projects, measurable results, design and development process, AI experience, collaboration style, education, community involvement, career goals, or contact details.",
        links: [
          { href: KB.about, label: "About" },
          { href: KB.resume, label: "Resume PDF" },
        ],
      };
    }

    if (/(elevator|pitch|introduce|summary|tl;?dr|who is brielle|about brielle|tell me about)/.test(q)) {
      return {
        text:
          "30-second pitch: Hi, I’m Brielle Picard, a Penn State HCDD senior who combines technology, design, and business strategy to build useful digital experiences. At Sales Gauge, I rebuilt the website, set up analytics that documented 162% user growth, and helped turn an Excel workflow into a sellable web product. I also lead website and brand work for AFA OBGYN. I’m seeking an entry-level role where I can bring product thinking, hands-on development, and cross-functional collaboration to create measurable impact.",
        links: [
          { href: KB.resume, label: "Download resume" },
          { href: "mailto:" + KB.email, label: "Email Brielle" },
        ],
      };
    }

    if (/(sales gauge|squarespace|pipeline|trade table|hvt|\+162|162%|engagement|spaice)/.test(q)) {
      return {
        text:
          "At Sales Gauge (Dec 2024–present, working with the founder), Brielle redesigned and implemented every page from Figma mockups through the live site, fixed navigation, broken links, pricing clarity, and access paths, established a social presence, and set up Google Analytics (+162% users / +156% engagement over ~1 year). She proposed and built the Excel High Value Trade Table into a more professional, sellable web product with a UI and share links, explored authentication and data locally, and advised the founder on hosting.",
        links: [
          { href: KB.salesCase, label: "Sales Gauge case study" },
          { href: KB.tradeTable, label: "Trade Table repo", external: true },
          { href: KB.salesSite, label: "Live site", external: true },
        ],
      };
    }

    if (/(emerson|obgyn|hospital|podcast|patient|afa|women.?s health|late period)/.test(q)) {
      return {
        text:
          "With AFA Women’s Health (UX Strategy & Digital Marketing Consultant), Brielle supports podcast planning, on-set visual direction, media days, branding, social work, and decisions about spend and talent. Her current focus is leading a comprehensive website overhaul and brand refresh, including SEO, logo design, information architecture, wireframing, UI design, development, live implementation, and custom code integrations.",
        links: [
          { href: KB.afaCase, label: "AFA case study" },
          { href: KB.resume, label: "Resume" },
        ],
      };
    }

    if (/(genai|generative|langchain|openai|chatgpt|claude|gemini|cursor|prompt|llm|ai\b|art gallery|chatbot|ist 402)/.test(q)) {
      return {
        text:
          "Applied GenAI (IST 402): Brielle built a functional art-gallery chatbot with Streamlit + LangChain + OpenAI (gpt-3.5-turbo), completed most of the build solo, ran it locally, and troubleshot the experience end to end. She uses AI to accelerate research, development, debugging, content creation, and iteration while keeping strategy, design, decisions, and final execution her own. She continues applying these skills through BrieBot, her AI-powered resume assistant.",
        links: [
          { href: KB.genaiCase, label: "Applied GenAI case study" },
          { href: "#portfolio-ai", label: "You’re talking to BrieBot" },
        ],
      };
    }

    if (/(outside work|outside of work|involvement|activity|activities|thon|alpha delta pi|adpi|sorority|wist|women in information|baking|robotics|teach.*kids|coding.*kids|club|volunteer|philanthrop)/.test(q)) {
      return {
        text:
          "Outside project work, Brielle participates in Penn State THON through Alpha Delta Pi, helping raise funds for childhood-cancer care and research through fundraising events and creative materials such as posters. She previously taught children introductory coding and robotics through a youth enrichment company. At Penn State, she also participates in Women in Information Sciences and Technology (WIST) to build connections and support women in technology, while Baking Club gives her a creative and social outlet.",
        links: [
          { href: KB.about + "#outside-involvement", label: "Beyond work" },
          { href: KB.about, label: "About Brielle" },
        ],
      };
    }

    if (/(experience|work history|job|role|intern|associate|consultant)/.test(q)) {
      return {
        text:
          "Recent experience:\n\n1) Sales Gauge — Product Design & Digital Experience Associate (full-site rebuild + Trade Table; +162% users).\n\n2) AFA Women’s Health — UX Strategy & Digital Marketing Consultant (podcast, media days, website overhaul).\n\nEducation: Penn State HCDD + Applied Generative AI coursework, expected May 2027.",
        links: [
          { href: "#experience", label: "See timeline" },
          { href: KB.work, label: "Projects" },
        ],
      };
    }

    if (/(design process|ux process|user.?centered|usability|information architecture|wirefram|prototype|accessib)/.test(q)) {
      return {
        text:
          "Brielle’s design process starts with the problem, audience, and business goal. She organizes information architecture and user flows, creates wireframes or Figma concepts, gathers feedback through reviews or usability testing, and then iterates into a responsive implementation. Her portfolio itself follows this process: three major versions shaped by user feedback, stronger project curation, and clearer evidence for employers.",
        links: [
          { href: KB.portfolioCase, label: "Portfolio process" },
          { href: KB.afaCase, label: "AFA website work" },
        ],
      };
    }

    if (/(collaborat|team|stakeholder|work style|founder|cross-functional|communication)/.test(q)) {
      return {
        text:
          "Brielle has worked directly with a founder at Sales Gauge and with marketing, digital, clinical, design, production, and talent stakeholders through AFA Women’s Health. She is comfortable translating feedback into concrete next steps, explaining design and technical decisions, coordinating across locations, and taking ownership from planning through implementation while being clear about where her responsibility begins and ends.",
        links: [
          { href: KB.salesCase, label: "Founder collaboration" },
          { href: KB.afaCase, label: "Cross-functional work" },
        ],
      };
    }

    if (/(impact|result|metric|growth|business value|measur|outcome)/.test(q)) {
      return {
        text:
          "Her clearest measured impact is at Sales Gauge: after rebuilding the website and setting up Google Analytics, she documented approximately 162% growth in users and 156% growth in engagement over about one year. She also helped move the High Value Trade Table from a fragile Excel workflow toward a sellable web product, connecting user-experience improvements with a practical business opportunity.",
        links: [
          { href: KB.salesCase, label: "See the results" },
          { href: KB.salesSite, label: "Live Sales Gauge site", external: true },
        ],
      };
    }

    if (/(web development|front.?end|html|css|javascript|coding|code\b|build.*site|website build|implementation)/.test(q)) {
      return {
        text:
          "Brielle works across design and implementation rather than stopping at mockups. She has built this portfolio from scratch with HTML, CSS, and JavaScript; implemented the complete Sales Gauge site; developed a Streamlit and LangChain chatbot in Python; and is leading AFA’s website build with responsive UI, SEO, information architecture, and custom-code integrations.",
        links: [
          { href: KB.portfolioCase, label: "Portfolio build" },
          { href: KB.genaiCase, label: "Python + AI project" },
        ],
      };
    }

    if (/(marketing|social media|seo|content strategy|branding|brand refresh|digital presence)/.test(q)) {
      return {
        text:
          "Brielle’s marketing experience includes establishing and updating Sales Gauge’s social and digital presence, using Google Analytics to evaluate website traction, and supporting AFA Women’s Health with branding, social work, media days, podcast production, SEO, content structure, and a broader brand refresh. Her academic focus in Social Media Trends and Analytics supports that work.",
        links: [
          { href: KB.afaCase, label: "AFA marketing work" },
          { href: KB.salesCase, label: "Sales Gauge growth" },
        ],
      };
    }

    if (/(problem.?solv|approach|how does brielle work|ownership|initiative)/.test(q)) {
      return {
        text:
          "Brielle’s approach is to clarify the real problem, identify what users and the organization need, propose a practical path, and carry the work into implementation. Examples include recognizing that Sales Gauge’s access path was losing prospects, proposing that its Excel Trade Table become a web product, and repeatedly rebuilding her own portfolio when testing showed that the experience no longer represented her skills.",
        links: [
          { href: KB.work, label: "Project case studies" },
          { href: KB.portfolioCase, label: "Iteration process" },
        ],
      };
    }

    if (/(skill|strength|tools|figma|python|sql|analytics|certif|google analytics|bootstrap|wireframe)/.test(q)) {
      return {
        text:
          "Skill groups:\n\n• Design & UX — " +
          KB.skills.design.join("; ") +
          "\n• Technical — " +
          KB.skills.technical.join("; ") +
          "\n• Generative AI — " +
          KB.skills.ai.join("; ") +
          "\n• Analytics & marketing — " +
          KB.skills.analytics.join("; ") +
          "\n• Professional — " +
          KB.skills.professional.join("; ") +
          "\n\nGoogle Analytics certified.",
        links: [
          { href: "#skills", label: "Skills on home" },
          { href: KB.genaiCase, label: "AI case study" },
        ],
      };
    }

    if (/(school|penn|education|student|major|degree|ist|gradu|gpa|dean)/.test(q)) {
      return {
        text:
          "Education: " +
          KB.degree +
          " at " +
          KB.school +
          " (" +
          KB.grad +
          "). Focus: " +
          KB.focus +
          ". GPA " +
          KB.gpa +
          ". " +
          KB.deans +
          ". Also completed IST 402 Applied Generative AI.",
        links: [{ href: KB.about, label: "About" }],
      };
    }

    if (/(hiring|fit|recruit|available|opportun|looking for)/.test(q)) {
      return {
        text:
          "Brielle is seeking her first full-time role (also open to strong internships). She’s industry-flexible — digital experience, product, marketing, ops, analytics, AI-adjacent, coordinator, or similar junior roles. The portfolio is written for broad employers, not only design titles.",
        links: [
          { href: "mailto:" + KB.email, label: "Email Brielle" },
          { href: KB.resume, label: "Resume" },
        ],
      };
    }

    if (/(this portfolio|older portfolio|archive portfolio|previous portfolio)/.test(q)) {
      return {
        text:
          "This is Brielle’s third portfolio (freshman Adobe → junior-year site → this rebuild). She cut weak projects, tightened proof, and iterated from feedback (friends, family, mom in the field). The older portfolio archive is linked only from the “This portfolio” case study.",
        links: [
          { href: KB.portfolioCase, label: "This portfolio case study" },
        ],
      };
    }

    if (/(project|case study|portfolio|which.*first)/.test(q)) {
      return {
        text:
          "Start with Sales Gauge (impact + Trade Table), then Applied Generative AI, then AFA Women’s Health. “This portfolio” covers iteration, feedback, and how she ships revisions.",
        links: [
          { href: KB.salesCase, label: "Sales Gauge" },
          { href: KB.genaiCase, label: "GenAI" },
          { href: KB.work, label: "All projects" },
        ],
      };
    }

    if (/(interview|questions|prep|ask me)/.test(q)) {
      return {
        text:
          "Strong interview prompts:\n\n1. Walk through Sales Gauge — how did website work connect to +162% / +156%?\n2. How did you turn an Excel High Value Trade workflow into a web product?\n3. How do you use AI day-to-day without shipping unchecked output?\n4. Describe coordinating AFA branding/podcast production with clinical stakeholders.",
        links: [
          { href: KB.salesCase, label: "Sales Gauge" },
          { href: KB.genaiCase, label: "GenAI" },
        ],
      };
    }

    if (/(contact|email|phone|linkedin|reach|hire|connect|resume)/.test(q)) {
      return {
        text:
          "Reach Brielle at:\n\n• Email — " +
          KB.email +
          "\n• Phone — " +
          KB.phone +
          "\n• LinkedIn — brielle-picard\n• Resume PDF on this site",
        links: [
          { href: KB.contact, label: "Contact page" },
          { href: "mailto:" + KB.email, label: "Email" },
          { href: KB.linkedin, label: "LinkedIn", external: true },
          { href: KB.resume, label: "Resume PDF" },
        ],
      };
    }

    if (/(differentiator|unique|why brielle|stand out)/.test(q)) {
      return {
        text:
          "Differentiator: measurable business outcomes (Sales Gauge growth), product thinking (Excel → web tool), and real AI fluency — built apps, coursework, and daily tool use — not buzzwords alone.",
        links: [{ href: KB.resume, label: "Resume" }],
      };
    }

    return {
      text:
        "I can help with Brielle’s Sales Gauge or AFA work, portfolio process, generative AI projects, design approach, front-end development, marketing and analytics, measurable impact, collaboration style, community involvement, education, career goals, interview prep, or contact information.",
      links: [
        { href: KB.work, label: "Projects" },
        { href: "#skills", label: "Skills" },
        { href: KB.resume, label: "Resume" },
      ],
    };
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function appendMessage(role, payload) {
    var row = el("div", "portfolio-ai__msg portfolio-ai__msg--" + role);
    var bubble = el("div", "portfolio-ai__bubble");

    if (typeof payload === "string") {
      bubble.textContent = payload;
    } else {
      var parts = (payload.text || "").split("\n");
      parts.forEach(function (line, idx) {
        if (!line && idx < parts.length - 1) {
          bubble.appendChild(document.createElement("br"));
          return;
        }
        if (idx) bubble.appendChild(document.createElement("br"));
        bubble.appendChild(document.createTextNode(line));
      });

      if (payload.links && payload.links.length) {
        var links = el("div", "portfolio-ai__links");
        payload.links.forEach(function (l) {
          var a = el("a", "portfolio-ai__link", l.label);
          a.href = l.href;
          if (l.external) {
            a.target = "_blank";
            a.rel = "noopener noreferrer";
          }
          links.appendChild(a);
        });
        bubble.appendChild(links);
      }
    }

    row.appendChild(bubble);
    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return bubble;
  }

  function showTyping() {
    var row = el("div", "portfolio-ai__msg portfolio-ai__msg--bot portfolio-ai__msg--typing");
    var bubble = el("div", "portfolio-ai__bubble portfolio-ai__bubble--typing");
    bubble.innerHTML = "<span></span><span></span><span></span>";
    bubble.setAttribute("aria-label", "BrieBot is thinking");
    row.appendChild(bubble);
    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return row;
  }

  function typeInto(bubble, answer) {
    return new Promise(function (resolve) {
      if (reduceMotion) {
        bubble.textContent = "";
        var parts = answer.text.split("\n");
        parts.forEach(function (line, idx) {
          if (idx) bubble.appendChild(document.createElement("br"));
          bubble.appendChild(document.createTextNode(line));
        });
        if (answer.links && answer.links.length) {
          var links = el("div", "portfolio-ai__links");
          answer.links.forEach(function (l) {
            var a = el("a", "portfolio-ai__link", l.label);
            a.href = l.href;
            if (l.external) {
              a.target = "_blank";
              a.rel = "noopener noreferrer";
            }
            links.appendChild(a);
          });
          bubble.appendChild(links);
        }
        resolve();
        return;
      }

      var full = answer.text;
      var i = 0;
      bubble.textContent = "";

      function tick() {
        i += 1 + (i % 3 === 0 ? 1 : 0);
        var slice = full.slice(0, i);
        bubble.textContent = "";
        slice.split("\n").forEach(function (line, idx) {
          if (idx) bubble.appendChild(document.createElement("br"));
          bubble.appendChild(document.createTextNode(line));
        });
        messagesEl.scrollTop = messagesEl.scrollHeight;
        if (i < full.length) {
          window.setTimeout(tick, 12);
        } else {
          if (answer.links && answer.links.length) {
            var links = el("div", "portfolio-ai__links");
            answer.links.forEach(function (l) {
              var a = el("a", "portfolio-ai__link", l.label);
              a.href = l.href;
              if (l.external) {
                a.target = "_blank";
                a.rel = "noopener noreferrer";
              }
              links.appendChild(a);
            });
            bubble.appendChild(links);
          }
          resolve();
        }
      }
      tick();
    });
  }

  function ask(question) {
    if (busy || !question) return;
    busy = true;
    appendMessage("user", question);
    var typing = showTyping();
    var answer = answerFor(question);

    window.setTimeout(function () {
      typing.remove();
      var bubble = appendMessage("bot", "");
      bubble.textContent = "";
      typeInto(bubble, answer).then(function () {
        busy = false;
        messagesEl.scrollTop = messagesEl.scrollHeight;
      });
    }, reduceMotion ? 80 : 420);
  }

  function resetChat(opts) {
    var shouldFocus = !opts || opts.focus !== false;
    messagesEl.innerHTML = "";
    busy = false;
    appendMessage("bot", {
      text:
        "Hi — I’m BrieBot. Ask about Brielle’s projects, skills, design process, technical work, AI experience, business impact, collaboration style, community involvement, education, or how to reach her.",
      links: [
        { href: "#experience", label: "Experience" },
        { href: KB.resume, label: "Resume" },
      ],
    });
    if (shouldFocus && input) input.focus();
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = (input.value || "").trim();
      if (!q) return;
      input.value = "";
      ask(q);
    });
  }

  if (prompts) {
    prompts.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-prompt]");
      if (!btn) return;
      ask(btn.getAttribute("data-prompt"));
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      resetChat({ focus: true });
    });
  }

  /* Don’t autofocus on load — that scrolls the homepage to the AI section */
  resetChat({ focus: false });
})();
