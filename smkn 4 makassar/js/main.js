// === GLOBAL VARIABLES ===
let isLoading = true
let currentOrgTab = "osis"

// === DOM ELEMENTS ===
const loadingScreen = document.getElementById("loading-screen")
const navbar = document.getElementById("navbar")
const hamburger = document.getElementById("hamburger")
const navLinks = document.getElementById("nav-links")
const backToTopBtn = document.getElementById("back-to-top")
const registrationForm = document.getElementById("registration-form")

// === LOADING SCREEN ===
window.addEventListener("load", () => {
  setTimeout(() => {
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
      isLoading = false
      initializeAnimations()
    }, 500)
  }, 2000)
})

// === NAVBAR FUNCTIONALITY ===
// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
    backToTopBtn.classList.add("show")
  } else {
    navbar.classList.remove("scrolled")
    backToTopBtn.classList.remove("show")
  }
})

// Mobile menu toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navLinks.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navLinks.classList.remove("active")
  })
})

// Active nav link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// === SMOOTH SCROLLING ===
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// === BACK TO TOP BUTTON ===
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// === COUNTER ANIMATION ===
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  })
}

// === INTERSECTION OBSERVER FOR ANIMATIONS ===
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"

        // Animate counters when hero stats come into view
        if (entry.target.classList.contains("hero-stats")) {
          animateCounters()
        }
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".jurusan-card, .org-card, .berita-card, .info-card").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Observe hero stats
  const heroStats = document.querySelector(".hero-stats")
  if (heroStats) {
    observer.observe(heroStats)
  }
}

// === ORGANIZATION TABS ===
function showOrgTab(tabName) {
  // Hide all tab contents
  document.querySelectorAll(".org-tab-content").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Remove active class from all tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })

  // Show selected tab content
  document.getElementById(`${tabName}-tab`).classList.add("active")

  // Add active class to clicked button
  event.target.classList.add("active")

  currentOrgTab = tabName
}

