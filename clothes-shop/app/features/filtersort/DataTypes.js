interface FilterValue {
  value: any;
  title: String;
  image: String;
}

interface Filter {
  title: String;
  field: String;
  values: FilterValue[];
}

interface ToggleFilterObject {
  field: String;
  value: any;
}

export {FilterValue, Filter, ToggleFilterObject};
