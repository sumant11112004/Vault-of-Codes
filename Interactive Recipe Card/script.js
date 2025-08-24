/* ---------- DATA ---------- */
const RECIPES = {
  cake: {
    title: "Chocolate Cake",
    image: "https://th.bing.com/th/id/R.36ff11c02e380223c7d1c38e74e10fbc?rik=uSjQGZAEJJrakw&riu=http%3a%2f%2frecipessmile.com%2fwp-content%2fuploads%2f2023%2f10%2fchocolate-cake.webp&ehk=l0VsDQAU%2bzlv4AyWpuB0xMA7xYhe1oh3VP8SKSHaJow%3d&risl=&pid=ImgRaw&r=0",
    ingredients: [
      "2 cups all-purpose flour",
      "1½ cups sugar",
      "¾ cup cocoa powder",
      "2 tsp baking powder",
      "1 tsp baking soda",
      "2 eggs",
      "1 cup milk",
      "½ cup vegetable oil",
      "1 tsp vanilla"
    ],
    steps: [
      "Preheat oven to 180°C (350°F). Grease and line a 20cm pan.",
      "Whisk together flour, sugar, cocoa, baking powder, baking soda, and salt.",
      "Add eggs, milk, oil and vanilla; beat until smooth.",
      "Pour batter into pan and tap to release air bubbles.",
      "Bake 30–35 minutes; test with a skewer for doneness.",
      "Cool 10 minutes in pan, then transfer to rack to cool fully."
    ]
  },

  salad: {
    title: "Fresh Salad",
    image: "https://th.bing.com/th/id/R.384b8d7a83051d70053a9406c4bc3f36?rik=H9vJLB%2fXGYV2QA&riu=http%3a%2f%2fstatic4.depositphotos.com%2f1004288%2f312%2fi%2f950%2fdepositphotos_3124506-Fresh-spring-vegetable-salad.jpg&ehk=lrT6woBOISXmoyhxGT5dhTAyeV5G1tNbfCOERl%2fvumg%3d&risl=&pid=ImgRaw&r=0",
    ingredients: [
      "1 head romaine or mixed greens",
      "1 cucumber, sliced",
      "1 cup cherry tomatoes, halved",
      "¼ red onion, thinly sliced",
      "2 tbsp olive oil",
      "1 tbsp lemon juice",
      "Salt & black pepper",
      "Optional: feta cheese, olives"
    ],
    steps: [
      "Wash and dry the greens; tear into bite-sized pieces.",
      "Slice cucumber, halve tomatoes and thinly slice onion.",
      "Whisk olive oil, lemon juice, salt, and pepper in a small bowl.",
      "Combine vegetables in a large bowl and drizzle dressing.",
      "Toss gently to coat and top with feta or olives if desired."
    ]
  },

  pasta: {
    title: "Garlic Tomato Pasta",
    image: "https://th.bing.com/th/id/OIP.BTjk2eoQk_MlhES166t-JAHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    ingredients: [
      "200 g spaghetti or penne",
      "2 tbsp olive oil",
      "3 cloves garlic, minced",
      "1 cup tomato passata or crushed tomatoes",
      "½ tsp chili flakes (optional)",
      "Salt & black pepper",
      "Parmesan & fresh basil to finish"
    ],
    steps: [
      "Bring salted water to a boil and cook pasta until al dente.",
      "While pasta cooks, sauté minced garlic in olive oil until fragrant.",
      "Add tomato passata and chili flakes; simmer 4–5 minutes.",
      "Reserve ¼ cup pasta water, drain pasta and add to sauce.",
      "Toss to combine, adding pasta water if needed, finish with Parmesan and basil."
    ]
  },

  pizza: {
    title: "Margherita Pizza",
    image: "https://cdn.britannica.com/08/177308-050-94D9D6BE/Food-Pizza-Basil-Tomato.jpg",
    ingredients: [
      "1 pizza dough (store-bought or homemade)",
      "½ cup tomato sauce",
      "150 g mozzarella, shredded or sliced",
      "Fresh basil leaves",
      "Olive oil, a pinch of salt"
    ],
    steps: [
      "Preheat oven to 250°C (480°F) with a baking stone or tray inside.",
      "Stretch dough into a thin round on parchment paper.",
      "Spread a thin layer of tomato sauce and season lightly.",
      "Scatter mozzarella and a drizzle of olive oil.",
      "Bake 8–12 minutes until crust is golden and cheese bubbly.",
      "Top with fresh basil leaves and slice to serve."
    ]
  },

  burger: {
    title: "Cheesy Burger",
    image: "https://th.bing.com/th/id/OIP.JnUimTk9WEG9Kz7RWBgmhwHaEu?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    ingredients: [
      "2 burger buns",
      "2 patties (beef or vegetarian)",
      "2 cheese slices",
      "Lettuce, tomato slices, onion rings",
      "Ketchup, mayo, mustard",
      "Salt & pepper"
    ],
    steps: [
      "Season patties with salt and pepper and sear on high heat 3–4 min per side.",
      "Add cheese to patties and cover to melt for ~1 minute.",
      "Toast buns lightly on the pan until golden.",
      "Assemble burger: bottom bun, sauce, lettuce, patty, tomato, onion, top bun.",
      "Press gently, slice, and serve with fries or salad."
    ]
  }
};