// === JURUSAN DETAIL MODAL ===
function showJurusanDetail(jurusan) {
  const modal = document.getElementById("jurusan-modal")
  const modalBody = document.getElementById("modal-body")

  const jurusanData = {
    tkj: {
      title: "Teknik Komputer dan Jaringan",
      description:
        "Program keahlian yang mempelajari instalasi, konfigurasi, dan maintenance sistem komputer serta jaringan.",
      subjects: [
        "Informatika",
        "Komputer dan Jaringan Dasar",
        "Pemrograman Dasar",
        "Dasar Desain Grafis",
        "Jaringan LAN, MAN, WAN",
        "Infrastruktur Jaringan",
        "Fiber OPtic",
        "Teknologi Layanan Jaringan",
        "Troubleshooting Jaringan",
        "Keamanan Jaringan/FireWall",
      ],
      career: [
        "Network Administrator",
        "System Administrator",
        "IT Support Specialist",
        "Network Engineer",
        "Cyber Security Analyst",
        "Web Developer",
        "Database Administrator",
      ],
      facilities: [
        "Lab TKJ 1",
        "Lab TKJ 2",
        "TEaching FActory TKJ",
        "Peralatan troubleshooting lengkap",
        "Server Room",
      ],
    },
    upw: {
      title: "Usaha Perjalanan Wisata",
      description:
        "Program keahlian yang mempelajari industri pariwisata, perhotelan, dan manajemen perjalanan wisata.",
      subjects: [
        "Pengantar Pariwisata",
        "Geografi Pariwisata",
        "Bahasa Inggris Pariwisata",
        "Manajemen Usaha Perjalanan Wisata",
        "Perencanaan Tour",
        "Guiding Technique",
        "Reservasi dan Ticketing",
        "Hotel Operations",
        "Event Organizer",
        "Digital Marketing Tourism",
      ],
      career: [
        "Tour Guide",
        "Travel Agent",
        "Hotel Staff",
        "Event Organizer",
        "Tourism Marketing",
        "Airline Staff",
        "Cruise Ship Staff",
      ],
      facilities: [
        "Lab UPW 1",
        "TEaching FActory UPW",
        "Bus UPW",
      ],
    },
    otkp: {
      title: "Otomatisasi dan Tata Kelola Perkantoran",
      description:
        "Program keahlian yang mempelajari keterampilan administrasi perkantoran modern dengan teknologi terkini.",
      subjects: [
        "Teknologi Perkantoran",
        "Korespondensi",
        "Kearsipan",
        "Administrasi Kepegawaian",
        "Administrasi Keuangan",
        "Administrasi Sarana Prasarana",
        "Administrasi Humas dan Keprotokolan",
        "Otomatisasi Tata Kelola Keuangan",
        "Otomatisasi Tata Kelola Kepegawaian",
        "Otomatisasi Tata Kelola Sarana Prasarana",
      ],
      career: [
        "Administrative Assistant",
        "Secretary",
        "Office Manager",
        "Human Resources Staff",
        "Customer Service",
        "Data Entry Operator",
        "Records Manager",
      ],
      facilities: [
        "Lab OTP 1",
        "Lab OTP 2",
        "Peralatan Office",
        "TEaching FActory OTP",
      ],
    },
    tbg: {
      title: "Tata Boga",
      description:
        "Program keahlian yang mempelajari seni kuliner profesional dan manajemen makanan berkelas internasional.",
      subjects: [
        "Sanitasi Hygiene dan Keselamatan Kerja",
        "Pengetahuan Bahan Makanan",
        "Teknik Pengolahan Makanan",
        "Hidangan Kontinental",
        "Hidangan Oriental",
        "Hidangan Indonesia",
        "Pastry dan Bakery",
        "Food and Beverage Service",
        "Tata Hidang",
        "Manajemen Usaha Boga",
      ],
      career: [
        "Chef",
        "Pastry Chef",
        "Food Stylist",
        "Restaurant Manager",
        "Catering Manager",
        "Food Blogger",
        "Culinary Instructor",
      ],
      facilities: ["Kitchen Laboratory", "Pastry & Bakery Lab", "Restaurant Simulation", "TEaching FActory TBG"],
    },
    akl: {
      title: "Akuntansi Keuangan Lembaga",
      description: "Program keahlian yang mempelajari akuntansi, keuangan, dan manajemen untuk berbagai jenis lembaga.",
      subjects: [
        "Pengantar Akuntansi",
        "Etika Profesi",
        "Aplikasi Pengolah Angka",
        "Akuntansi Dasar",
        "Perbankan Dasar",
        "Akuntansi Perusahaan Jasa",
        "Akuntansi Perusahaan Dagang",
        "Akuntansi Perusahaan Manufaktur",
        "Akuntansi Lembaga",
        "Administrasi Pajak",
      ],
      career: [
        "Accounting Staff",
        "Tax Consultant",
        "Financial Analyst",
        "Auditor",
        "Bank Teller",
        "Bookkeeper",
        "Budget Analyst",
      ],
      facilities: [
        "Lab AKL 1","Lab AKL 2","TEaching FActory Akuntansi",
      ],
    },
    bdp: {
      title: "Bisnis Daring dan Pemasaran",
      description: "Program keahlian yang mempelajari strategi pemasaran digital dan konvensional untuk era digital.",
      subjects: [
        "Pengantar Ekonomi Bisnis",
        "Komunikasi Bisnis",
        "Marketing Mix",
        "Perilaku Konsumen",
        "Digital Marketing",
        "E-Commerce",
        "Social Media Marketing",
        "Content Marketing",
        "Bisnis Online",
        "Kewirausahaan",
      ],
      career: [
        "Digital Marketing Specialist",
        "Social Media Manager",
        "E-commerce Manager",
        "Content Creator",
        "Sales Representative",
        "Marketing Analyst",
        "Online Business Owner",
      ],
      facilities: [
        "Lab BDP 1",
        "E-commerce Simulation",
        "TEaching FActory BDP",
        "school uniform production",
      ],
    },
  }

  const data = jurusanData[jurusan]

  modalBody.innerHTML = `
        <h2>${data.title}</h2>
        <p class="mb-3">${data.description}</p>
        
        <div class="modal-grid">
            <div class="modal-section">
                <h3><i class="fas fa-book"></i> Mata Pelajaran</h3>
                <ul class="modal-list">
                    ${data.subjects.map((subject) => `<li>${subject}</li>`).join("")}
                </ul>
            </div>
            
            <div class="modal-section">
                <h3><i class="fas fa-briefcase"></i> Peluang Karir</h3>
                <ul class="modal-list">
                    ${data.career.map((career) => `<li>${career}</li>`).join("")}
                </ul>
            </div>
            
            <div class="modal-section">
                <h3><i class="fas fa-tools"></i> Fasilitas</h3>
                <ul class="modal-list">
                    ${data.facilities.map((facility) => `<li>${facility}</li>`).join("")}
                </ul>
            </div>
        </div>
        
        <div class="modal-actions">
            <a href="#pendaftaran" class="btn btn-primary" onclick="closeModal('jurusan-modal')">
                <i class="fas fa-user-plus"></i> Daftar Sekarang
            </a>
        </div>
    `

  modal.style.display = "block"
  document.body.style.overflow = "hidden"
}

