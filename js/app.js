let savedNewArray = []
let searchArray = [];

const billiareDataLoad = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    searchArray = data;
    showDisplayData(data)

}

// total 
const finalWorthTotal = () => {
    const finalWorth = document.getElementsByClassName('finalWorth');
    let totalAmount = 0;
    for (const data of finalWorth) {
        const amount = data.innerText;
        totalAmount += parseFloat(amount);
    }
    // console.log(totalAmount.toFixed(2));
    document.getElementById('subWealth').innerText = totalAmount.toFixed(2)
}

const showDisplayData = (datas) => {
    const cardContainer = document.getElementById('card-container');
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = ''
    cardContainer.textContent = '';
    // console.log(datas);
    let categoryName = '';
    datas.forEach(data => {
        categoryName = data.industries[0]
        // console.log(object);
        const { personName, city, naturalId, countryOfCitizenship, squareImage, financialAssets, state, finalWorth, source, industries, rank } = data;
        const card = document.createElement('div');
        card.classList.add("bg-slate-800", "text-white", "p-5", "space-y-5" < "rounded")
        const tablerow = document.createElement('tr');
        card.innerHTML = `
                <h1 class="text-center text-2xl font-bold">${personName}</h1>
                <div class="md:flex items-stretch  gap-8 ">
                    <div class="space-y-3 flex-1">
                        <img class="w-full mb-3" src=${squareImage} alt="" srcset="">
                        <p class="font-base">Source: <span class="font-normal">${source}</span></p>
                    </div>
                    <div class="md:border-l-2 border-gray-200 flex-1 space-y-2 md:px-3">
                        <p class="text-xl font-bold">Citizenship: <span class="font-normal text-md">${countryOfCitizenship}</span></p>
                        <p class="text-xl font-bold">State: <span class="font-normal">${state ? state : 'not available'}</span></p>
                        <p class="text-xl font-bold">City: <span class="font-normal">${city}</span></p>
                        <p class="text-xl font-bold">Total Shares: <span class="font-normal">${financialAssets ? financialAssetsArray(financialAssets, 'shrares') : 'not available'}</span></p>
                        <p class="text-xl font-bold">Share Price:<span class="font-normal"> $${financialAssets ? financialAssetsArray(financialAssets, 'sharePrice') : 'not available'} </span></p>
                    </div>
                </div>
    `
        // table data 
        tablerow.innerHTML = `
                    <tr class="flex">
                        <td class="flex items-center justify-between"><span title="${personName}">${personName.length > 25 ? personName.slice(0, 25) + "..." : personName}
                        </span><label for="my-modal-3" onclick="showSingleItem('${naturalId}')"><img class="w-4 h-4" src="images/eye 1.png" alt=""></label></td>
                        <td>${countryOfCitizenship}</td>
                        <td>${industries[0]}</td>
                        <td>${rank}</td>
                        <td>$<span class="finalWorth">${finalWorth}</span></td>
                    </tr>
    `
        // console.log(naturalId)


        tableContainer.appendChild(tablerow)
        cardContainer.appendChild(card)
    });
    savedNewArray = datas.sort((a, b) => b.rank - a.rank);
    document.getElementById('categoryName').innerText = categoryName;

}


const financialAssetsArray = (financialAsset, value) => {
    let result = 0;
    financialAsset.forEach(asset => {
        if (value === 'shrares') {
            if (asset.numberOfShares !== '') {
                result = asset.numberOfShares;

            }
            else {
                result = "sorry can't find value"
            }
        }
        if (value === 'sharePrice') {

            if (asset.sharePrice !== '') {
                result = asset.sharePrice;
            }
            else {
                result = "sorry can't find value"
            }

        }
    });
    return result
}

const LoadMore = () => {
    // console.log('ehllo');
    billiareDataLoad(30)
}
const richestByIndustry = () => {
    const url = "../ByIndustryTechnology.json"
    billiareDataLoad(url)
    document.getElementById('subWealth').innerText = '00'
}
const url = "../ByIndustryFashion.json"
billiareDataLoad(url)



const richestByState = () => {
    const url = "../ByStateTexas.json"
    billiareDataLoad(url)
    document.getElementById('subWealth').innerText = '00'
}

const allBillionaires = () => {

    const url = "../AllBillionaires.json"
    billiareDataLoad(url)
    document.getElementById('subWealth').innerText = '00'
}
const sortByRank = () => {

    showDisplayData(savedNewArray)
    document.getElementById('subWealth').innerText = '00'
}
// calculate 
const calculateWealth = () => {
    finalWorthTotal()

}
const showSingleItem = (userId) => {
    const findBillionaire = savedNewArray.find(user => user.naturalId === userId)
    const { personName, city, gender, countryOfCitizenship, bios, squareImage, financialAssets, state, birthDate, finalWorth, source, industries, } = findBillionaire;
    const dateFinder = new Date(birthDate);
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    console.log(personName)

    document.getElementById('popUpUserName').innerText = personName;
    document.getElementById('popUpUserPera').innerText = `${bios}`
    document.getElementById('popUpUserImg').setAttribute('src', `${squareImage}`);
    document.getElementById('citizenship').innerText = countryOfCitizenship;
    document.getElementById('city').innerText = city;
    document.getElementById('state').innerText = `${state ? state : 'not available'}`;
    document.getElementById('birthDate').innerText = dateFinder.getDate() + " " + month[dateFinder.getMonth()] + " " + dateFinder.getYear()
    document.getElementById('gender').innerText = `${gender ? gender === "M" ? "Male" : gender === "F" ? "Female" : "custom" : 'not available'}`;
    document.getElementById('exchange').innerText = `${financialAssets ? financialAssets[0].exchange : 'not available'}`;
    document.getElementById('ticker').innerText = `${financialAssets ? financialAssets[0].ticker : 'not available'}`;
    document.getElementById('shareTotal').innerText = `${financialAssets ? financialAssetsArray(financialAssets, 'shrares') : 'not available'}`;
    document.getElementById('sharePrice').innerText = `${financialAssets ? financialAssetsArray(financialAssets, 'sharePrice') : 'not available'}`;
    document.getElementById('source').innerText = source;
}



// search input
document.getElementById('searchInput').addEventListener('keyup', (e) => {
    e.preventDefault()
    const inputValue = e.target.value;
    console.log(inputValue);
    console.log(searchArray);
    const filterArray = searchArray.filter(data => {

        return (data.personName.toLowerCase().includes(inputValue.toLowerCase()))
    })
    console.log(filterArray);

    
    // blank থাকলে ডাটা লোড হয় না 
    showDisplayData(filterArray)

})