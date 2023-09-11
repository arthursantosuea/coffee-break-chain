export function parseStringToObjects(inputString) {
    const dataArray = inputString.split(',');
    const result = [];
  
    for (let i = 0; i < dataArray.length; i += 2) {
      const className = dataArray[i];
      const distribution = parseFloat(dataArray[i + 1]);
      
      if (!isNaN(distribution)) {
        result.push({ className, distribution });
      }
    }
  
    return result;
  }
  