// === VIDEO MODAL ===
function openVideo() {
  const modal = document.getElementById("video-modal")
  const videoFrame = document.getElementById("video-frame")

  // Replace with actual video URL
  videoFrame.src = "https://www.youtube.com/embed/dQw4w9WgXcQ"

  modal.style.display = "block"
  document.body.style.overflow = "hidden"
}

// === MODAL CLOSE FUNCTIONALITY ===
function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  modal.style.display = "none"
  document.body.style.overflow = "auto"

  // Clear video src when closing video modal
  if (modalId === "video-modal") {
    document.getElementById("video-frame").src = ""
  }
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    if (e.target === modal) {
      closeModal(modal.id)
    }
  })
})

// Close modal with close button
document.querySelectorAll(".modal-close").forEach((closeBtn) => {
  closeBtn.addEventListener("click", (e) => {
    const modal = e.target.closest(".modal")
    closeModal(modal.id)
  })
})

// === FORM HANDLING ===
if (registrationForm) {
  registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const submitBtn = registrationForm.querySelector(".btn-submit")
    const originalText = submitBtn.innerHTML

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...'
    submitBtn.disabled = true

    // Simulate form submission
    setTimeout(() => {
      // Show success message
      showNotification("Pendaftaran berhasil dikirim! Kami akan menghubungi Anda segera.", "success")

      // Reset form
      registrationForm.reset()

      // Reset button
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 2000)
  })
}

// === NOTIFICATION SYSTEM ===
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

// === TERMS AND CONDITIONS ===
function showTerms() {
  const modal = document.getElementById("jurusan-modal")
  const modalBody = document.getElementById("modal-body")

  modalBody.innerHTML = `
        <h2>Syarat dan Ketentuan Pendaftaran</h2>
        <div class="terms-content">
            <h3>1. Persyaratan Umum</h3>
            <ul>
                <li>Lulusan SMP/MTs atau sederajat</li>
                <li>Berusia maksimal 21 tahun pada saat pendaftaran</li>
                <li>Sehat jasmani dan rohani</li>
                <li>Tidak buta warna untuk jurusan tertentu</li>
            </ul>
            
            <h3>2. Dokumen yang Diperlukan</h3>
            <ul>
                <li>Fotokopi ijazah SMP/MTs yang telah dilegalisir</li>
                <li>Fotokopi SKHUN yang telah dilegalisir</li>
                <li>Fotokopi Kartu Keluarga</li>
                <li>Fotokopi Akta Kelahiran</li>
                <li>Pas foto 3x4 sebanyak 3 lembar</li>
                <li>Surat keterangan sehat dari dokter</li>
            </ul>
            
            <h3>3. Proses Seleksi</h3>
            <ul>
                <li>Seleksi berdasarkan nilai rapor</li>
                <li>Tes wawancara</li>
                <li>Tes kesehatan</li>
                <li>Tes bakat minat untuk jurusan tertentu</li>
            </ul>
            
            <h3>4. Ketentuan Lain</h3>
            <ul>
                <li>Pendaftaran tidak dipungut biaya</li>
                <li>Keputusan panitia tidak dapat diganggu gugat</li>
                <li>Calon siswa yang diterima wajib melakukan daftar ulang</li>
                <li>Batas waktu daftar ulang sesuai jadwal yang ditentukan</li>
            </ul>
        </div>
        
        <div class="modal-actions">
            <button class="btn btn-primary" onclick="closeModal('jurusan-modal')">
                <i class="fas fa-check"></i> Saya Mengerti
            </button>
        </div>
    `

  modal.style.display = "block"
  document.body.style.overflow = "hidden"
}

