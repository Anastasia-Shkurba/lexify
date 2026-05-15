const urlParams = new URLSearchParams(window.location.search);
const currentLang = urlParams.get('lang') || 'en';

fetch('courses.json')
  .then(response => response.json())
  .then(data => {
    const course = data[currentLang];

    if (course) {
      const updateElement = (id, value, attribute = 'textContent') => {
        const el = document.getElementById(id);
        if (el) {
          el[attribute] = value;
        } else {
          console.error(`Помилка: Елемент с id="${id}" не знайдений в твоєму HTML!`);
        }
      };

      updateElement('course-title', course.title);
      updateElement('course-subtitle', course.subtitle);
      updateElement('course-desc', course.description);
      updateElement('course-img', course.image, 'src');
      updateElement('price-group', course.groupPrice);
      updateElement('price-individual', course.individualPrice);

      const levelsContainer = document.getElementById('course-levels');
      if (levelsContainer) {
        levelsContainer.innerHTML = '';
        course.levels.forEach(level => {
          const li = document.createElement('li');
          li.className = 'level program__level';
          li.textContent = level;
          levelsContainer.appendChild(li);
        });
      } else {
        console.error(`Помилка: Список id="course-levels" не знайдений!`);
      }
    }
  })
  .catch(error => console.error('Помилка завантаження даних:', error));