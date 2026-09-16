/**
 * ==============================================================================
 * PORTAIL PÉDAGOGIQUE - LOGIQUE VUE.JS 3
 * ==============================================================================
 * Ce fichier gère la liste réactive des cours, la recherche en temps réel,
 * le système de notification (quand une URL est en attente) et le thème.
 */

const { createApp, ref, computed, onMounted } = Vue;

createApp({
  setup() {
    // ========================================================================
    // 1. CONFIGURATION DES COURS (MODIFIEZ VOS URLS ICI)
    // ========================================================================
    const courses = ref([
      {
        id: '2sc',
        code: '2e Sciences',
        title: '2ème Année Sciences',
        level: 'Tronc Commun Scientifique',
        cardClass: 'card-2sc',
        // 👉 Indiquez votre URL ici une fois prête, ex: "https://monsite.com/2sc"
        url: '#',
        description: 'Initiation à l\'algorithmique, résolution de problèmes, programmation de base et culture numérique.',
        tags: ['Algorithmique', 'Python', 'Bureautique', 'Logique'],
        iconSvg: `
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 18l6-6-6-6"></path>
            <path d="M8 6l-6 6 6 6"></path>
          </svg>
        `
      },
      {
        id: '3tech',
        code: '3e Techniques',
        title: '3ème Année Techniques',
        level: 'Sciences Techniques',
        cardClass: 'card-3tech',
        // 👉 Indiquez votre URL ici une fois prête
        url: '#',
        description: 'Systèmes automatisés, logique combinatoire & séquentielle, microcontrôleurs et programmation appliquée.',
        tags: ['Logique', 'Systèmes', 'Automatisme', 'Algorithmes'],
        iconSvg: `
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        `
      },
      {
        id: '3sti',
        code: '3e STI',
        title: '3ème Année STI',
        level: 'Sciences de l\'Informatique',
        cardClass: 'card-3sti',
        // 👉 Indiquez votre URL ici une fois prête
        url: '#',
        description: 'Algorithmique avancée, structures de données, bases de données relationnelles et développement Web.',
        tags: ['Algorithmique Avancée', 'SQL / BDD', 'HTML & CSS', 'Python'],
        iconSvg: `
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
          </svg>
        `
      },
      {
        id: '4sc',
        code: '4e Sciences',
        title: '4ème Année Sciences',
        level: 'Classe Terminale (Bac)',
        cardClass: 'card-4sc',
        // 👉 Indiquez votre URL ici une fois prête
        url: '#',
        description: 'Préparation approfondie au Baccalauréat : révision des concepts clés, épreuves pratiques et algorithmes.',
        tags: ['Baccalauréat', 'Annales', 'Épreuves Pratiques', 'Projets'],
        iconSvg: `
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
          </svg>
        `
      }
    ]);

    // ========================================================================
    // 2. RESSOURCES & OUTILS PÉDAGOGIQUES COMPLÉMENTAIRES
    // ========================================================================
    const usefulTools = ref([
      {
        title: 'Compilateur Python en Ligne',
        description: 'Testez vos scripts algorithmiques directement dans le navigateur.',
        url: 'https://www.programiz.com/python-programming/online-compiler/',
        icon: 'terminal'
      },
      {
        title: 'Simulateur Logique (Logicly)',
        description: 'Expérimentez les portes logiques et tables de vérité en ligne.',
        url: 'https://logic.ly/demo/',
        icon: 'cpu'
      },
      {
        title: 'W3Schools (Tutoriels Web & SQL)',
        description: 'Fiches de référence simples pour HTML, CSS, JavaScript et SQL.',
        url: 'https://www.w3schools.com/',
        icon: 'book-open'
      }
    ]);

    // ========================================================================
    // 3. RECHERCHE ET FILTRAGE EN TEMPS RÉEL
    // ========================================================================
    const searchQuery = ref('');

    const filteredCourses = computed(() => {
      const q = searchQuery.value.trim().toLowerCase();
      if (!q) return courses.value;

      return courses.value.filter(course => {
        return (
          course.title.toLowerCase().includes(q) ||
          course.code.toLowerCase().includes(q) ||
          course.level.toLowerCase().includes(q) ||
          course.description.toLowerCase().includes(q) ||
          course.tags.some(t => t.toLowerCase().includes(q))
        );
      });
    });

    const clearSearch = () => {
      searchQuery.value = '';
    };

    // ========================================================================
    // 4. GESTION DU CLIC SUR UN COURS (NAVIGATION OU NOTIFICATION)
    // ========================================================================
    const toastMessage = ref('');
    const toastTitle = ref('');
    const isToastVisible = ref(false);
    let toastTimeout = null;

    const isCourseReady = (course) => {
      return Boolean(course.url && course.url !== '#' && course.url.trim() !== '');
    };

    const handleCourseClick = (course) => {
      if (isCourseReady(course)) {
        // Si l'URL est configurée, redirection
        window.open(course.url, '_blank', 'noopener,noreferrer');
      } else {
        // Si l'URL est en cours de création, affichage du toast informatif
        toastTitle.value = course.title;
        toastMessage.value = `Le site du cours pour la classe ${course.code} est en cours de préparation et sera accessible très prochainement.`;
        isToastVisible.value = true;

        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
          isToastVisible.value = false;
        }, 4500);
      }
    };

    const closeToast = () => {
      isToastVisible.value = false;
    };

    // ========================================================================
    // 5. GESTION DU THÈME (SOMBRE / CLAIR)
    // ========================================================================
    const isDarkMode = ref(true);

    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value;
      const theme = isDarkMode.value ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-bs-theme', theme);
      try {
        localStorage.setItem('portal_theme', theme);
      } catch (e) {
        // Ignorer si localStorage désactivé
      }
    };

    onMounted(() => {
      try {
        const savedTheme = localStorage.getItem('portal_theme');
        if (savedTheme === 'light') {
          isDarkMode.value = false;
          document.documentElement.setAttribute('data-theme', 'light');
          document.documentElement.setAttribute('data-bs-theme', 'light');
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          document.documentElement.setAttribute('data-bs-theme', 'dark');
        }
      } catch (e) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    });

    const currentYear = new Date().getFullYear();

    return {
      courses,
      usefulTools,
      searchQuery,
      filteredCourses,
      clearSearch,
      isCourseReady,
      handleCourseClick,
      toastTitle,
      toastMessage,
      isToastVisible,
      closeToast,
      isDarkMode,
      toggleTheme,
      currentYear
    };
  }
}).mount('#app');