// === SEARCH FUNCTIONALITY ===
function initializeSearch() {
  const searchInput = document.createElement("input")
  searchInput.type = "text"
  searchInput.placeholder = "Cari informasi..."
  searchInput.className = "search-input"

  // Add search functionality here if needed
}

// === LAZY LOADING FOR IMAGES ===
function initializeLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// === KEYBOARD NAVIGATION ===
document.addEventListener("keydown", (e) => {
  // Close modal with Escape key
  if (e.key === "Escape") {
    const openModal = document.querySelector('.modal[style*="block"]')
    if (openModal) {
      closeModal(openModal.id)
    }
  }

  // Navigate with arrow keys in organization tabs
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    const tabs = ["osis", "pmr", "pramuka", "ekskul"]
    const currentIndex = tabs.indexOf(currentOrgTab)

    if (e.key === "ArrowLeft" && currentIndex > 0) {
      showOrgTab(tabs[currentIndex - 1])
    } else if (e.key === "ArrowRight" && currentIndex < tabs.length - 1) {
      showOrgTab(tabs[currentIndex + 1])
    }
  }
})

// === PERFORMANCE OPTIMIZATION ===
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for resize events
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// === ACCESSIBILITY IMPROVEMENTS ===
function initializeAccessibility() {
  // Add skip to content link
  const skipLink = document.createElement("a")
  skipLink.href = "#main-content"
  skipLink.textContent = "Skip to main content"
  skipLink.className = "skip-link"
  document.body.insertBefore(skipLink, document.body.firstChild)

  // Add aria-labels to interactive elements
  document.querySelectorAll("button, a").forEach((element) => {
    if (!element.getAttribute("aria-label") && !element.textContent.trim()) {
      element.setAttribute("aria-label", "Interactive element")
    }
  })
}

// === INITIALIZE ALL FUNCTIONS ===
document.addEventListener("DOMContentLoaded", () => {
  initializeLazyLoading()
  initializeAccessibility()

  // Add CSS for additional components
  const additionalCSS = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            padding: 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 3000;
            min-width: 300px;
            animation: slideInRight 0.3s ease;
        }
        
        .notification-success {
            border-left: 4px solid var(--success-green);
        }
        
        .notification-error {
            border-left: 4px solid var(--danger-red);
        }
        
        .notification-info {
            border-left: 4px solid var(--secondary-blue);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex: 1;
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            color: var(--text-gray);
            padding: 0.5rem;
        }
        
        .modal-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin: 2rem 0;
        }
        
        .modal-section h3 {
            color: var(--primary-blue);
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .modal-list {
            list-style: none;
            padding: 0;
        }
        
        .modal-list li {
            padding: 0.5rem 0;
            border-bottom: 1px solid var(--border-gray);
            position: relative;
            padding-left: 1.5rem;
        }
        
        .modal-list li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: var(--secondary-blue);
            font-weight: bold;
        }
        
        .modal-actions {
            text-align: center;
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid var(--border-gray);
        }
        
        .terms-content {
            max-height: 400px;
            overflow-y: auto;
            padding-right: 1rem;
        }
        
        .terms-content h3 {
            color: var(--primary-blue);
            margin: 1.5rem 0 1rem 0;
        }
        
        .terms-content ul {
            margin-bottom: 1.5rem;
        }
        
        .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-blue);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
        }
        
        .skip-link:focus {
            top: 6px;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 768px) {
            .notification {
                right: 10px;
                left: 10px;
                min-width: auto;
            }
            
            .modal-grid {
                grid-template-columns: 1fr;
            }
        }
    `

  const style = document.createElement("style")
  style.textContent = additionalCSS
  document.head.appendChild(style)
})

// === ERROR HANDLING ===
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
  // You can add error reporting here
})

// === SERVICE WORKER REGISTRATION (for PWA) ===
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
