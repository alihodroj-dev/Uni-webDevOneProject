const carData = [
    {
      name: "BMW 328i",
      price: 80,
      location: "California",
      image: "/Images/bmw.jpg",
      category: "Sedan"
    },
    {
      name: "Audi A4",
      price: 95,
      location: "New York",
      image: "/Images/audi_a4.jpg",
      category: "Sedan"
    },
    {
      name: "Mercedes C-Class",
      price: 110,
      location: "Texas",
      image: "/Images/mercedes.jpg",
      category: "Sedan"
    },
    {
      name: "Ford Mustang",
      price: 105,
      location: "Arizona",
      image: "/Images/mustang.jpg",
      category: "Coupe"
    },
    {
      name: "Chevrolet Camaro",
      price: 102,
      location: "Nevada",
      image: "/Images/camaro.jpg",
      category: "Coupe"
    },
    {
      name: "Porsche 911",
      price: 150,
      location: "Florida",
      image: "/Images/porsche911.jpg",
      category: "Coupe"
    },
    {
      name: "Range Rover Evoque",
      price: 130,
      location: "Colorado",
      image: "/Images/range_rover_evoque.jpg",
      category: "Range"
    },
    {
      name: "Range Rover Sport",
      price: 160,
      location: "Washington",
      image: "/Images/range_rover_sport.jpg",
      category: "Range"
    }
  ];
  
  const carsContainer = document.querySelector(".carsContainer");
  const filterButtons = document.querySelectorAll(".filters .all, .filters .Sedan, .filters .Coupe, .filters .Range");
  
  function addToCart(car) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Check if the car already exists in the cart
    const carExists = cart.some(item => item.name === car.name);
  
    if (carExists) {
      alert(`${car.name} is already in your cart.`);
    } else {
      cart.push(car);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${car.name} added to cart!`);
    }
  }
  
  function renderCars(category = "All") {
    carsContainer.innerHTML = "";
  
    const filteredCars = category === "All"
      ? carData
      : carData.filter(car => car.category === category);
  
    filteredCars.forEach(car => {
      carsContainer.innerHTML += `
        <div class="car">
          <img src="${car.image}" alt="${car.name}">
          <div class="priceLocationContainer">
            <p class="price">$${car.price}.00 <span style="color: gray; font-weight: 500; font-size: 14px;">/Day</span></p>
            <p class="location">
              <span class="fa fa-solid fa-location-dot" style="color: gray; font-size: 14px; margin-right: 2px;"></span>
              ${car.location}
            </p>
          </div>
          <p class="name">${car.name}</p>
          <p class="bookNowButton" onclick='addToCart(${JSON.stringify(car)})'>Book Now
            <span class="fa fa-solid fa-phone" style="color: white; font-size: 12px; margin-left: 10px;"></span>
          </p>
        </div>
      `;
    });
  }
  
  // Initial load with all cars
  renderCars();
  
  // Add click events to filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedCategory = btn.innerText.trim();
      btn.classList.add("selectedFilter");
      filterButtons.forEach(btn2 => {
        if (btn.className !== btn2.className) {
          btn2.classList.remove("selectedFilter");
        }
      });
      renderCars(selectedCategory === "All Cars" ? "All" : selectedCategory);
    });
  });
  