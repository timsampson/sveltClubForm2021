function sheetToObjArr(data: any[]) {
  // get key values from first row or original array
  var header = data.shift();
  var arrayOfObjects = data.map(function (values) {
    return header.reduce(function (
      o: { [x: string]: any; },
      k: string | number,
      i: string | number
    ) {
      o[k] = values[i];
      return o;
    },
    {});
  });
  // put back key values from first row or original array
  data.unshift(header);
  return arrayOfObjects;
}
