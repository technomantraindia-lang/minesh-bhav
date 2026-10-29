document.addEventListener('DOMContentLoaded', () => {
  // 1. Hero Hotspot Badge Clicks
  const badgeHotspots = document.querySelectorAll('.badge-hotspot');
  badgeHotspots.forEach(badge => {
    badge.addEventListener('click', () => {
      const srv = badge.getAttribute('data-service');
      const serviceSelect = document.getElementById('serviceRequired');
      if (serviceSelect && srv) {
        serviceSelect.value = srv;
      }
    });
  });

  // 2. Interactive Parallax Tilt on Panoramic Hero Container
  const heroPanoramic = document.getElementById('heroPanoramic');
  if (heroPanoramic) {
    heroPanoramic.addEventListener('mousemove', (e) => {
      const rect = heroPanoramic.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const img = heroPanoramic.querySelector('.hero-panoramic-img');
      if (img) {
        img.style.transform = `scale(1.02) translate(${(-x * 8).toFixed(1)}px, ${(-y * 6).toFixed(1)}px)`;
      }
    });

    heroPanoramic.addEventListener('mouseleave', () => {
      const img = heroPanoramic.querySelector('.hero-panoramic-img');
      if (img) {
        img.style.transform = 'scale(1) translate(0px, 0px)';
      }
    });
  }

  // 3. Services Filter Tabs Interaction
  const servicesFilterRow = document.getElementById('servicesFilterRow');
  if (servicesFilterRow) {
    const filterBtns = servicesFilterRow.querySelectorAll('.service-filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        serviceCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('is-hidden');
            card.style.opacity = '0';
            card.style.transform = 'translateY(14px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // 3b. Industries Filter Tabs Interaction
  const industriesFilterBar = document.getElementById('industriesFilterBar');
  if (industriesFilterBar) {
    const indFilterBtns = industriesFilterBar.querySelectorAll('.ind-filter-btn');
    const industryCards = document.querySelectorAll('.industry-card-item');

    indFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        indFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-ind-filter');

        industryCards.forEach(card => {
          const cat = card.getAttribute('data-cat');
          if (filter === 'all' || cat === filter) {
            card.classList.remove('is-hidden');
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // 3c. Toggle Expandable 10 Sectors Drawer
  const toggleAllIndustriesBtn = document.getElementById('toggleAllIndustriesBtn');
  const industriesExtraDrawer = document.getElementById('industriesExtraDrawer');
  const toggleIndustriesBtnText = document.getElementById('toggleIndustriesBtnText');

  if (toggleAllIndustriesBtn && industriesExtraDrawer) {
    toggleAllIndustriesBtn.addEventListener('click', () => {
      const isOpen = industriesExtraDrawer.classList.toggle('open');
      toggleAllIndustriesBtn.classList.toggle('open', isOpen);
      if (toggleIndustriesBtnText) {
        toggleIndustriesBtnText.textContent = isOpen ? 'Show Less Sectors' : 'View All 10 Sectors';
      }
      if (isOpen) {
        industriesExtraDrawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // 3d. Dynamic Animated Number Counters for Stats Section
  const statCounters = document.querySelectorAll('.stat-counter');
  let statsTriggered = false;

  const animateStats = () => {
    if (statsTriggered) return;
    statsTriggered = true;

    statCounters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = Math.floor(ease * target);

        counter.textContent = currentVal + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + suffix;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  const statsSection = document.getElementById('statsBar') || document.querySelector('.stats-section');
  if (statsSection) {
    if ('IntersectionObserver' in window) {
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      statsObserver.observe(statsSection);
    } else {
      animateStats();
    }
  }

  // 3e. Founder Vision & Mission Interactive Tabs Switcher
  const visionTabBtns = document.querySelectorAll('.vision-tab-btn');
  const visionPanes = document.querySelectorAll('.vision-pane');

  if (visionTabBtns.length > 0 && visionPanes.length > 0) {
    visionTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        visionTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tabKey = btn.getAttribute('data-tab');
        visionPanes.forEach(pane => {
          pane.classList.remove('active');
        });

        const targetPane = document.getElementById(`pane-${tabKey}`);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }

  // 3f. Founder Journey & Working Principles Drawer Toggle
  const toggleFounderJourneyBtn = document.getElementById('toggleFounderJourneyBtn');
  const founderStoryDrawer = document.getElementById('founderStoryDrawer');
  const journeyBtnText = document.getElementById('journeyBtnText');

  if (toggleFounderJourneyBtn && founderStoryDrawer) {
    toggleFounderJourneyBtn.addEventListener('click', () => {
      const isOpen = founderStoryDrawer.classList.toggle('open');
      toggleFounderJourneyBtn.classList.toggle('open', isOpen);
      if (journeyBtnText) {
        journeyBtnText.textContent = isOpen ? 'Collapse Story' : 'Read Full Story & Values';
      }
      if (isOpen) {
        founderStoryDrawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // 4. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking outside or clicking any nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // =========================================================================
  // SMART STICKY HEADER (Hide on scroll down, Reveal on scroll up)
  // =========================================================================
  const siteHeader = document.querySelector('.site-header');
  let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
  let scrollTicking = false;
  const SCROLL_THRESHOLD = 8; // Prevent micro jitter triggers

  const updateHeaderScrollState = () => {
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

    // 1. If at or near top of page (within 80px), always show default header
    if (currentScrollY <= 80) {
      if (siteHeader) {
        siteHeader.classList.remove('header-hidden');
        siteHeader.classList.remove('header-scrolled');
      }
      lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
      scrollTicking = false;
      return;
    }

    if (siteHeader) {
      siteHeader.classList.add('header-scrolled');

      // Do not hide if the mobile navigation menu is currently open
      const isMobileMenuOpen = navMenu && navMenu.classList.contains('open');

      if (!isMobileMenuOpen) {
        const delta = currentScrollY - lastScrollY;

        if (delta > SCROLL_THRESHOLD && currentScrollY > 120) {
          // Scrolling DOWN -> Hide header
          siteHeader.classList.add('header-hidden');
        } else if (delta < -SCROLL_THRESHOLD) {
          // Scrolling UP -> Reveal header
          siteHeader.classList.remove('header-hidden');
        }
      }
    }

    lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    scrollTicking = false;
  };

  // Active Navigation link and Header scroll listener
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || !window.location.pathname.includes('.html');
    if (isHomePage) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && (href === `#${current}` || (current === '' && (href === '#' || href === 'index.html')))) {
          link.classList.add('active');
        }
      });
    }

    if (!scrollTicking) {
      window.requestAnimationFrame(updateHeaderScrollState);
      scrollTicking = true;
    }
  }, { passive: true });

  // 3. Testimonials Carousel Navigation
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const track = document.getElementById('testimonialTrack');

  if (prevBtn && nextBtn && track) {
    const cards = Array.from(track.querySelectorAll('.testimonial-card'));
    let currentIndex = 0;

    const updateSlider = () => {
      // For mobile or single card view
      if (window.innerWidth <= 868) {
        cards.forEach((card, idx) => {
          card.style.display = idx === currentIndex ? 'flex' : 'none';
        });
      } else {
        cards.forEach(card => {
          card.style.display = 'flex';
        });
      }
    };

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateSlider();
      // subtle animation feedback
      cards[currentIndex].style.opacity = '0';
      setTimeout(() => {
        cards[currentIndex].style.opacity = '1';
        cards[currentIndex].style.transition = 'opacity 0.3s ease';
      }, 50);
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateSlider();
      cards[currentIndex].style.opacity = '0';
      setTimeout(() => {
        cards[currentIndex].style.opacity = '1';
        cards[currentIndex].style.transition = 'opacity 0.3s ease';
      }, 50);
    });

    window.addEventListener('resize', updateSlider);
    updateSlider();
  }

  // 4. Consultation Modal Logic
  const modalOverlay = document.getElementById('consultationModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const consultationForm = document.getElementById('consultationForm');
  const toastMsg = document.getElementById('toastMsg');
  const chatWhatsAppBtn = document.getElementById('chatWhatsAppBtn');

  const openModal = (e) => {
    if (e) e.preventDefault();
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      openModal(e);
      const srv = btn.getAttribute('data-service');
      const serviceSelect = document.getElementById('serviceRequired');
      if (serviceSelect && srv) {
        serviceSelect.value = srv;
      }
      const ind = btn.getAttribute('data-industry');
      const tenderDetails = document.getElementById('tenderDetails');
      if (tenderDetails && ind) {
        tenderDetails.value = `Inquiry regarding: ${ind} tender opportunities.`;
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // 5. Form Submission & WhatsApp Direct
  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const fullName = document.getElementById('fullName').value.trim();
      const companyName = document.getElementById('companyName').value.trim();
      const mobileNumber = document.getElementById('mobileNumber').value.trim();
      const service = document.getElementById('serviceRequired').value;

      closeModal();
      consultationForm.reset();

      // Show toast
      if (toastMsg) {
        toastMsg.textContent = `Thank you, ${fullName}! Your enquiry for ${service} has been received. Minesh Bhav will contact you shortly.`;
        toastMsg.classList.add('show');
        setTimeout(() => {
          toastMsg.classList.remove('show');
        }, 5000);
      }
    });
  }

  // 5b. On-Page Enquiry Form Handler (PDF Page 4)
  const onPageEnquiryForm = document.getElementById('onPageEnquiryForm');
  if (onPageEnquiryForm) {
    onPageEnquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('pageFullName')?.value.trim() || 'Client';
      const service = document.getElementById('pageServiceRequired')?.value || 'Tender Service';
      onPageEnquiryForm.reset();
      if (toastMsg) {
        toastMsg.textContent = `Thank you, ${fullName}! Your enquiry for ${service} has been received. Minesh Bhav will contact you shortly.`;
        toastMsg.classList.add('show');
        setTimeout(() => {
          toastMsg.classList.remove('show');
        }, 5000);
      }
    });
  }

  // Direct WhatsApp Button from Modal
  if (chatWhatsAppBtn) {
    chatWhatsAppBtn.addEventListener('click', () => {
      const name = document.getElementById('fullName')?.value.trim() || 'Client';
      const comp = document.getElementById('companyName')?.value.trim() || 'Business';
      const srv = document.getElementById('serviceRequired')?.value || 'Tender Support';
      
      const text = encodeURIComponent(
        `Hello Minesh Tendering,\nMy name is ${name} from ${comp}.\nI am interested in: ${srv}.\nPlease provide consultation.`
      );
      window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
    });
  }

  // =========================================================================
  // 6. Dynamic 6-Stage Working Approach Stepper & Showcase
  // =========================================================================
  const approachStagesData = [
    {
      step: 1,
      badge: "PHASE 01 OF 06",
      title: "Tender Opportunity Discovery & Tracking",
      desc: "We monitor daily tender releases across Central Government, State Departments, PSUs, and municipal portals, matching opportunities precisely to your company’s product line and financial capacity.",
      service: "Tender Tracking & Research",
      deliverables: [
        { strong: "Daily Multi-Portal Scans", desc: "Comprehensive keyword-filtered searches on GeM, CPPP, State e-Proc, and IREPS." },
        { strong: "Commercial Fitment Screening", desc: "Assessment of estimated contract value, EMD amount, and location suitability." },
        { strong: "Notice Inviting Tender (NIT) Brief", desc: "Concise executive summary of deadlines, scope, and key submission milestones." }
      ]
    },
    {
      step: 2,
      badge: "PHASE 02 OF 06",
      title: "Tender Evaluation & Qualification Audit",
      desc: "Rigorous analysis of tender eligibility terms, turnover criteria, solvency requirements, EMD bank guarantee clauses, and prior work credentials to avoid surprise disqualifications.",
      service: "Tender Bidding & Submission",
      deliverables: [
        { strong: "EMD & BG Clause Verification", desc: "Precise bank guarantee text verification, solvency thresholds, and exemption rules." },
        { strong: "Financial & Turnover Benchmarking", desc: "Auditing 3-year turnover certificates and working capital criteria against tender specs." },
        { strong: "Disqualification Risk Assessment", desc: "Identifying non-negotiable compliance traps, blackout clauses, and Corrigendum updates." }
      ]
    },
    {
      step: 3,
      badge: "PHASE 03 OF 06",
      title: "Technical & Commercial Bid Preparation",
      desc: "End-to-end compilation of technical proposal schedules, OEM authorizations, statutory compliance declarations, price bid BOQ formats, and documentary annexures.",
      service: "Tender Bidding & Submission",
      deliverables: [
        { strong: "Technical Schedule Compilation", desc: "Custom documentation matching exact tender specification formats and compliance matrix." },
        { strong: "Price BOQ & Commercial Review", desc: "Financial quote verification, tax/GST declaration validation, and mathematical sanity checks." },
        { strong: "Pre-Bid Representation Queries", desc: "Drafting formal queries for pre-bid meetings and scope clarifications before closing." }
      ]
    },
    {
      step: 4,
      badge: "PHASE 04 OF 06",
      title: "Flawless e-Procurement Portal Submission",
      desc: "Handling digital signature certificate (DSC) encryption, portal file uploads, verification checklists, and electronic token authorization well ahead of submission cutoffs.",
      service: "Tender Bidding & Submission",
      deliverables: [
        { strong: "Class-3 DSC Signing & Token Security", desc: "Compliant encryption and digital document signing on GeM, CPPP, and state platforms." },
        { strong: "Zero-Glitch Submission Protocol", desc: "Submitting 24 hours prior to deadline to prevent portal server outages and upload traffic jams." },
        { strong: "Official Acknowledgment Receipt", desc: "Archiving digitally signed submission receipts, bid hashes, and tender fee proofs." }
      ]
    },
    {
      step: 5,
      badge: "PHASE 05 OF 06",
      title: "Government Liaison & Evaluation Tracking",
      desc: "Proactive follow-up with procurement authorities during technical bid opening, attending client briefings, tracking evaluation committee minutes, and submitting timely clarifications.",
      service: "Government Liaison & Co-ordination Support",
      deliverables: [
        { strong: "Technical Evaluation Representation", desc: "Defending bid qualifications, attending sample inspections, and addressing queries." },
        { strong: "Clarification & Corrigendum Responses", desc: "Drafting lawful and persuasive written correspondence with procurement officers." },
        { strong: "Commercial Bid Opening Alerts", desc: "Live notification when financial quotes and comparative L1 rankings are declared." }
      ]
    },
    {
      step: 6,
      badge: "PHASE 06 OF 06",
      title: "Post-Bid Follow-Up & Contract Formalization",
      desc: "Supporting letter of acceptance (LOA) processing, performance bank guarantee (PBG) documentation, agreement drafting, and aggressive follow-up for timely EMD refund release.",
      service: "Post-Bid & Contract Support",
      deliverables: [
        { strong: "LOA & Contract Documentation", desc: "Reviewing work orders, purchase orders, and contractual agreement terms." },
        { strong: "Performance Bank Guarantee (PBG)", desc: "Assistance with contract security deposit formats, validity periods, and submission." },
        { strong: "EMD Release Follow-Up", desc: "Rigorous follow-up with accounts departments for prompt refund of earnest money deposits." }
      ]
    }
  ];

  let currentApproachStep = 1;
  const approachStepNodes = document.querySelectorAll('.approach-step-node');
  const approachProgressFill = document.getElementById('approachProgressFill');
  const stagePhaseBadge = document.getElementById('stagePhaseBadge');
  const stageShowcaseTitle = document.getElementById('stageShowcaseTitle');
  const stageShowcaseDesc = document.getElementById('stageShowcaseDesc');
  const stageEnquireBtn = document.getElementById('stageEnquireBtn');
  const stageDeliverablesList = document.getElementById('stageDeliverablesList');
  const prevStageBtn = document.getElementById('prevStageBtn');
  const nextStageBtn = document.getElementById('nextStageBtn');
  const stageShowcase = document.getElementById('approachStageShowcase');

  function updateApproachStage(stepNum, shouldAnimate = true) {
    currentApproachStep = stepNum;
    const stageData = approachStagesData.find(s => s.step === stepNum) || approachStagesData[0];

    // 1. Update Stepper Nodes
    approachStepNodes.forEach(node => {
      const nodeStep = parseInt(node.getAttribute('data-step'), 10);
      if (nodeStep === stepNum) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });

    // 2. Update Progress Line Fill
    if (approachProgressFill) {
      const pct = ((stepNum - 1) / (approachStagesData.length - 1)) * 100;
      approachProgressFill.style.width = `${pct}%`;
    }

    // 3. Render Card Content with smooth fade
    if (stageShowcase && shouldAnimate) {
      stageShowcase.style.opacity = '0.5';
      stageShowcase.style.transform = 'translateY(6px)';
    }

    setTimeout(() => {
      if (stagePhaseBadge) stagePhaseBadge.textContent = stageData.badge;
      if (stageShowcaseTitle) stageShowcaseTitle.textContent = stageData.title;
      if (stageShowcaseDesc) stageShowcaseDesc.textContent = stageData.desc;

      if (stageEnquireBtn) {
        stageEnquireBtn.setAttribute('data-service', stageData.service);
      }

      if (stageDeliverablesList) {
        stageDeliverablesList.innerHTML = stageData.deliverables.map(item => `
          <div class="stage-deliv-item">
            <span class="deliv-check">✓</span>
            <div>
              <strong>${item.strong}</strong>
              <p>${item.desc}</p>
            </div>
          </div>
        `).join('');
      }

      if (stageShowcase) {
        stageShowcase.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
        stageShowcase.style.opacity = '1';
        stageShowcase.style.transform = 'translateY(0)';
      }
    }, shouldAnimate ? 100 : 0);
  }

  // Bind clicks on step nodes
  approachStepNodes.forEach(node => {
    node.addEventListener('click', () => {
      const step = parseInt(node.getAttribute('data-step'), 10);
      if (step && step !== currentApproachStep) {
        updateApproachStage(step, true);
      }
    });
  });

  // Prev / Next Buttons
  if (prevStageBtn) {
    prevStageBtn.addEventListener('click', () => {
      const prevStep = currentApproachStep > 1 ? currentApproachStep - 1 : approachStagesData.length;
      updateApproachStage(prevStep, true);
    });
  }

  if (nextStageBtn) {
    nextStageBtn.addEventListener('click', () => {
      const nextStep = currentApproachStep < approachStagesData.length ? currentApproachStep + 1 : 1;
      updateApproachStage(nextStep, true);
    });
  }

  // =========================================================================
  // 7. Dynamic Government & Procurement Segments Showcase
  // =========================================================================
  const segmentsData = [
    {
      segment: 1,
      badge: "SEGMENT 01 — CENTRAL & STATE JURISDICTION",
      title: "Central & State Government Departments",
      desc: "We track, evaluate, and submit bids for high-value tenders floated by Union Ministries and State Government Directorates governed by General Financial Rules (GFR 2017) and state transparency acts.",
      rule: "GFR 2017 & CVC Norms",
      contracts: "Works, EPC & Rate Contracts",
      benchmark: "100% Technical Clearance",
      service: "Tender Bidding & Submission",
      authorities: [
        "Ministry of Road Transport (MoRTH)",
        "Central Public Works Department (CPWD)",
        "Indian Railway Board & Zones",
        "State Public Works Depts (PWD)",
        "Health & Family Welfare Ministry",
        "State Irrigation & Water Resources"
      ],
      categories: [
        "Civil Works & Infrastructure",
        "Supply of Goods & Equipment",
        "EPC Turnkey Projects",
        "Annual Maintenance (AMC)"
      ]
    },
    {
      segment: 2,
      badge: "SEGMENT 02 — URBAN LOCAL BODIES & SMART CITIES",
      title: "Municipal Corporations & Urban Local Bodies",
      desc: "Navigating urban governance procurement across mega-city corporations, town municipalities, and development authorities with strict local credentials, sanitation standards, and bank guarantees.",
      rule: "State Municipal Acts & By-Laws",
      contracts: "Sanitation, Civil & Smart City",
      benchmark: "Zero Disqualification Audits",
      service: "Tender Tracking & Research",
      authorities: [
        "Brihanmumbai Municipal Corp (BMC / MCGM)",
        "Pune Municipal Corporation (PMC)",
        "Ahmedabad Municipal Corporation (AMC)",
        "Urban Dev Authorities (MMRDA, BDA)",
        "Smart City Mission SPVs",
        "Solid Waste & Sanitation Boards"
      ],
      categories: [
        "Waste Management & Sanitation",
        "Urban Road & Bridge Construction",
        "Water Supply & Drainage Schemes",
        "Smart City IoT & CCTV Surveillance"
      ]
    },
    {
      segment: 3,
      badge: "SEGMENT 03 — PUBLIC SECTOR ENTERPRISES",
      title: "Public Sector Undertakings (PSUs)",
      desc: "Dedicated bidding support for high-stakes procurement floated by Maharatna, Navratna, Miniratna, and state-owned commercial enterprises with stringent technical qualifying requirements (TQR).",
      rule: "PSU Works Manual & CVC Guidelines",
      contracts: "Industrial Supply, MRO & EPC",
      benchmark: "Pre-Bid Query Representation",
      service: "Tender Bidding & Submission",
      authorities: [
        "ONGC (Oil & Natural Gas Corp)",
        "NTPC (National Thermal Power Corp)",
        "BHEL (Bharat Heavy Electricals)",
        "IOCL & BPCL (Petroleum Refineries)",
        "SAIL (Steel Authority of India)",
        "Coal India Limited (CIL)"
      ],
      categories: [
        "Heavy Engineering & Equipment",
        "Industrial Plant Maintenance",
        "Raw Material & Chemical Supplies",
        "Manpower & Security Contracts"
      ]
    },
    {
      segment: 4,
      badge: "SEGMENT 04 — NATIONAL E-PROCUREMENT PLATFORMS",
      title: "GeM & e-Procurement Portals",
      desc: "End-to-end portal management—from OEM catalogue uploads, direct purchase bids, custom bid creation to DSC token encryption across GeM 4.0 and all state e-procurement platforms.",
      rule: "GeM GTC / STC & IT Act 2000",
      contracts: "Online Bids & Reverse Auctions",
      benchmark: "Flawless DSC Token Encryption",
      service: "GeM & Procurement Support",
      authorities: [
        "Government e-Marketplace (GeM 4.0)",
        "CPPP (Central eProcure Portal)",
        "IREPS (Railways e-Procurement)",
        "DefProc (Defence Procurement)",
        "MahaTenders (Maharashtra State)",
        "e-Procurement Karnataka & Gujarat"
      ],
      categories: [
        "GeM Product / Service Cataloguing",
        "Custom Item Tenders & BOQ Bids",
        "Online Reverse Auctions (RA)",
        "Reseller / OEM Brand Registration"
      ]
    },
    {
      segment: 5,
      badge: "SEGMENT 05 — PUBLIC UTILITIES & STATUTORY BODIES",
      title: "Government Institutions & Public Utilities",
      desc: "Flawless documentation and compliance for autonomous institutions, premier healthcare centers, universities, port trusts, and public electricity/water utility boards.",
      rule: "Statutory Acts & Utility Codes",
      contracts: "Utility Works, AMC & Equipment",
      benchmark: "Complete Statutory Compliance",
      service: "Government Liaison & Co-ordination Support",
      authorities: [
        "State Electricity Discoms & Transcos",
        "Jal Nigam & State Water Boards",
        "Major Port Authorities & Maritime Boards",
        "Premier Healthcare: AIIMS & PGIMER",
        "Premier Institutes: IITs, NITs, Central Unis",
        "Autonomous Statutory Boards"
      ],
      categories: [
        "Power Distribution & Substation EPC",
        "Water Treatment & Pipeline Networks",
        "Specialized Medical Equipment",
        "Campus Facility Management Services"
      ]
    }
  ];

  let currentSegment = 1;
  const segmentCards = document.querySelectorAll('.segment-interactive-card');
  const segmentHeroBadge = document.getElementById('segmentHeroBadge');
  const segmentShowcaseTitle = document.getElementById('segmentShowcaseTitle');
  const segmentShowcaseDesc = document.getElementById('segmentShowcaseDesc');
  const segmentMetricRule = document.getElementById('segmentMetricRule');
  const segmentMetricContracts = document.getElementById('segmentMetricContracts');
  const segmentMetricBenchmark = document.getElementById('segmentMetricBenchmark');
  const segmentEnquireBtn = document.getElementById('segmentEnquireBtn');
  const segmentAuthoritiesWrap = document.getElementById('segmentAuthoritiesWrap');
  const segmentCategoriesWrap = document.getElementById('segmentCategoriesWrap');
  const prevSegmentBtn = document.getElementById('prevSegmentBtn');
  const nextSegmentBtn = document.getElementById('nextSegmentBtn');
  const segmentDetailShowcase = document.getElementById('segmentDetailShowcase');

  function updateSegmentShowcase(segNum, shouldAnimate = true) {
    currentSegment = segNum;
    const data = segmentsData.find(s => s.segment === segNum) || segmentsData[0];

    // 1. Update Card selection classes
    segmentCards.forEach(card => {
      const cardSeg = parseInt(card.getAttribute('data-segment'), 10);
      if (cardSeg === segNum) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // 2. Animate showcase container
    if (segmentDetailShowcase && shouldAnimate) {
      segmentDetailShowcase.style.opacity = '0.5';
      segmentDetailShowcase.style.transform = 'translateY(6px)';
    }

    setTimeout(() => {
      if (segmentHeroBadge) segmentHeroBadge.textContent = data.badge;
      if (segmentShowcaseTitle) segmentShowcaseTitle.textContent = data.title;
      if (segmentShowcaseDesc) segmentShowcaseDesc.textContent = data.desc;
      if (segmentMetricRule) segmentMetricRule.textContent = data.rule;
      if (segmentMetricContracts) segmentMetricContracts.textContent = data.contracts;
      if (segmentMetricBenchmark) segmentMetricBenchmark.textContent = data.benchmark;

      if (segmentEnquireBtn) {
        segmentEnquireBtn.setAttribute('data-service', data.service);
      }

      if (segmentAuthoritiesWrap) {
        segmentAuthoritiesWrap.innerHTML = data.authorities.map(auth => `
          <div class="authority-pill">
            <span class="authority-dot"></span>
            <span>${auth}</span>
          </div>
        `).join('');
      }

      if (segmentCategoriesWrap) {
        segmentCategoriesWrap.innerHTML = data.categories.map(cat => `
          <span class="category-tag">${cat}</span>
        `).join('');
      }

      if (segmentDetailShowcase) {
        segmentDetailShowcase.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
        segmentDetailShowcase.style.opacity = '1';
        segmentDetailShowcase.style.transform = 'translateY(0)';
      }
    }, shouldAnimate ? 100 : 0);
  }

  // Click on segment cards
  segmentCards.forEach(card => {
    card.addEventListener('click', () => {
      const seg = parseInt(card.getAttribute('data-segment'), 10);
      if (seg && seg !== currentSegment) {
        updateSegmentShowcase(seg, true);
      }
    });
  });

  // Prev / Next Buttons
  if (prevSegmentBtn) {
    prevSegmentBtn.addEventListener('click', () => {
      const prevSeg = currentSegment > 1 ? currentSegment - 1 : segmentsData.length;
      updateSegmentShowcase(prevSeg, true);
    });
  }

  if (nextSegmentBtn) {
    nextSegmentBtn.addEventListener('click', () => {
      const nextSeg = currentSegment < segmentsData.length ? currentSegment + 1 : 1;
      updateSegmentShowcase(nextSeg, true);
    });
  }

  // =========================================================================
  // 8. Dynamic Why Choose Minesh Tendering - 4 Pillars Showcase
  // =========================================================================
  const whyPillarsData = [
    {
      pillar: 1,
      badge: "PILLAR 01 OF 04 — STRATEGIC TARGETING",
      title: "Opportunity Discovery That Protects Your Margins",
      desc: "We don’t flood you with irrelevant tenders. Our team scans central, state, PSU, and municipal portals daily, handpicking only high-probability bids that match your financial eligibility and manufacturing capacity.",
      advantages: [
        "Daily Keyword & CPV Filtering across GeM, CPPP & State e-Proc",
        "Turnover & Solvency Feasibility Pre-Check Before You Invest Effort",
        "Instant Corrigendum & Addendum Tracking So You Never Miss Updates"
      ],
      metric: "500+ Qualified Tenders Evaluated Monthly",
      service: "Tender Tracking & Research"
    },
    {
      pillar: 2,
      badge: "PILLAR 02 OF 04 — CONSULTATIVE LEADERSHIP",
      title: "Strategic Senior Advisory for High-Stakes Tenders",
      desc: "Benefit from hands-on leadership from Minesh Bhav. We review price BOQs, formulate pre-bid queries, resolve ambiguous tender terms, and guide your pricing strategy to maximize margins while remaining competitive.",
      advantages: [
        "Direct Consultation with Senior Tender Management Consultants",
        "Drafting Persuasive Pre-Bid Clarification Letters to Tender Authorities",
        "Competitive BOQ Quote Sanity Checks and GST/Tax Compliance Review"
      ],
      metric: "15+ Years Domain Advisory Track Record",
      service: "Tender Bidding & Submission"
    },
    {
      pillar: 3,
      badge: "PILLAR 03 OF 04 — ZERO DISQUALIFICATION",
      title: "Zero-Disqualification Technical Bid Compliance",
      desc: "Over 40% of bids in India are rejected on minor clerical technicalities. We enforce a 3-layer audit on EMD bank guarantee text, OEM authorizations, MSME exemptions, and statutory declarations to guarantee qualification.",
      advantages: [
        "Multi-Stage Technical Matrix & Checkpoint Verification",
        "Precise Bank Guarantee (BG) Text & Stamp Paper Format Validation",
        "Statutory Tax, CA Turnover Certificate & OEM Authorization Audits"
      ],
      metric: "99.8% Technical Bid Clearance Benchmark",
      service: "Tender Bidding & Submission"
    },
    {
      pillar: 4,
      badge: "PILLAR 04 OF 04 — LIFECYCLE MANAGEMENT",
      title: "360-Degree Tender Desk from Filing to Contract LOA",
      desc: "We manage your tendering journey end-to-end. From Class-3 DSC token authorization 24 hours prior to deadline, portal upload monitoring, technical bid opening representation to aggressive EMD refund recovery.",
      advantages: [
        "Class-3 DSC Signing & Guaranteed 24-Hour Advance Submission",
        "Post-Bid Follow-Up During Technical Opening & Sample Testing",
        "Aggressive Tracking for Timely EMD & Security Deposit Refunds"
      ],
      metric: "100% End-to-End Lifecycle Handholding",
      service: "Post-Bid & Contract Support"
    }
  ];

  let currentPillar = 1;
  const pillarCards = document.querySelectorAll('.why-pillar-card');
  const spotlightPillarBadge = document.getElementById('spotlightPillarBadge');
  const spotlightPillarTitle = document.getElementById('spotlightPillarTitle');
  const spotlightPillarDesc = document.getElementById('spotlightPillarDesc');
  const spotlightAdvantagesList = document.getElementById('spotlightAdvantagesList');
  const spotlightMetricVal = document.getElementById('spotlightMetricVal');
  const spotlightEnquireBtn = document.getElementById('spotlightEnquireBtn');
  const prevPillarBtn = document.getElementById('prevPillarBtn');
  const nextPillarBtn = document.getElementById('nextPillarBtn');
  const whyPillarSpotlight = document.getElementById('whyPillarSpotlight');

  function updatePillarSpotlight(pillarNum, shouldAnimate = true) {
    currentPillar = pillarNum;
    const data = whyPillarsData.find(p => p.pillar === pillarNum) || whyPillarsData[0];

    // 1. Update Card selection classes
    pillarCards.forEach(card => {
      const cardPillar = parseInt(card.getAttribute('data-pillar'), 10);
      if (cardPillar === pillarNum) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // 2. Animate spotlight container
    if (whyPillarSpotlight && shouldAnimate) {
      whyPillarSpotlight.style.opacity = '0.5';
      whyPillarSpotlight.style.transform = 'translateY(6px)';
    }

    setTimeout(() => {
      if (spotlightPillarBadge) spotlightPillarBadge.textContent = data.badge;
      if (spotlightPillarTitle) spotlightPillarTitle.textContent = data.title;
      if (spotlightPillarDesc) spotlightPillarDesc.textContent = data.desc;
      if (spotlightMetricVal) spotlightMetricVal.textContent = data.metric;

      if (spotlightEnquireBtn) {
        spotlightEnquireBtn.setAttribute('data-service', data.service);
      }

      if (spotlightAdvantagesList) {
        spotlightAdvantagesList.innerHTML = data.advantages.map(adv => `
          <div class="spotlight-adv-item">
            <span class="adv-check-icon">✓</span>
            <span>${adv}</span>
          </div>
        `).join('');
      }

      if (whyPillarSpotlight) {
        whyPillarSpotlight.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
        whyPillarSpotlight.style.opacity = '1';
        whyPillarSpotlight.style.transform = 'translateY(0)';
      }
    }, shouldAnimate ? 100 : 0);
  }

  // Click on pillar cards
  pillarCards.forEach(card => {
    card.addEventListener('click', () => {
      const pillar = parseInt(card.getAttribute('data-pillar'), 10);
      if (pillar && pillar !== currentPillar) {
        updatePillarSpotlight(pillar, true);
      }
    });
  });

  // Prev / Next Buttons
  if (prevPillarBtn) {
    prevPillarBtn.addEventListener('click', () => {
      const prev = currentPillar > 1 ? currentPillar - 1 : whyPillarsData.length;
      updatePillarSpotlight(prev, true);
    });
  }

  if (nextPillarBtn) {
    nextPillarBtn.addEventListener('click', () => {
      const next = currentPillar < whyPillarsData.length ? currentPillar + 1 : 1;
      updatePillarSpotlight(next, true);
    });
  }

  // =========================================================================
  // Enquiry Page: FAQ Accordion Toggle & Form Logic
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-accordion-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          faqItems.forEach(other => {
            if (other !== item) other.classList.remove('active');
          });
          if (!isActive) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }

  const enquiryPageForm = document.getElementById('enquiryPageForm');
  if (enquiryPageForm) {
    enquiryPageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const toast = document.getElementById('toastMsg');
      if (toast) {
        toast.textContent = 'Thank you! Your enquiry has been received. Our team will contact you shortly.';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 5000);
      }
      enquiryPageForm.reset();
    });
  }

  // Credentials Carousel Navigation
  const credGrid = document.querySelector('.cred-cards-grid');
  const prevCredBtn = document.querySelector('.cred-nav-btn.prev');
  const nextCredBtn = document.querySelector('.cred-nav-btn.next');
  if (credGrid && prevCredBtn && nextCredBtn) {
    prevCredBtn.addEventListener('click', () => {
      credGrid.scrollBy({ left: -320, behavior: 'smooth' });
    });
    nextCredBtn.addEventListener('click', () => {
      credGrid.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }
});



