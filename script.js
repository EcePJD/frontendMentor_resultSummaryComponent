/* function for fetching json data */
async function getData(url) {
    let fetchData = [];
    await fetch(url, {
        method: 'GET',
        headers: {
                'Accept': 'application/json',
            },
        })
        .then( response => response.json())
        .then( data => {fetchData = data;} );
    return fetchData;
}

// function utilizing the createElement DOM function together with the setAttribute function
function createElement(elType, classAssigned, idName, text = '', src = '' ) {
    let element = document.createElement(elType);
    element.setAttribute( 'class', classAssigned );
    element.setAttribute( 'id', idName );
    
    if( elType == 'img' ) {
        element.alt = text;
        element.src = src;
    } else {
        element.innerHTML = text;
    }

    return element;
}

/* execute function after page load */
window.onload = async function() {
    let fetchData = await getData('./data.json'); // fetch the json data
    let fragment = new DocumentFragment(); // temporary storage of the created elements
    let mainContainer = document.getElementById('category-container');
    let totalScore = 0;
    let totalExamTook = 0
    let overallTotal = 0;

    fetchData.forEach((data, index) => {
        totalScore += data.score;
        totalExamTook += 1;
        overallTotal += 100; // set to 100 since the sample json does not include total items

        let container = createElement(
            'div',
            'container container-category',
            'container-category' + index
        );

        let categoryLabelContainer = createElement(
            'div',
            'container container-category-label',
            'container-category-label' + index,
        )

        let categoryOutcomeContainer = createElement(
            'div',
            'container container-category-outcome',
            'container-category-outcome' + index,
        )

        let img = createElement(
            'img',
            'category-icon',
            'category-icon-' + data.category,
            'icon-' + data.category,
            data.icon
        );

        let name = createElement(
            'span',
            'category-name',
            'category-name-' + data.category,
            data.category,
        );

        let score = createElement(
            'span',
            'category-score',
            'category-score-' + data.category,
            data.score
        );

        let total = createElement(
            'span',
            'category-total',
            'category-total-' + data.category,
            '/ 100'
        );

        categoryLabelContainer.appendChild(img);
        categoryLabelContainer.appendChild(name);
        categoryOutcomeContainer.appendChild(score);
        categoryOutcomeContainer.appendChild(total);
        container.appendChild(categoryLabelContainer);
        container.appendChild(categoryOutcomeContainer);
        fragment.appendChild(container);
    });

    // used parseInt to remove the decimals
    document.getElementById( 'score-average' ).innerHTML = parseInt(totalScore / totalExamTook);
    document.getElementById( 'total-average' ).innerHTML = 'of ' + parseInt(overallTotal / totalExamTook);
    mainContainer.appendChild(fragment);
};