document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.toggle');
     const showcase = document.querySelector('.showcase');

     menuToggle.addEventListener('click', () => {
       menuToggle.classList.toggle('active');
       showcase.classList.toggle('active');
     })
     

 function videoslider(links){
           document.querySelector(".slider").src = links;
       }

       // Draggble Carusal

 const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
   // showing and hiding prev/next icon according to carousel scroll left value
   let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
   arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
   arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
   icon.addEventListener("click", () => {
       let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
       // if clicked icon is left, reduce width value from the carousel scroll left else add to it
       carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
       setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
   });
});

const autoSlide = () => {
   // if there is no image left to scroll then return from here
   if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

   positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
   let firstImgWidth = firstImg.clientWidth + 14;
   // getting difference value that needs to add or reduce from carousel left to take middle img center
   let valDifference = firstImgWidth - positionDiff;

   if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
       return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
   }
   // if user is scrolling to the left
   carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
   // updatating global variables value on mouse down event
   isDragStart = true;
   prevPageX = e.pageX || e.touches[0].pageX;
   prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
   // scrolling images/carousel to left according to mouse pointer
   if(!isDragStart) return;
   e.preventDefault();
   isDragging = true;
   carousel.classList.add("dragging");
   positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
   carousel.scrollLeft = prevScrollLeft - positionDiff;
   showHideIcons();
}

const dragStop = () => {
   isDragStart = false;
   carousel.classList.remove("dragging");

   if(!isDragging) return;
   isDragging = false;
   autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);


fetch('conn4.php')
   .then(response => response.json())
   .then(data => {
     const labels = data.map(item => item[0]);
     const values = data.map(item => item[1]);

     const ctxLine = document.getElementById('lineGraph1').getContext('2d');
     new Chart(ctxLine, {
       type: 'line',
       data: {
         labels: labels,
         datasets: [{
           label: 'Dummy Data 1',
           data: values,
           fill: false,
           borderColor: 'rgba(75, 192, 192, 1)',
           borderWidth: 2
         }]
       },
       options: {
         scales: {
           y: {
             suggestedMin: 0,  // Set the minimum value for the y-axis
             suggestedMax: 100
           }
         }
       }
     });

     const tableBody = document.querySelector('#dataTable1 tbody');
     data.forEach(item => {
       const row = document.createElement('tr');
       const monthCell = document.createElement('td');
       monthCell.textContent = item[0];
       const dataCell = document.createElement('td');
       dataCell.textContent = item[1];
       row.appendChild(monthCell);
       row.appendChild(dataCell);
       tableBody.appendChild(row);
     });
   });

 fetch('conn5.php')
   .then(response => response.json())
   .then(data => {
     const labels = data.map(item => item[0]);
     const values = data.map(item => item[1]);

     const ctxLine = document.getElementById('lineGraph2').getContext('2d');
     new Chart(ctxLine, {
       type: 'line',
       data: {
         labels: labels,
         datasets: [{
           label: 'Dummy Data 2',
           data: values,
           fill: false,
           borderColor: 'rgba(192, 75, 75, 1)',
           borderWidth: 2
         }]
       },
       options: {
         scales: {
           y: {
             suggestedMin: 0,  // Set the minimum value for the y-axis
             suggestedMax: 100
           }
         }
       }
     });

     const tableBody = document.querySelector('#dataTable2 tbody');
     data.forEach(item => {
       const row = document.createElement('tr');
       const monthCell = document.createElement('td');
       monthCell.textContent = item[0];
       const dataCell = document.createElement('td');
       dataCell.textContent = item[1];
       row.appendChild(monthCell);
       row.appendChild(dataCell);
       tableBody.appendChild(row);
     });
   });

});