document.addEventListener('DOMContentLoaded', function() {

  // --- GLOBAL ELEMENTS & CHART SETUP ---

  const allBinCards = document.querySelectorAll('.bin-card');
  const ctx = document.getElementById('wasteChart').getContext('2d');
  
  const wasteChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Organic', 'Recycle', 'Hazardous'],
      datasets: [{
        label: 'Waste in kg',
        data: [4.2, 2.8, 0.6],
        backgroundColor: [
          'rgba(108, 197, 179, 0.8)',
          'rgba(91, 160, 185, 0.8)',
          'rgba(224, 122, 95, 0.8)'
        ],
        borderColor: [
          'rgba(108, 197, 179, 1)',
          'rgba(91, 160, 185, 1)',
          'rgba(224, 122, 95, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Current Waste by Weight (kg)' }
      }
    }
  });

  // --- MODAL (POPUP) CODE ---

  const modal = document.getElementById('info-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDetails = document.getElementById('modal-details');
  const closeButton = document.querySelector('.close-button');

  function openModal(title, fill, weight) {
    modalTitle.textContent = ${title} Bin Status;
    modalDetails.innerHTML = The bin is currently <strong>${fill}</strong> full.<br>Current weight is <strong>${weight}</strong>.;
    modal.style.display = 'flex';
  }

  function closeModal() {
    modal.style.display = 'none';
  }

  allBinCards.forEach(card => {
    card.addEventListener('click', function() {
      const binName = card.dataset.bin;
      const fillLevel = card.querySelector('.progress-fill').textContent;
      const weight = card.querySelector('.weight-info').textContent;
      openModal(binName, fillLevel, weight);
    });
  });

  closeButton.addEventListener('click', closeModal);
  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      closeModal();
    }
  });

  // --- SCROLL ANIMATION CODE ---

  const elementsToFadeIn = document.querySelectorAll('.bin-card, .about h2, .about p, .chart-container, .tech-stack, .vision h2, .vision-diagram, .about-content');
  elementsToFadeIn.forEach(el => el.classList.add('fade-in-element'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  elementsToFadeIn.forEach(el => observer.observe(el));

  // --- SIMULATED LIVE DATA & CHART UPDATE ---

  function simulateDataUpdate() {
    const newWeights = [];

    allBinCards.forEach(card => {
      const newFillLevel = Math.floor(Math.random() * 85) + 10;
      const newWeight = parseFloat((Math.random() * 9 + 0.5).toFixed(1));
      newWeights.push(newWeight);

      const progressBarFill = card.querySelector('.progress-fill');
      const weightInfo = card.querySelector('.weight-info');

      progressBarFill.style.width = newFillLevel + '%';
      progressBarFill.textContent = newFillLevel + '%';
      weightInfo.textContent = newWeight + ' kg';
    });

    wasteChart.data.datasets[0].data = newWeights;
    wasteChart.update();
  }

  setInterval(simulateDataUpdate, 3000);

});