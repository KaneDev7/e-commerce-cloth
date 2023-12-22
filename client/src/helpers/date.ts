

export const DAY_INTERVAL_FOR_NEW_PRODUCT = 6

export function getDayBetweenTwoDate (date : string){

    const fromDate = convertirFormatDate(new Date(date).toLocaleDateString()) 
    const toDate =  convertirFormatDate(new Date().toLocaleDateString())

    const dateObj1 = new Date(fromDate);
    const dateObj2 = new Date(toDate);

    const differenceEnMillisecondes = Math.abs(dateObj2 - dateObj1)
    const differenceEnJours = Math.ceil(differenceEnMillisecondes / (1000 * 60 * 60 * 24));

    return differenceEnJours < DAY_INTERVAL_FOR_NEW_PRODUCT;

}

function convertirFormatDate(date) {
    const [jour, mois, annee] = date.split('/');
    return `${annee}-${mois}-${jour}`;
  }


