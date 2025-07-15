const recipes = [
    {
        "name": "Dhabewali dal",
        "type": "curry",
        "tag": "masala",
        "ingredients": ["onion", "tomato", "garlic"]
    },
    {
        "name": "Aloo Gobi",
        "type": "sabzi",
        "tag": "simple",
        "ingredients": ["potato", "cauliflower", "onion"]
    },
    {
        "name": "Baingan Bharta",
        "type": "sabzi",
        "tag": "masala",
        "ingredients": ["brinjal", "onion", "tomato"]
    },
    {
        "name": "Palak Paneer",
        "type": "curry",
        "tag": "simple",
        "ingredients": ["spinach", "paneer", "garlic"]
    }
]

generateVeggieList();

function generateVeggieList() {
    const veggies = new Set();
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(veg => veggies.add(veg));
    });

    const veggieListDiv = document.getElementById("veggie-list");
    veggies.forEach(veg => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="checkbox" value="${veg}"> ${veg.charAt(0).toUpperCase() + veg.slice(1)}`;
        veggieListDiv.appendChild(label);
    });
}

function suggestMeal() {
    const selectedVeggies = Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(cb => cb.value);

    const filtered = recipes.filter(recipe => recipe.ingredients.every(veg => selectedVeggies.includes(veg)));

    const masalaCurries = filtered.filter(r => r.type === "curry" && r.tag === "masala");
    const simpleCurries = filtered.filter(r => r.type === "curry" && r.tag === "simple");
    const masalaSabzis = filtered.filter(r => r.type === "sabzi" && r.tag === "masala");
    const simpleSabzis = filtered.filter(r => r.type === "sabzi" && r.tag === "simple");

    let curry, sabzi;
    if (masalaCurries.length && simpleSabzis.length) {
        curry = randomPick(masalaCurries);
        sabzi = randomPick(simpleSabzis);
    } else if (simpleCurries.length && masalaSabzis.length) {
        curry = randomPick(simpleCurries);
        sabzi = randomPick(masalaSabzis);
    } else {
        document.getElementById("result").innerHTML = "❌ No matching pair found with selected vegetables.";
        document.getElementById("result").style.display = "block";
        return;
    }

    document.getElementById("result").innerHTML = `
        <strong>🍛 Curry:</strong> ${curry.name} (${curry.tag})<br>
        <em>Ingredients:</em> ${curry.ingredients.join(", ")}<br><br>
        <strong>🥗 Sabzi:</strong> ${sabzi.name} (${sabzi.tag})<br>
        <em>Ingredients:</em> ${sabzi.ingredients.join(", ")}
    `;
    document.getElementById("result").style.display = "block";
}

function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
