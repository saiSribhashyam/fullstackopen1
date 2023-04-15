const parseSortBy = (sortBy) => {
  let variablesObject;
  switch (sortBy) {
    case "ASC":
      variablesObject = {
        orderDirection: "ASC",
      };
      break;
    case "DESC":
      variablesObject = {
        orderDirection: "DESC",
      };
      break;
    case "CREATED_AT":
      variablesObject = {
        orderBy: "CREATED_AT",
      };
      break;
    case "":
      variablesObject = {};
  }

  return variablesObject;
};

export default parseSortBy;