/* ---------- DOM Refs ---------- */
const listView = document.getElementById('recipe-list');
const cookView = document.getElementById('cook-view');
const cookTitle = document.getElementById('cook-title');
const cookImage = document.getElementById('cook-image');
const timerEl = document.getElementById('timer');
const toggleIngredients = document.getElementById('toggleIngredients');
const ingredientsCard = document.getElementById('ingredientsCard');
const stepsList = document.getElementById('stepsList');
const nextBtn = document.getElementById('nextStep');
const backBtn = document.getElementById('backBtn');
const progressBar = document.getElementById('progressBar');

/* ---------- STATE ---------- */
let currentKey = null;
let stepIndex = 0;
let seconds = 0;
let timerId = null;

/* ---------- Helpers ---------- */
const pad = n => String(n).padStart(2,'0');
function formatTime(sec){
  return `${pad(Math.floor(sec/60))}:${pad(sec%60)}`;
}
function resetTimer(){
  clearInterval(timerId);
  seconds = 0;
  timerEl.textContent = '00:00';
}
function startTimer(){
  clearInterval(timerId);
  timerId = setInterval(()=>{
    seconds++;
    timerEl.textContent = formatTime(seconds);
  },1000);
}
function renderIngredients(list){
  ingredientsCard.innerHTML = `<ul>${list.map(i=>`<li>${i}</li>`).join('')}</ul>`;
}
function renderSteps(list){
  stepsList.innerHTML = list.map(s => `<li>${s}</li>`).join('');
  stepIndex = 0;
  updateProgress();
  Array.from(stepsList.children).forEach(li => li.classList.remove('active'));
}
function updateProgress(){
  const total = Math.max(stepsList.children.length,1);
  const pct = Math.min((stepIndex / total) * 100, 100);
  progressBar.style.width = pct + '%';
}

/* ---------- Start Cooking Handler ---------- */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.start-btn');
    if(!btn) return; // only start when clicking start button

    currentKey = card.dataset.key;
    const recipe = RECIPES[currentKey];

    // populate cook view
    cookTitle.textContent = recipe.title;
    cookImage.src = recipe.image;
    cookImage.alt = recipe.title;
    renderIngredients(recipe.ingredients);
    ingredientsCard.classList.add('hidden');
    toggleIngredients.textContent = 'Show Ingredients';
    renderSteps(recipe.steps);

    // reset & start timer
    resetTimer();
    startTimer();

    // animate transition (fade & slide)
    listView.classList.add('fade-slide-out');
    setTimeout(()=> {
      listView.classList.add('view--hidden');
      listView.classList.remove('fade-slide-out', 'view--visible');
      cookView.classList.remove('view--hidden');
      cookView.classList.add('fade-slide-in', 'view--visible');
      setTimeout(()=> cookView.classList.remove('fade-slide-in'), 400);
    }, 260);
  });
});

/* ---------- Toggle Ingredients ---------- */
toggleIngredients.addEventListener('click', () => {
  if(ingredientsCard.classList.contains('hidden')){
    ingredientsCard.classList.remove('hidden');
    toggleIngredients.textContent = 'Hide Ingredients';
  } else {
    ingredientsCard.classList.add('hidden');
    toggleIngredients.textContent = 'Show Ingredients';
  }
});

/* ---------- Next Step ---------- */
nextBtn.addEventListener('click', () => {
  const items = Array.from(stepsList.children);
  if(stepIndex < items.length){
    items[stepIndex].classList.add('active');
    stepIndex++;
    updateProgress();

    // If completed last step, auto-stop timer and change button
    if(stepIndex >= items.length){
      nextBtn.textContent = "Done ✔️";
      clearInterval(timerId);
    }
  }
});

/* ---------- Back Button ---------- */
backBtn.addEventListener('click', () => {
  // animate back
  cookView.classList.add('fade-slide-out');
  setTimeout(()=>{
    cookView.classList.add('view--hidden');
    cookView.classList.remove('fade-slide-out','view--visible');
    listView.classList.remove('view--hidden');
    listView.classList.add('fade-slide-in','view--visible');
    setTimeout(()=> listView.classList.remove('fade-slide-in'), 360);
  }, 240);

  // reset state
  resetTimer();
  clearInterval(timerId);
  stepIndex = 0;
  progressBar.style.width = '0%';
  nextBtn.textContent = 'Next Step →';
});
